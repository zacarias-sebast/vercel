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
      return { error: `Erro do Supabase: ${error.message} (Verifique se o e-mail foi confirmado ou se as credenciais estão corretas).` }
    }
  } catch (err: any) {
    if (err.message?.includes('ENOTFOUND') || err.message?.includes('fetch failed')) {
      return { error: 'O sistema ainda não está conectado a um banco de dados real. Por favor, configure a URL do Supabase no .env.local.' }
    }
    return { error: 'Ocorreu um erro inesperado ao tentar conectar ao banco de dados.' }
  }

  redirect('/admin')
}
