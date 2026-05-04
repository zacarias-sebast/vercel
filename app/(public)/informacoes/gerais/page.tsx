import { createClient } from "@/lib/supabase/server";
import { BookOpen, Download, BookText } from "lucide-react";

export const metadata = {
  title: "Informação Geral e Livros | Antigos Combatentes do Uíge",
};

export const revalidate = 0; // Disable cache to always fetch latest documents

export default async function InformacaoGeralPage() {
  const supabase = await createClient();

  // Fetch documents from the 'documents' table with category 'informacao'
  const { data: documents, error } = await supabase
    .from("documents")
    .select("*")
    .eq("category", "informacao")
    .order("created_at", { ascending: false });

  // Helper function to get public URL
  const getPublicUrl = (path: string) => {
    return supabase.storage.from("public_documents").getPublicUrl(path).data.publicUrl;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Informação Geral e Livros</h1>
              <p className="text-gray-500 mt-1">Consulte as publicações, livros, manuais e outras informações relevantes.</p>
            </div>
          </div>

          <div className="p-8">
            {error ? (
              <div className="text-center py-12 text-red-500">
                Ocorreu um erro ao carregar as publicações. Tente novamente mais tarde.
              </div>
            ) : !documents || documents.length === 0 ? (
              <div className="text-center py-16">
                <BookText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Nenhum documento encontrado</h3>
                <p className="text-gray-500 mt-2">Ainda não existem publicações disponíveis nesta secção.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all bg-white group flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg group-hover:bg-indigo-100 transition-colors">
                          <BookText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2 line-clamp-2" title={doc.title}>
                            {doc.title}
                          </h3>
                          {doc.description && (
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                              {doc.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">
                        Publicado em {new Date(doc.created_at).toLocaleDateString('pt-PT')}
                      </span>
                      <a 
                        href={getPublicUrl(doc.file_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Aceder
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
