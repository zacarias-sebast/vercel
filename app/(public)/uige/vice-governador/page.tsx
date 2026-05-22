import { Users, MapPin, BookOpen, Briefcase, Award } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin"
import Image from "next/image"

export const metadata = {
  title: "Vice-Governadora | Antigos Combatentes do Uíge",
};

export const dynamic = 'force-dynamic'

export default async function ViceGovernadorPage() {
  const supabase = createAdminClient()
  
  // Buscar dados do vice-governador
  const { data: viceGovernador } = await supabase
    .from('vice_governador')
    .select('*')
    .single()
  
  // Se não há dados, mostrar placeholder
  if (!viceGovernador) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-center">Dados da Vice-Governadora ainda não foram adicionados.</p>
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-600">
              <Users className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Vice-Governadora da Província do Uíge</h1>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{viceGovernador.nome}</h2>
              </div>
              <div className="flex justify-center items-start md:items-center">
                <div className="w-40 h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md border-2 border-pink-200 relative">
                  {viceGovernador.foto_url ? (
                    <Image
                      src={viceGovernador.foto_url}
                      alt={`Foto de ${viceGovernador.nome}`}
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
            {(viceGovernador.filiacao || viceGovernador.data_nascimento || viceGovernador.naturalidade) && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Dados Pessoais
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {viceGovernador.filiacao && (
                    <p className="text-gray-700 text-justify"><span className="font-semibold">Filiação:</span> {viceGovernador.filiacao}</p>
                  )}
                  {viceGovernador.data_nascimento && (
                    <p className="text-gray-700 text-justify"><span className="font-semibold">Data de nascimento:</span> {new Date(viceGovernador.data_nascimento).toLocaleDateString('pt-PT')}</p>
                  )}
                  {viceGovernador.naturalidade && (
                    <p className="text-gray-700 text-justify"><span className="font-semibold">Naturalidade:</span> {viceGovernador.naturalidade}</p>
                  )}
                </div>
              </div>
            )}

            {/* Formação Académica */}
            {viceGovernador.formacao_academica && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Formação Académica
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {formatarArray(viceGovernador.formacao_academica).map((item, idx) => (
                    <p key={idx} className="text-gray-700 text-justify">{item}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Formação Profissional */}
            {viceGovernador.formacao_profissional && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Formação Profissional
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {formatarArray(viceGovernador.formacao_profissional).map((item, idx) => (
                    <p key={idx} className="text-gray-700 text-justify">{item}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Experiência Profissional */}
            {viceGovernador.experiencia_profissional && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Experiência Profissional</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {formatarArray(viceGovernador.experiencia_profissional).map((item, idx) => (
                    <p key={idx} className="text-gray-700 text-justify">{item}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Outras Referências */}
            {viceGovernador.experiencia_governativa && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Outras Referências
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  {formatarArray(viceGovernador.experiencia_governativa).map((item, idx) => (
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
