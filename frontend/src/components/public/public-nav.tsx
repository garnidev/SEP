'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Inicio',                href: '/' },
  { label: 'Descargar Certificado', href: '/certificados' },
  { label: 'Eventos',               href: '/eventos' },
]

export function PublicNav() {
  const pathname = usePathname()

  return (
    <nav className="w-full bg-cerulean-500 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Links */}
        <ul className="flex items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'block px-5 py-3 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-white border-b-2 border-lime-500'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Iniciar sesión */}
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors"
        >
          <LogIn size={16} />
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  )
}
