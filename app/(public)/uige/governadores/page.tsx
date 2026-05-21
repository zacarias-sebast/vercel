import { History, User, Calendar, MapPin, BookOpen, Briefcase } from "lucide-react";
import { createClient } from "@/lib/supabase/server"
import Image from "next/image"

export const metadata = {
  title: "Governador | Antigos Combatentes do Uíge",
};

export const dynamic = 'force-dynamic'

export default async function GovernadorPage() {
  const supabase = await createClient()
  
  // Buscar dados do governador
  const { data: governador } = await supabase
    .from('governador')
    .select('*')
    .single()
  
  // Se não há dados, mostrar placeholder
  if (!governador) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-center">Dados do Governador ainda não foram adicionados.</p>
        </div>
      </div>
    )
  }

  // Função para formatar array de strings
  const formatarArray = (valor: string | null | undefined) => {
    if (!valor) return []
    return valor.split('\n').filter((item) => item.trim().length > 0)
  }

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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{governador.nome}</h2>
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>Data de Nomeação: {governador.data_nomeacao ? new Date(governador.data_nomeacao).toLocaleDateString('pt-PT') : 'N/A'}</span>
                </div>
              </div>
              <div className="flex justify-center items-start md:items-center">
                <div className="w-40 h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md border-2 border-blue-200 relative">
                  {governador.foto_url ? (
                    <Image
                      src={governador.foto_url}
                      alt={`Foto de ${governador.nome}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <span className="text-gray-500 text-center px-4">Sem fotografia</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dados Pessoais */}
            {(governador.filiacao || governador.data_nascimento || governador.naturalidade) && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Dados Pessoais
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {governador.filiacao && (
                    <p className="text-gray-700 text-justify"><span className="font-semibold">Filiação:</span> {governador.filiacao}</p>
                  )}
                  {governador.data_nascimento && (
                    <p className="text-gray-700 text-justify"><span className="font-semibold">Data de nascimento:</span> {new Date(governador.data_nascimento).toLocaleDateString('pt-PT')}</p>
                  )}
                  {governador.naturalidade && (
                    <p className="text-gray-700 text-justify"><span className="font-semibold">Naturalidade:</span> {governador.naturalidade}</p>
                  )}
                </div>
              </div>
            )}

            {/* Formação Académica */}
            {governador.formacao_academica && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Formação Académica
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {formatarArray(governador.formacao_academica).map((item, idx) => (
                    <p key={idx} className="text-gray-700 text-justify">{item}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Formação Profissional */}
            {governador.formacao_profissional && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Formação Profissional
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {formatarArray(governador.formacao_profissional).map((item, idx) => (
                    <p key={idx} className="text-gray-700 text-justify">{item}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Experiência Governativa */}
            {governador.experiencia_governativa && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Experiência Governativa</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {formatarArray(governador.experiencia_governativa).map((item, idx) => (
                    <p key={idx} className="text-gray-700 text-justify">{item}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Experiência Profissional */}
            {governador.experiencia_profissional && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Experiência Profissional</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {formatarArray(governador.experiencia_profissional).map((item, idx) => (
                    <p key={idx} className="text-gray-700 text-justify">{item}</p>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
