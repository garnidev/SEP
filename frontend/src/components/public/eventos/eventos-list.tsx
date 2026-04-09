'use client'

import { useEffect, useState } from 'react'
import { ClipboardCheck, Loader2, AlertCircle, CalendarX } from 'lucide-react'
import type { Evento } from '@/types'
import api from '@/lib/api'

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function BadgeEstado({ active, trueLabel, falseLabel }: { active: boolean; trueLabel: string; falseLabel: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
      ${active
        ? 'bg-green-50 text-green-600 border border-green-200'
        : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
      }`}
    >
      {active ? trueLabel : falseLabel}
    </span>
  )
}

export function EventosList() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState<string | null>(null)

  useEffect(() => {
    api.get<Evento[]>('/eventos')
      .then(({ data }) => setEventos(data))
      .catch(() => setError('No se pudo cargar el listado de eventos. Intente más tarde.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 gap-3 text-neutral-400">
        <Loader2 size={22} className="animate-spin" />
        <span className="text-sm">Cargando eventos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
        <AlertCircle size={16} className="flex-shrink-0" />
        {error}
      </div>
    )
  }

  if (!eventos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-neutral-400">
        <CalendarX size={40} strokeWidth={1.5} />
        <p className="text-sm">No hay eventos programados en este momento.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-cerulean-500 text-white">
            <th className="px-4 py-3 text-left font-semibold">Nombre</th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Fecha Inicio</th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Fecha Fin</th>
            <th className="px-4 py-3 text-center font-semibold">Visibilidad</th>
            <th className="px-4 py-3 text-center font-semibold">Estado</th>
            <th className="px-4 py-3 text-center font-semibold w-32">Registrar</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((ev, i) => (
            <tr
              key={ev.eventoId}
              className={`border-t border-neutral-100 ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
            >
              <td className="px-4 py-3 text-neutral-800 font-medium">{ev.eventoNombre}</td>
              <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">{formatFecha(ev.eventoFechaInicio)}</td>
              <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">{formatFecha(ev.eventoFechaFin)}</td>
              <td className="px-4 py-3 text-center">
                <BadgeEstado active={ev.eventoVisible} trueLabel="VISIBLE" falseLabel="NO VISIBLE" />
              </td>
              <td className="px-4 py-3 text-center">
                <BadgeEstado active={ev.eventoActivo} trueLabel="ACTIVO" falseLabel="INACTIVO" />
              </td>
              <td className="px-4 py-3 text-center">
                {ev.eventoActivo && ev.eventoVisible ? (
                  <a
                    href={`/eventos/${ev.eventoId}/registrar`}
                    className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold text-xs px-3 py-2 rounded transition-colors whitespace-nowrap"
                  >
                    <ClipboardCheck size={14} />
                    Registrar
                  </a>
                ) : (
                  <span className="text-xs text-neutral-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
