import { History, User, Calendar, MapPin, BookOpen, Briefcase } from "lucide-react";

export const metadata = {
  title: "Governador | Antigos Combatentes do Uíge",
};

export default function GovernadorPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Seção do Governador Atual */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-600">
              <User className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Governador da Província do Uíge</h1>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">José Carvalho da Rocha</h2>
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>Data de Nomeação: 16/09/2022</span>
                </div>
              </div>
              <div className="flex justify-center items-start md:items-center">
                <div className="w-40 h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md border-2 border-blue-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/fotos/gov.jpg"
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
                <p className="text-gray-700 text-justify"><span className="font-semibold">Filiação:</span> Carvalho Francisco da Rocha e de Luísa Agostinho Freitas</p>
                <p className="text-gray-700 text-justify"><span className="font-semibold">Data de nascimento:</span> 30 de Março de 1964</p>
                <p className="text-gray-700 text-justify"><span className="font-semibold">Naturalidade:</span> Província de Luanda</p>
              </div>
            </div>

            {/* Formação Académica */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Formação Académica
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• Mestrado em Electrónica e Telecomunicações pela Faculdade de Ciências da Universidade Agostinho Neto</p>
                <p className="text-gray-700 text-justify">• Licenciatura em Física pela Faculdade de Ciências da Universidade Agostinho Neto</p>
              </div>
            </div>

            {/* Formação Profissional */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Formação Profissional
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• 2003 - Formação em Desenvolvimento de Projectos de Ensino à Distância pelo Instituto de Tokyo, Japão</p>
                <p className="text-gray-700 text-justify">• 1995 - Formação em Recursos Humanos e Desenvolvimento pela UIT, Genebra - Suíça</p>
              </div>
            </div>

            {/* Experiência Governativa */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Experiência Governativa</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• De 2020 até à presente data, Governador Provincial do Uíge</p>
                <p className="text-gray-700 text-justify">• 2008/2020 - Ministro das Telecomunicações e Tecnologias de Informação</p>
              </div>
            </div>

            {/* Experiência Profissional */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Experiência Profissional</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• 2006/2008 - Coordenador adjunto da Comissão de Implementação do Instituto Superior para as Tecnologias de Informação e Comunicação (ISUTIC)</p>
                <p className="text-gray-700 text-justify">• 2004/2008 - Coordenador da Comissão de Implementação do Projecto ITELNET</p>
                <p className="text-gray-700 text-justify">• 1993/2008 - Director do Instituto Nacional de Telecomunicações (ITEL)</p>
                <p className="text-gray-700 text-justify">• 1993/2008 - Docente de Electrónica Digital, Histórias das Ideias da Física e Eletromagnetismo</p>
                <p className="text-gray-700 text-justify">• 1991/1992 - Estágio no Centro de Física Nuclear da Universidade de Lisboa. Tema da investigação &quot;Análise da Radiação em Fibras ópticas Cintilantes de Poliestirenio&quot;</p>
                <p className="text-gray-700 text-justify">• 1989 - Monitor no Departamento de Física da Faculdade de Ciências da Universidade Agostinho Neto</p>
                <p className="text-gray-700 text-justify">• 1989 - Professor de Matemática e Física no ITEL e IGCA</p>
                <p className="text-gray-700 text-justify">• 1983/1989 - Professor e Coordenador de Física na Escola Juventude em Luta</p>
                <p className="text-gray-700 text-justify">• 1982 - Professor de Língua Portuguesa na Escola Trabalho em Luta</p>
                <p className="text-gray-700 text-justify">• 1980 - Professor de Matemática na Escola de Enfermagem do Sumbe</p>
              </div>
            </div>

            {/* Outras Referências */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Outras Referências</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• Autor do Livro: Lições de Electromagnetismo</p>
              </div>
            </div>

            {/* Idiomas */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Idiomas</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p className="text-gray-700 text-justify">• Francesa, inglês, kimbundu e kikongo</p>
              </div>
            </div>
          </section>
        </div>

        {/* Seção de Histórico de Governadores */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-600">
              <History className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Histórico de Governadores</h1>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider w-1/3">
                        Período
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Nome
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { period: "1975 – 1976", name: "Hoch MinHistória" },
                      { period: "1976 – 1977", name: "Simão Bráz" },
                      { period: "1977 – 1978", name: "Ambrósio Lukoki" },
                      { period: "1978 – 1979", name: "Massunga Kota" },
                      { period: "1979 – 1980", name: "Lamvo Emmanuel Norman" },
                      { period: "1980 – 1984", name: "Manuel Quarta Punza" },
                      { period: "1984 – 1988", name: "Zeferino Estevão Juliana" },
                      { period: "1988 – 1989", name: "Domingos Mutaleno" },
                      { period: "1989 – 1990", name: "Geremias A. Dumbo" },
                      { period: "1991 – 1995", name: "José Aníbal Lopes Rocha" },
                      { period: "1995 – 1998", name: "Serafim Cananito Alexandre" },
                      { period: "1998 – 2002", name: "Cordeiro Ernesto Nzakundomba" },
                      { period: "2002 – 2004", name: "Lázaro Xixima" },
                      { period: "2004 – 2008", name: "António Bento Cangulo" },
                      { period: "2008 – 2009", name: "Mawete João Baptista" },
                      { period: "2009 – 2017", name: "Paulo Pombolo" },
                      { period: "2017 – 2020", name: "Pinda Simão" },
                      { period: "2020 – 2020", name: "Sérgio Luther Rescova Joaquim" },
                      { period: "2020 – Presente", name: "José Carvalho da Rocha" },
                    ].map((gov, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 font-semibold">{gov.period}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{gov.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
