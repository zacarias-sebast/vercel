"use client";

import { useLanguage } from '@/lib/i18n';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium uppercase"
      >
        <Globe className="w-4 h-4" />
        {language}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 text-gray-800">
          <button 
            onClick={() => { setLanguage('pt'); setIsOpen(false); }}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${language === 'pt' ? 'font-bold text-blue-600' : ''}`}
          >
            Português (PT)
          </button>
          <button 
            onClick={() => { setLanguage('en'); setIsOpen(false); }}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${language === 'en' ? 'font-bold text-blue-600' : ''}`}
          >
            English (EN)
          </button>
        </div>
      )}
    </div>
  );
}
