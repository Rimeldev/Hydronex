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

// Données simulées pour chaque paramètre (à remplacer plus tard par les données du backend)
const mockData = {
  "Température du sol": [
    { date: "14 mai", valeur: 20 },
    { date: "15 mai", valeur: 22 },
    { date: "16 mai", valeur: 19 },
    { date: "17 mai", valeur: 21 },
    { date: "18 mai", valeur: 23 },
  ],
  "Température de l’air": [
    { date: "14 mai", valeur: 25 },
    { date: "15 mai", valeur: 26 },
    { date: "16 mai", valeur: 24 },
    { date: "17 mai", valeur: 27 },
    { date: "18 mai", valeur: 28 },
  ],
  "Humidité du sol": [
    { date: "14 mai", valeur: 55 },
    { date: "15 mai", valeur: 58 },
    { date: "16 mai", valeur: 53 },
    { date: "17 mai", valeur: 60 },
    { date: "18 mai", valeur: 62 },
  ],
  "Humidité de l’air": [
    { date: "14 mai", valeur: 45 },
    { date: "15 mai", valeur: 50 },
    { date: "16 mai", valeur: 48 },
    { date: "17 mai", valeur: 52 },
    { date: "18 mai", valeur: 49 },
  ],
  "pH du sol": [
    { date: "14 mai", valeur: 6.5 },
    { date: "15 mai", valeur: 6.6 },
    { date: "16 mai", valeur: 6.4 },
    { date: "17 mai", valeur: 6.7 },
    { date: "18 mai", valeur: 6.5 },
  ],
  "Qualité de l’air": [
    { date: "14 mai", valeur: 80 },
    { date: "15 mai", valeur: 78 },
    { date: "16 mai", valeur: 82 },
    { date: "17 mai", valeur: 79 },
    { date: "18 mai", valeur: 81 },
  ]
};

export default function DashboardGraph() {
  const [parametreActif, setParametreActif] = useState("Température du sol");

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
          <LineChart data={mockData[parametreActif]}>
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
