"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadDocument(formData: FormData) {
  try {
    const supabase = await createClient();

    // Extrair os dados do FormData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const category = formData.get("category") as string;
    const arquivo = formData.get("file-upload") as File | null;

    if (!title || !category || !arquivo) {
      return { success: false, error: "Título, categoria e arquivo são obrigatórios." };
    }

    // Validar tamanho (ex: máximo 20MB para livros/PDFs grandes)
    if (arquivo.size > 20 * 1024 * 1024) {
      return { success: false, error: "O tamanho do arquivo não pode exceder 20MB." };
    }

    // Gerar um nome único
    const fileExt = arquivo.name.split('.').pop();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Upload para public_documents
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("public_documents")
      .upload(uniqueFileName, arquivo, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Erro no upload do arquivo:", uploadError);
      return { success: false, error: "Falha ao enviar o documento." };
    }

    const file_url = uploadData.path;

    // Inserir na tabela documents
    const { error: insertError } = await supabase
      .from("documents")
      .insert([
        {
          title,
          description,
          category,
          file_url,
        },
      ]);

    if (insertError) {
      console.error("Erro ao inserir na base de dados:", insertError);
      // Tentativa de rollback (remover o ficheiro)
      await supabase.storage.from("public_documents").remove([file_url]);
      return { success: false, error: "Falha ao gravar o registo do documento." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Erro inesperado no uploadDocument:", err);
    return { success: false, error: "Ocorreu um erro inesperado." };
  }
}
