'use client'

import { useActionState } from 'react'
import { criarNoticia } from '@/app/actions/noticia'
import { AlertCircle, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const initialState = {
  error: '',
}

export default function NovaNoticiaPage() {
  const [state, formAction, isPending] = useActionState(criarNoticia, initialState)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nova Notícia</h1>
        <Link href="/admin" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">Título da Notícia</label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              required
              disabled={isPending}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 placeholder:text-gray-500"
              placeholder="Ex: Novos equipamentos entregues ao Exército"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white text-gray-900"
              >
                <option value="">Selecione...</option>
                <option value="Apoio Social">Apoio Social</option>
                <option value="Eventos">Eventos</option>
                <option value="Programas">Programas</option>
                <option value="Comunicados">Comunicados</option>
              </select>
            </div>
            <div>
              <label htmlFor="imagem" className="block text-sm font-medium text-gray-700 mb-1">Imagem de Capa (Opcional)</label>
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
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y text-gray-900 placeholder:text-gray-400"
              placeholder="Escreva o conteúdo da notícia aqui..."
            ></textarea>
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
                  <Save className="w-4 h-4" /> Publicar Notícia
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
