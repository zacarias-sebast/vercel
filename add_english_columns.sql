-- Adiciona suporte a inglês na tabela de noticias
ALTER TABLE public.noticias 
ADD COLUMN IF NOT EXISTS titulo_en TEXT,
ADD COLUMN IF NOT EXISTS conteudo_en TEXT;

-- Adiciona suporte a inglês na tabela de documentos (documents)
ALTER TABLE public.documents 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT;

-- Adiciona suporte a inglês na tabela de paginas institucionais
ALTER TABLE public.paginas_institucionais 
ADD COLUMN IF NOT EXISTS titulo_en TEXT,
ADD COLUMN IF NOT EXISTS conteudo_en TEXT;
