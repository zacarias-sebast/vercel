import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  // Get all cookies from the request
  const cookies = request.cookies.getAll()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    return NextResponse.json({
      cookies: cookies.map(c => ({ name: c.name, value: c.value.substring(0, 50) + '...' })),
      user: user ? { id: user.id, email: user.email } : null,
      error: error ? { message: error.message, status: error.status } : null,
    })
  } catch (err: any) {
    return NextResponse.json({
      cookies: cookies.map(c => ({ name: c.name, value: c.value.substring(0, 50) + '...' })),
      error: { message: err.message },
    }, { status: 500 })
  }
}
