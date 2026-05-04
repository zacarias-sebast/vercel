"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Save } from "lucide-react";
import { uploadDocument } from "@/app/actions/documentos";

export default function NovoDocumentoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await uploadDocument(formData);
      
      if (result.success) {
        setSubmitResult({ success: true, message: "Documento adicionado com sucesso!" });
        formRef.current?.reset();
        setFileName(null);
      } else {
        setSubmitResult({ success: false, message: result.error || "Ocorreu um erro ao adicionar o documento." });
      }
    } catch (error) {
      setSubmitResult({ success: false, message: "Erro de rede. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Adicionar Novo Documento</h1>
          <p className="text-gray-500 text-sm">Faça upload de livros, PDFs ou legislação para o portal público.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {submitResult && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${submitResult.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {submitResult.success ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <p className="text-sm font-medium">{submitResult.message}</p>
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título do Documento <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Ex: Diário da República, Livro de História..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Breve Descrição
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Um pequeno resumo sobre o conteúdo do documento..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none resize-none text-gray-900 placeholder:text-gray-400"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Categoria <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none bg-white text-gray-900"
            >
              <option value="legislacao">Legislação</option>
              <option value="informacao">Informação Geral / Livros</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Anexar Arquivo <span className="text-gray-400 font-normal">(PDF, DOC, EPUB – máx. 20MB)</span> <span className="text-red-500">*</span>
            </label>
            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors group ${fileName ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500 bg-gray-50'}`}>
              <div className="space-y-1 text-center">
                <Upload className={`mx-auto h-12 w-12 transition-colors ${fileName ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'}`} />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none px-2 py-1"
                  >
                    <span>{fileName ? 'Mudar arquivo' : 'Escolher arquivo'}</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      required
                      className="sr-only" 
                      accept=".pdf,.doc,.docx,.epub"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-2">
                  {fileName ? (
                    <span className="text-blue-600">{fileName}</span>
                  ) : (
                    "Nenhum arquivo escolhido"
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#0b1120] hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  A Guardar...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvar Documento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
