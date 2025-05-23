import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


const parametres = [
  "Température du sol",
  "Température de l’air",
  "Humidité du sol",
  "Humidité de l’air",
  "pH du sol",
  "Qualité de l’air"
];

export default function DashboardGraph(chartData) {
  const [parametreActif, setParametreActif] = useState("Température du sol");
  const data = chartData?.[parametreActif] || [];

  return (
    <div className="p-4">
      {/* Onglets des paramètres */}
      <div className="flex flex-wrap gap-2 mb-6">
        {parametres.map((param) => (
          <button
            key={param}
            onClick={() => setParametreActif(param)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-200 ${
              param === parametreActif
                ? "bg-green-800 text-white"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {param}
          </button>
        ))}
      </div>

      {/* Graphique */}
      <div className="w-full h-50 bg-white rounded-xl shadow p-2">
        <h2 className="text-lg font-semibold mb-4">{parametreActif}</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="valeur" stroke="#01872EFF" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
