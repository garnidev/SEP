'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Users,
  FileCheck2,
  Building2,
  CalendarDays,
  ClipboardList,
  ScrollText,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    label: 'Principal',
    items: [
      { id: 'inicio', label: 'Inicio',    icon: LayoutDashboard, path: '/panel' },
    ],
  },
  {
    label: 'Gestión',
    items: [
      { id: 'beneficiarios', label: 'Beneficiarios',  icon: Users,         path: '/beneficiarios' },
      { id: 'empresas',      label: 'Empresas',        icon: Building2,     path: '/empresas' },
      { id: 'convenios',     label: 'Convenios',       icon: ScrollText,    path: '/convenios' },
      { id: 'cronograma',    label: 'Cronograma',      icon: CalendarDays,  path: '/cronograma' },
    ],
  },
  {
    label: 'Módulos',
    items: [
      { id: 'certificacion', label: 'Certificación',  icon: FileCheck2,    path: '/certificacion' },
      { id: 'desembolsos',   label: 'Desembolsos',    icon: Wallet,        path: '/desembolsos' },
      { id: 'evaluaciones',  label: 'Evaluaciones',   icon: ClipboardList, path: '/evaluaciones' },
    ],
  },
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
      <div className="mb-8">
        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px]">
              S
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px] text-center leading-tight px-1">
              SENA
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-xs leading-tight">SEP</span>
              <span className="text-white/60 text-[10px] leading-tight">GGPC</span>
            </div>
          </div>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex flex-col gap-4 flex-1">
        {navGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-1">
            {!collapsed && (
              <span className="px-3 text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1">
                {group.label}
              </span>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 no-underline',
                    isActive
                      ? 'bg-white/[0.18] text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              )
            })}
          </div>
        ))}
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
          'flex items-center gap-3 p-3 rounded-lg bg-green-500 mt-6 cursor-pointer hover:bg-green-600 transition-colors',
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
