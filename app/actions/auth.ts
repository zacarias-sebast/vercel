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
      return { error: `Credenciais inválidas ou e-mail não confirmado. Verifique e tente novamente.` }
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

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/admin/login`,
      },
    })

    if (error) {
      return { error: `Erro ao cadastrar: ${error.message}` }
    }

    return {
      success: 'Cadastro realizado! Verifique o seu e-mail para confirmar a conta antes de fazer login.',
    }
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
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/admin/nova-senha`,
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
