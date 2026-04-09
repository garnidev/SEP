'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Calendar, Award, Megaphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Award,
  Calendar,
  Megaphone,
}

export interface ModuleDef {
  id: string
  image: string
  alt: string
  href: string
  external: boolean
  abbr: string | null
  title: string
  iconName?: string
  bg: string
  textColor: string
  disabled?: boolean
}

export function ModuleCard({ mod }: { mod: ModuleDef }) {
  const [imgFailed, setImgFailed] = useState(false)
  const Icon = mod.iconName ? ICONS[mod.iconName] : null

  const Tag = mod.disabled ? 'div' : 'a'
  const linkProps = mod.disabled
    ? {}
    : mod.external
    ? { href: mod.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: mod.href }

  return (
    <Tag
      {...(linkProps as Record<string, string>)}
      className={`
        group block bg-white rounded-2xl overflow-hidden
        shadow-md transition-all duration-200
        ${mod.disabled ? 'cursor-default opacity-70' : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'}
      `}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {/* Fallback siempre visible — queda cubierto cuando la imagen carga */}
        <div className={`absolute inset-0 bg-gradient-to-br ${mod.bg} flex flex-col items-center justify-center gap-3 p-4`}>
          {mod.abbr ? (
            <span className="text-white font-black text-3xl text-center leading-tight whitespace-pre-wrap drop-shadow">
              {mod.abbr}
            </span>
          ) : Icon ? (
            <Icon size={56} className="text-white drop-shadow" strokeWidth={1.5} />
          ) : null}
          <p className="text-white/90 text-sm font-semibold text-center whitespace-pre-line leading-snug drop-shadow">
            {mod.title}
          </p>
        </div>

        {/* Imagen real — cubre el fallback si el archivo existe */}
        {!imgFailed && (
          <Image
            src={mod.image}
            alt={mod.alt}
            fill
            className="object-cover z-10"
            onError={() => setImgFailed(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        )}
      </div>
    </Tag>
  )
}
