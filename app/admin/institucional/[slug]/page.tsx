import { createClient } from '@/lib/supabase/server'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { atualizarInstitucional } from '@/app/actions/institucional'

const PAGES = [
  { slug: 'perfil-titular', titulo: 'Perfil do titular dos AC/Uige', hasImage: true },
  { slug: 'mensagem-titular', titulo: 'Mensagem do Titular', hasImage: false },
  { slug: 'titulares-entidade', titulo: 'Titulares da Entidade', hasImage: false },
  { slug: 'atribuicoes', titulo: 'Atribuições', hasImage: false },
  { slug: 'estrutura-organica', titulo: 'Estrutura Orgânica', hasImage: true },
  { slug: 'organograma', titulo: 'Organograma', hasImage: true }
]

export default async function EditarInstitucionalPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const pageInfo = PAGES.find(p => p.slug === resolvedParams.slug);

  if (!pageInfo) {
    return <div>Página não encontrada</div>
  }

  const supabase = await createClient()
  
  // Buscar dados existentes
  const { data: pagina } = await supabase
    .from('paginas_institucionais')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar {pageInfo.titulo}</h1>
          <p className="text-gray-500 mt-1">Atualize o conteúdo que será exibido publicamente.</p>
        </div>
        <Link href="/admin/institucional" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form action={atualizarInstitucional} className="space-y-6">
          <input type="hidden" name="slug" value={resolvedParams.slug} />
          
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">Título da Página</label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              required
              defaultValue={pagina?.titulo || pageInfo.titulo}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {pageInfo.hasImage && (
            <div>
              <label htmlFor="imagem" className="block text-sm font-medium text-gray-700 mb-1">
                {pagina?.imagem_url ? 'Alterar Imagem Atual' : 'Adicionar Imagem'}
              </label>
              
              {pagina?.imagem_url && (
                <div className="mb-4 relative h-40 w-40 rounded-lg overflow-hidden border border-gray-200">
                  <img src={pagina.imagem_url} alt="Imagem atual" className="object-cover w-full h-full" />
                </div>
              )}
              
              <input
                id="imagem"
                name="imagem"
                type="file"
                accept="image/*"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-2">Formatos aceitos: JPG, PNG, WEBP. Tamanho máximo: 5MB.</p>
            </div>
          )}

          <div>
            <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
            <textarea
              id="conteudo"
              name="conteudo"
              rows={15}
              required
              defaultValue={pagina?.conteudo || ''}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
              placeholder="Escreva o conteúdo aqui..."
            ></textarea>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" /> Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
