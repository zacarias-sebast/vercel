import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Calendar, Tag, ArrowRight, Newspaper } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Notícias | Antigos Combatentes do Uíge',
  description: 'Acompanhe todas as notícias e comunicados da Delegação Provincial dos Antigos Combatentes do Uíge.',
}

const MOCK_NEWS = [
  { id: '1', titulo: 'Campanha de Recadastramento de Antigos Combatentes no Uíge', conteudo: 'A Delegação Provincial dos Antigos Combatentes do Uíge deu início hoje à campanha de recadastramento...', categoria: 'Apoio Social', created_at: new Date().toISOString(), imagem_url: null },
  { id: '2', titulo: 'Apoio médico especializado chega aos veteranos do Uíge', conteudo: 'Uma equipa de médicos especialistas começou hoje a atender gratuitamente os antigos combatentes...', categoria: 'Apoio Social', created_at: new Date(Date.now() - 86400000).toISOString(), imagem_url: null },
  { id: '3', titulo: 'Governo Provincial aprova novos fundos para habitação', conteudo: 'Em reunião realizada esta semana, o Governo Provincial aprovou uma nova linha de financiamento...', categoria: 'Programas', created_at: new Date(Date.now() - 172800000).toISOString(), imagem_url: null },
  { id: '4', titulo: 'Inauguração do novo centro de reabilitação', conteudo: 'Foi inaugurado nesta sexta-feira o novo centro de reabilitação física e psicológica para veteranos...', categoria: 'Eventos', created_at: new Date(Date.now() - 259200000).toISOString(), imagem_url: null },
  { id: '5', titulo: 'Distribuição de material agrícola para cooperativas', conteudo: 'Cooperativas formadas por antigos combatentes receberam tratores e sementes do governo provincial...', categoria: 'Programas', created_at: new Date(Date.now() - 345600000).toISOString(), imagem_url: null },
]

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>
}) {
  const params = await searchParams
  const query = params.query || ''
  const page = parseInt(params.page || '1')
  const ITEMS_PER_PAGE = 9

  const from = (page - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const supabase = await createClient()

  let noticias = MOCK_NEWS
  let totalCount = MOCK_NEWS.length
  let dbError = false

  try {
    let request = supabase
      .from('noticias')
      .select('*', { count: 'exact' })

    if (query) {
      request = request.ilike('titulo', `%${query}%`)
    }

    const { data, error, count } = await request
      .order('created_at', { ascending: false })
      .range(from, to)

    if (!error && data) {
      noticias = data
      totalCount = count || 0
    } else if (error) {
      dbError = true
    }
  } catch {
    dbError = true
  }

  if (dbError || noticias === MOCK_NEWS) {
    let filtered = MOCK_NEWS
    if (query) {
      filtered = filtered.filter(n => n.titulo.toLowerCase().includes(query.toLowerCase()))
    }
    totalCount = filtered.length
    noticias = filtered.slice(from, to + 1)
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0b1120] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Newspaper className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Notícias</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Acompanhe os últimos comunicados e informações da Delegação Provincial dos Antigos Combatentes do Uíge.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Search */}
        <form method="GET" className="mb-10 flex gap-3 max-w-lg">
          <input
            type="text"
            name="query"
            defaultValue={query}
            placeholder="Pesquisar notícias..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Pesquisar
          </button>
        </form>

        {dbError && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm">
            A mostrar dados de demonstração. A ligação à base de dados está indisponível.
          </div>
        )}

        {noticias.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <Newspaper className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Nenhuma notícia encontrada</h3>
            {query && <p className="mt-2">Tente pesquisar por outro termo.</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((noticia) => (
              <Link
                key={noticia.id}
                href={`/noticias/${noticia.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-blue-200 transition-all flex flex-col"
              >
                <div className="h-40 bg-gradient-to-br from-blue-900 to-slate-800 flex items-center justify-center">
                  {noticia.imagem_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={noticia.imagem_url} alt={noticia.titulo} className="w-full h-full object-cover" />
                  ) : (
                    <Newspaper className="w-12 h-12 text-blue-300/40" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      <Tag className="w-3 h-3" />
                      {noticia.categoria}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(noticia.created_at || new Date()), "dd MMM yyyy", { locale: ptBR })}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {noticia.titulo}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-3 flex-1">{noticia.conteudo}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                    Ler mais <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/noticias?page=${p}${query ? `&query=${query}` : ''}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
