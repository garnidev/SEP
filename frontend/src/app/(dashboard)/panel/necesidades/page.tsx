'use client'

import { ClipboardList } from 'lucide-react'

export default function NecesidadesPage() {
  return (
    <div className="p-5 sm:p-7 xl:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#39A900]/10 flex items-center justify-center">
          <ClipboardList size={20} className="text-[#39A900]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Mis Necesidades</h1>
          <p className="text-xs text-neutral-500">Diagnóstico de necesidades de formación</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 text-center text-neutral-400 text-sm">
        Módulo en desarrollo — próximamente disponible.
      </div>
    </div>
  )
}
