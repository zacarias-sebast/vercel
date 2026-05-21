"use client";

import Link from 'next/link';
import { Shield, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useLanguage();

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const menuItems = [
    { name: t.nav.home, href: '/' },
    {
      name: t.nav.ministry,
      dropdown: [
        { name: t.nav.ministryMenu.profile, href: '/ministerio/perfil-titular' },
        { name: t.nav.ministryMenu.message, href: '/ministerio/mensagem-titular' },
        { name: t.nav.ministryMenu.titulars, href: '/ministerio/titulares-entidade' },
        { name: t.nav.ministryMenu.about, href: '/sobre' },
        { name: t.nav.ministryMenu.attributes, href: '/ministerio/atribuicoes' },
        { name: t.nav.ministryMenu.chart, href: '/ministerio/organograma' },
      ]
    },
    {
      name: t.nav.uige,
      dropdown: [
        { name: t.nav.uigeMenu.governor, href: '/uige/governadores' },
        { name: t.nav.uigeMenu.viceGovernor, href: '/uige/vice-governador' },
        { name: t.nav.uigeMenu.stateMinistry, href: '/uige/municipios' },
        { name: t.nav.uigeMenu.symbols, href: '/uige/simbolos-nacionais' },
        { name: t.nav.uigeMenu.climate, href: '/uige/clima' },
        { name: t.nav.uigeMenu.rivers, href: '/uige/rios' },
      ]
    },
    {
      name: t.nav.info,
      dropdown: [
        { name: t.nav.infoMenu.legislation, href: '/informacoes/legislacao' },
        { name: t.nav.infoMenu.publicity, href: '/informacoes/gerais' },
      ]
    },
    { name: t.nav.contacts, href: '/contactos' },
  ];

  return (
    <nav className="bg-[#0f172a] text-white border-b border-gray-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <img src="/logo.jpg" alt="logo" className='w-10 h-10 border border-gray-600 rounded-full' />
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none tracking-tight">Portal ACVP</span>
                <span className="text-sm text-blue-400 font-medium tracking-widest uppercase">do Uíge</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <button
                    className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium py-2"
                  >
                    {item.name} <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  </button>
                ) : (
                  <Link href={item.href!} className="text-gray-300 hover:text-white transition-colors text-sm font-medium py-2">
                    {item.name}
                  </Link>
                )}

                {item.dropdown && (
                  <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 ease-in-out text-gray-800">
                    {item.dropdown.map((dropItem, idx) => (
                      <Link
                        key={idx}
                        href={dropItem.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      >
                        {dropItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1e293b] border-t border-gray-800 absolute w-full max-h-[80vh] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {menuItems.map((item, index) => (
              <div key={index} className="border-b border-gray-700/50 last:border-0">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex justify-between w-full text-left py-3 text-base font-medium text-gray-300 hover:text-white"
                    >
                      {item.name}
                      <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-4 pb-3 space-y-2">
                        {item.dropdown.map((dropItem, idx) => (
                          <Link
                            key={idx}
                            href={dropItem.href}
                            className="block py-2 text-sm text-gray-400 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className="block py-3 text-base font-medium text-gray-300 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
