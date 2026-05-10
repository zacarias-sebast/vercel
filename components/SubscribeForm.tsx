'use client'

import { useActionState, useEffect, useRef } from 'react'
import { subscribeToNewsletter } from '@/app/actions/subscribe'
import type { ActionState } from '@/app/types/actions'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

const initialState: ActionState = {
  error: '',
  success: '',
}

export function SubscribeForm() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.sidebar.subscribeTitle}</h3>
        <p className="text-gray-600">{t.sidebar.subscribeDesc}</p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <label htmlFor="nome" className="sr-only">{t.sidebar.subscribeNamePlaceholder}</label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-500"
            placeholder={t.sidebar.subscribeNamePlaceholder}
            disabled={isPending}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="sr-only">{t.sidebar.subscribeEmailPlaceholder}</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-500"
            placeholder={t.sidebar.subscribeEmailPlaceholder}
            disabled={isPending}
          />
        </div>

        {state.error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{state.error}</p>
          </div>
        )}

        {state.success && (
          <div className="flex items-center gap-2 text-green-700 text-sm bg-green-50 p-3 rounded-lg">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <p>{state.success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? t.sidebar.subscribingBtn : (
            <>
              {t.sidebar.subscribeBtn} <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
      
      <p className="text-xs text-center text-gray-500 mt-4">
        {t.sidebar.subscribeTerms}
      </p>
    </div>
  )
}
