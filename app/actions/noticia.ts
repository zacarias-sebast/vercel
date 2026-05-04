'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { Resend } from 'resend'

const noticiaSchema = z.object({
  titulo: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  conteudo: z.string().min(20, 'O conteúdo deve ser mais longo'),
  categoria: z.string().min(2, 'Selecione uma categoria'),
})

// ─── Função que envia email de notificação a todos os subscritores ───────────
async function enviarNotificacaoEmail(titulo: string, conteudo: string, categoria: string, imagemUrl: string | null) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY não definida. Notificações por email desactivadas.')
    return
  }

  try {
    const resend = new Resend(apiKey)
    const supabase = await createClient()

    // Buscar todos os subscritores
    const { data: subscritores, error } = await supabase
      .from('subscritores')
      .select('nome, email')

    if (error || !subscritores || subscritores.length === 0) {
      console.log('Sem subscritores para notificar.')
      return
    }

    const excerpt = conteudo.substring(0, 200).trim() + '...'
    const portalUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Template HTML do email
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${titulo}</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:32px 16px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                
                <!-- Header -->
                <tr>
                  <td style="background-color:#0f172a;padding:28px 32px;text-align:center;">
                    <p style="margin:0;color:#60a5fa;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Delegação Provincial dos</p>
                    <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Antigos Combatentes do Uíge</h1>
                  </td>
                </tr>

                <!-- Badge Categoria -->
                <tr>
                  <td style="padding:28px 32px 0;text-align:left;">
                    <span style="background-color:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:700;padding:4px 12px;border-radius:999px;text-transform:uppercase;letter-spacing:1px;">${categoria}</span>
                  </td>
                </tr>

                <!-- Título -->
                <tr>
                  <td style="padding:16px 32px 0;">
                    <h2 style="margin:0;color:#0f172a;font-size:24px;line-height:1.3;font-weight:700;">${titulo}</h2>
                  </td>
                </tr>

                ${imagemUrl ? `
                <!-- Imagem -->
                <tr>
                  <td style="padding:20px 32px 0;">
                    <img src="${imagemUrl}" alt="${titulo}" width="100%" style="border-radius:8px;display:block;max-height:280px;object-fit:cover;" />
                  </td>
                </tr>
                ` : ''}

                <!-- Resumo -->
                <tr>
                  <td style="padding:20px 32px;">
                    <p style="margin:0;color:#4b5563;font-size:16px;line-height:1.7;">${excerpt}</p>
                  </td>
                </tr>

                <!-- Botão -->
                <tr>
                  <td style="padding:0 32px 32px;text-align:center;">
                    <a href="${portalUrl}" style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:999px;font-size:15px;font-weight:600;">
                      Ler Notícia Completa →
                    </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;text-align:center;">
                    <p style="margin:0;color:#94a3b8;font-size:12px;">
                      Recebeu este email porque subscreveu as notificações do Portal dos Antigos Combatentes do Uíge.<br/>
                      <a href="${portalUrl}" style="color:#60a5fa;text-decoration:none;">Visitar o Portal</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    // Enviar em lotes para não ultrapassar limites da API
    const BATCH_SIZE = 50
    for (let i = 0; i < subscritores.length; i += BATCH_SIZE) {
      const lote = subscritores.slice(i, i + BATCH_SIZE)
      await Promise.allSettled(
        lote.map((sub) =>
          resend.emails.send({
            from: 'Portal AC Uíge <onboarding@resend.dev>', // Trocar pelo seu domínio após verificar
            to: sub.email,
            subject: `📰 Nova Notícia: ${titulo}`,
            html: emailHtml,
          })
        )
      )
    }

    console.log(`✅ Notificações enviadas para ${subscritores.length} subscritores.`)
  } catch (err) {
    // Nunca deixar falha de email bloquear a publicação da notícia
    console.error('Erro ao enviar notificações:', err)
  }
}

