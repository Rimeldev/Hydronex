import { useEffect, useState, useCallback } from "react";
import { X, MapPin, Search } from "lucide-react";

export default function DeviceFormModal({ onClose, onSubmit, device = null, isEdit = false }) {
  const [form, setForm] = useState({
    nom: "",
    localisation: "", // Contiendra les coordonnées "lat,lng"
    statut: "actif",
  });
  
  const [displayAddress, setDisplayAddress] = useState(""); // Pour afficher l'adresse à l'utilisateur
  
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Codes pays africains pour limiter la recherche
  const africanCountryCodes = [
    'dz', 'ao', 'bj', 'bw', 'bf', 'bi', 'cm', 'cv', 'cf', 'td', 'km', 'cg', 'cd', 
    'ci', 'dj', 'eg', 'gq', 'er', 'et', 'ga', 'gm', 'gh', 'gn', 'gw', 'ke', 'ls', 
    'lr', 'ly', 'mg', 'mw', 'ml', 'mr', 'mu', 'ma', 'mz', 'na', 'ne', 'ng', 'rw', 
    'st', 'sn', 'sc', 'sl', 'so', 'za', 'ss', 'sd', 'sz', 'tz', 'tg', 'tn', 'ug', 
    'zm', 'zw'
  ].join(',');

  // Fonction de géocodage inverse (coordonnées -> adresse)
  const reverseGeocode = useCallback(async (lat, lng) => {
    console.log('Début géocodage inverse pour:', lat, lng);
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
      console.log('URL appelée:', url);
      
      const response = await fetch(url);
      console.log('Statut réponse:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Données reçues:', data);
      
      if (data && data.display_name) {
        console.log('Adresse trouvée:', data.display_name);
        setDisplayAddress(data.display_name);
      } else {
        console.log('Pas de display_name dans la réponse');
        setDisplayAddress(`${lat}, ${lng}`);
      }
    } catch (error) {
      console.error('Erreur géocodage inverse:', error);
      // En cas d'erreur, garder les coordonnées comme fallback
      setDisplayAddress(`${lat}, ${lng}`);
    }
  }, []);

  // Fonction de géocodage avec useCallback pour éviter les re-renders
  const searchLocations = useCallback(async (query) => {
    if (query.length < 3) {
      setLocationSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      // Recherche limitée aux pays africains avec bounding box pour l'Afrique
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&countrycodes=${africanCountryCodes}&viewbox=-25,-40,65,40&bounded=1&addressdetails=1`
      );
      const data = await response.json();
      
      const suggestions = data.map(item => ({
        display_name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        place_id: item.place_id,
        country: item.address?.country || ''
      }));
      
      setLocationSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setLocationSuggestions([]);
    }
    setIsSearching(false);
  }, [africanCountryCodes]);

  // Pré-remplir le formulaire si on est en mode édition
  useEffect(() => {
    console.log('useEffect déclenché avec:', { isEdit, device });
    
    if (isEdit && device) {
      console.log('Objet device complet:', device);
      const coords = device.localisation; // Format "lat,lng"
      console.log('Coordonnées extraites:', coords, typeof coords);
      
      setForm({
        nom: device.nom || "",
        localisation: coords || "",
        statut: device.statut || "actif",
      });
      
      // Convertir les coordonnées en adresse pour l'affichage
      if (coords && typeof coords === 'string' && coords.includes(',')) {
        console.log('Coordonnées valides détectées:', coords);
        const parts = coords.split(',');
        console.log('Parties après split:', parts);
        const [lat, lng] = parts.map(Number);
        console.log('Lat/Lng après conversion:', lat, lng);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log('Tentative de géocodage inverse pour:', lat, lng);
          reverseGeocode(lat, lng);
        } else {
          console.log('Coordonnées invalides après conversion:', lat, lng);
          setDisplayAddress(coords);
        }
      } else {
        console.log('Pas de coordonnées valides:', coords, 'type:', typeof coords);
        setDisplayAddress(coords || "");
      }
    } else if (!isEdit) {
      console.log('Mode création - reset des champs');
      // Reset pour le mode création
      setForm({
        nom: "",
        localisation: "",
        statut: "actif",
      });
      setDisplayAddress("");
    } else {
      console.log('Conditions non remplies - isEdit:', isEdit, 'device:', device);
    }
  }, [isEdit, device, reverseGeocode]);

  // Debounce pour la recherche - corrigé avec les bonnes dépendances
  useEffect(() => {
    // Ne pas chercher si on vient de sélectionner une suggestion
    // ou si l'adresse correspond déjà à des coordonnées
    if (!displayAddress || form.localisation.includes(',')) {
      return;
    }

    const timer = setTimeout(() => {
      searchLocations(displayAddress);
    }, 500);

    return () => clearTimeout(timer);
  }, [displayAddress, searchLocations, form.localisation]);

  // Gestion du changement de champ
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'localisation') {
      setDisplayAddress(value);
      // Réinitialiser les coordonnées si l'utilisateur modifie l'adresse
      setForm(prev => ({ ...prev, localisation: "" }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Sélection d'une suggestion
  const handleLocationSelect = (suggestion) => {
    setDisplayAddress(suggestion.display_name);
    // Stocker les coordonnées dans l'attribut localisation
    setForm(prev => ({
      ...prev,
      localisation: `${suggestion.lat},${suggestion.lon}`
    }));
    setShowSuggestions(false);
    setLocationSuggestions([]);
  };

  // Validation des coordonnées (limitée à l'Afrique)
  const validateLocation = async () => {
    if (!displayAddress) return false;
    
    // Si déjà des coordonnées valides
    if (form.localisation && form.localisation.includes(',')) {
      const [lat, lng] = form.localisation.split(',').map(Number);
      // Vérifier que les coordonnées sont en Afrique (approximation)
      if (lat >= -40 && lat <= 40 && lng >= -25 && lng <= 65) {
        return true;
      }
    }

    // Si pas de coordonnées, essayer de géocoder avec restriction africaine
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(displayAddress)}&limit=1&countrycodes=${africanCountryCodes}&viewbox=-25,-40,65,40&bounded=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        
        // Double vérification des coordonnées africaines
        if (lat >= -40 && lat <= 40 && lng >= -25 && lng <= 65) {
          setForm(prev => ({
            ...prev,
            localisation: `${lat},${lng}`
          }));
          // Mettre à jour l'adresse affichée aussi
          setDisplayAddress(data[0].display_name);
          return true;
        }
      }
    } catch (error) {
      console.error('Erreur de validation:', error);
    }
    
    return false;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nom || !displayAddress || !form.statut) {
      alert("Tous les champs sont requis.");
      return;
    }

    // Valider la localisation (limité à l'Afrique)
    const isLocationValid = await validateLocation();
    if (!isLocationValid) {
      alert("Localisation non trouvée en Afrique. Veuillez saisir une adresse valide dans un pays africain.");
      return;
    }

    const payload = isEdit && device
      ? { ...form, id: device.id }
      : form;

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Titre */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEdit ? "Modifier le dispositif" : "Ajouter un nouveau dispositif"}
        </h2>

        {/* Contenu du formulaire */}
        <div className="space-y-4">
          {/* Champ Nom */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nom du dispositif</label>
            <input
              type="text"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Champ Localisation avec suggestions */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">
              Localisation
              {form.localisation && form.localisation.includes(',') && (
                <span className="ml-2 text-xs text-green-600">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  Adresse validée
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                name="localisation"
                value={displayAddress}
                onChange={handleChange}
                onFocus={() => setShowSuggestions(locationSuggestions.length > 0)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Saisir une adresse en Afrique (ex: Lagos, Nigeria)"
                required
              />
              <div className="absolute right-3 top-2.5">
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Search className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
            
            {/* Suggestions */}
            {showSuggestions && locationSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {locationSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.place_id || index}
                    type="button"
                    onClick={() => handleLocationSelect(suggestion)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm"
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-gray-700 line-clamp-2 block">
                          {suggestion.display_name}
                        </span>
                        {suggestion.country && (
                          <span className="text-xs text-blue-600 mt-1 block">
                            {suggestion.country}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Affichage des coordonnées (pour debug/info) */}
          {form.localisation && form.localisation.includes(',') && (
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              Coordonnées: {form.localisation}
            </div>
          )}

          {/* Champ Statut */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Statut</label>
            <select
              name="statut"
              value={form.statut}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isEdit ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}