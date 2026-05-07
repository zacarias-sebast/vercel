import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase com SERVICE ROLE KEY.
 * Bypassa o RLS — usar APENAS em Server Actions de administrador.
 * NUNCA expor no cliente (browser).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY não está definida no .env.local')
  }

  return createSupabaseClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
