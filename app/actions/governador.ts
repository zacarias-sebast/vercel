'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { z } from 'zod'
import type { ActionState } from '@/app/types/actions'

const governadorSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  data_nomeacao: z.string().min(1, 'Data de nomeação é obrigatória'),
  filiacao: z.string().optional(),
  data_nascimento: z.string().optional(),
  naturalidade: z.string().optional(),
  formacao_academica: z.string().optional(),
  formacao_profissional: z.string().optional(),
  experiencia_governativa: z.string().optional(),
  experiencia_profissional: z.string().optional(),
  foto_url: z.string().optional(),
})

export async function saveGovernador(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const supabase = createAdminClient()
    
    // Processar upload de imagem se existir
    let fotoUrl: string | undefined
    const fotoFile = formData.get('foto') as File | null
    
    if (fotoFile && fotoFile.size > 0) {
      // Validar tipo de arquivo
      if (!fotoFile.type.startsWith('image/')) {
        return { error: 'O arquivo deve ser uma imagem (JPEG, PNG, etc.)', success: '' }
      }
      
      // Validar tamanho (máx 5MB)
      if (fotoFile.size > 5 * 1024 * 1024) {
        return { error: 'A imagem não pode exceder 5MB', success: '' }
      }

      // Fazer upload para Supabase Storage
      const fileName = `governador-${Date.now()}.${fotoFile.type.split('/')[1]}`
      const { data, error: uploadError } = await supabase.storage
        .from('fotos')
        .upload(fileName, fotoFile, { upsert: true })

      if (uploadError) {
        return { error: `Erro ao fazer upload da imagem: ${uploadError.message}`, success: '' }
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('fotos')
        .getPublicUrl(fileName)
      
      fotoUrl = publicUrl
    }

    const obj = Object.fromEntries(formData)
    if (fotoUrl) obj.foto_url = fotoUrl
    const data = governadorSchema.parse(obj)

    // Verificar se já existe um governador
    const { data: existingGovernador } = await supabase
      .from('governador')
      .select('id')
      .single()

    if (existingGovernador) {
      // Atualizar
      const { error } = await supabase
        .from('governador')
        .update(data)
        .eq('id', existingGovernador.id)

      if (error) {
        return { error: `Erro ao atualizar: ${error.message}`, success: '' }
      }
    } else {
      // Criar novo
      const { error } = await supabase
        .from('governador')
        .insert([data])

      if (error) {
        return { error: `Erro ao criar: ${error.message}`, success: '' }
      }
    }

    revalidatePath('/admin/governador')
    revalidatePath('/uige/governadores')
    
    return { error: '', success: 'Governador atualizado com sucesso!' }
  } catch (err: any) {
    return { error: err.message || 'Erro inesperado', success: '' }
  }
}

export async function saveViceGovernador(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const supabase = createAdminClient()
    
    // Processar upload de imagem se existir
    let fotoUrl: string | undefined
    const fotoFile = formData.get('foto') as File | null
    
    if (fotoFile && fotoFile.size > 0) {
      // Validar tipo de arquivo
      if (!fotoFile.type.startsWith('image/')) {
        return { error: 'O arquivo deve ser uma imagem (JPEG, PNG, etc.)', success: '' }
      }
      
      // Validar tamanho (máx 5MB)
      if (fotoFile.size > 5 * 1024 * 1024) {
        return { error: 'A imagem não pode exceder 5MB', success: '' }
      }

      // Fazer upload para Supabase Storage
      const fileName = `vice-governador-${Date.now()}.${fotoFile.type.split('/')[1]}`
      const { data, error: uploadError } = await supabase.storage
        .from('fotos')
        .upload(fileName, fotoFile, { upsert: true })

      if (uploadError) {
        return { error: `Erro ao fazer upload da imagem: ${uploadError.message}`, success: '' }
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('fotos')
        .getPublicUrl(fileName)
      
      fotoUrl = publicUrl
    }

    const obj = Object.fromEntries(formData)
    if (fotoUrl) obj.foto_url = fotoUrl
    const data = governadorSchema.parse(obj)

    // Verificar se já existe um vice-governador
    const { data: existingViceGovernador } = await supabase
      .from('vice_governador')
      .select('id')
      .single()

    if (existingViceGovernador) {
      // Atualizar
      const { error } = await supabase
        .from('vice_governador')
        .update(data)
        .eq('id', existingViceGovernador.id)

      if (error) {
        return { error: `Erro ao atualizar: ${error.message}`, success: '' }
      }
    } else {
      // Criar novo
      const { error } = await supabase
        .from('vice_governador')
        .insert([data])

      if (error) {
        return { error: `Erro ao criar: ${error.message}`, success: '' }
      }
    }

    revalidatePath('/admin/vice-governador')
    revalidatePath('/uige/vice-governador')
    
    return { error: '', success: 'Vice-Governador atualizado com sucesso!' }
  } catch (err: any) {
    return { error: err.message || 'Erro inesperado', success: '' }
  }
}
