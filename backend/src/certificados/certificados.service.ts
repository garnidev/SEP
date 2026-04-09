import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource } from 'typeorm'
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const PDFDocument: new (opts?: Record<string, unknown>) => any = require('pdfkit')
import { Readable } from 'stream'

// Mapeo abreviatura → substring del nombre en TIPODOCUMENTOIDENTIDAD
const TIPO_DOC_MAP: Record<string, string> = {
  CC: 'Ciudadan',
  CE: 'Extranjer',
  TI: 'Tarjeta de Identidad',
  PA: 'Pasaporte',
  NIT: 'NIT',
  RC: 'Registro',
}

const MESES = [
  '', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE',
]

/** Divide texto en líneas de máximo `maxChars` caracteres */
function wrapText(text: string, maxChars = 80): string[] {
  const words = text.trim().split(/\s+/)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if ((current + ' ' + word).trim().length <= maxChars) {
      current = (current + ' ' + word).trim()
    } else {
      if (current) lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

@Injectable()
export class CertificadosService {
  constructor(private readonly dataSource: DataSource) {}

  /** Busca PersonaId por tipo doc + número de identificación */
  private async findPersonaId(tipoDocAbrev: string, identificacion: string): Promise<number | null> {
    const substring = TIPO_DOC_MAP[tipoDocAbrev.toUpperCase()] ?? tipoDocAbrev
    const rows = await this.dataSource.query(
      `SELECT P.PERSONAID FROM PERSONA P
       JOIN TIPODOCUMENTOIDENTIDAD T ON T.TIPODOCUMENTOIDENTIDADID = P.TIPODOCUMENTOIDENTIDADID
       WHERE UPPER(T.TIPODOCUMENTOIDENTIDADNOMBRE) LIKE UPPER('%' || :1 || '%')
         AND P.PERSONAIDENTIFICACION = :2`,
      [substring, identificacion],
    )
    return rows.length ? (rows[0]['PERSONAID'] as number) : null
  }

  /** Lista certificados de una persona */
  async buscarPorPersona(tipoDocumento: string, numero: string) {
    const personaId = await this.findPersonaId(tipoDocumento, numero)
    if (!personaId) return []
    return this.listarCertificados(personaId, null)
  }

  /** Lista certificados por código de evidencia */
  async buscarPorCodigo(codigo: string) {
    const rows = await this.dataSource.query(
      `SELECT P.PERSONAID FROM AFGRUPOBENEFICIARIO AFGB
       JOIN PERSONA P ON P.PERSONAID = AFGB.PERSONAID
       WHERE AFGB.EVIDENCIAVALIDACION = :1`,
      [codigo.trim()],
    )
    if (!rows.length) return []
    const personaId = rows[0]['PERSONAID'] as number
    return this.listarCertificados(personaId, codigo.trim())
  }

  private async listarCertificados(personaId: number, soloEvidencia: string | null) {
    let sql = `
      SELECT
        AFGB.AFGRUPOBENEFICIARIOID,
        AFGB.FECHAVALIDACIONINTERVENTOR,
        AFGB.EVIDENCIAVALIDACION,
        AFGB.AFGRUPOBENEFICIARIOIDFIRMA,
        AFGB.AFGRUPOBENEFICIARIOIDLOGO,
        AF.ACCIONFORMACIONNOMBRE,
        E.EMPRESARAZONSOCIAL,
        PR.PROYECTOID,
        AFGB.PERSONAID
      FROM AFGRUPOBENEFICIARIO AFGB
      JOIN AFGRUPO AFG ON AFG.AFGRUPOID = AFGB.AFGRUPOID
      JOIN ACCIONFORMACION AF ON AF.ACCIONFORMACIONID = AFG.ACCIONFORMACIONID
      JOIN PROYECTO PR ON PR.PROYECTOID = AF.PROYECTOID
      JOIN EMPRESA E ON E.EMPRESAID = PR.EMPRESAID
      WHERE AFGB.PERSONAID = :1
        AND TRIM(AFGB.CERTIFICA) = 'SI'
        AND TRIM(AFGB.VALIDACIONINTERVENTOR) = 'VERIFICADO'`

    const params: unknown[] = [personaId]
    if (soloEvidencia) {
      sql += ` AND AFGB.EVIDENCIAVALIDACION = :2`
      params.push(soloEvidencia)
    }
    sql += ` ORDER BY AFGB.FECHAVALIDACIONINTERVENTOR DESC`

    const rows: Record<string, unknown>[] = await this.dataSource.query(sql, params)

    return rows.map((r, i) => ({
      consecutivo: i + 1,
      afGrupoBeneficiarioId: r['AFGRUPOBENEFICIARIOID'],
      personaId: r['PERSONAID'],
      proyectoId: r['PROYECTOID'],
      empresaRazonSocial: r['EMPRESARAZONSOCIAL'],
      accionFormacionNombre: (r['ACCIONFORMACIONNOMBRE'] as string)
        .toUpperCase()
        .replace('TRANSFERENCIA:', '')
        .trim(),
      fechaValidacionInterventor: this.formatFecha(r['FECHAVALIDACIONINTERVENTOR'] as Date),
      evidenciaValidacion: r['EVIDENCIAVALIDACION'],
    }))
  }

  /** Genera el PDF del certificado */
  async generarPdf(afGrupoBeneficiarioId: number, personaId: number): Promise<Buffer> {
    // 1. Datos del beneficiario en este grupo
    const [afgb] = await this.dataSource.query(
      `SELECT AFGB.AFGRUPOBENEFICIARIOID, AFGB.AFGRUPOID, AFGB.EVIDENCIAVALIDACION,
              AFGB.FECHAVALIDACIONINTERVENTOR, AFGB.AFGRUPOBENEFICIARIOIDFIRMA,
              AFGB.AFGRUPOBENEFICIARIOIDLOGO,
              P.PERSONANOMBRES, P.PERSONAPRIMERAPELLIDO, P.PERSONASEGUNDOAPELLIDO,
              P.PERSONAIDENTIFICACION,
              TD.TIPODOCUMENTOIDENTIDADNOMBRE
       FROM AFGRUPOBENEFICIARIO AFGB
       JOIN PERSONA P ON P.PERSONAID = AFGB.PERSONAID
       JOIN TIPODOCUMENTOIDENTIDAD TD ON TD.TIPODOCUMENTOIDENTIDADID = P.TIPODOCUMENTOIDENTIDADID
       WHERE AFGB.AFGRUPOBENEFICIARIOID = :1 AND AFGB.PERSONAID = :2`,
      [afGrupoBeneficiarioId, personaId],
    )
    if (!afgb) throw new NotFoundException('Certificado no encontrado')

    // 2. Datos del grupo → acción de formación
    const [af] = await this.dataSource.query(
      `SELECT AF.ACCIONFORMACIONNOMBRE, AF.PROYECTOID, AF.ACCIONFORMACIONID,
              AF.MODALIDADFORMACIONID, AF.TIPOEVENTOID
       FROM AFGRUPO AFG
       JOIN ACCIONFORMACION AF ON AF.ACCIONFORMACIONID = AFG.ACCIONFORMACIONID
       WHERE AFG.AFGRUPOID = :1`,
      [afgb['AFGRUPOID']],
    )

    // 3. Proyecto + empresa + convenio
    const [proy] = await this.dataSource.query(
      `SELECT PR.PROYECTOID, PR.PROYECTONOMBRE, PR.EMPRESAID,
              C.CONVENIOSNUMERO, C.CONVENIOSID,
              CV.CONVOCATORIANOMBRE, CV.CONVOCATORIAID
       FROM PROYECTO PR
       LEFT JOIN CONVENIOS C ON C.PROYECTOID = PR.PROYECTOID
       LEFT JOIN CONVOCATORIA CV ON CV.CONVOCATORIAID = (
         SELECT MIN(CONVOCATORIAID) FROM CONVOCATORIA WHERE PROYECTOID = PR.PROYECTOID
       )
       WHERE PR.PROYECTOID = :1`,
      [af['PROYECTOID']],
    )

    const [empresa] = await this.dataSource.query(
      `SELECT E.EMPRESARAZONSOCIAL, CI.CIUDADNOMBRE
       FROM EMPRESA E
       LEFT JOIN CIUDAD CI ON CI.CIUDADID = E.CIUDADEMPRESAID
       WHERE E.EMPRESAID = :1`,
      [proy['EMPRESAID']],
    )

    // 4. Programa
    let programaNombre = ''
    const convocatoriaId = proy?.['CONVOCATORIAID']
    if (convocatoriaId) {
      const [prog] = await this.dataSource.query(
        `SELECT PG.PROGRAMANOMBRE FROM CONVOCATORIA CV
         JOIN PROGRAMA PG ON PG.PROGRAMAID = CV.PROGRAMAID
         WHERE CV.CONVOCATORIAID = :1`,
        [convocatoriaId],
      )
      programaNombre = prog?.['PROGRAMANOMBRE'] ?? ''
    }

    // 5. Tipo de evento
    const [tipoEvento] = await this.dataSource.query(
      `SELECT TIPOEVENTONOMBRE FROM TIPOEVENTO WHERE TIPOEVENTOID = :1`,
      [af['TIPOEVENTOID']],
    )

    // 6. Horas (modalidad 1 por defecto PP+TP)
    const [horas] = await this.dataSource.query(
      `SELECT SUM(
         CASE :1
           WHEN 1 THEN UNIDADTEMATICAHORASPP + UNIDADTEMATICAHORASTP
           WHEN 2 THEN UNIDADTEMATICAHORASPAT + UNIDADTEMATICAHORASPAT
           WHEN 3 THEN UNIDADTEMATICAHORASHIB + UNIDADTEMATICAHORASHIB
           WHEN 4 THEN UNIDADTEMATICAHORASPV + UNIDADTEMATICAHORASTV
           ELSE UNIDADTEMATICAHORASPP + UNIDADTEMATICAHORASTP
         END
       ) AS SUMAHORAS
       FROM UNIDADTEMATICA WHERE ACCIONFORMACIONID = :2`,
      [af['MODALIDADFORMACIONID'] ?? 1, af['ACCIONFORMACIONID']],
    )

    // 7. Firma
    const firmaCertId = afgb['AFGRUPOBENEFICIARIOIDFIRMA']
    let firma: Record<string, unknown> = {}
    if (firmaCertId) {
      const [f] = await this.dataSource.query(
        `SELECT FIRMACERTIFICADOSNOMBRE, FIRMACERTIFICADOSCARGO
         FROM FIRMACERTIFICADOS WHERE FIRMACERTIFICADOSID = :1`,
        [firmaCertId],
      )
      firma = f ?? {}
    }

    // ── Construir datos del certificado ────────────────────────────
    const nombreCompleto = [
      afgb['PERSONANOMBRES'],
      afgb['PERSONAPRIMERAPELLIDO'],
      afgb['PERSONASEGUNDOAPELLIDO'],
    ].filter(Boolean).join(' ').toUpperCase()

    const datosPersona =
      `con ${afgb['TIPODOCUMENTOIDENTIDADNOMBRE']} No. ${afgb['PERSONAIDENTIFICACION']}`

    const accionNombre = (af['ACCIONFORMACIONNOMBRE'] as string)
      .toUpperCase()
      .replace('TRANSFERENCIA:', '')
      .trim()
    const lineas = wrapText(accionNombre, 80)

    const empresaNombre = (empresa?.['EMPRESARAZONSOCIAL'] as string) ?? ''
    const lineasEm = wrapText(empresaNombre, 70)

    const tipoEventoNombre = tipoEvento?.['TIPOEVENTONOMBRE'] as string ?? 'Conferencia'
    const eventoFinal = tipoEventoNombre.startsWith('Conferencia')
      ? `Asistió a la ${tipoEventoNombre}`
      : `Asistió al ${tipoEventoNombre}`

    const fechaVal = new Date(afgb['FECHAVALIDACIONINTERVENTOR'] as string)
    const mes = MESES[fechaVal.getMonth() + 1]
    const ano = fechaVal.getFullYear()
    const ciudad = empresa?.['CIUDADNOMBRE'] as string ?? 'BOGOTÁ'

    const convenioNum = proy?.['CONVENIOSNUMERO'] ?? ''
    const sumaHoras = Number(horas?.['SUMAHORAS'] ?? 1)
    const horasTexto = sumaHoras === 1
      ? `con una duración de ${sumaHoras} hora`
      : `con una duración de ${sumaHoras} horas`

    const convocatoriaNombre = proy?.['CONVOCATORIANOMBRE'] as string ?? ''
    const evidencia = afgb['EVIDENCIAVALIDACION'] as string ?? ''

    // ── Generar PDF ────────────────────────────────────────────────
    return this.buildPdf({
      nombreCompleto,
      datosPersona,
      empresaNombre: lineasEm,
      eventoFinal,
      lineas,
      programaNombre: programaNombre.toUpperCase(),
      convenioNum: String(convenioNum),
      horasTexto,
      ciudad: ciudad.trim(),
      mes,
      ano,
      convocatoriaNombre,
      firmaNombre: firma['FIRMACERTIFICADOSNOMBRE'] as string ?? '',
      firmaCargo: firma['FIRMACERTIFICADOSCARGO'] as string ?? '',
      evidencia,
    })
  }

  private buildPdf(d: {
    nombreCompleto: string
    datosPersona: string
    empresaNombre: string[]
    eventoFinal: string
    lineas: string[]
    programaNombre: string
    convenioNum: string
    horasTexto: string
    ciudad: string
    mes: string
    ano: number
    convocatoriaNombre: string
    firmaNombre: string
    firmaCargo: string
    evidencia: string
  }): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 60 })
      const chunks: Buffer[] = []
      doc.on('data', (c: Buffer) => chunks.push(c))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      const W = doc.page.width - 120 // ancho disponible
      const center = { align: 'center' as const }

      // ── Encabezado ──
      doc.fontSize(13).font('Helvetica-Bold')
        .text('El Servicio Nacional de Aprendizaje - SENA', { align: 'center' })

      if (d.empresaNombre.length > 0) {
        doc.fontSize(11).font('Helvetica')
          .text(`y ${d.empresaNombre[0]}`, center)
        for (let i = 1; i < d.empresaNombre.length; i++) {
          doc.text(d.empresaNombre[i], center)
        }
      }

      doc.moveDown(0.5)
        .fontSize(11).font('Helvetica-Oblique')
        .text('Hacen Constar que', center)

      // ── Nombre beneficiario ──
      doc.moveDown(0.5)
        .fontSize(16).font('Helvetica-Bold')
        .text(d.nombreCompleto, center)

      doc.moveDown(0.3)
        .fontSize(11).font('Helvetica')
        .text(d.datosPersona, center)

      // ── Evento ──
      doc.moveDown(0.5)
        .fontSize(11).font('Helvetica-Oblique')
        .text(d.eventoFinal, center)

      // ── Acción de Formación (líneas) ──
      doc.moveDown(0.3)
        .font('Helvetica-Bold')
      for (const linea of d.lineas) {
        doc.text(linea, center)
      }

      // ── Programa / Convocatoria ──
      doc.moveDown(0.5)
        .font('Helvetica-Bold').fontSize(12)
        .text(d.programaNombre, center)

      // ── Convenio y horas ──
      doc.moveDown(0.5)
        .font('Helvetica').fontSize(10)
      if (d.convenioNum) {
        doc.text(
          `Este certificado se expide en el marco del convenio N° ${d.convenioNum} celebrado con el SENA,`,
          center,
        )
      }
      doc.text(d.horasTexto, center)

      // ── Ciudad y fecha ──
      doc.moveDown(0.3)
        .text(`${d.ciudad}, ${d.mes} ${d.ano}`, center)

      // ── Firma ──
      doc.moveDown(1.5)
        .font('Helvetica-Oblique').fontSize(10)
        .text('Firmado digitalmente por', center)

      doc.moveDown(2)
        .font('Helvetica-Bold').fontSize(11)
        .text(d.firmaNombre, center)

      doc.font('Helvetica').fontSize(10)
        .text(d.firmaCargo, center)

      // ── Datos convocatoria ──
      doc.moveDown(1)
        .font('Helvetica').fontSize(9)
      if (d.convocatoriaNombre) {
        doc.text(
          `Las acciones de formación ejecutadas en el marco de la convocatoria ${d.convocatoriaNombre}`,
          { align: 'center', width: W },
        )
        doc.text('son gratuitas para los beneficiarios', center)
      }

      // ── Autenticidad ──
      doc.moveDown(0.5)
        .fontSize(8).font('Helvetica')
        .text(
          'La autenticidad de este documento puede ser verificada en el registro electrónico que se encuentra en la página web https://sep.sena.edu.co/Certificados.aspx bajo el número',
          { align: 'center', width: W },
        )
        .text(d.evidencia, center)

      doc.end()
    })
  }

  private formatFecha(d: Date | string): string {
    if (!d) return ''
    const dt = new Date(d)
    if (isNaN(dt.getTime())) return String(d)
    return `${dt.toLocaleDateString('es-CO')} ${dt.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`
  }

  /** Stream del PDF como Readable */
  async streamPdf(afGrupoBeneficiarioId: number, personaId: number): Promise<Readable> {
    const buf = await this.generarPdf(afGrupoBeneficiarioId, personaId)
    return Readable.from(buf)
  }
}