import Link from 'next/link'
import { Edit, Image as ImageIcon, AlignLeft } from 'lucide-react'

const PAGES = [
  { slug: 'perfil-titular', titulo: 'Perfil do titular dos AC/Uige', hasImage: true },
  { slug: 'mensagem-titular', titulo: 'Mensagem do Titular', hasImage: false },
  { slug: 'titulares-entidade', titulo: 'Titulares da Entidade', hasImage: false },
  { slug: 'atribuicoes', titulo: 'Atribuições', hasImage: false },
  { slug: 'estrutura-organica', titulo: 'Estrutura Orgânica', hasImage: true },
  { slug: 'organograma', titulo: 'Organograma', hasImage: true }
]

export default function InstitucionalPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Páginas Institucionais</h1>
        <p className="text-gray-500 mt-2">Gerencie o conteúdo das páginas do Ministério</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PAGES.map((page) => (
          <div key={page.slug} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{page.titulo}</h3>
            
            <div className="flex gap-3 text-gray-400 text-sm mb-6">
              <span className="flex items-center gap-1">
                <AlignLeft className="w-4 h-4" /> Texto
              </span>
              {page.hasImage && (
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" /> Imagem
                </span>
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50">
              <Link 
                href={`/admin/institucional/${page.slug}`}
                className="flex items-center justify-center gap-2 w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded-lg transition-colors font-medium text-sm"
              >
                <Edit className="w-4 h-4" /> Editar Conteúdo
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
