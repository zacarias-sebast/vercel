import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Shield } from 'lucide-react'

// Mapeamento de slugs amigáveis do sistema para a rota
const VALID_SLUGS = [
  'perfil-titular',
  'mensagem-titular',
  'titulares-entidade',
  'atribuicoes',
  'estrutura-organica',
  'organograma'
];

export default async function InstitucionalPublicPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  
  if (!VALID_SLUGS.includes(resolvedParams.slug)) {
    notFound();
  }

  const supabase = await createClient()
  
  const { data: pagina } = await supabase
    .from('paginas_institucionais')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {pagina?.titulo || 'Informação Institucional'}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {pagina?.imagem_url && (
            <div className="w-full h-[400px] relative">
              <img 
                src={pagina.imagem_url} 
                alt={pagina.titulo} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            {pagina?.conteudo ? (
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: pagina.conteudo.replace(/\n/g, '<br />') }}
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Conteúdo ainda não disponível. A administração está atualizando esta página.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
