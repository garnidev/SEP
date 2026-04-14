'use client'

import { HabeasDataModal } from '@/components/public/registro/habeas-data-modal'
import { ToastBetowa } from '@/components/ui/toast-betowa'
import api from '@/lib/api'
import { AlertCircle, ArrowLeft, Loader2, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface TipoDoc { id: number; nombre: string; sigla: string }

export default function RegistroUsuarioPage() {
  const router = useRouter()
  const [habeasOpen, setHabeasOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(false)
  const [tiposDoc, setTiposDoc] = useState<TipoDoc[]>([])

  useEffect(() => {
    api.get<TipoDoc[]>('/auth/tipos-documento?para=persona')
      .then((r) => {
        setTiposDoc(r.data)
        if (r.data.length > 0) setForm((prev) => ({ ...prev, tipoDocumentoIdentidadId: r.data[0].id }))
      })
      .catch(() => {})
  }, [])

  const [form, setForm] = useState({
    tipoDocumentoIdentidadId: 0,
    personaIdentificacion: '',
    personaNombres: '',
    personaPrimerApellido: '',
    personaSegundoApellido: '',
    usuarioEmail: '',
    usuarioClave: '',
    habeasData: false,
  })

  function set(field: string, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (
      !form.personaIdentificacion ||
      !form.personaNombres ||
      !form.personaPrimerApellido ||
      !form.usuarioEmail ||
      !form.usuarioClave
    ) {
      setError('Por favor completa todos los campos obligatorios (*).')
      return
    }
    if (!form.habeasData) {
      setError('Debes aceptar los Términos y Condiciones de Habeas Data.')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/registrar-persona', {
        tipoDocumentoIdentidadId: form.tipoDocumentoIdentidadId,
        personaIdentificacion: Number(form.personaIdentificacion),
        personaNombres: form.personaNombres,
        personaPrimerApellido: form.personaPrimerApellido,
        personaSegundoApellido: form.personaSegundoApellido || undefined,
        usuarioEmail: form.usuarioEmail,
        usuarioClave: form.usuarioClave,
        habeasData: true,
      })
      setToast(true)
      setTimeout(() => router.push('/login'), 2500)
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'Error al registrar. Verifique los datos e intente nuevamente.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ToastBetowa
        show={toast}
        onClose={() => setToast(false)}
        tipo="success"
        titulo="¡Registro exitoso!"
        mensaje="Tu cuenta fue creada. Serás redirigido al inicio de sesión."
        duration={5000}
      />
      <HabeasDataModal open={habeasOpen} onClose={() => setHabeasOpen(false)} />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/login" className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-cerulean-500 transition-colors mb-6 w-fit">
          <ArrowLeft size={14} /> Volver al inicio de sesión
        </Link>

        {/* Título sección */}
        <div className="bg-[#00304D] text-white px-6 py-4 rounded-xl flex items-center gap-3 mb-8 shadow-md">
          <UserPlus size={22} />
          <h1 className="font-semibold text-lg">Registrarse como Usuario</h1>
          <span className="text-white/60 text-sm ml-1">— Persona natural</span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 flex flex-col gap-5">

          {/* Tipo documento */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-700">Tipo de Identificación *</label>
            <select
              value={form.tipoDocumentoIdentidadId}
              onChange={(e) => set('tipoDocumentoIdentidadId', Number(e.target.value))}
              className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cerulean-500 bg-white"
            >
              {tiposDoc.length === 0 && <option value={0}>Cargando...</option>}
              {tiposDoc.map((t) => (
                <option key={t.id} value={t.id}>{t.nombre} {t.sigla ? `(${t.sigla})` : ''}</option>
              ))}
            </select>
          </div>

          {/* Identificación */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-700">Número de Identificación *</label>
            <input
              type="number"
              value={form.personaIdentificacion}
              onChange={(e) => set('personaIdentificacion', e.target.value)}
              placeholder="1234567890"
              className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cerulean-500"
            />
          </div>

          {/* Nombres */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-700">Nombres *</label>
            <input
              type="text"
              value={form.personaNombres}
              onChange={(e) => set('personaNombres', e.target.value)}
              placeholder="Juan Carlos"
              className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cerulean-500"
            />
          </div>

          {/* Apellidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-700">Primer Apellido *</label>
              <input
                type="text"
                value={form.personaPrimerApellido}
                onChange={(e) => set('personaPrimerApellido', e.target.value)}
                placeholder="Gómez"
                className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cerulean-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-700">Segundo Apellido</label>
              <input
                type="text"
                value={form.personaSegundoApellido}
                onChange={(e) => set('personaSegundoApellido', e.target.value)}
                placeholder="Martínez (opcional)"
                className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cerulean-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-700">Correo Electrónico *</label>
            <input
              type="email"
              value={form.usuarioEmail}
              onChange={(e) => set('usuarioEmail', e.target.value)}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cerulean-500"
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-700">Contraseña *</label>
            <input
              type="password"
              value={form.usuarioClave}
              onChange={(e) => set('usuarioClave', e.target.value)}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cerulean-500"
            />
          </div>

          {/* Habeas Data */}
          <div className="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-xl p-4">
            <input
              id="habeas"
              type="checkbox"
              checked={form.habeasData}
              onChange={(e) => set('habeasData', e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-lime-500 cursor-pointer flex-shrink-0"
            />
            <label htmlFor="habeas" className="text-xs text-neutral-600 cursor-pointer">
              Acepto los Términos y Condiciones y autorizo el tratamiento de mis datos personales
              conforme a la Ley 1581 de 2012.{' '}
              <button
                type="button"
                onClick={() => setHabeasOpen(true)}
                className="text-cerulean-500 underline hover:text-cerulean-700 font-semibold"
              >
                Ver Habeas Data
              </button>
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              href="/login"
              className="flex-1 text-center px-4 py-2.5 border border-neutral-300 text-neutral-600 font-semibold text-sm rounded-xl hover:bg-neutral-50 transition-colors"
            >
              Volver
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-lime-500 hover:bg-lime-600 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
