'use client'

import { clearSepAuth, type SepUsuario } from '@/lib/auth'
import { LogOut, Menu } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface PanelTopbarProps {
  usuario: SepUsuario | null
  onMenuOpen: () => void
}

export function PanelTopbar({ usuario, onMenuOpen }: PanelTopbarProps) {
  const router = useRouter()

  function handleLogout() {
    clearSepAuth()
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-30 flex items-center h-14 px-4 bg-white border-b border-neutral-200 gap-3 lg:px-6">
      {/* Hamburger — solo mobile */}
      <button
        onClick={onMenuOpen}
        className="lg:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
        aria-label="Abrir menú"
      >
        <Menu size={20} />
      </button>

      {/* Logo — solo mobile (desktop lo tiene el sidebar) */}
      <div className="flex items-center gap-2 lg:hidden">
        <Image src="/images/sena-logo.svg" alt="SENA" width={28} height={28} />
        <span className="font-bold text-sm text-[#00304D]">SEP</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Usuario */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex flex-col items-end leading-tight">
          <span className="text-sm font-semibold text-neutral-800 max-w-[180px] truncate">
            {usuario?.nombre ?? usuario?.email ?? '—'}
          </span>
          <span className="text-[10px] text-neutral-400">
            {usuario?.perfilId === 7 ? 'Gremio / Empresa / Asociación' : 'Usuario interno'}
          </span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#00304D] flex items-center justify-center text-white text-xs font-bold">
          {(usuario?.nombre?.[0] ?? 'U').toUpperCase()}
        </div>
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="p-2 rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  )
}
