import Link from 'next/link'
import { Shield, FileText, ChevronRight } from 'lucide-react'

const sections = [
  {
    number: '1º',
    title: 'Termos e Condições Gerais',
    content: 'É autorizada a reprodução total ou parcial sem fins lucrativos do conteúdo deste sítio, desde que citada a fonte, mantendo-se a integridade das informações. O uso da logo marca da Projecto Portal do Governo e do Brasão da República de Angola é de uso exclusivo do Governo da República de Angola e seus Organismos, sendo vedada a utilização de qualquer natureza por terceiros.'
  },
  {
    number: '2.',
    title: 'Utilização de links para o Portal do Governo, Portal do Cidadão e Portais Ministeriais',
    content: 'É autorizada a inserção de links dos sítios Portal do Governo, Portal do Cidadão e Portais Ministeriais em outros sítios, levando-se em conta as seguintes observações:',
    subsections: [
      '2.1 - o Projecto Portal do Governo da República de Angola não se responsabiliza por alterações promovidas nos links do seu sítio;',
      '2.2 - não é permitido a nenhum domínio utilizar como sua página inicial o acesso directo à página inicial do sítio Portal do Governo, Portal do Cidadão e Portais Ministeriais.'
    ]
  },
  {
    number: '3.',
    title: 'Links a sítios que não sejam do Portal do Governo da República de Angola',
    content: 'O sítio do Portal do Governo, Portal do Cidadão e Portais Ministeriais contém links para outros sítios. O Governo da República de Angola não se responsabiliza pelas práticas de privacidade ou pelo conteúdo desses outros sítios.'
  },
  {
    number: '4.',
    title: 'Conteúdo do Sítio',
    content: 'O Governo da República de Angola não se responsabiliza por eventuais erros, imprecisões ou omissões nos materiais contidos neste sítio ou naqueles disponibilizados através de links de outros sítios, e por quaisquer prejuízos resultantes das informações apresentadas. Em qualquer momento, o Governo da República de Angola se reserva no direito de alterar as informações contidas neste sítio.'
  },
  {
    number: '5.',
    title: 'Utilização dos cookies',
    content: 'A utilização dos cookies é necessária para o processamento de consultas em determinadas bases de dados, evitando a acção de mecanismos de pesquisa automáticos. Para que a consulta seja realizada, o navegador do utilizador deve estar habilitado para gravação dos cookies.'
  },
  {
    number: '6.',
    title: 'Actualização da Política de Segurança e Privacidade',
    content: 'Este documento poderá ser alterado pela equipe gestora do Projecto Portal do Governo da República de Angola a qualquer momento em que julgue conveniente. A data da modificação será registrada na área "Actualizado" exibida na parte superior deste documento.'
  }
]

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-[#0f172a] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-blue-400 text-sm mb-4">
            <Link href="/" className="hover:text-blue-300 transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Termos & Políticas</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Termos &amp; Políticas de Utilização
            </h1>
          </div>
          <p className="text-gray-400 text-sm mt-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
            Última actualização: Sexta-feira, 20 de Junho de 2022
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <p className="text-gray-700 leading-relaxed text-lg">
            O sítio do Portal do Governo de Angola adopta práticas que visam proporcionar ao utilizador 
            um acesso às informações institucionais com privacidade e credibilidade. O presente documento 
            tem como objectivo apresentar as directrizes dessa política.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  {section.number}
                </span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  {section.subsections && (
                    <ul className="mt-4 space-y-3">
                      {section.subsections.map((sub, subIdx) => (
                        <li key={subIdx} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-lg p-4">
                          <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-8 flex items-start gap-4">
          <Shield className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1">Delegação Provincial dos Antigos Combatentes do Uíge</p>
            <p className="text-blue-700 text-sm leading-relaxed">
              Para mais informações ou esclarecimentos sobre esta política, entre em contacto com 
              a nossa equipa através da página de{' '}
              <Link href="/contactos" className="underline font-medium hover:text-blue-900 transition-colors">
                Contactos
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
