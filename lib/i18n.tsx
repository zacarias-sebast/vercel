"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

export const dictionaries = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre Nós',
      ministry: 'Delegação do Uíge',
      uige: 'Uíge',
      info: 'Informações',
      contacts: 'Contatos',
      ministryMenu: {
        profile: 'Perfil do titular dos AC/Uige',
        message: 'Mensagem do Titular',
        titulars: 'Titulares da Entidade',
        about: 'Sobre a Delegação',
        attributes: 'Atribuições',
        chart: 'Organograma'
      },
      uigeMenu: {
        governor: 'Governadores',
        viceGovernor: 'Vice-Governador',
        stateMinistry: 'Municípios',
        symbols: 'Símbolos Nacionais',
        map: 'Mapa',
        climate: 'Clima',
        flora: 'Flora',
        fauna: 'Fauna',
        rivers: 'Rios'
      },
      infoMenu: {
        legislation: 'Legislação',
        publicity: 'Informação Geral / Livros'
      }
    },
    hero: {
      title: 'Delegação Provincial dos\nAntigos Combatentes do Uíge',
      subtitle: 'Honrar, valorizar e apoiar todos os cidadãos que contribuíram para a luta de libertação nacional e defesa da pátria.',
      searchPlaceholder: 'Buscar notícias, comunicados, operações...',
      searchBtn: 'Buscar'
    },
    news: {
      latest: 'Últimas Notícias',
      all: 'Todas',
      social: 'Apoio Social',
      events: 'Eventos',
      programs: 'Programas',
      resultsFor: 'Resultados da busca para:',
      notFound: 'Nenhuma notícia encontrada.',
      next: 'Seguintes',
      previous: 'Anteriores'
    },
    sidebar: {
      officialNotices: 'Avisos Oficiais',
      important: 'Importante',
      announcement: 'Comunicado',
      event: 'Evento',
      subscribeTitle: 'Fique Atualizado',
      subscribeDesc: 'Receba as últimas notícias da Delegação Provincial diretamente no seu e-mail.',
      subscribeNamePlaceholder: 'Seu nome completo',
      subscribeEmailPlaceholder: 'Seu melhor e-mail',
      subscribeBtn: 'Inscrever-se',
      subscribingBtn: 'Inscrevendo...',
      subscribeTerms: 'Ao se inscrever, você concorda com nossos termos e política de privacidade.'
    },
    footer: {
      description: 'Honrando, valorizando e apoiando todos os cidadãos que contribuíram para a luta de libertação nacional e defesa da pátria.',
      quickAccess: 'Acesso Rápido',
      areas: 'Áreas de Atuação',
      contacts: 'Contatos',
      rights: 'Todos os direitos reservados.',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Uso',
      links: {
        news: 'Notícias',
        about: 'Sobre Nós',
        transparency: 'Transparência',
        legislation: 'Legislação',
        social: 'Apoio Social',
        pensions: 'Pensões e Subsídios',
        documents: 'Emissão de Documentos',
        reintegration: 'Reintegração Social'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      ministry: 'Delegation of Uíge',
      uige: 'Uíge',
      info: 'Information',
      contacts: 'Contacts',
      ministryMenu: {
        profile: 'Perfil do titular dos AC/Uige',
        message: 'Titular Message',
        titulars: 'Entity Titulars',
        about: 'About the Delegation',
        attributes: 'Attributes',
        chart: 'Organization Chart'
      },
      uigeMenu: {
        governor: 'Governors',
        viceGovernor: 'Vice-Governor',
        stateMinistry: 'Municipalities',
        symbols: 'National Symbols',
        map: 'Map',
        climate: 'Climate',
        flora: 'Flora',
        fauna: 'Fauna',
        rivers: 'Rivers'
      },
      infoMenu: {
        legislation: 'Legislation',
        publicity: 'General Info / Books'
      }
    },
    hero: {
      title: 'Provincial Delegation of\nFormer Combatants of Uíge',
      subtitle: 'Honor, value and support all citizens who contributed to the national liberation struggle and defense of the homeland.',
      searchPlaceholder: 'Search news, announcements, operations...',
      searchBtn: 'Search'
    },
    news: {
      latest: 'Latest News',
      all: 'All',
      social: 'Social Support',
      events: 'Events',
      programs: 'Programs',
      resultsFor: 'Search results for:',
      notFound: 'No news found.',
      next: 'Next',
      previous: 'Previous'
    },
    sidebar: {
      officialNotices: 'Official Notices',
      important: 'Important',
      announcement: 'Announcement',
      event: 'Event',
      subscribeTitle: 'Stay Updated',
      subscribeDesc: 'Receive the latest news from the Provincial Delegation directly in your email.',
      subscribeNamePlaceholder: 'Your full name',
      subscribeEmailPlaceholder: 'Your best email',
      subscribeBtn: 'Subscribe',
      subscribingBtn: 'Subscribing...',
      subscribeTerms: 'By subscribing, you agree to our terms and privacy policy.'
    },
    footer: {
      description: 'Honoring, valuing and supporting all citizens who contributed to the national liberation struggle and defense of the homeland.',
      quickAccess: 'Quick Access',
      areas: 'Areas of Activity',
      contacts: 'Contacts',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      links: {
        news: 'News',
        about: 'About Us',
        transparency: 'Transparency',
        legislation: 'Legislation',
        social: 'Social Support',
        pensions: 'Pensions and Subsidies',
        documents: 'Document Issuance',
        reintegration: 'Social Reintegration'
      }
    }
  }
};

type Dictionary = typeof dictionaries.pt;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load preference from localStorage on mount
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: dictionaries[language]
  };

  if (!mounted) {
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
