import { Droplets } from "lucide-react";

export const metadata = {
  title: "Rios | Antigos Combatentes do Uíge",
};

export default function RiosPage() {
  const rios = [
    "loé", "Lungunga", "kangombe", "kamatandala", "Candombe", 
    "Kifuti", "kakonda", "Ndua", "kulo", "Lukoka", 
    "kagigi", "Mbassassa", "Mbuégi", "Camcungo", "Lukishi"
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <Droplets className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Rios Existentes no Município do Uíge</h1>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
              <p className="text-lg">
                No que tange a bacia hidrográfica do município do Uíge, o município é atravessado por vários rios que são um forte potencial de recursos hidrográficos, nomeadamente:
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {rios.map((rio, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-100 font-medium capitalize shadow-sm"
                  >
                    {rio}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