// ─── Função que envia notificação para o canal do Telegram ───────────────────
async function enviarNotificacaoTelegram(
  titulo: string,
  conteudo: string,
  categoria: string,
  imagemUrl: string | null
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.warn('TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID não definidos. Notificações Telegram desactivadas.')
    return
  }

  try {
    const portalUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const excerpt = conteudo.replace(/[#*_`\[\]()]/g, '').substring(0, 300).trim()
    const categoriaUpper = categoria.toUpperCase()

    const mensagem =
      `📰 *NOVA NOTÍCIA — ${categoriaUpper}*\n\n` +
      `*${titulo}*\n\n` +
      `${excerpt}${conteudo.length > 300 ? '...' : ''}\n\n` +
      `🔗 [Ler notícia completa](${portalUrl})`

    if (imagemUrl) {
      // Envia foto com legenda
      await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          photo: imagemUrl,
          caption: mensagem,
          parse_mode: 'Markdown',
        }),
      })
    } else {
      // Envia só texto
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: mensagem,
          parse_mode: 'Markdown',
          disable_web_page_preview: false,
        }),
      })
    }

    console.log('✅ Notificação enviada para o canal Telegram.')
  } catch (err) {
    console.error('Erro ao enviar notificação Telegram:', err)
  }
}

export async function criarNoticia(prevState: any, formData: FormData) {
  const supabase = await createClient()
  
  // Verify auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Não autorizado. Faça login.' }
  }

  const titulo = formData.get('titulo') as string
  const conteudo = formData.get('conteudo') as string
  const categoria = formData.get('categoria') as string
  const imagem = formData.get('imagem') as File

  const validated = noticiaSchema.safeParse({ titulo, conteudo, categoria })
  if (!validated.success) {
    return { error: validated.error.issues[0].message }
  }

  let imagem_url = null

  // Handle image upload if exists
  if (imagem && imagem.size > 0) {
    const fileExt = imagem.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('imagens_noticias')
      .upload(fileName, imagem)

    if (uploadError) {
      return { error: `Erro ao fazer upload da imagem no Supabase: ${uploadError.message} (Verifique se o bucket 'imagens_noticias' existe e é público)` }
    }

    const { data: publicUrlData } = supabase.storage
      .from('imagens_noticias')
      .getPublicUrl(fileName)
      
    imagem_url = publicUrlData.publicUrl
  }

  const { error: insertError } = await supabase.from('noticias').insert([
    {
      titulo: validated.data.titulo,
      conteudo: validated.data.conteudo,
      categoria: validated.data.categoria,
      imagem_url,
      autor_id: user.id
    }
  ])

  if (insertError) {
    return { error: 'Erro ao criar a notícia no banco de dados.' }
  }

  // Enviar notificações em segundo plano (não bloqueia o redirect)
  enviarNotificacaoEmail(validated.data.titulo, validated.data.conteudo, validated.data.categoria, imagem_url)
  enviarNotificacaoTelegram(validated.data.titulo, validated.data.conteudo, validated.data.categoria, imagem_url)

  revalidatePath('/admin')
  redirect('/admin')
}

export async function editarNoticia(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autorizado.' }

  const id = formData.get('id') as string
  const titulo = formData.get('titulo') as string
  const conteudo = formData.get('conteudo') as string
  const categoria = formData.get('categoria') as string
  const imagem = formData.get('imagem') as File

  const validated = noticiaSchema.safeParse({ titulo, conteudo, categoria })
  if (!validated.success) return { error: validated.error.issues[0].message }

  let imagem_url: string | undefined = undefined

  if (imagem && imagem.size > 0) {
    const fileExt = imagem.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { error: uploadError } = await supabase.storage
      .from('imagens_noticias')
      .upload(fileName, imagem)

    if (uploadError) {
      return { error: `Erro ao fazer upload da imagem: ${uploadError.message}` }
    }

    const { data: publicUrlData } = supabase.storage
      .from('imagens_noticias')
      .getPublicUrl(fileName)
    imagem_url = publicUrlData.publicUrl
  }

  const updateData: any = {
    titulo: validated.data.titulo,
    conteudo: validated.data.conteudo,
    categoria: validated.data.categoria,
  }
  if (imagem_url) updateData.imagem_url = imagem_url

  const { error: updateError } = await supabase
    .from('noticias')
    .update(updateData)
    .eq('id', id)

  if (updateError) {
    return { error: `Erro ao atualizar a notícia: ${updateError.message}` }
  }

  revalidatePath('/admin')
  redirect('/admin')
}

export async function deletarNoticia(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const id = formData.get('id') as string

  await supabase.from('noticias').delete().eq('id', id)

  revalidatePath('/admin')
  redirect('/admin')
}
