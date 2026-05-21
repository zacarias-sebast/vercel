import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (user && !error) {
      await supabase.auth.signOut()
    }
  } catch (err) {
    // Ignore errors during signout, just redirect
  }

  return NextResponse.redirect(new URL('/', request.url), {
    status: 302,
  })
}
