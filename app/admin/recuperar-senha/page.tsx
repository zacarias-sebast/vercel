'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { resetPassword } from '@/app/actions/auth'
import { Shield, AlertCircle, Mail, SendHorizonal, CheckCircle2 } from 'lucide-react'

const initialState: { error?: string; success?: string } = {}

export default function RecuperarSenhaPage() {
  const [state, formAction, isPending] = useActionState(resetPassword, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0b1120 0%, #0f1f3d 50%, #0b1120 100%)' }}>

      <div style={{
        position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          animation: 'pulse 9s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.8; }
          50% { transform: translateX(-50%) scale(1.08); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .rec-card { animation: fadeUp 0.6s ease forwards; }
        .input-group { position: relative; }
        .input-group input {
          width: 100%; padding: 13px 16px 13px 44px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff; font-size: 14px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-sizing: border-box;
        }
        .input-group input::placeholder { color: rgba(255,255,255,0.35); }
        .input-group input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
          background: rgba(255,255,255,0.08);
        }
        .input-group input:disabled { opacity: 0.5; cursor: not-allowed; }
        .input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: rgba(255,255,255,0.35); pointer-events: none;
        }
        .submit-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border: none; border-radius: 10px;
          color: #fff; font-size: 15px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(59,130,246,0.4);
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.92; transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(59,130,246,0.5);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .back-link {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          font-size: 13px; color: rgba(255,255,255,0.4);
          text-decoration: none; margin-top: 20px;
          transition: color 0.2s;
        }
        .back-link:hover { color: rgba(255,255,255,0.8); }
        label { display: block; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.65); margin-bottom: 6px; }
      `}</style>

      <div className="rec-card" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
        }}>
          {/* Header */}
          <div style={{
            padding: '36px 36px 28px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '16px', margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #2563eb22, #1d4ed822)',
              border: '1px solid rgba(59,130,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(59,130,246,0.2)',
            }}>
              <Shield style={{ width: 28, height: 28, color: '#60a5fa' }} />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              Recuperar Senha
            </h1>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              Enviaremos um link para o seu e-mail
            </p>
          </div>

          {/* Content */}
          <div style={{ padding: '28px 36px 32px' }}>

            {state?.success ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                textAlign: 'center', padding: '8px 0 16px',
              }}>
                <CheckCircle2 style={{ width: 52, height: 52, color: '#34d399' }} />
                <p style={{ color: '#6ee7b7', fontSize: '14px', fontWeight: 500, margin: 0, lineHeight: '1.6' }}>
                  {state.success}
                </p>
                <Link href="/admin/login" style={{
                  marginTop: 8, padding: '11px 28px',
                  background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                  borderRadius: '10px', color: '#fff',
                  fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(59,130,246,0.3)',
                }}>
                  Voltar ao Login
                </Link>
              </div>
            ) : (
              <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: '0 0 4px', lineHeight: '1.6' }}>
                  Digite o e-mail da sua conta. Vamos enviar um link seguro para redefinir a sua senha.
                </p>

                <div>
                  <label htmlFor="email">E-mail institucional</label>
                  <div className="input-group">
                    <Mail className="input-icon" style={{ width: 16, height: 16 }} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled={isPending}
                      placeholder="admin@combatentesuige.ao"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {state?.error && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: '10px', padding: '12px 14px',
                    color: '#fca5a5', fontSize: '13px',
                  }}>
                    <AlertCircle style={{ width: 15, height: 15, flexShrink: 0, marginTop: 1 }} />
                    <p style={{ margin: 0 }}>{state.error}</p>
                  </div>
                )}

                <button type="submit" disabled={isPending} className="submit-btn">
                  {isPending
                    ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> Enviando...</>
                    : <><SendHorizonal style={{ width: 16, height: 16 }} /> Enviar Link</>}
                </button>
              </form>
            )}
          </div>
        </div>

        <Link href="/admin/login" className="back-link">
          ← Voltar ao login
        </Link>
      </div>
    </div>
  )
}
