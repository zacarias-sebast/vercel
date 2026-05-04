"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactForm(formData: FormData) {
  try {
    const supabase = await createClient();

    // Extrair os dados do FormData
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string | null;
    const assunto = formData.get("assunto") as string;
    const mensagem = formData.get("mensagem") as string;
    const arquivo = formData.get("file-upload") as File | null;

    if (!nome || !email || !assunto || !mensagem) {
      return { success: false, error: "Preencha todos os campos obrigatórios." };
    }

    let arquivo_url = null;

    // Se existir um ficheiro anexado, fazer upload para o bucket
    if (arquivo && arquivo.size > 0) {
      // Validar tamanho (máximo 5MB)
      if (arquivo.size > 5 * 1024 * 1024) {
        return { success: false, error: "O tamanho do arquivo não pode exceder 5MB." };
      }

      // Gerar um nome único para o ficheiro para evitar substituições
      const fileExt = arquivo.name.split('.').pop();
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Fazer upload do ficheiro usando o Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("contact_documents")
        .upload(uniqueFileName, arquivo, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Erro no upload do arquivo:", uploadError);
        return { success: false, error: "Falha ao enviar o arquivo anexo." };
      }

      arquivo_url = uploadData.path;
    }

    // Inserir os dados na tabela contact_messages
    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert([
        {
          nome,
          email,
          telefone,
          assunto,
          mensagem,
          arquivo_url,
        },
      ]);

    if (insertError) {
      console.error("Erro ao inserir na base de dados:", insertError);
      return { success: false, error: "Falha ao gravar a mensagem no sistema." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Erro inesperado no submitContactForm:", err);
    return { success: false, error: "Ocorreu um erro inesperado." };
  }
}
