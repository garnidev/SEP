// ── Respuesta genérica de la API ──
export interface ApiResponse<T> {
  data: T
  message?: string
  statusCode: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

// ── Usuario ──
export interface User {
  id: number
  nombre: string
  email: string
  rol: 'admin' | 'editor' | 'viewer'
  activo: boolean
}

// ── Certificado ──
export interface CertificadoRow {
  consecutivo: number
  empresaRazonSocial: string
  accionFormacionNombre: string
  fechaValidacionInterventor: string
  afGrupoBeneficiarioId: number
  personaId: number
  proyectoId: number
}

// ── Evento (público) ──
export interface Evento {
  eventoId: number
  eventoNombre: string
  eventoFechaInicio: string
  eventoFechaFin: string
  eventoVisible: boolean
  eventoActivo: boolean
}

// ── Persona (resultado de búsqueda en inscripción) ──
export interface PersonaBusqueda {
  personaId: number
  personaNombres: string
  personaPrimerApellido: string
  personaSegundoApellido: string
  tipoDocumentoIdentidadId: string
  personaIdentificacion: string
  personaFechaNacimiento: string
  generoId: string
  personaEstrato: string
  personaEmail: string
  personaCelular: string
  personaDepartamentoId: string
  personaCiudad: string
  personaBarrio: string
  personaDireccion: string
  personaHabeasData: boolean
}

// ── Postulación de la persona ──
export interface PostulacionData {
  postulacionAno: number
  postulacionEdad: number
  rangoEdadId: number
  postulacionAntiguedad: string
  nivelOcupacionalId: string
  caracterizacionId: string
  tamanoEmpresaId: number
  beneficiarioEmpresaId: number
  postulacionTrasferencia: string
  perfilTrasferenciaId: number
}

// ── Empresa beneficiaria ──
export interface EmpresaBeneficiaria {
  beneficiarioEmpresaId: number
  beneficiarioEmpresaNombre: string
  beneficiarioEmpresaNumero: string
  tamanoEmpresaId: number
  tamanoEmpresaNombre: string
}

// ── Estado global del wizard de inscripción ──
export interface RegistroState {
  // ── Identidad ──
  tipoIdentificacion: string
  identificacion: string

  // ── Persona ──
  personaId: number | null
  maskedNombreCompleto: string
  personaNombres: string
  personaPrimerApellido: string
  personaSegundoApellido: string
  generoId: string
  personaEstrato: string
  personaFechaNacimiento: string
  personaCelular: string
  personaDepartamentoId: string
  personaCiudad: string
  personaBarrio: string
  personaDireccion: string
  personaEmail: string

  // ── Empresa ──
  tipoDocEmpresa: string
  beneficiarioEmpresaNumero: string
  beneficiarioEmpresaId: number | null
  beneficiarioEmpresaNombre: string
  tamanoEmpresaId: number | null
  tamanoEmpresaNombre: string

  // ── Postulación ──
  postulacionAno: number
  postulacionEdad: number
  rangoEdadId: number
  postulacionAntiguedad: string
  caracterizacionId: string
  nivelOcupacionalId: string

  // ── Conferencia ──
  conferenciaId: string
  validarConferencia: boolean

  // ── Control interno del wizard ──
  validarPosAno: number   // 1=persona nueva, 2=existente sin postulación, 3=con postulación
  valiarRegistro: number
}
