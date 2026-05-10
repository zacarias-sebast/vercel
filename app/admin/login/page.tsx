'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { login } from '@/app/actions/auth'
import type { ActionState } from '@/app/types/actions'
import { Shield, AlertCircle, LogIn, Eye, EyeOff, Mail, Lock } from 'lucide-react'

const initialState: ActionState = { error: '', success: '' }

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0b1120 0%, #0f1f3d 50%, #0b1120 100%)' }}>

      {/* Animated background blobs */}
      <div style={{
        position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          animation: 'pulse 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          animation: 'pulse 10s ease-in-out infinite 2s',
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .login-card { animation: fadeUp 0.6s ease forwards; }
        .input-group { position: relative; }
        .input-group input {
          width: 100%; padding: 13px 16px 13px 44px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 14px;
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
        .toggle-pw {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.4); padding: 0; display: flex; align-items: center;
        }
        .toggle-pw:hover { color: rgba(255,255,255,0.8); }
        .submit-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #2563eb, #4f46e5);
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
        .divider { display: flex; align-items: center; gap: 12px; margin: 8px 0; }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1);
        }
        .divider span { font-size: 12px; color: rgba(255,255,255,0.3); white-space: nowrap; }
        .aux-link {
          display: flex; align-items: center; justify-content: center;
          width: 100%; padding: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: rgba(255,255,255,0.65);
          font-size: 14px; font-weight: 500;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .aux-link:hover {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.08);
          color: #a5b4fc;
        }
        label { display: block; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.65); margin-bottom: 6px; }
      `}</style>

      <div className="login-card" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}>
        {/* Card */}
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
              background: 'linear-gradient(135deg, #2563eb22, #4f46e522)',
              border: '1px solid rgba(59,130,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(59,130,246,0.2)',
            }}>
              <Shield style={{ width: 28, height: 28, color: '#60a5fa' }} />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              Painel Administrativo
            </h1>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              Antigos Combatentes do Uíge
            </p>
          </div>

          {/* Form */}
          <div style={{ padding: '28px 36px 32px' }}>
            <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

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

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label htmlFor="password" style={{ margin: 0 }}>Senha</label>
                  <Link
                    href="/admin/recuperar-senha"
                    style={{ fontSize: '12px', color: '#60a5fa', textDecoration: 'none', fontWeight: 500 }}
                  >
                    Esqueci minha senha
                  </Link>
                </div>
                <div className="input-group">
                  <Lock className="input-icon" style={{ width: 16, height: 16 }} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={isPending}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    style={{ paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword
                      ? <EyeOff style={{ width: 16, height: 16 }} />
                      : <Eye style={{ width: 16, height: 16 }} />}
                  </button>
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

              <button type="submit" disabled={isPending} className="submit-btn" style={{ marginTop: '4px' }}>
                {isPending
                  ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> Entrando...</>
                  : <><LogIn style={{ width: 16, height: 16 }} /> Entrar no Painel</>
                }
              </button>
            </form>

            <div className="divider" style={{ marginTop: '24px' }}>
              <span>Recuperar acesso</span>
            </div>

            <Link href="/admin/recuperar-senha" className="aux-link" style={{ marginTop: '12px' }}>
              Recuperar senha
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.2)', marginTop: '20px' }}>
          Área de acesso restrito ao pessoal autorizado
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
