import { createClient } from '@/lib/supabase/server'
import { HeroCarousel } from '@/components/HeroCarousel'
import { MainSectionClient } from '@/components/MainSectionClient'
import { Footer } from '@/components/Footer'

// Mock data in case DB is not set up
const MOCK_NEWS = [
  {
    id: '1',
    titulo: 'Campanha de Recadastramento de Antigos Combatentes no Uíge',
    conteudo: 'A Delegação Provincial dos Antigos Combatentes do Uíge deu início hoje à campanha de recadastramento...',
    categoria: 'Apoio Social',
    created_at: new Date().toISOString(),
    imagem_url: null,
  },
  {
    id: '2',
    titulo: 'Apoio médico especializado chega aos veteranos do Uíge',
    conteudo: 'Uma equipa de médicos especialistas começou hoje a atender gratuitamente os antigos combatentes na capital da província...',
    categoria: 'Apoio Social',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    imagem_url: null,
  },
  {
    id: '3',
    titulo: 'Governo Provincial aprova novos fundos para habitação',
    conteudo: 'Em reunião realizada esta semana, o Governo Provincial aprovou uma nova linha de financiamento para a construção de moradias para antigos combatentes...',
    categoria: 'Programas',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    imagem_url: null,
  },
  {
    id: '4',
    titulo: 'Inauguração do novo centro de reabilitação',
    conteudo: 'Foi inaugurado nesta sexta-feira o novo centro de reabilitação física e psicológica para veteranos de guerra...',
    categoria: 'Eventos',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    imagem_url: null,
  },
  {
    id: '5',
    titulo: 'Distribuição de material agrícola para cooperativas',
    conteudo: 'Cooperativas formadas por antigos combatentes receberam tratores e sementes do governo provincial...',
    categoria: 'Programas',
    created_at: new Date(Date.now() - 345600000).toISOString(),
    imagem_url: null,
  }
]

export const dynamic = 'force-dynamic'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>
}) {
  const params = await searchParams
  const query = params.query || ''
  const page = parseInt(params.page || '1')
  const ITEMS_PER_PAGE = 4
  
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

    // Apply pagination and ordering
    const { data, error, count } = await request
      .order('created_at', { ascending: false })
      .range(from, to)

    if (!error && data) {
      noticias = data
      totalCount = count || 0
    } else if (error) {
      dbError = true
      console.error("Supabase Error - code:", error.code, "| message:", error.message, "| details:", error.details, "| hint:", error.hint)
    }
  } catch (err) {
    dbError = true
    console.error("Failed to fetch from DB:", err)
  }

  // If using mock data, handle pagination in memory
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
    <div>
      <HeroCarousel defaultQuery={query} />
      <MainSectionClient 
        noticias={noticias} 
        dbError={dbError} 
        query={query} 
        currentPage={page}
        totalPages={totalPages}
      />
      <Footer />
    </div>
  )
}
