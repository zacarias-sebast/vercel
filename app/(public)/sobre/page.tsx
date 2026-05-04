import { Shield, Target, Users, Heart, Award, FileText, CheckCircle, Handshake, Info } from 'lucide-react'

export default function SobrePage() {
  return (
    <div className="bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#0b1120] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nós</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A Delegação Provincial dos Antigos Combatentes do Uíge é um órgão público que assegura a implementação de políticas sociais, assistência e integração dos antigos combatentes na sociedade.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Bem-vindo */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">Bem-vindo</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            A Delegação Provincial dos Antigos Combatentes do Uíge tem como missão honrar, valorizar e apoiar todos os cidadãos que contribuíram para a luta de libertação nacional e defesa da pátria. Trabalhamos diariamente para garantir dignidade, reconhecimento e melhores condições de vida aos antigos combatentes e veteranos da pátria.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Mission & Vision */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Missão</h2>
              </div>
              <p className="text-gray-700 text-lg">
                Promover o bem-estar social, económico e moral dos antigos combatentes.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
              <div className="flex items-center gap-4 mb-4">
                <Info className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Visão</h2>
              </div>
              <p className="text-gray-700 text-lg">
                Ser uma instituição de referência na valorização e apoio aos veteranos da pátria.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">Valores</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <CheckCircle className="w-6 h-6 text-green-500" /> Respeito
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <CheckCircle className="w-6 h-6 text-green-500" /> Patriotismo
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <CheckCircle className="w-6 h-6 text-green-500" /> Transparência
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <CheckCircle className="w-6 h-6 text-green-500" /> Solidariedade
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <CheckCircle className="w-6 h-6 text-green-500" /> Compromisso
              </li>
            </ul>
          </div>
        </div>

        {/* Services & Recruitment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Services */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">Serviços</h2>
            <p className="text-gray-700 mb-6">Oferecemos diversos serviços para apoiar os antigos combatentes e seus familiares:</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                <span className="text-gray-700">Emissão de documentos e certificados</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                <span className="text-gray-700">Apoio social e assistência médica</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                <span className="text-gray-700">Orientação sobre pensões e subsídios</span>
              </li>
              <li className="flex items-start gap-3">
                <Handshake className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                <span className="text-gray-700">Reintegração social e profissional</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                <span className="text-gray-700">Atendimento e acompanhamento personalizado</span>
              </li>
            </ul>
          </div>

          {/* Recruitment */}
          <div className="bg-[#0b1120] text-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-400 pl-4">Recrutamento / Cadastro</h2>
            <p className="text-gray-300 mb-6">Se você é antigo combatente ou familiar, faça o seu cadastro para acesso aos serviços disponíveis.</p>
            <h3 className="font-semibold text-lg mb-4 text-blue-400">Requisitos:</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div> Documento de identificação
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div> Comprovativo de participação na luta
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div> Dados pessoais atualizados
              </li>
            </ul>
          </div>
        </div>

        {/* Final Message */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 italic">
            “Valorizar o passado é construir um futuro mais digno para todos.”
          </h2>
        </div>
        
      </div>
    </div>
  )
}
