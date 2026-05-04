import { createClient } from '@/lib/supabase/server'
import { FileText, Users, Eye, Edit } from 'lucide-react'
import { DeleteButton } from '@/components/DeleteButton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: noticiasData } = await supabase
    .from('noticias')
    .select('*')

  const noticias = noticiasData ? [...noticiasData].sort((a, b) => {
    const timeA = new Date(a.created_at || a.data || 0).getTime()
    const timeB = new Date(b.created_at || b.data || 0).getTime()
    return timeB - timeA
  }) : []


  const { count: noticiasCount } = await supabase
    .from('noticias')
    .select('*', { count: 'exact', head: true })

  const { count: subscritoresCount } = await supabase
    .from('subscritores')
    .select('*', { count: 'exact', head: true })

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total de Notícias</p>
            <p className="text-2xl font-bold text-gray-900">{noticiasCount || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Subscritores</p>
            <p className="text-2xl font-bold text-gray-900">{subscritoresCount || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Notícias Recentes</h2>
          <Link href="/admin/nova-noticia" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Adicionar Nova
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Título</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {noticias && noticias.length > 0 ? (
                noticias.map((noticia) => (
                  <tr key={noticia.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium max-w-xs truncate">{noticia.titulo}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{noticia.categoria}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(noticia.created_at || noticia.data || Date.now()).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        {/* Ver notícia */}
                        <Link
                          href={`/noticias/${noticia.id}`}
                          target="_blank"
                          title="Ver notícia"
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>

                        {/* Editar notícia */}
                        <Link
                          href={`/admin/editar-noticia/${noticia.id}`}
                          title="Editar notícia"
                          className="p-2 text-gray-500 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>

                        {/* Eliminar notícia */}
                        <DeleteButton id={noticia.id} titulo={noticia.titulo} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Nenhuma notícia encontrada. Comece adicionando uma nova notícia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
