import Link from 'next/link'
import { BookOpen, Scale, ArrowRight, Info } from 'lucide-react'

export const metadata = {
  title: 'Informações | Antigos Combatentes do Uíge',
  description: 'Aceda à legislação e às informações gerais publicadas pela Delegação Provincial dos Antigos Combatentes do Uíge.',
}

const sections = [
  {
    title: 'Legislação',
    description: 'Consulte os diplomas legais, decretos e documentos normativos relacionados com os antigos combatentes.',
    href: '/informacoes/legislacao',
    icon: Scale,
  },
  {
    title: 'Informação Geral e Livros',
    description: 'Consulte as publicações, livros, manuais e outras informações relevantes para os antigos combatentes.',
    href: '/informacoes/gerais',
    icon: BookOpen,
  },
]

export default function InformacoesPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0b1120] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Info className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Informações</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto text-justify">
            Aceda aos documentos legais e publicações da Delegação Provincial dos Antigos Combatentes do Uíge.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-10 hover:shadow-md hover:border-blue-200 transition-all flex flex-col gap-5"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed text-justify">{section.description}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                  Aceder <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
