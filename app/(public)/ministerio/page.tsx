import Link from 'next/link'
import { Shield, User, MessageSquare, Users, BookOpen, Building2, GitBranch, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Ministério | Antigos Combatentes do Uíge',
  description: 'Informações institucionais da Delegação Provincial dos Antigos Combatentes do Uíge.',
}

const pages = [
  {
    title: 'Perfil do Titular',
    description: 'Conheça o perfil e a biografia do titular da delegação provincial.',
    href: '/ministerio/perfil-titular',
    icon: User,
  },
  {
    title: 'Mensagem do Titular',
    description: 'Leia a mensagem oficial do titular da delegação provincial.',
    href: '/ministerio/mensagem-titular',
    icon: MessageSquare,
  },
  {
    title: 'Titulares da Entidade',
    description: 'Histórico dos titulares que lideraram a delegação ao longo dos anos.',
    href: '/ministerio/titulares-entidade',
    icon: Users,
  },
  {
    title: 'Atribuições',
    description: 'Conheça as atribuições e competências da delegação provincial.',
    href: '/ministerio/atribuicoes',
    icon: BookOpen,
  },
  {
    title: 'Estrutura Orgânica',
    description: 'Organização interna e estrutura da delegação provincial.',
    href: '/ministerio/estrutura-organica',
    icon: Building2,
  },
  {
    title: 'Organograma',
    description: 'Visualize o organograma completo da delegação provincial.',
    href: '/ministerio/organograma',
    icon: GitBranch,
  },
]

export default function MinisterioPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0b1120] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Informação Institucional</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Conheça a estrutura, missão e os responsáveis da Delegação Provincial dos Antigos Combatentes do Uíge.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => {
            const Icon = page.icon
            return (
              <Link
                key={page.href}
                href={page.href}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md hover:border-blue-200 transition-all flex flex-col gap-4"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {page.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{page.description}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                  Ver mais <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
