import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SEP — Sistema Especializado de Proyectos',
  description: 'Plataforma de gestión de proyectos GGPC — SENA',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
