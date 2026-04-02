import { Wheat } from 'lucide-react'

export const metadata = {
  title: 'Directorio de panaderías — SEP',
}

export default function PanaderiaPage() {
  return (
    <div className="p-8 flex flex-col gap-8 max-w-[1100px]">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <Wheat size={20} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Directorio de panaderías
            </h1>
            <p className="text-sm text-neutral-600">
              Gestión de establecimientos registrados
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <p className="text-neutral-500 text-sm">
          Módulo en construcción — aquí irá el listado, filtros y gestión de panaderías.
        </p>
      </div>
    </div>
  )
}
