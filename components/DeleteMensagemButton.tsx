'use client'

import { useTransition } from 'react'
import { eliminarMensagem } from '@/app/actions/mensagens'
import { Trash2 } from 'lucide-react'

export function DeleteMensagemButton({ id, nome }: { id: string; nome: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    const confirmed = window.confirm(
      `Tem a certeza que deseja eliminar a mensagem de:\n\n"${nome}"\n\nEsta acção não pode ser desfeita.`
    )
    if (!confirmed) return

    const formData = new FormData()
    formData.append('id', id)
    startTransition(() => eliminarMensagem(formData))
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Eliminar mensagem"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin block" />
      ) : (
        <Trash2 className="w-3.5 h-3.5" />
      )}
      {isPending ? 'A eliminar...' : 'Eliminar'}
    </button>
  )
}
