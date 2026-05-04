import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface NewsCardProps {
  id: string
  title: string
  category: string
  date: string
  imageUrl: string | null
  excerpt: string
}

export function NewsCard({ id, title, category, date, imageUrl, excerpt }: NewsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      {imageUrl ? (
        <div className="h-48 w-full bg-gray-200 overflow-hidden relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
        </div>
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-blue-900 to-slate-800 flex items-center justify-center relative">
          <span className="text-white opacity-20 font-bold text-4xl">DEFESA</span>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wider">
            <Tag className="w-3 h-3" />
            {category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {format(new Date(date), "dd 'de' MMM, yyyy", { locale: ptBR })}
          </span>
        </div>
        <Link href={`/noticias/${id}`} className="group block mb-3">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {excerpt}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link href={`/noticias/${id}`} className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors inline-flex items-center gap-1">
            Ler notícia completa <span className="text-lg leading-none">&rsaquo;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
