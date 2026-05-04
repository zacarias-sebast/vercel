"use client";

import { Mail, Phone, MapPin, Send, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import { submitContactForm } from "@/app/actions/contactos";

export default function ContactosPage() {
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
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitResult({ success: true, message: "Mensagem enviada com sucesso! Entraremos em contacto em breve." });
        formRef.current?.reset();
        setFileName(null);
      } else {
        setSubmitResult({ success: false, message: result.error || "Ocorreu um erro ao enviar a mensagem." });
      }
    } catch (error) {
      setSubmitResult({ success: false, message: "Erro de rede. Tente novamente mais tarde." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contacto Connosco</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Para formalizar o envio da sua solicitação, esclarecimento ou sugestão, solicitamos o preenchimento dos campos indicados abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Endereço</h3>
                <p className="text-gray-600 text-sm">Edifício da Delegação Provincial<br />Uíge, Angola</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
                <p className="text-gray-600 text-sm">delegação.uige@mindenacvp.gov.ao</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Telefone</h3>
                <p className="text-gray-600 text-sm">+244 941 605 083</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

              {submitResult && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${submitResult.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {submitResult.success ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                  <p className="text-sm font-medium">{submitResult.message}</p>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="space-y-2">
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                      Nome <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Seu email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Telefone */}
                  <div className="space-y-2">
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      placeholder="Seu número de telefone"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                    />
                  </div>

                  {/* Assunto */}
                  <div className="space-y-2">
                    <label htmlFor="assunto" className="block text-sm font-medium text-gray-700">
                      Assunto
                    </label>
                    <select
                      id="assunto"
                      name="assunto"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none bg-white"
                    >
                      <option value="Sugestão">Sugestão</option>
                      <option value="Esclarecimento">Esclarecimento</option>
                      <option value="Reclamação">Reclamação</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                {/* Mensagem */}
                <div className="space-y-2">
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    required
                    placeholder="Informações..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none resize-none"
                  ></textarea>
                </div>

                {/* Anexar Documento */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Anexar documento <span className="text-gray-400 font-normal">(PDF, JPG, PNG – máx. 5MB)</span>
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
                            className="sr-only"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                          />
                        </label>
                        {!fileName && <p className="pl-2 flex items-center">ou arraste e solte</p>}
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

                {/* Botão de Enviar */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Solicitação
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
