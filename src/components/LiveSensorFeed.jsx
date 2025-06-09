import { useEffect, useState } from 'react';

export default function LiveSensorFeed({ sensorData }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sensorData.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [sensorData]);

  const current = sensorData[index];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Flux en temps réel</h3>
      <div className="flex justify-between text-sm text-gray-800 font-mono">
        <p><strong>Heure :</strong> {current.time}</p>
        <p><strong>Salinité :</strong> {current.salinity} psu</p>
        <p><strong>T° :</strong> {current.temperature}°C</p>
        <p><strong>pH :</strong> {current.pH}</p>
        <p><strong>Turbidité :</strong> {current.turbidity} NTU</p>
      </div>
    </div>
  );
}
