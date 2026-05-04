"use client";

import Link from 'next/link'
import { Mail, Phone, MapPin, Shield } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#0b1120] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">

              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none tracking-tight text-white">Antigos Combatentes</span>
                <span className="text-sm text-blue-400 font-medium tracking-widest uppercase">do Uíge</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Facebook</a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{t.footer.quickAccess}</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">{t.footer.links.news}</Link></li>
              <li><Link href="/sobre" className="text-gray-400 hover:text-white transition-colors text-sm">{t.footer.links.about}</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t.footer.links.transparency}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t.footer.links.legislation}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{t.footer.areas}</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t.footer.links.social}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t.footer.links.pensions}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t.footer.links.documents}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{t.footer.links.reintegration}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{t.footer.contacts}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">Uíge, Angola</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-sm text-gray-400">(+244) 941 605 083</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-sm text-gray-400">delegação.uige@mindenacvp.gov.ao</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Delegação Provincial dos Antigos Combatentes do Uíge. {t.footer.rights}
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/termos" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link href="/termos" className="hover:text-white transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
