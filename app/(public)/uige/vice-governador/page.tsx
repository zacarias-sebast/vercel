import { Users, MapPin, BookOpen, Briefcase, Award } from "lucide-react";

export const metadata = {
  title: "Vice-Governadora | Antigos Combatentes do Uíge",
};

export default function ViceGovernadorPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-600">
              <Users className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Vice-Governadora da Província do Uíge</h1>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Esperança de Jesus</h2>
              </div>
              <div className="flex justify-center items-start md:items-center">
                <div className="w-40 h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md border-2 border-pink-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/fotos/vice.jpg"
                    alt="Foto do Presidente João Lourenço"
                    className="w-full h-full object-cover bg-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Dados Pessoais */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Dados Pessoais
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify"><span className="font-semibold">Filiação:</span> Horácio Domingos e de Antónia Fernandes Domingos</p>
                <p className="text-gray-700 text-justify"><span className="font-semibold">Data de nascimento:</span> 10 de Outubro de 1975</p>
                <p className="text-gray-700 text-justify"><span className="font-semibold">Naturalidade:</span> Província do Uíge</p>
              </div>
            </div>

            {/* Formação Académica */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Formação Académica
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• 2011 - Licenciatura em Psicologia pelo Instituto Superior de Ciências da Educação, ISCED do Uíge</p>
              </div>
            </div>

            {/* Formação Profissional */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Formação Profissional
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• 2019 - Curso de Liderança e Gestão de Comunicação para a Mudança de Comportamento</p>
                <p className="text-gray-700 text-justify">• 2017 - Jornalismo e as Eleições e Descentralização Administrativa</p>
                <p className="text-gray-700 text-justify">• 2015 - Seminário sobre Elaboração do Plano Provincial de Preparação, Contingência, Resposta e Recuperação de Calamidades e Desastres</p>
                <p className="text-gray-700 text-justify">• 2010 - Seminário de Capacitação sobre Técnicas de Prevenção, Gestão e Resolução de Conflitos</p>
                <p className="text-gray-700 text-justify">• 2006 - Aperfeiçoamento e Dinamização de Competência de Jornalistas</p>
                <p className="text-gray-700 text-justify">• 2005 - Formação sobre Direitos Humanos em Angola e na Região de SADC</p>
                <p className="text-gray-700 text-justify">• Seminário sobre a Igreja e a Comunidade Social</p>
                <p className="text-gray-700 text-justify">• Programa de oficinas por um Jornalismo melhor</p>
              </div>
            </div>

            {/* Experiência Profissional */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Experiência Profissional</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• 2021/2022 - Administradora Municipal do Uíge</p>
                <p className="text-gray-700 text-justify">• 2016/2021 - Directora do Gabinete de Comunicação Social do Governo Provincial do Uíge</p>
                <p className="text-gray-700 text-justify">• 2011/2016 - Administradora Municipal Adjunta do Uíge</p>
                <p className="text-gray-700 text-justify">• 1996/2011 - Locutora da Rádio Uíge</p>
              </div>
            </div>

            {/* Outras Referências */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Outras Referências
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• 2020/2021 - Secretária do DAF do Comité Provincial do MPLA</p>
                <p className="text-gray-700 text-justify">• 2019 - Formação em Política-Ideológica para os Membros do Comité Central</p>
                <p className="text-gray-700 text-justify">• Condecoração com a Medalha Hoji-Ya-Henda, no âmbito dos 50 anos do MPLA</p>
                <p className="text-gray-700 text-justify">• De 2012 à presente data, Deputada Suplente a Assembleia Nacional pelo circulo Eleitoral do Uíge</p>
                <p className="text-gray-700 text-justify">• De 2016 a data presente, Membro do Comité Provincial da OMA</p>
                <p className="text-gray-700 text-justify">• De 2016 a data presente, Membro do Comité Provincial do Partido</p>
                <p className="text-gray-700 text-justify">• De 2019 até a data presente, Membro do CC do MPLA</p>
                <p className="text-gray-700 text-justify">• Actualmente é 1ª Secretária do Comité Municipal do Partido no Uíge</p>
                <p className="text-gray-700 text-justify">• De 2008 a 2012 — Segunda Secretária do Comite dos Jornalistas</p>
                <p className="text-gray-700 text-justify">• De 2002 a 2019 - Membro do Comité Nacional e Provincial da JMPLA</p>
                <p className="text-gray-700 text-justify">• 2000 - Ingresso como Militante do MPLA no ano de 2000</p>
              </div>
            </div>

            {/* Idiomas */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Idiomas</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• Francês, lingala e kikongo</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
