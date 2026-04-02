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

// ── Panadería ──
export interface Panaderia {
  id: number
  nombre: string
  departamento: string
  municipio: string
  responsable: string
  activa: boolean
  creadaEn: string
}

// ── Artículo blog ──
export interface Articulo {
  id: number
  titulo: string
  contenido: string
  autor: string
  estado: 'borrador' | 'publicado' | 'archivado'
  publicadoEn: string | null
  creadoEn: string
}
