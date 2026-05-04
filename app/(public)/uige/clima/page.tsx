import { CloudSun } from "lucide-react";

export const metadata = {
  title: "Clima | Antigos Combatentes do Uíge",
};

export default function ClimaPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <CloudSun className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Clima</h1>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
              <p className="text-lg">
                O clima é tropical húmido com uma temperatura média anual de 24ºC. 
              </p>
              <p className="text-lg">
                Quanto a estações, só é possível distinguir duas: o tempo quente, chuvoso, que vai de Setembro a Maio, e o de Junho a Agosto, período do cacimbo.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
