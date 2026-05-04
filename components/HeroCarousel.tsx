"use client";

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLanguage } from '@/lib/i18n';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';


const SLIDES = [
  { src: "/reuniao1.jpg", label: "Slide 1" },
  { src: "/reuniao2.jpg", label: "Slide 2" },
  { src: "/reuniao3.jpg", label: "Slide 3" },
  { src: "/reuniao1.jpg", label: "Slide 4" },
];

export function HeroCarousel({ defaultQuery = '' }: { defaultQuery?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 10000 })]);
  const { t } = useLanguage();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative bg-[#0b1120] text-white overflow-hidden h-[450px] group">
      {/* Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] h-full">
              {/* Imagem de fundo a preencher completamente */}
              <img
                src={slide.src}
                alt={slide.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay escuro para o texto ficar legível */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Content overlay (Centered) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pointer-events-auto flex flex-col items-center text-center">
          <div className="max-w-3xl w-full flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight whitespace-pre-line">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed text-justify w-full max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            {/* Search Bar */}
            <form className="relative w-full max-w-2xl mx-auto" action="/" method="GET">
              <input
                type="text"
                name="query"
                defaultValue={defaultQuery}
                placeholder={t.hero.searchPlaceholder}
                className="w-full pl-12 pr-32 py-4 rounded-full bg-white/15 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 backdrop-blur-sm transition-all text-left"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                {t.hero.searchBtn}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
        aria-label="Próximo"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </section>
  );
}
