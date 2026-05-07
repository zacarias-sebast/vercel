import { createClient } from '@/lib/supabase/server'
import { MessageSquare, Paperclip, Mail, Phone, Calendar, Tag } from 'lucide-react'
import { DeleteMensagemButton } from '@/components/DeleteMensagemButton'

export const dynamic = 'force-dynamic'

const assuntoBadge: Record<string, { label: string; color: string }> = {
  'Sugestão':       { label: 'Sugestão',       color: 'bg-blue-100 text-blue-700' },
  'Reclamação':     { label: 'Reclamação',      color: 'bg-red-100 text-red-700' },
  'Esclarecimento': { label: 'Esclarecimento',  color: 'bg-yellow-100 text-yellow-700' },
  'Outro':          { label: 'Outro',           color: 'bg-gray-100 text-gray-700' },
}

export default async function MensagensPage() {
  const supabase = await createClient()

  const { data: mensagens, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6">
        <p className="font-semibold">Erro ao carregar mensagens</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    )
  }

  // Gerar URLs assinadas (válidas 1 hora) para cada anexo
  const mensagensComAnexos = await Promise.all(
    (mensagens ?? []).map(async (msg) => {
      if (!msg.arquivo_url) return { ...msg, signedUrl: null }

      const { data, error: urlError } = await supabase.storage
        .from('contact_documents')
        .createSignedUrl(msg.arquivo_url, 3600) // 1 hora

      return { ...msg, signedUrl: urlError ? null : data?.signedUrl }
    })
  )

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reclamações &amp; Sugestões</h1>
          <p className="text-sm text-gray-500">
            {mensagensComAnexos.length} mensagem{mensagensComAnexos.length !== 1 ? 's' : ''} recebida{mensagensComAnexos.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {mensagensComAnexos.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Nenhuma mensagem recebida ainda.</p>
          <p className="text-gray-400 text-sm mt-1">As mensagens enviadas pelos utilizadores aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mensagensComAnexos.map((msg) => {
            const badge = assuntoBadge[msg.assunto] ?? assuntoBadge['Outro']

            return (
              <div
                key={msg.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold uppercase text-sm flex-shrink-0">
                      {msg.nome?.charAt(0) ?? '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{msg.nome}</p>
                      <div className="flex flex-wrap gap-3 mt-0.5 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {msg.email}
                        </span>
                        {msg.telefone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {msg.telefone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                      <Tag className="w-3 h-3" />
                      {badge.label}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(msg.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                {/* Mensagem */}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-4">
                  {msg.mensagem}
                </p>

                {/* Anexo + Eliminar */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    {msg.arquivo_url && (
                      msg.signedUrl ? (
                        <a
                          href={msg.signedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                        >
                          <Paperclip className="w-4 h-4" />
                          Ver documento anexado
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-gray-400 text-sm">
                          <Paperclip className="w-4 h-4" />
                          Documento anexado (link indisponível)
                        </span>
                      )
                    )}
                  </div>
                  <DeleteMensagemButton id={msg.id} nome={msg.nome} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
