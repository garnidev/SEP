import type { Metadata } from 'next'
import './globals.css'
import { AppSidebar } from '@/components/layout/app-sidebar'

export const metadata: Metadata = {
  title: 'SEP — Sistema Especializado de Proyectos',
  description: 'Plataforma de gestión de proyectos GGPC — SENA',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 min-w-0 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
