-- Criação da tabela para armazenar os dados das páginas institucionais
CREATE TABLE IF NOT EXISTS public.paginas_institucionais (
    slug TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    imagem_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativar RLS
ALTER TABLE public.paginas_institucionais ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
-- Permitir leitura pública
CREATE POLICY "Permitir leitura publica de paginas institucionais"
ON public.paginas_institucionais FOR SELECT
USING (true);

-- Permitir inserção por usuários autenticados
CREATE POLICY "Permitir insercao por admins"
ON public.paginas_institucionais FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Permitir atualização por usuários autenticados
CREATE POLICY "Permitir atualizacao por admins"
ON public.paginas_institucionais FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Inserir os slugs padrão para as páginas
INSERT INTO public.paginas_institucionais (slug, titulo, conteudo) VALUES
('perfil-titular', 'Perfil do titular dos AC/Uige', 'Conteúdo provisório...'),
('mensagem-titular', 'Mensagem do Titular', 'Conteúdo provisório...'),
('titulares-entidade', 'Titulares da Entidade', 'Conteúdo provisório...'),
('atribuicoes', 'Atribuições', 'Conteúdo provisório...'),
('estrutura-organica', 'Estrutura Orgânica', 'Conteúdo provisório...'),
('organograma', 'Organograma', 'Conteúdo provisório...')
ON CONFLICT (slug) DO NOTHING;
