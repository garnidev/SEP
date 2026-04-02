import { StatCard } from '@/components/ui/stat-card'
import { Wheat, Newspaper, TrendingUp, MapPin } from 'lucide-react'

const stats = [
  {
    label: 'Panaderías registradas',
    value: '342',
    icon: Wheat,
    variant: 'green' as const,
  },
  {
    label: 'Artículos publicados',
    value: '56',
    icon: Newspaper,
    variant: 'purpura' as const,
  },
  {
    label: 'Departamentos activos',
    value: '18',
    icon: MapPin,
    variant: 'celeste' as const,
  },
  {
    label: 'Visitas este mes',
    value: '2.4k',
    icon: TrendingUp,
    variant: 'lime' as const,
  },
]

export default function HomePage() {
  return (
    <div className="p-8 flex flex-col gap-8 max-w-[1100px]">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-neutral-900">
          Bienvenido al panel SEP
        </h1>
        <p className="text-base text-neutral-600">
          Sistema Especializado de Proyectos — GGPC SENA
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>
    </div>
  )
}
