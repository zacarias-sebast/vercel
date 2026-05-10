'use client'

import Link from 'next/link'
import { Mail, CheckCircle2, ArrowLeft, Clock } from 'lucide-react'

export default function ConfirmarEmailPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #0b1120 0%, #0f1f3d 50%, #0b1120 100%)' }}
    >
      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          animation: 'pulse 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .card { animation: fadeUp 0.6s ease forwards; }
        .mail-icon { animation: float 3s ease-in-out infinite; }
        .back-link {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          font-size: 13px; color: rgba(255,255,255,0.35);
          text-decoration: none; margin-top: 20px;
          transition: color 0.2s;
        }
        .back-link:hover { color: rgba(255,255,255,0.7); }
        .step {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
        }
        .step-num {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #10b981, #059669);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #fff;
        }
      `}</style>

      <div className="card" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '460px' }}>
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
            padding: '40px 36px 28px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {/* Icon with glow */}
            <div className="mail-icon" style={{
              width: '72px', height: '72px', borderRadius: '20px',
              margin: '0 auto 20px',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.2))',
              border: '1px solid rgba(16,185,129,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 32px rgba(16,185,129,0.25)',
            }}>
              <Mail style={{ width: 34, height: 34, color: '#34d399' }} />
            </div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: '20px', padding: '4px 12px', marginBottom: '14px',
            }}>
              <CheckCircle2 style={{ width: 13, height: 13, color: '#34d399' }} />
              <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 600 }}>Cadastro realizado com sucesso</span>
            </div>

            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
              Verifique o seu e-mail
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>
              Enviámos um e-mail de confirmação para o endereço que registou. 
              Clique no link para activar a sua conta.
            </p>
          </div>

          {/* Steps */}
          <div style={{ padding: '28px 36px 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>
              O que fazer a seguir
            </p>

            <div className="step">
              <div className="step-num">1</div>
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#fff' }}>Abra a sua caixa de e-mail</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Verifique também a pasta de spam ou lixo.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-num">2</div>
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#fff' }}>Clique no link de confirmação</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>O link é válido por 24 horas.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-num">3</div>
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#fff' }}>Aceda ao painel administrativo</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Após confirmar, faça login com as suas credenciais.</p>
              </div>
            </div>

            {/* Warning */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '10px',
              background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '10px', padding: '12px 14px', marginTop: '4px',
            }}>
              <Clock style={{ width: 15, height: 15, color: '#fbbf24', flexShrink: 0, marginTop: 1 }} />
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(251,191,36,0.85)', lineHeight: 1.5 }}>
                Não confirme o e-mail = sem acesso ao sistema. Caso não receba o e-mail, verifique o spam ou use a opção "Esqueci minha senha" para reenviar o link.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/admin/login"
              style={{
                marginTop: '8px', padding: '13px',
                background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                borderRadius: '10px', color: '#fff',
                fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                textAlign: 'center', display: 'block',
                boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
                transition: 'opacity 0.2s',
              }}
            >
              Ir para o Login
            </Link>
          </div>
        </div>

        <Link href="/admin/login" className="back-link">
          <ArrowLeft style={{ width: 14, height: 14 }} /> Voltar ao login
        </Link>
      </div>
    </div>
  )
}
