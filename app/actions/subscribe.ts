'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { ActionState } from '@/app/types/actions'

const subscribeSchema = z.object({
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Por favor, insira um e-mail válido'),
})

export async function subscribeToNewsletter(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const nome = formData.get('nome')
    const email = formData.get('email')

    const validatedFields = subscribeSchema.safeParse({ nome, email })

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.issues[0].message,
        success: ''
      }
    }

    const supabase = await createClient()

    // Tentar inserir, falhará se o email já existir devido à constraint UNIQUE
    const { error } = await supabase
      .from('subscritores')
      .insert([
        { nome: validatedFields.data.nome, email: validatedFields.data.email }
      ])

    if (error) {
      if (error.code === '23505') { // Código postgres para unique violation
        return { error: 'Este e-mail já está inscrito.', success: '' }
      }
      return { error: 'Erro ao se inscrever. Tente novamente mais tarde.', success: '' }
    }

    return { error: '', success: 'Inscrição realizada com sucesso!' }
  } catch (err) {
    return { error: 'Ocorreu um erro inesperado.', success: '' }
  }
}
