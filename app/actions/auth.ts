'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { ActionState } from '@/app/types/actions'

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'E-mail e senha são obrigatórios.', success: '' }
  }

  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message?.toLowerCase().includes('email not confirmed') || error.code === 'email_not_confirmed') {
        return { error: 'O seu e-mail ainda não foi confirmado. Verifique a sua caixa de entrada e clique no link de confirmação antes de fazer login.', success: '' }
      }
      return { error: 'Credenciais inválidas. Verifique o e-mail e a senha e tente novamente.', success: '' }
    }
  } catch (err: any) {
    if (err.message?.includes('ENOTFOUND') || err.message?.includes('fetch failed')) {
      return { error: 'Sem conexão com o banco de dados. Configure o Supabase no .env.local.', success: '' }
    }
    return { error: 'Erro inesperado. Tente novamente mais tarde.', success: '' }
  }

  redirect('/admin')
}

export async function updatePassword(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    return { error: 'Todos os campos são obrigatórios.', success: '' }
  }

  if (password.length < 8) {
    return { error: 'A senha deve ter pelo menos 8 caracteres.', success: '' }
  }

  if (password !== confirmPassword) {
    return { error: 'As senhas não coincidem.', success: '' }
  }

  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      return { error: `Erro ao actualizar a senha: ${error.message}`, success: '' }
    }

    return { error: '', success: 'Senha actualizada com sucesso! Já pode fazer login.' }
  } catch (err: any) {
    if (err.message?.includes('ENOTFOUND') || err.message?.includes('fetch failed')) {
      return { error: 'Sem conexão com o banco de dados. Configure o Supabase no .env.local.', success: '' }
    }
    return { error: 'Erro inesperado. Tente novamente mais tarde.', success: '' }
  }
}

export async function resetPassword(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Informe o e-mail cadastrado.', success: '' }
  }

  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback?type=recovery`,
    })

    if (error) {
      return { error: `Erro ao enviar e-mail: ${error.message}`, success: '' }
    }

    return {
      error: '',
      success: 'Se esse e-mail estiver cadastrado, você receberá um link para redefinir a sua senha em breve.',
    }
  } catch (err: any) {
    if (err.message?.includes('ENOTFOUND') || err.message?.includes('fetch failed')) {
      return { error: 'Sem conexão com o banco de dados. Configure o Supabase no .env.local.', success: '' }
    }
    return { error: 'Erro inesperado. Tente novamente mais tarde.', success: '' }
  }
}
