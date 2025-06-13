// === DeviceDetailsModal.jsx ===
import { X, MapPin, Battery } from "lucide-react";
import { useEffect, useState } from "react";

export default function DeviceDetailsModal({ device, onClose }) {
  const [parameters, setParameters] = useState({
    pH: 6.8,
    temperature: 25,
    salinity: 0.3,
    turbidity: 12,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setParameters({
        pH: (6.5 + Math.random() * 0.5).toFixed(2),
        temperature: (24 + Math.random() * 2).toFixed(1),
        salinity: (0.2 + Math.random() * 0.2).toFixed(2),
        turbidity: (10 + Math.random() * 5).toFixed(1),
      });
    }, 1000); // MAJ toutes les secondes

    return () => clearInterval(interval);
  }, []);

  if (!device) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-brightness-90 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-1">{device.name}</h2>
  

        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          {device.location}
        </div>

            <div className="mb-4 text-gray-600">
        <div className="flex items-center gap-2 mb-1">
          <Battery className="w-4 h-4 shrink-0" />
          <span className="font-medium">Batterie :</span>
          <span className="font-semibold">{device.battery}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-green-500 rounded"
            style={{ width: `${device.battery}%` }}
          />
        </div>
      </div>


        <p className="text-sm font-semibold mb-1">Paramètres surveillés :</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(parameters).map(([key, value]) => (
            <span
              key={key}
              className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
            >
              {key} : {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
