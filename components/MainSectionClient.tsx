"use client";

import { NewsCard } from '@/components/NewsCard';
import { SubscribeForm } from '@/components/SubscribeForm';
import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';

interface MainSectionClientProps {
  noticias: any[];
  dbError: boolean;
  query: string;
  currentPage: number;
  totalPages: number;
}

export function MainSectionClient({ noticias, dbError, query, currentPage, totalPages }: MainSectionClientProps) {
  const { t } = useLanguage();

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">{t.news.latest}</h2>
            <div className="flex gap-2">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors">{t.news.all}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors hidden sm:block">{t.news.social}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors hidden sm:block">{t.news.events}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors hidden sm:block">{t.news.programs}</span>
            </div>
          </div>

          {dbError && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
              <p className="text-amber-700 text-sm font-medium">Aviso: Não foi possível conectar ao banco de dados. Exibindo dados de demonstração.</p>
            </div>
          )}

          {query && (
            <p className="mb-6 text-gray-600">{t.news.resultsFor} <span className="font-semibold text-gray-900">"{query}"</span></p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {noticias.length > 0 ? (
              noticias.map((noticia: any) => (
                <NewsCard
                  key={noticia.id}
                  id={noticia.id}
                  title={noticia.titulo}
                  category={noticia.categoria}
                  date={noticia.created_at || noticia.data}
                  imageUrl={noticia.imagem_url}
                  excerpt={noticia.conteudo?.substring(0, 120) + '...'}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                {t.news.notFound}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              {currentPage > 1 && (
                <Link 
                  href={`/?page=${currentPage - 1}${query ? `&query=${query}` : ''}`}
                  className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t.news.previous}
                </Link>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`/?page=${page}${query ? `&query=${query}` : ''}`}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white border border-blue-600' 
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </Link>
              ))}

              {currentPage < totalPages && (
                <Link 
                  href={`/?page=${currentPage + 1}${query ? `&query=${query}` : ''}`}
                  className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t.news.next}
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-8">
          <SubscribeForm />

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t.sidebar.officialNotices}</h3>
            <ul className="space-y-4">
              <li className="pb-4 border-b border-gray-100">
                <span className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1 block">{t.sidebar.important}</span>
                <a href="#" className="font-medium text-gray-900 hover:text-blue-700 transition-colors">Campanha de recadastramento de Antigos Combatentes</a>
              </li>
              <li className="pb-4 border-b border-gray-100">
                <span className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1 block">{t.sidebar.announcement}</span>
                <a href="#" className="font-medium text-gray-900 hover:text-blue-700 transition-colors">Entrega de benefícios sociais no município sede</a>
              </li>
              <li>
                <span className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1 block">{t.sidebar.event}</span>
                <a href="#" className="font-medium text-gray-900 hover:text-blue-700 transition-colors">Celebração do Dia dos Veteranos da Pátria</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
