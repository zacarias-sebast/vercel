'use client'

import { useTransition } from 'react'
import { deletarNoticia } from '@/app/actions/noticia'
import { Trash2 } from 'lucide-react'

export function DeleteButton({ id, titulo }: { id: string; titulo: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    const confirmed = window.confirm(
      `Tem a certeza que deseja eliminar a notícia:\n\n"${titulo}"\n\nEsta acção não pode ser desfeita.`
    )
    if (!confirmed) return

    const formData = new FormData()
    formData.append('id', id)
    startTransition(() => deletarNoticia(formData))
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Eliminar notícia"
      className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {isPending ? (
        <span className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin block" />
      ) : (
        <Trash2 className="w-5 h-5" />
      )}
    </button>
  )
}
