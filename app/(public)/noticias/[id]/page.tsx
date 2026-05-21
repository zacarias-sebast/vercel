import { createClient } from '@/lib/supabase/server'
import { Calendar, Tag, ArrowLeft, User } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function NoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  let { data: noticia, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !noticia) {
    // Caso não ache, e se for um dos IDs mockados? Para demonstração sem DB:
    if (id === '1') {
      noticia = {
        id: '1',
        titulo: 'Campanha de Recadastramento de Antigos Combatentes no Uíge',
        conteudo: 'A Delegação Provincial dos Antigos Combatentes do Uíge deu início hoje à campanha de recadastramento de todos os veteranos da pátria na província. O processo visa atualizar os dados para garantir a correta distribuição de pensões e benefícios sociais.\n\nTodos os antigos combatentes devem comparecer à delegação municipal mais próxima munidos de seus documentos de identificação e comprovativos.',
        categoria: 'Apoio Social',
        created_at: new Date().toISOString(),
        imagem_url: null,
      }
    } else {
      notFound()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar para notícias
      </Link>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {noticia.imagem_url ? (
          <div className="h-64 md:h-96 w-full bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={noticia.imagem_url} alt={noticia.titulo} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-32 md:h-48 w-full bg-gradient-to-r from-blue-900 to-slate-800"></div>
        )}
        
        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Tag className="w-4 h-4" />
              {noticia.categoria}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {format(new Date(noticia.created_at || new Date()), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
              <User className="w-4 h-4" />
              Antigos Combatentes do Uíge
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {noticia.titulo}
          </h1>

          <div className="prose prose-blue prose-lg max-w-none text-gray-700 whitespace-pre-line text-justify">
            {noticia.conteudo}
          </div>
        </div>
      </article>
    </div>
  )
}
