'use client'

import { useActionState, useEffect, useState } from 'react'
import { editarNoticia } from '@/app/actions/noticia'
import { AlertCircle, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const initialState = { error: '' }

const CATEGORIAS = ['Apoio Social', 'Eventos', 'Programas', 'Comunicados']

export default function EditarNoticiaPage() {
  const params = useParams()
  const id = params.id as string
  const [state, formAction, isPending] = useActionState(editarNoticia, initialState)
  const [noticia, setNoticia] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNoticia() {
      const res = await fetch(`/api/noticias/${id}`)
      if (res.ok) {
        const data = await res.json()
        setNoticia(data)
      }
      setLoading(false)
    }
    fetchNoticia()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!noticia) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-gray-500 text-lg">Notícia não encontrada.</p>
        <Link href="/admin" className="mt-4 inline-block text-blue-600 hover:underline">Voltar ao Dashboard</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Editar Notícia</h1>
        <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form action={formAction} className="space-y-6">
          {/* Hidden field with the noticia ID */}
          <input type="hidden" name="id" value={id} />

          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">Título da Notícia</label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              required
              disabled={isPending}
              defaultValue={noticia.titulo}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                id="categoria"
                name="categoria"
                required
                disabled={isPending}
                defaultValue={noticia.categoria}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white text-gray-900"
              >
                <option value="">Selecione...</option>
                {CATEGORIAS.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="imagem" className="block text-sm font-medium text-gray-700 mb-1">
                Nova Imagem de Capa <span className="text-gray-400 font-normal">(deixe vazio para manter a atual)</span>
              </label>
              {noticia.imagem_url && (
                <img src={noticia.imagem_url} alt="Imagem atual" className="w-full h-24 object-cover rounded-lg mb-2 border border-gray-200" />
              )}
              <input
                id="imagem"
                name="imagem"
                type="file"
                accept="image/*"
                disabled={isPending}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
            <textarea
              id="conteudo"
              name="conteudo"
              rows={12}
              required
              disabled={isPending}
              defaultValue={noticia.conteudo}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {state?.error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{state.error}</p>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? 'Salvando...' : (
                <>
                  <Save className="w-4 h-4" /> Guardar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
