import { Shield } from "lucide-react";

export const metadata = {
  title: "Presidente da República | Antigos Combatentes do Uíge",
};

export default function PresidentePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-[#0b1120] relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-gray-100 rounded-xl shadow-md border-4 border-white flex items-center justify-center overflow-hidden">
                {/* Substitua o 'src' abaixo pelo link da foto oficial do Presidente */}
                <img
                  src="/fotos/jl.jpg"
                  alt="Foto do Presidente João Lourenço"
                  className="w-full h-full object-cover bg-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">Presidente da República de Angola</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">João Manuel Gonçalves Lourenço</h1>
            <p className="text-gray-500 text-sm">Data de Eleição: 24/08/2017</p>
          </div>
        </div>

        {/* Biography Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Biografia</h2>

            <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
              <h3 className="font-semibold text-gray-900 text-lg mt-6 mb-2">Dados Pessoais</h3>
              <p>
                O cidadão João Manuel Gonçalves Lourenço nasceu no dia 5 de Março de 1954, na cidade do Lobito, província de Benguela, filho de Sequeira João Lourenço, enfermeiro, e de Josefa Gonçalves Cipriano Lourenço, costureira, ambos falecidos. É casado com Ana Afonso Dias Lourenço e pai de seis filhos.
              </p>

              <p>
                Fez os estudos primários e secundários na província do Bié e também na cidade capital, na antiga Escola Industrial de Luanda e no Instituto Industrial de Luanda. De 1978 a 1982, recebeu na então União Soviética formação militar, tendo-se especializado em artilharia pesada. Nesse país, obteve igualmente o grau académico de Mestre em Ciências Históricas. Tem o domínio fluente do inglês, do russo e do espanhol.
              </p>

              <p>
                Participou a partir de Agosto de 1974 na luta de Libertação Nacional, conduzida pelo MPLA, tendo feito a sua primeira instrução político-militar no Centro de Instrução Revolucionária – CIR ‘Kalunga’ – no Congo Brazzaville. Integrou o primeiro grupo de combatentes do MPLA que em 1974 entrou em território nacional, via Miconge, em direcção à cidade de Cabinda.
              </p>

              <p>
                Nas vésperas da Independência, participou em combates em Ntó-Iema, na província de Cabinda, e em outras localidades, contra a invasão do exército zairense que pretendia ocupar o território daquela província de Angola. Exerceu também as funções de Comissário Político das então Forças Armadas Populares de Libertação de Angola (FAPLA) em diversos escalões, incluindo a de Comissário Político da 2ª Região Político-Militar de Cabinda.
              </p>

              <p>
                Durante a década de 80 do século XX, participou em várias operações militares no centro do país, nomeadamente nas províncias do Cuanza Sul, Huambo e Bié. Em 1983 exerceu a Presidência do Conselho Militar Regional da 3ª Região Político-Militar. Nas Forças Armadas, desempenhou ainda as funções de Chefe da Direcção Política das FAPLA, de 1989 a 1990. Actualmente é General-de-Três-Estrelas, na reserva, das Forças Armadas Angolanas (FAA).
              </p>

              <p>
                Integra o Comité Central do MPLA desde 1985, é membro do seu Bureau Político desde 1990 e, na sequência do VII Congresso Ordinário do MPLA, realizado em 2016, foi eleito Vice-Presidente do MPLA. Anteriormente, já tinha desempenhado as funções de 1º Secretário do Bureau Político e também Secretário do Bureau Político do MPLA para a Informação e para a Esfera Económica e Social.
              </p>

              <h3 className="font-semibold text-gray-900 text-lg mt-8 mb-2">Experiência Governativa e Parlamentar</h3>
              <p>
                No domínio das funções governativas, foi nomeado em 1983, aos 29 anos de idade, para exercer o cargo de Comissário Provincial do Moxico, equivalente ao cargo actual de Governador de Província. Foi posteriormente, de 1986 a 1989, Comissário Provincial de Benguela. Em 2014, por Decreto Presidencial, foi nomeado Ministro da Defesa Nacional, cargo que exerceu até ao início da campanha eleitoral de 2017.
              </p>

              <p>
                Ao nível parlamentar, o cidadão João Lourenço foi Presidente do Grupo Parlamentar do MPLA, de 1991 a 1998, e posteriormente Presidente da Comissão Constitucional da Assembleia Nacional, tendo desempenhado as funções de 1º Vice-Presidente da Assembleia Nacional, de 2003 a 2014.
              </p>

              <h3 className="font-semibold text-gray-900 text-lg mt-8 mb-2">Outras Referências</h3>
              <p>
                O cidadão João Lourenço tem como passatempo a leitura, o xadrez, a equitação e é um apaixonado pelas novas Tecnologias de Informação.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
