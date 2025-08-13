import { useEffect, useState } from "react";
import { fetchDeviceLocations, fetchRealTimeData } from "../services/deviceService";

const HeaderDashboard = ({ onFilterChange }) => {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [deviceId, setDeviceId] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [devices, setDevices] = useState([]);
  const [deviceAddresses, setDeviceAddresses] = useState({}); // Cache des adresses

  const batteryColor =
    batteryLevel > 60
      ? "bg-green-500"
      : batteryLevel > 30
      ? "bg-yellow-400"
      : "bg-red-500";

  // Fonction de géocodage inverse
  const reverseGeocode = async (lat, lng) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.display_name) {
        // Raccourcir l'adresse pour le select
        let address = data.display_name;
        const parts = address.split(', ');
        if (parts.length >= 2) {
          // Garder seulement la ville et le pays
          address = `${parts[0]}, ${parts[parts.length - 1]}`;
        }
        // Si encore trop long, tronquer
        if (address.length > 30) {
          address = address.substring(0, 27) + '...';
        }
        return address;
      }
      return null;
    } catch (error) {
      console.error('Erreur géocodage inverse:', error);
      return null;
    }
  };

  // Convertir les coordonnées en adresses pour tous les dispositifs
  const convertCoordinatesToAddresses = async (devicesData) => {
    const addressPromises = devicesData.map(async (device) => {
      if (device.localisation && typeof device.localisation === 'string' && device.localisation.includes(',')) {
        const parts = device.localisation.split(',');
        if (parts.length === 2) {
          const lat = parseFloat(parts[0].trim());
          const lng = parseFloat(parts[1].trim());
          
          if (!isNaN(lat) && !isNaN(lng)) {
            // Délai aléatoire pour éviter de surcharger l'API
            await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
            const address = await reverseGeocode(lat, lng);
            return { id: device.id, address: address || `${lat}°, ${lng}°` };
          }
        }
      }
      return { id: device.id, address: device.localisation || "Non définie" };
    });

    const results = await Promise.all(addressPromises);
    const addressMap = {};
    results.forEach(result => {
      addressMap[result.id] = result.address;
    });
    
    setDeviceAddresses(addressMap);
  };

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const data = await fetchDeviceLocations();
        setDevices(data);
        // Convertir les coordonnées en adresses
        if (data.length > 0) {
          convertCoordinatesToAddresses(data);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des dispositifs :", err);
      }
    };
    loadDevices();
  }, []);

  useEffect(() => {
    onFilterChange({ dispositifId: deviceId, date });
  }, [deviceId, date, onFilterChange]);

  useEffect(() => {
    if (!deviceId) {
      setBatteryLevel(null);
      return;
    }
    const fetchBattery = async () => {
      try {
        const data = await fetchRealTimeData(deviceId);
        setBatteryLevel(data.battery_level);
      } catch (err) {
        console.error("Erreur en récupérant les données temps réel :", err);
      }
    };
    fetchBattery();
  }, [deviceId]);

  return (
    <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-4 bg-gray-300 rounded-sm">
          <div
            className={`h-full rounded-sm ${batteryColor}`}
            style={{ width: `${batteryLevel ?? 0}%` }}
          />
          <div className="absolute top-1 left-full w-1.5 h-2 bg-gray-300 rounded-r-sm ml-0.5" />
        </div>
        <span className="text-sm font-medium">
          {batteryLevel !== null ? `${batteryLevel}%` : "--"}
        </span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dispositif</label>
        <select
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          className="bg-gray-100 text-sm px-4 py-2 rounded-lg shadow-sm min-w-64"
        >
          <option value="">-- Choisir un dispositif --</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.nom} – {deviceAddresses[device.id] || "Chargement..."}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-100 text-sm px-4 py-2 rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
};

export default HeaderDashboard;