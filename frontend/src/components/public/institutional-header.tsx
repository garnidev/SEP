// Header institucional: SENA | SEP | Ministerio de Trabajo + fecha
function SenaLogo() {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* Logo SENA simplificado SVG */}
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="26" fill="#39a900" />
        {/* Figura estilizada persona SENA */}
        <circle cx="26" cy="14" r="5" fill="white" />
        <path d="M14 38 Q14 26 26 26 Q38 26 38 38" fill="white" />
        <line x1="18" y1="30" x2="10" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="34" y1="30" x2="42" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="text-green-500 text-[10px] font-black tracking-widest">SENA</span>
    </div>
  )
}

function TrabajoLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="22" fill="#f1f1f1" />
        <path d="M22 8 L30 20 H14 L22 8Z" fill="#003366" />
        <rect x="14" y="20" width="16" height="12" rx="2" fill="#003366" />
      </svg>
      <span className="text-cerulean-500 text-[10px] font-bold">Trabajo</span>
    </div>
  )
}

function getCurrentDate() {
  return new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function InstitutionalHeader() {
  return (
    <header className="w-full bg-white border-b border-neutral-200 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* SENA */}
        <SenaLogo />

        {/* Separador */}
        <div className="w-px h-14 bg-neutral-200" />

        {/* Título */}
        <div className="flex-1 text-center">
          <h1 className="text-cerulean-500 text-lg font-extrabold leading-tight tracking-wide uppercase">
            Sistema Especializado de
          </h1>
          <h1 className="text-cerulean-500 text-lg font-extrabold leading-tight tracking-wide uppercase">
            Proyectos — SEP
          </h1>
        </div>

        {/* Fecha + Trabajo */}
        <div className="flex flex-col items-end gap-2">
          <span className="text-neutral-500 text-xs">{getCurrentDate()}</span>
          <TrabajoLogo />
        </div>
      </div>
    </header>
  )
}
