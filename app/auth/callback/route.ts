import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Callback do Supabase Auth.
 * O Supabase redireciona o utilizador para cá após clicar no link do e-mail
 * (confirmação de conta ou recuperação de senha).
 * O parâmetro `code` é trocado por uma sessão válida via PKCE.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type') // 'signup' | 'recovery' | etc.
  const next = searchParams.get('next') ?? '/admin'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Se for recuperação de senha, redireciona para a página de nova senha
      if (type === 'recovery') {
        return NextResponse.redirect(`${origin}/admin/nova-senha`)
      }
      // Para confirmação de conta (signup), vai direto para o admin
      return NextResponse.redirect(`${origin}${next}`)
    }

    // Token inválido ou expirado
    return NextResponse.redirect(
      `${origin}/admin/login?error=link_invalido`
    )
  }

  // Sem code — redireciona para login com erro
  return NextResponse.redirect(
    `${origin}/admin/login?error=link_invalido`
  )
}
