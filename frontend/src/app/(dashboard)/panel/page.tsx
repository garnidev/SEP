import {
  Users, Building2, ScrollText, FileCheck2,
  CalendarDays, ClipboardList, Wallet, TrendingUp,
} from 'lucide-react'

const stats = [
  { label: 'Beneficiarios activos', value: '—', icon: Users,      variant: 'green'   },
  { label: 'Empresas vinculadas',   value: '—', icon: Building2,  variant: 'purpura' },
  { label: 'Convenios vigentes',    value: '—', icon: ScrollText, variant: 'celeste' },
  { label: 'Certificados emitidos', value: '—', icon: FileCheck2, variant: 'lime'    },
]

const variantStyles: Record<string, string> = {
  green:   'bg-green-50 text-green-500',
  purpura: 'bg-purpura-50 text-purpura-500',
  celeste: 'bg-celeste-50 text-celeste-500',
  lime:    'bg-lime-50 text-lime-500',
}

export default function InicioDashboard() {
  return (
    <div className="p-8 flex flex-col gap-8 max-w-[1200px]">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-neutral-900">Panel SEP</h1>
        <p className="text-sm text-neutral-500">
          Sistema Especializado de Proyectos — GGPC SENA
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 p-5 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${variantStyles[stat.variant]}`}>
              <stat.icon size={20} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-2xl font-bold text-neutral-900">{stat.value}</span>
              <span className="text-sm text-neutral-500 truncate">{stat.label}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Módulos del sistema */}
      <section className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-green-500" />
          <h2 className="font-semibold text-neutral-900">Módulos del sistema</h2>
        </div>
        <p className="text-sm text-neutral-500">
          Los módulos se habilitan progresivamente según la migración. Usa el menú lateral para navegar.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {[
            { label: 'Beneficiarios', icon: Users         },
            { label: 'Convenios',     icon: ScrollText    },
            { label: 'Cronograma',    icon: CalendarDays  },
            { label: 'Certificación', icon: FileCheck2    },
            { label: 'Desembolsos',   icon: Wallet        },
            { label: 'Evaluaciones',  icon: ClipboardList },
          ].map((mod) => (
            <div
              key={mod.label}
              className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-500"
            >
              <mod.icon size={16} />
              <span>{mod.label}</span>
              <span className="ml-auto text-[10px] bg-neutral-200 text-neutral-500 px-1.5 py-0.5 rounded-full">
                próximo
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
