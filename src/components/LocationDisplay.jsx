import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

export default function LocationDisplay({ coordinates, maxLength = 50 }) {
  const [displayAddress, setDisplayAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fonction de géocodage inverse
  const reverseGeocode = async (lat, lng) => {
    setIsLoading(true);
    setError(false);
    
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.display_name) {
        // Raccourcir l'adresse si trop longue
        let address = data.display_name;
        if (address.length > maxLength) {
          // Essayer de garder les parties importantes (ville, pays)
          const parts = address.split(', ');
          if (parts.length >= 3) {
            address = `${parts[0]}, ${parts[parts.length - 1]}`;
          }
          // Si encore trop long, tronquer
          if (address.length > maxLength) {
            address = address.substring(0, maxLength - 3) + '...';
          }
        }
        setDisplayAddress(address);
      } else {
        throw new Error('Pas de données reçues');
      }
    } catch (error) {
      console.error('Erreur géocodage inverse:', error);
      setError(true);
      // Fallback : afficher les coordonnées de manière plus lisible
      setDisplayAddress(`${lat}°, ${lng}°`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!coordinates) {
      setDisplayAddress("Non définie");
      return;
    }

    // Vérifier le format des coordonnées
    if (typeof coordinates === 'string' && coordinates.includes(',')) {
      const parts = coordinates.split(',');
      if (parts.length === 2) {
        const lat = parseFloat(parts[0].trim());
        const lng = parseFloat(parts[1].trim());
        
        if (!isNaN(lat) && !isNaN(lng)) {
          // Délai pour éviter trop d'appels simultanés
          const timer = setTimeout(() => {
            reverseGeocode(lat, lng);
          }, Math.random() * 1000); // Délai aléatoire entre 0-1s
          
          return () => clearTimeout(timer);
        }
      }
    }
    
    // Si le format n'est pas reconnu
    setDisplayAddress(coordinates);
  }, [coordinates]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-1 text-gray-500">
        <div className="w-3 h-3 border border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        <span className="text-xs">Chargement...</span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-1" title={displayAddress}>
      <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
      <span className={`text-sm ${error ? 'text-gray-500' : 'text-gray-700'}`}>
        {displayAddress}
      </span>
    </div>
  );
}