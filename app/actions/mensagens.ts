'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function eliminarMensagem(formData: FormData): Promise<void> {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (!user || error) {
      console.error('Não autorizado para eliminar mensagem')
      return
    }
  } catch (err) {
    console.error('Erro de autenticação ao eliminar mensagem')
    return
  }

  const id = formData.get('id') as string

  if (!id) {
    console.error('ID de mensagem inválido')
    return
  }

  const adminClient = createAdminClient()

  // Obter o path do ficheiro antes de eliminar o registo
  const { data: msg } = await adminClient
    .from('contact_messages')
    .select('arquivo_url')
    .eq('id', id)
    .single()

  // Eliminar o ficheiro do storage se existir
  if (msg?.arquivo_url) {
    await adminClient.storage
      .from('contact_documents')
      .remove([msg.arquivo_url])
  }

  // Eliminar o registo da base de dados
  const { error } = await adminClient
    .from('contact_messages')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao eliminar mensagem:', error)
    return
  }

  revalidatePath('/admin/mensagens')
  redirect('/admin/mensagens')
}
