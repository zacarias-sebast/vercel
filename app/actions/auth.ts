'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'E-mail e senha são obrigatórios.' }
  }

  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message?.toLowerCase().includes('email not confirmed') || error.code === 'email_not_confirmed') {
        return { error: 'O seu e-mail ainda não foi confirmado. Verifique a sua caixa de entrada e clique no link de confirmação antes de fazer login.' }
      }
      return { error: 'Credenciais inválidas. Verifique o e-mail e a senha e tente novamente.' }
    }
  } catch (err: any) {
    if (err.message?.includes('ENOTFOUND') || err.message?.includes('fetch failed')) {
      return { error: 'Sem conexão com o banco de dados. Configure o Supabase no .env.local.' }
    }
    return { error: 'Erro inesperado. Tente novamente mais tarde.' }
  }

  redirect('/admin')
}

export async function register(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!name || !email || !password || !confirmPassword) {
    return { error: 'Todos os campos são obrigatórios.' }
  }

  if (password.length < 8) {
    return { error: 'A senha deve ter pelo menos 8 caracteres.' }
  }

  if (password !== confirmPassword) {
    return { error: 'As senhas não coincidem.' }
  }

  const supabase = await createClient()

  let signUpError: string | null = null

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        // /auth/callback troca o code por sessão (PKCE) e redireciona para /admin
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback`,
      },
    })

    if (error) {
      if (error.message?.toLowerCase().includes('already registered') || error.code === 'user_already_exists') {
        signUpError = 'Este e-mail já está registado. Tente fazer login ou recuperar a senha.'
      } else {
        signUpError = `Erro ao cadastrar: ${error.message}`
      }
    }
  } catch (err: any) {
    if (err.message?.includes('ENOTFOUND') || err.message?.includes('fetch failed')) {
      return { error: 'Sem conexão com o banco de dados. Configure o Supabase no .env.local.' }
    }
    return { error: 'Erro inesperado. Tente novamente mais tarde.' }
  }

  if (signUpError) return { error: signUpError }

  // redirect() lança uma excepção interna do Next.js — deve ficar fora do try/catch
  redirect('/admin/confirmar-email')
}

export async function updatePassword(prevState: any, formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    return { error: 'Todos os campos são obrigatórios.' }
  }

  if (password.length < 8) {
    return { error: 'A senha deve ter pelo menos 8 caracteres.' }
  }

  if (password !== confirmPassword) {
    return { error: 'As senhas não coincidem.' }
  }

  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      return { error: `Erro ao actualizar a senha: ${error.message}` }
    }

    return { success: 'Senha actualizada com sucesso! Já pode fazer login.' }
  } catch (err: any) {
    if (err.message?.includes('ENOTFOUND') || err.message?.includes('fetch failed')) {
      return { error: 'Sem conexão com o banco de dados. Configure o Supabase no .env.local.' }
    }
    return { error: 'Erro inesperado. Tente novamente mais tarde.' }
  }
}

export async function resetPassword(prevState: any, formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Informe o e-mail cadastrado.' }
  }

  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback?type=recovery`,
    })

    if (error) {
      return { error: `Erro ao enviar e-mail: ${error.message}` }
    }

    return {
      success: 'Se esse e-mail estiver cadastrado, você receberá um link para redefinir a sua senha em breve.',
    }
  } catch (err: any) {
    if (err.message?.includes('ENOTFOUND') || err.message?.includes('fetch failed')) {
      return { error: 'Sem conexão com o banco de dados. Configure o Supabase no .env.local.' }
    }
    return { error: 'Erro inesperado. Tente novamente mais tarde.' }
  }
}
