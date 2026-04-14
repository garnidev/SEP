import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Empresa } from '../auth/entities/empresa.entity'
import { Usuario } from '../auth/entities/usuario.entity'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { twofish } = require('twofish')

// ── Twofish (mismo algoritmo que GeneXus) ────────────────────────────────────

function encrypt64(plainText: string, key: string): string {
  const tf = twofish(new Array(16).fill(0))
  const keyArr = Array.from(Buffer.from(key, 'hex')) as number[]
  const padded = Array.from(Buffer.from(plainText, 'utf8')) as number[]
  while (padded.length < 16) padded.push(0x20)
  return Buffer.from(tf.encrypt(keyArr, padded)).toString('base64')
}

// ── Raw-query helper: TRIM nchar ─────────────────────────────────────────────

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepo: Repository<Empresa>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    private readonly dataSource: DataSource,
  ) {}

  // ── Datos básicos completos ───────────────────────────────────────────────

  async getDatos(email: string) {
    // Empresa
    const [emp] = await this.dataSource.query(
      `SELECT
         e.EMPRESAID                AS "empresaId",
         e.TIPODOCUMENTOIDENTIDADID AS "tipoDocumentoIdentidadId",
         TRIM(tdi.TIPODOCUMENTOIDENTIDADNOMBRE) AS "tipoDocNombre",
         e.EMPRESAIDENTIFICACION    AS "empresaIdentificacion",
         e.EMPRESADIGITOVERIFICACION AS "empresaDigitoVerificacion",
         TRIM(e.EMPRESARAZONSOCIAL) AS "empresaRazonSocial",
         TRIM(e.EMPRESASIGLA)       AS "empresaSigla",
         e.EMPRESAEMAIL             AS "empresaEmail",
         e.EMPRESAFECHAREGISTRO     AS "empresaFechaRegistro",
         e.COBERTURAEMPRESAID       AS "coberturaEmpresaId",
         e.DEPARTAMENTOEMPRESAID    AS "departamentoEmpresaId",
         e.CIUDADEMPRESAID          AS "ciudadEmpresaId",
         TRIM(e.EMPRESADIRECCION)   AS "empresaDireccion",
         TRIM(e.EMPRESATELEFONO)    AS "empresaTelefono",
         TRIM(e.EMPRESACELULAR)     AS "empresaCelular",
         e.EMPRESAINDICATIVO        AS "empresaIndicativo",
         TRIM(e.EMPRESAWEBSITE)     AS "empresaWebsite",
         e.CIIUID                   AS "ciiuId",
         e.TIPOEMPRESAID            AS "tipoEmpresaId",
         e.TAMANOEMPRESAID          AS "tamanoEmpresaId",
         TRIM(e.EMPRESACERTIFCOMP)  AS "empresaCertifComp",
         TRIM(e.EMPRESAEXPERTTECN)  AS "empresaExpertTecn",
         e.TIPOIDENTIFICACIONREP    AS "tipoIdentificacionRep",
         TRIM(e.EMPRESAREPDOCUMENTO) AS "empresaRepDocumento",
         TRIM(e.EMPRESAREP)         AS "empresaRep",
         TRIM(e.EMPRESAREPCARGO)    AS "empresaRepCargo",
         TRIM(e.EMPRESAREPCORREO)   AS "empresaRepCorreo",
         TRIM(e.EMPRESAREPTEL)      AS "empresaRepTel"
       FROM EMPRESA e
       LEFT JOIN TIPODOCUMENTOIDENTIDAD tdi
              ON tdi.TIPODOCUMENTOIDENTIDADID = e.TIPODOCUMENTOIDENTIDADID
       WHERE e.EMPRESAEMAIL = :1
         AND ROWNUM = 1`,
      [email],
    )
    if (!emp) throw new NotFoundException('Empresa no encontrada')

    // Usuario (fecha registro + perfil)
    const [usr] = await this.dataSource.query(
      `SELECT u.USUARIOFECHAREGISTRO AS "fechaRegistro",
              TRIM(p.PERFILNOMBRE)   AS "perfilNombre"
         FROM USUARIO u
         JOIN PERFIL  p ON p.PERFILID = u.PERFILID
        WHERE u.USUARIOEMAIL = :1
          AND ROWNUM = 1`,
      [email],
    )

    // CIIU desc
    let ciiuDesc = ''
    if (emp.ciiuId) {
      try {
        const [c] = await this.dataSource.query(
          `SELECT TRIM(CIIUCODIGO) || ' - ' || TRIM(CIIUDESCRIPCION) AS "desc"
             FROM CIIU WHERE CIIUID = :1 AND ROWNUM = 1`,
          [emp.ciiuId],
        )
        ciiuDesc = c?.desc ?? ''
      } catch { /* tabla no encontrada */ }
    }

    return { ...emp, ...usr, ciiuDesc }
  }

  // ── Lookups ───────────────────────────────────────────────────────────────

  async getDepartamentos() {
    return this.dataSource.query(
      `SELECT DEPARTAMENTOID AS "id", TRIM(DEPARTAMENTONOMBRE) AS "nombre"
         FROM DEPARTAMENTO
        ORDER BY TRIM(DEPARTAMENTONOMBRE) ASC`,
    )
  }

  async getCiudades(departamentoId: number) {
    return this.dataSource.query(
      `SELECT CIUDADID AS "id", TRIM(CIUDADNOMBRE) AS "nombre"
         FROM CIUDAD
        WHERE DEPARTAMENTOID = :1
        ORDER BY TRIM(CIUDADNOMBRE) ASC`,
      [departamentoId],
    )
  }

  async getCoberturas() {
    try {
      return await this.dataSource.query(
        `SELECT COBERTURAID AS "id", TRIM(COBERTURADESCRIPCION) AS "nombre"
           FROM COBERTURA
          WHERE COBERTURAESTADO = 1
          ORDER BY COBERTURAID ASC`,
      )
    } catch { return [] }
  }

  async getCiiu(q: string) {
    try {
      return await this.dataSource.query(
        `SELECT CIIUID AS "id",
                TRIM(CIIUCODIGO) || ' - ' || TRIM(CIIUDESCRIPCION) AS "nombre"
           FROM CIIU
          WHERE UPPER(TRIM(CIIUCODIGO)) LIKE UPPER(:1)
             OR UPPER(TRIM(CIIUDESCRIPCION)) LIKE UPPER(:2)
          ORDER BY TRIM(CIIUCODIGO) ASC
          FETCH FIRST 30 ROWS ONLY`,
        [`%${q}%`, `%${q}%`],
      )
    } catch { return [] }
  }

  async getTiposOrganizacion() {
    try {
      return await this.dataSource.query(
        `SELECT TIPOEMPRESAID AS "id", TRIM(TIPOEMPRESANOMBRE) AS "nombre"
           FROM TIPOEMPRESA
          ORDER BY TIPOEMPRESAID ASC`,
      )
    } catch { return [] }
  }

  async getTamanosEmpresa() {
    try {
      return await this.dataSource.query(
        `SELECT TAMANOEMPRESAID AS "id", TRIM(TAMANOEMPRESANOMBRE) AS "nombre"
           FROM TAMANOEMPRESA
          ORDER BY TAMANOEMPRESAID ASC`,
      )
    } catch { return [] }
  }

  async getTiposDocumentoRep() {
    try {
      return await this.dataSource.query(
        `SELECT TIPODOCUMENTOIDENTIDADID AS "id",
                TRIM(TIPODOCUMENTOIDENTIDADNOMBRE) AS "nombre"
           FROM TIPODOCUMENTOIDENTIDAD
          WHERE TIPODOCUMENTOIDENTIDADPERSONA = 1
          ORDER BY TRIM(TIPODOCUMENTOIDENTIDADNOMBRE) ASC`,
      )
    } catch { return [] }
  }

  // ── Updates ───────────────────────────────────────────────────────────────

  async updateIdentificacion(email: string, dto: { empresaRazonSocial: string; empresaSigla: string }) {
    const empresa = await this.empresaRepo.findOne({ where: { empresaEmail: email } })
    if (!empresa) throw new NotFoundException('Empresa no encontrada')
    await this.empresaRepo.update(empresa.empresaId, {
      empresaRazonSocial: dto.empresaRazonSocial.trim(),
      empresaSigla: (dto.empresaSigla ?? '').trim(),
    })
    return { message: 'Datos de identificación actualizados' }
  }

  async updateUbicacion(email: string, dto: {
    departamentoEmpresaId: number; ciudadEmpresaId: number; coberturaEmpresaId: number
    empresaDireccion: string; empresaTelefono?: string; empresaCelular: string
    empresaIndicativo?: number; empresaWebsite?: string
  }) {
    const empresa = await this.empresaRepo.findOne({ where: { empresaEmail: email } })
    if (!empresa) throw new NotFoundException('Empresa no encontrada')
    await this.dataSource.query(
      `UPDATE EMPRESA SET
         DEPARTAMENTOEMPRESAID = :1,
         CIUDADEMPRESAID       = :2,
         COBERTURAEMPRESAID    = :3,
         EMPRESADIRECCION      = :4,
         EMPRESATELEFONO       = :5,
         EMPRESACELULAR        = :6,
         EMPRESAINDICATIVO     = :7,
         EMPRESAWEBSITE        = :8
       WHERE EMPRESAID = :9`,
      [
        dto.departamentoEmpresaId,
        dto.ciudadEmpresaId,
        dto.coberturaEmpresaId,
        (dto.empresaDireccion ?? '').trim(),
        (dto.empresaTelefono ?? '').trim(),
        (dto.empresaCelular ?? '').trim(),
        dto.empresaIndicativo ?? null,
        (dto.empresaWebsite ?? '').trim(),
        empresa.empresaId,
      ],
    )
    return { message: 'Datos de ubicación actualizados' }
  }

  async updateEconomicos(email: string, dto: {
    ciiuId: number; tipoEmpresaId: number; tamanoEmpresaId: number
    empresaCertifComp: string; empresaExpertTecn: string
  }) {
    const empresa = await this.empresaRepo.findOne({ where: { empresaEmail: email } })
    if (!empresa) throw new NotFoundException('Empresa no encontrada')
    await this.dataSource.query(
      `UPDATE EMPRESA SET
         CIIUID            = :1,
         TIPOEMPRESAID     = :2,
         TAMANOEMPRESAID   = :3,
         EMPRESACERTIFCOMP = :4,
         EMPRESAEXPERTTECN = :5
       WHERE EMPRESAID = :6`,
      [
        dto.ciiuId,
        dto.tipoEmpresaId,
        dto.tamanoEmpresaId,
        dto.empresaCertifComp ?? 'N',
        dto.empresaExpertTecn ?? 'N',
        empresa.empresaId,
      ],
    )
    return { message: 'Datos generales actualizados' }
  }

  async updateRepresentante(email: string, dto: {
    tipoIdentificacionRep: number; empresaRepDocumento: string; empresaRep: string
    empresaRepCargo: string; empresaRepCorreo: string; empresaRepTel: string
  }) {
    const empresa = await this.empresaRepo.findOne({ where: { empresaEmail: email } })
    if (!empresa) throw new NotFoundException('Empresa no encontrada')
    await this.dataSource.query(
      `UPDATE EMPRESA SET
         TIPOIDENTIFICACIONREP = :1,
         EMPRESAREPDOCUMENTO   = :2,
         EMPRESAREP            = :3,
         EMPRESAREPCARGO       = :4,
         EMPRESAREPCORREO      = :5,
         EMPRESAREPTEL         = :6
       WHERE EMPRESAID = :7`,
      [
        dto.tipoIdentificacionRep,
        dto.empresaRepDocumento.trim(),
        dto.empresaRep.trim(),
        dto.empresaRepCargo.trim(),
        dto.empresaRepCorreo.trim(),
        dto.empresaRepTel.trim(),
        empresa.empresaId,
      ],
    )
    return { message: 'Datos del representante legal actualizados' }
  }

  async getMenu(perfilId: number) {
    const rows: Array<{ desc: string; url: string; icono: string }> = await this.dataSource.query(
      `SELECT TRIM(MENUXDESC)  AS "desc",
              TRIM(MENXURL)    AS "url",
              TRIM(MENUXICONO) AS "icono"
         FROM MENU
        WHERE MENXEST   = 'A'
          AND MENXPADRE = 0
          AND PERFILID  = :1
        ORDER BY MENUXPOSI ASC`,
      [perfilId],
    )
    return rows
  }

  async cambiarClave(email: string, nuevaClave: string) {
    if (!nuevaClave || nuevaClave.trim().length < 6) {
      throw new BadRequestException('La clave debe tener al menos 6 caracteres')
    }
    const usuario = await this.usuarioRepo.findOne({ where: { usuarioEmail: email } })
    if (!usuario) throw new NotFoundException('Usuario no encontrado')
    const claveEncriptada = encrypt64(nuevaClave, usuario.usuarioLlaveEncriptacion)
    await this.usuarioRepo.update(usuario.usuarioId, { usuarioClave: claveEncriptada })
    return { message: 'Contraseña actualizada correctamente' }
  }
}
