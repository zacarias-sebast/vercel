'use client'

import { useActionState, useState } from 'react'
import { saveViceGovernador } from '@/app/actions/governador'
import type { ActionState } from '@/app/types/actions'
import { AlertCircle, CheckCircle, Edit, Users, Upload } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const initialState: ActionState = { error: '', success: '' }

export default function EditarViceGovernadorPage() {
  const [state, formAction, isPending] = useActionState(saveViceGovernador, initialState)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin" className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block">
          ← Voltar ao Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <Edit className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Editar Vice-Governadora</h1>
        </div>
        <p className="text-gray-600 mt-2">Atualize os dados da Vice-Governadora Provincial do Uíge</p>
      </div>

      {/* Mensagens de Feedback */}
      {state?.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 text-sm">{state.error}</p>
        </div>
      )}

      {state?.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-green-800 text-sm">{state.success}</p>
        </div>
      )}

      <form action={formAction} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-8">
        {/* Foto */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-pink-600" />
            Fotografia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload de Fotografia
              </label>
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isPending}
                  className="w-full px-4 py-2 bg-white text-gray-900 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">Máx 5MB • JPEG, PNG</p>
              </div>
            </div>

            {previewUrl && (
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Pré-visualização</p>
                <div className="relative w-40 h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informação Básica */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-pink-600" />
            Informação Básica
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Ex: Esperança de Jesus"
                disabled={isPending}
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nomeação *
              </label>
              <input
                type="date"
                name="data_nomeacao"
                disabled={isPending}
                required
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Dados Pessoais */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Dados Pessoais</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filiação
            </label>
            <input
              type="text"
              name="filiacao"
              placeholder="Ex: Horácio Domingos e de Antónia Fernandes Domingos"
              disabled={isPending}
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento
              </label>
              <input
                type="date"
                name="data_nascimento"
                disabled={isPending}
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Naturalidade
              </label>
              <input
                type="text"
                name="naturalidade"
                placeholder="Ex: Província do Uíge"
                disabled={isPending}
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Formação */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Formação</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formação Académica
            </label>
            <textarea
              name="formacao_academica"
              placeholder="Descreva a formação académica, um item por linha..."
              rows={4}
              disabled={isPending}
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formação Profissional
            </label>
            <textarea
              name="formacao_profissional"
              placeholder="Descreva a formação profissional, um item por linha..."
              rows={4}
              disabled={isPending}
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Experiência */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Experiência</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experiência Governativa
            </label>
            <textarea
              name="experiencia_governativa"
              placeholder="Descreva a experiência governativa, um item por linha..."
              rows={4}
              disabled={isPending}
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experiência Profissional
            </label>
            <textarea
              name="experiencia_profissional"
              placeholder="Descreva a experiência profissional, um item por linha..."
              rows={6}
              disabled={isPending}
              className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {isPending ? 'Salvando...' : 'Guardar Alterações'}
          </button>
          <Link
            href="/admin"
            className="flex-1 px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 font-medium text-center transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
