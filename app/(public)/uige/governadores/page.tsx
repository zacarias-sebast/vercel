import { History } from "lucide-react";

export const metadata = {
  title: "Histórico dos Governadores | Antigos Combatentes do Uíge",
};

export default function GovernadoresPage() {
  const governadores = [
    { period: "1975 – 1976", name: "Hoch MinHistória" },
    { period: "1976 – 1977", name: "Simão Bráz" },
    { period: "1977 – 1978", name: "Ambrósio Lukoki" },
    { period: "1978 – 1979", name: "Massunga Kota" },
    { period: "1979 – 1980", name: "Lamvo Emmanuel Norman" },
    { period: "1980 – 1984", name: "Manuel Quarta Punza" },
    { period: "1984 – 1988", name: "Zeferino Estevão Juliana" },
    { period: "1988 – 1989", name: "Domingos Mutaleno" },
    { period: "1989 – 1990", name: "Geremias A. Dumbo" },
    { period: "1991 – 1995", name: "José Aníbal Lopes Rocha" },
    { period: "1995 – 1998", name: "Serafim Cananito Alexandre" },
    { period: "1998 – 2002", name: "Cordeiro Ernesto Nzakundomba" },
    { period: "2002 – 2004", name: "Lázaro Xixima" },
    { period: "2004 – 2008", name: "António Bento Cangulo" },
    { period: "2008 – 2009", name: "Mawete João Baptista" },
    { period: "2009 – 2017", name: "Paulo Pombolo" },
    { period: "2017 – 2020", name: "Pinda Simão" },
    { period: "2020 – 2020", name: "Sérgio Luther Rescova Joaquim" },
    { period: "2020 – Presente", name: "José Carvalho da Rocha" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <History className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Histórico dos Governadores do Uíge</h1>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider w-1/3">
                        Período
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Nome
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {governadores.map((gov, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {gov.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {gov.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 italic mt-4">Fonte: Via gov.uige</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
