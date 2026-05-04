import { Shield } from "lucide-react";

export const metadata = {
  title: "Vice-Presidente da República | Antigos Combatentes do Uíge",
};

export default function VicePresidentePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-[#0b1120] relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-gray-100 rounded-xl shadow-md border-4 border-white flex items-center justify-center overflow-hidden">

                <img
                  src="/fotos/luisa.jpg"
                  alt="Foto da Vice-Presidente Esperança Costa"
                  className="w-full h-full object-cover bg-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">Vice-Presidente da República de Angola</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Esperança Maria Eduardo Francisco da Costa</h1>
            <p className="text-gray-500 text-sm">Data de Eleição: 24/08/2022</p>
          </div>
        </div>

        {/* Biography Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Biografia</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed text-justify">

              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Dados Pessoais</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Filiação:</strong> Eduardo Francisco e Maria Ventura</li>
                  <li><strong>Data de nascimento:</strong> 3 de Maio de 1961</li>
                  <li><strong>Naturalidade:</strong> Província de Luanda</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Formação Académica</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>1997</strong> - Doutoramento com distinção em Fitoecologia - estudo feito a plantas angolanas e a ecologia, na Universidade Técnica de Lisboa, Portugal.
                    <ul className="list-circle pl-5 mt-1 space-y-1 text-sm text-gray-600">
                      <li>Professora Assistente de Biologia Vegetal</li>
                      <li>Vice-Directora da Faculdade de Ciências e responsável/coordenadora do Herbário de Luanda</li>
                    </ul>
                  </li>
                  <li><strong>1990</strong> - Mestrado pela Universidade Técnica de Lisboa</li>
                  <li>Licenciatura em Biologia pela Faculdade de Ciências da Universidade Agostinho Neto (UAN)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Experiência Governativa</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>2020/2022</strong> - Secretária de Estado para as Pescas</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Experiência Profissional</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Pertenceu ao segundo grupo de biólogos do pós-Independência do País, formados nos anos 1984-85.</li>
                  <li><strong>2018/2020</strong> - Consultora da Ministra do Ambiente</li>
                  <li><strong>2019/2020</strong> - Autoridade Científica Nacional para a Convenção Internacional Sobre o Comércio de Espécies Ameaçadas (CITES)</li>
                  <li><strong>2019</strong> - Coordenadora Nacional do Global Biodiversity Facility Information (GBIF) da Plataforma Mundial de Biodiversidade</li>
                  <li><strong>2012/2016</strong> - Consultora da Ministra das Pescas</li>
                  <li><strong>2010/2020</strong> - Directora do Centro de Botânica da UAN</li>
                  <li>Coordenadora do Mestrado em Gestão e Governança Ambiental da Faculdade de Ciências da UAN em parceria com Faculdade de Ciência da Universidade de Lisboa</li>
                  <li><strong>2009/2012</strong> - Consultora da Vice-Ministra das Pescas</li>
                  <li>Consultora do Programa das Nações Unidas para o Desenvolvimento</li>
                  <li><strong>2007/2010</strong> - Directora para os Assuntos Científicos da Faculdade de Ciências</li>
                  <li><strong>2002/2007</strong> - Pro-Reitora para Expansão Universitária da UAN</li>
                  <li><strong>2000</strong> - Professora Titular da UAN</li>
                  <li><strong>1999/2000</strong> - Consultora do Ministério das Pescas e Ambiente</li>
                  <li><strong>1998/2004</strong> - Coordenadora Nacional da Rede de Estudos de Biodiversidade (SABONET) da SADC</li>
                  <li><strong>1997</strong> - Vice-Directora da Faculdade de Ciências para os Assuntos Científicos</li>
                  <li><strong>1986/1990</strong> - Assistente Graduada e Chefe de Departamento de Biologia</li>
                  <li><strong>2007/2010</strong> - Directora para os Assuntos Científicos da Faculdade de Ciências; Vice-Reitora para Expansão do Ensino da UAN
                    <ul className="list-circle pl-5 mt-1 space-y-1 text-sm text-gray-600">
                      <li>Na qualidade de Vice-Reitora para a Expansão do Ensino Superior, coordenou o programa de expansão do ensino superior para as demais Províncias do País, numa altura em que a missão estava adstrita à UAN.</li>
                      <li>Como coordenadora do Grupo de Trabalho do Colégio Reitoral da UAN, participou no restabelecimento do curso de Medicina, que deu origem ao surgimento da Faculdade de Medicina, na actual Universidade José Eduardo dos Santos, na Província do Huambo.</li>
                      <li>Esteve na base da criação da Universidade Mandume Ya Ndemofayo, na Província da Huíla; da Escola Superior de Ciência e Tecnologia de Saurimo, Lunda Sul; Escola Superior Pedagógica da Lunda Norte; do Polo Universitário do Namibe; da Escola Superior de Tecnologia; Faculdade de Medicina de Cabinda e da Academia de Pescas e do Mar do Namibe.</li>
                      <li>Participação no processo de criação das novas universidades nas várias regiões do país, na qualidade de Directora Nacional para o Ensino Superior.</li>
                      <li>Trabalhou na reinstalação da Faculdade de Ciências Agrárias, na Chianga, Huambo, reinaugurada em 2004.</li>
                    </ul>
                  </li>
                  <li><strong>1982</strong> - Ingresso no quadro docente do Departamento de Biologia da Faculdade de Ciências, como monitora, na especialidade de botânica.</li>
                  <li><strong>1985</strong> - Chefe de Departamento de Biologia.</li>
                  <li>Estágio no Centro de Botânica do Instituto de Investigação Cientifica Tropical da Junta de Investigação Cientifica de Ultramar, em Lisboa, tendo elaborado uma monografia sobre espécies de plantas alimentares e ornamentais de Angola.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Outras Referências</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>2012/2017</strong> - Membro da Coordenação da Academia de Pescas e do Mar do Namibe</li>
                  <li><strong>2008/2004</strong> - Ponto Focal para África Austral da Rede Internacional de Ciências, International Fundation for Science (IFS)</li>
                  <li>Membro do Grupo de Trabalho do Programa Benguela Environment Fisheries Interactions and Training Program (BENEFIT) e coordenadora pela parte de Formação - Ecossistema da Corrente fria de Benguela</li>
                  <li><strong>2000</strong> - Membro do Grupo de Trabalho da Comissão Regional da Corrente Fria de Benguela ”Benguela Current Large Marine Ecossistem” (BCLME)</li>
                </ul>

                <h4 className="font-semibold text-gray-800 mt-4 mb-2">Obras publicadas</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Plantas Medicinais de Angola</li>
                  <li>Plantas Ameaçadas de Angola</li>
                  <li>Check list das Poaceae de Angola</li>
                </ul>
                <p>Autora de dezenas de artigos publicados em revistas científicas e especializadas de nível internacional.</p>

                <h4 className="font-semibold text-gray-800 mt-4 mb-2">Cargos em instituições de estudo e preservação:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>2018</strong> - Manager/Presidente para Angola do Global Biodiversity Information Facility - GBIF</li>
                  <li><strong>1999</strong> - Coordenadora Nacional da Rede de Estudos de Biodiversidade da SADC/The Southern African Botanical Diversity Network - SABONET</li>
                  <li><strong>1986</strong> - Ponto Focal para África Austral da Rede Internacional de Ciências, IFS</li>
                  <li><strong>1999</strong> - Membro do Grupo de Trabalho da Comissão Regional da Corrente Fria de Benguela/BCLME</li>
                  <li><strong>2015</strong> - Membro da Associação Internacional Sobre Impacto Ambiental (IAIA) - Estados Unidos</li>
                  <li><strong>1992</strong> - Presidente da Comissão Executiva dos Biólogos</li>
                  <li><strong>2022</strong> - Membro-fundadora da Ordem dos Biólogos</li>
                </ul>

                <h4 className="font-semibold text-gray-800 mt-4 mb-2">Actividade Política</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>1982</strong> – Reintegração na Organização da Mulher Angolana (OMA), no Rangel, Luanda</li>
                  <li>Membro do Comité Municipal de Luanda</li>
                  <li>Membro do Comité Central (CC) e do Bureau Político (BP) do MPLA</li>
                </ul>
              </div>

            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
