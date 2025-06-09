import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useState } from 'react';

const PARAM_COLORS = {
  salinity: "#3b82f6",
  temperature: "#f97316",
  pH: "#10b981",
  turbidity: "#8b5cf6",
};

const ParameterChart = ({ data }) => {
  const [selectedParam, setSelectedParam] = useState("salinity");

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      {/* Titre + Sélecteur */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Évolution sur 24h</h3>
        <select
          className="mt-2 sm:mt-0 bg-gray-100 px-3 py-1.5 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none"
          value={selectedParam}
          onChange={(e) => setSelectedParam(e.target.value)}
        >
          {Object.keys(PARAM_COLORS).map((param) => (
            <option key={param} value={param}>
              {param.charAt(0).toUpperCase() + param.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Graphique */}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={selectedParam}
            stroke={PARAM_COLORS[selectedParam]}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParameterChart;
