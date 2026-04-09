// Barra superior institucional GOV.CO — obligatoria en sistemas del Estado colombiano
// Color oficial: #3465CC
export function GovBar() {
  return (
    <div className="w-full bg-[#3465CC] py-1.5 px-4 flex items-center justify-center">
      <div className="max-w-7xl w-full flex items-center gap-2">
        {/* Escudo GOV.CO */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
          <circle cx="8" cy="8" r="8" fill="white" fillOpacity="0.3" />
          <path d="M8 3L10 7H6L8 3Z" fill="white" />
          <rect x="5" y="7" width="6" height="5" rx="1" fill="white" />
        </svg>
        <span className="text-white text-xs font-semibold tracking-wide">GOV.CO</span>
      </div>
    </div>
  )
}
