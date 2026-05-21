'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function atualizarInstitucional(formData: FormData) {
  const supabase = await createClient()
  
  // Verifica autenticação
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (!user || error) {
      throw new Error('Não autorizado')
    }
  } catch (err) {
    throw new Error('Erro de autenticação. Faça login novamente.')
  }

  const slug = formData.get('slug') as string
  const titulo = formData.get('titulo') as string
  const conteudo = formData.get('conteudo') as string
  const imagem = formData.get('imagem') as File | null

  if (!slug || !titulo || !conteudo) {
    throw new Error('Campos obrigatórios faltando')
  }

  let imagem_url: string | undefined = undefined

  // Lidar com o upload de imagem, se houver
  if (imagem && imagem.size > 0) {
    const fileExt = imagem.name.split('.').pop()
    const fileName = `institucional_${slug}_${Date.now()}.${fileExt}`
    
    // Tenta fazer upload na mesma bucket das notícias por enquanto, ou cria uma própria.
    // 'imagens_noticias' já deve existir baseado no código de notícias
    const { error: uploadError } = await supabase.storage
      .from('imagens_noticias')
      .upload(fileName, imagem)

    if (uploadError) {
      throw new Error(`Erro no upload: ${uploadError.message}`)
    }

    const { data: publicUrlData } = supabase.storage
      .from('imagens_noticias')
      .getPublicUrl(fileName)
      
    imagem_url = publicUrlData.publicUrl
  }

  const updateData: any = {
    titulo,
    conteudo,
    updated_at: new Date().toISOString()
  }

  if (imagem_url) {
    updateData.imagem_url = imagem_url
  }

  const { error } = await supabase
    .from('paginas_institucionais')
    .upsert({
      slug,
      ...updateData
    }, { onConflict: 'slug' })

  if (error) {
    throw new Error(`Erro ao salvar no banco: ${error.message}`)
  }

  // Revalidar rotas
  revalidatePath('/admin/institucional')
  revalidatePath(`/ministerio/${slug}`)
  revalidatePath('/')
  
  redirect('/admin/institucional')
}
