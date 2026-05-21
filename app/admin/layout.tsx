import Link from 'next/link'
import { Shield, LogOut, LayoutDashboard, FileText, MessageSquare } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      redirect('/admin/login')
    }

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {/* Sidebar */}
        {user && (
          <aside className="w-full md:w-64 bg-[#0b1120] text-white flex-shrink-0 flex flex-col">
          <div className="p-6 border-b border-gray-800">
            <Link href="/" className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="font-bold text-lg tracking-tight">Painel Admin</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link href="/admin/nova-noticia" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
              <FileText className="w-5 h-5" />
              Nova Notícia
            </Link>
            <Link href="/admin/novo-documento" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
              <FileText className="w-5 h-5" />
              Novo Documento
            </Link>
            <div className="pt-4 mt-2 border-t border-gray-800">
              <span className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Conteúdo</span>
              <Link href="/admin/institucional" className="flex items-center gap-3 px-4 py-3 mt-2 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                <FileText className="w-5 h-5" />
                Páginas Institucionais
              </Link>
              <Link href="/admin/mensagens" className="flex items-center gap-3 px-4 py-3 mt-1 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                <MessageSquare className="w-5 h-5" />
                Mensagens
              </Link>
              <div className="pt-4 mt-2 border-t border-gray-800">
                <span className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Autoridades Locais</span>
                <Link href="/admin/institucional" className="flex items-center gap-3 px-4 py-3 mt-2 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                  <FileText className="w-5 h-5" />
                  Governador do Uíge
                </Link>
                <Link href="/admin/institucional" className="flex items-center gap-3 px-4 py-3 mt-1 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                  <FileText className="w-5 h-5" />
                  Vice-Governador
                </Link>
              </div>
            </div>
          </nav>
          <div className="p-4 border-t border-gray-800">
            <form action="/auth/signout" method="post">
              <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-white/10 hover:text-red-300 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </form>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {children}
      </main>
    </div>
    )
  } catch (error: any) {
    // Redirect to login if there's any auth error
    redirect('/admin/login')
  }
}
