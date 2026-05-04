import { MapPin } from "lucide-react";

export const metadata = {
  title: "Municípios | Antigos Combatentes do Uíge",
};

export default function MunicipiosPage() {
  const municipios = [
    "Ambuíla", "Bembe", "Buengas", "Bungo", "Damba", "Alto Cauale", 
    "Makela do Zombo", "Milunga", "Mukaba", "Negage", "Puri", "Kimbele",
    "Kitexe", "Sanza Pombo", "Songo", "Nsoso", "Alto Zaza", "Masau",
    "Sakandika", "Vista Alegre", "Kipedro", "Uíge"
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <MapPin className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Municípios do Uíge</h1>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
              <p className="text-lg">
                A província do Uíge é constituída por 23 municípios, reflectindo uma vasta e diversificada organização territorial e administrativa:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
                {municipios.map((municipio, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    {municipio}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
