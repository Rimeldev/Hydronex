import { useState } from 'react';
import { BellAlertIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function RecentAlertCard({ alert }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const hasAlert = !!alert;

  const bgColor = hasAlert
    ? 'bg-red-100 hover:bg-red-200 border-red-500 text-red-700'
    : 'bg-green-100 hover:bg-green-200 border-green-500 text-green-700';
  const Icon = hasAlert ? BellAlertIcon : CheckCircleIcon;
  const title = hasAlert ? alert.title : 'Aucune alerte';
  const message = hasAlert ? alert.message : 'Tout est sous contrôle.';
  const timestamp = hasAlert ? alert.timestamp : 'À jour';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tu peux remplacer cette ligne par un appel à une API
    console.log('Nom:', formData.name, 'Email:', formData.email);
    setShowPopup(false);
  };

  return (
    <>
      <div
        className={`cursor-pointer border-l-4 p-4 rounded-md shadow-sm flex flex-col gap-2 ${bgColor}`}
        onClick={() => navigate("/recommendations")}
      >
        <div className="flex items-start gap-3">
          <Icon className="h-6 w-6 mt-0.5" />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-gray-700">{message}</p>
            <p className="text-xs text-gray-500 italic mt-1">{timestamp}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Empêche la redirection
            setShowPopup(true);
          }}
          className="mt-2 self-start text-xs text-blue-600 underline hover:text-blue-800"
        >
          Rester alerté
        </button>
      </div>

      {/* Popup */}
    {showPopup && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center">
    {/* Overlay sombre flou */}
    <div
      className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      onClick={() => setShowPopup(false)}
    />

    {/* Carte du popup */}
    <div className="relative z-[10000] bg-white border shadow-lg rounded-lg p-6 w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4">Recevoir les alertes</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nom"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowPopup(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </>
  );
}
