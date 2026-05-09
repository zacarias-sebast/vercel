import Link from 'next/link'
import { MapPin, User, Users, Flag, Cloud, Waves, Building2, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Uíge | Antigos Combatentes do Uíge',
  description: 'Conheça a província do Uíge — sua história, líderes, municípios, símbolos nacionais, clima e rios.',
}

const sections = [
  {
    title: 'Presidente',
    description: 'Perfil do Presidente da República de Angola.',
    href: '/uige/presidente',
    icon: User,
  },
  {
    title: 'Vice-Presidente',
    description: 'Perfil do Vice-Presidente da República de Angola.',
    href: '/uige/vice-presidente',
    icon: User,
  },
  {
    title: 'Histórico dos Governadores',
    description: 'Conheça todos os governadores que lideraram a província do Uíge desde 1975.',
    href: '/uige/governadores',
    icon: Users,
  },
  {
    title: 'Municípios',
    description: 'Informações sobre os municípios que compõem a província do Uíge.',
    href: '/uige/municipios',
    icon: Building2,
  },
  {
    title: 'Símbolos Nacionais',
    description: 'Bandeira, brasão e hino nacional de Angola.',
    href: '/uige/simbolos-nacionais',
    icon: Flag,
  },
  {
    title: 'Clima',
    description: 'Informações sobre o clima e as estações do ano na província do Uíge.',
    href: '/uige/clima',
    icon: Cloud,
  },
  {
    title: 'Rios',
    description: 'Os principais rios que atravessam a província do Uíge.',
    href: '/uige/rios',
    icon: Waves,
  },
]

export default function UigePage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0b1120] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Província do Uíge</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Conheça a história, os líderes, os municípios e os elementos que caracterizam a província do Uíge.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md hover:border-blue-200 transition-all flex flex-col gap-4"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{section.description}</p>
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
