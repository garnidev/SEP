import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'

const socialLinks = [
  { icon: Facebook,  label: '@SENA',         href: '#' },
  { icon: Twitter,   label: '@SENACOMUNICA', href: '#' },
  { icon: Instagram, label: '@SENACOMUNICA', href: '#' },
  { icon: Youtube,   label: '@SENATV',       href: '#' },
  { icon: Linkedin,  label: 'SENA',          href: '#' },
]

const ministerios = [
  'Presidencia', 'Vicepresidencia', 'MinJusticia',
  'MinDefensa', 'MinInterior', 'MinRelaciones',
  'MinHacienda', 'MinMinas', 'MinComercio',
  'MinEducación', 'MinCultura', 'MinAgricultura',
  'MinAmbiente', 'MinTransporte', 'MinVivienda',
  'MinTrabajo', 'MinSalud', 'Urna de Cristal', 'MinTic',
]

export function PublicFooter() {
  return (
    <footer>
      {/* Sector Trabajo */}
      <div className="bg-white border-t border-neutral-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-cerulean-500 font-bold text-base mb-4 flex items-center gap-2">
            <span className="text-lg">💼</span> Sector Trabajo
          </h3>
          <div className="flex flex-wrap gap-6 items-center">
            {['Trabajo', 'Organizaciones Solidarias', 'Servicio de Empleo', 'SuperSubsidio', 'Colpensiones'].map((org) => (
              <span key={org} className="text-sm text-neutral-600 font-medium border border-neutral-200 px-3 py-1.5 rounded">
                {org}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Gobierno del Cambio */}
      <div className="bg-neutral-100 py-8 px-4">
        <div className="max-w-7xl mx-auto flex gap-8">
          <div className="flex-shrink-0 flex flex-col items-center justify-center gap-1">
            <div className="w-16 h-16 rounded-full bg-cerulean-500 flex items-center justify-center">
              <span className="text-white font-black text-xs text-center leading-tight">GOB</span>
            </div>
            <span className="text-xs font-bold text-cerulean-500 text-center">Gobierno<br/>del Cambio</span>
          </div>
          <div className="grid grid-cols-3 gap-x-8 gap-y-1 flex-1">
            {ministerios.map((m) => (
              <a key={m} href="#" className="text-xs text-cerulean-500 hover:underline py-0.5">
                {m}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer SENA verde */}
      <div className="bg-lime-500 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start justify-between">
          {/* Info SENA */}
          <div className="text-white flex-1">
            <p className="font-bold text-sm mb-1">SERVICIO NACIONAL DE APRENDIZAJE SENA</p>
            <p className="font-semibold text-sm mb-3">DIRECCIÓN GENERAL</p>
            <div className="text-xs space-y-1 text-white/90">
              <p>Calle 57 No. 8 – 69 Bogotá D.C. (Cundinamarca), Colombia</p>
              <p>El SENA brinda atención presencial en las 33 Regionales y 118 Centros de Formación</p>
              <p>Línea de WhatsApp: <span className="font-semibold">3112545028</span></p>
              <p>Bogotá (+57) 601 736 60 60 — Línea gratuita: 018000 910270</p>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-white font-semibold text-sm">Síguenos en redes</p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  className="w-9 h-9 rounded-lg bg-cerulean-500 flex items-center justify-center text-white hover:bg-cerulean-700 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links legales */}
        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-white/30">
          <div className="flex flex-wrap justify-center gap-3 text-xs text-white/80">
            {['Directorio SENA', 'PQRS', 'Chat en línea', 'Denuncias por actos de corrupción',
              'Notificaciones judiciales', 'Mapa del sitio', 'Derechos de autor',
              'Política de datos personales'].map((link) => (
              <a key={link} href="#" className="hover:text-white hover:underline">{link}</a>
            ))}
          </div>
          <p className="text-center text-xs text-white/70 mt-3">
            © Equipo TIC — GGPC - DSNFT - SENA {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Barra GOV.CO inferior — color oficial #015dca */}
      <div className="bg-[#015dca] py-1.5 flex items-center justify-center gap-2">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="8" fill="white" fillOpacity="0.3" />
          <path d="M8 3L10 7H6L8 3Z" fill="white" />
          <rect x="5" y="7" width="6" height="5" rx="1" fill="white" />
        </svg>
        <span className="text-white text-xs font-semibold tracking-wide">GOV.CO</span>
      </div>
    </footer>
  )
}
