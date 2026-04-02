'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Home,
  Wheat,
  Newspaper,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'home',     label: 'Inicio',                    icon: Home,      path: '/' },
  { id: 'bakeries', label: 'Directorio de panaderías',  icon: Wheat,     path: '/panaderias' },
  { id: 'blog',     label: 'Gestor del blog',            icon: Newspaper, path: '/blog' },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'relative flex flex-col min-h-screen bg-purpura-500 text-white transition-all duration-250 flex-shrink-0 z-20',
        collapsed ? 'w-[72px] px-3 py-5' : 'w-[260px] px-4 py-5'
      )}
    >
      {/* Logo */}
      <div className="mb-10">
        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              S
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              SENA
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              SEP
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {!collapsed && (
          <>
            <span className="px-3 py-2 text-xs text-white/50 uppercase tracking-wider">
              Contenido
            </span>
            <div className="h-px bg-white/15 mb-2" />
          </>
        )}

        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.id}
              href={item.path}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 no-underline',
                isActive
                  ? 'bg-white/[0.18] text-white'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-purpura-600 border-2 border-neutral-100 flex items-center justify-center text-white hover:bg-purpura-700 transition-colors z-10"
        aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* User area */}
      <div
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg bg-green-500 mt-auto cursor-pointer hover:bg-green-600 transition-colors',
          collapsed && 'justify-center'
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ui-avatars.com/api/?name=Admin&background=39a900&color=fff&size=36"
          alt="Admin"
          className="w-9 h-9 rounded-full flex-shrink-0"
        />
        {!collapsed && (
          <>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold text-white">Nombre Admin</span>
              <span className="text-xs text-white/70">Administrador</span>
            </div>
            <ChevronRight size={16} className="text-white/70 flex-shrink-0" />
          </>
        )}
      </div>
    </aside>
  )
}
