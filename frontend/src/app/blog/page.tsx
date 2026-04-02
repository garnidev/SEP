import { Newspaper } from 'lucide-react'

export const metadata = {
  title: 'Gestor del blog — SEP',
}

export default function BlogPage() {
  return (
    <div className="p-8 flex flex-col gap-8 max-w-[1100px]">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purpura-50 flex items-center justify-center">
            <Newspaper size={20} className="text-purpura-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Gestor del blog
            </h1>
            <p className="text-sm text-neutral-600">
              Publicaciones y contenido editorial
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <p className="text-neutral-500 text-sm">
          Módulo en construcción — aquí irá el listado de artículos, editor y publicación.
        </p>
      </div>
    </div>
  )
}
