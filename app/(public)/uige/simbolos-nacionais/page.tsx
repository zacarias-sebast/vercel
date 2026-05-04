import { Shield } from "lucide-react";

export const metadata = {
  title: "Símbolos Nacionais | Antigos Combatentes do Uíge",
};

export default function SimbolosNacionaisPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-[#0b1120] relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-white rounded-xl shadow-md border-4 border-white flex items-center justify-center overflow-hidden">
                <img
                  src="/fotos/bandeira.png"
                  alt="Foto"
                  className="w-full h-full object-cover bg-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">República de Angola</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Símbolos Nacionais</h1>
            <p className="text-gray-500 text-sm">A identidade e soberania da Nação Angolana</p>
          </div>
        </div>

        {/* Symbols Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-12">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">A Bandeira Nacional</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 aspect-[3/2] bg-gray-200 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center text-gray-500">

                <img
                  src="/fotos/bandeira.png"
                  alt="Foto do Presidente João Lourenço"
                  className="w-full h-full object-cover bg-gray-200"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-4 text-gray-700 leading-relaxed text-justify">
                <p>
                  A Bandeira Nacional divide-se em duas faixas horizontais. A faixa superior é de cor vermelho-rubro e a inferior de cor preta.
                </p>
                <p>
                  O vermelho-rubro representa o sangue derramado pelos angolanos durante a opressão colonial, na luta de libertação nacional e na defesa da pátria. O preto representa o Continente Africano.
                </p>
                <p>
                  Ao centro, figura uma composição constituída por uma secção de uma roda dentada, símbolo dos trabalhadores e da produção industrial, uma catana, símbolo dos camponeses, da produção agrícola e da luta armada, e uma estrela, símbolo da solidariedade internacional e do progresso. A roda dentada, a catana e a estrela são de cor amarela, que representa a riqueza do país.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">A Insígnia Nacional</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 aspect-square bg-gray-200 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center text-gray-500">
                <img
                  src="/fotos/vercel.png"
                  alt="insignia da República de Angola"
                  className="w-full h-full object-cover bg-gray-200"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-4 text-gray-700 leading-relaxed text-justify">
                <p>
                  A Insígnia da República de Angola é formada por uma secção de uma roda dentada e por uma ramagem de milho, café e algodão, representando os trabalhadores e a produção industrial, os camponeses e a produção agrícola.
                </p>
                <p>
                  Na base do conjunto existe um livro aberto, símbolo da educação e cultura, e o sol nascente, que significa o Novo País. Ao centro está a catana e a enxada, simbolizando o trabalho e o início da luta armada.
                </p>
                <p>
                  No cimo, figura a estrela, símbolo da solidariedade internacional e do progresso. Na parte inferior do emblema, sobre uma faixa dourada, aparece inscrita a designação "República de Angola".
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">O Hino Nacional</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
              <p>
                O Hino Nacional é "Angola Avante!", cantado em momentos solenes e oficiais. Expressa o patriotismo, a luta pela independência e a vontade de construir um futuro próspero.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 italic text-center text-gray-800">
                <p>Ó Pátria, nunca mais esqueceremos</p>
                <p>Os heróis de 4 de Fevereiro.</p>
                <p>Ó Pátria, nós saudamos os teus filhos</p>
                <p>Tombados pela nossa Independência.</p>
                <br />
                <p>Honramos o passado e a nossa História,</p>
                <p>Construindo no Trabalho o Homem novo,</p>
                <p>Honramos o passado e a nossa História,</p>
                <p>Construindo no Trabalho o Homem novo.</p>
                <br />
                <p className="font-bold">Coro:</p>
                <p className="font-bold">Angola, avante!</p>
                <p className="font-bold">Revolução, pelo Poder Popular!</p>
                <p className="font-bold">Pátria Unida, Liberdade,</p>
                <p className="font-bold">Um só povo, uma só Nação!</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
