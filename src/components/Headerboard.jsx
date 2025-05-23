import React, { useState, useRef, useEffect } from 'react';
import profil from '../assets/icons/profil.png';
import { useLocation } from 'react-router-dom';

const Headerboard = ({
  title,
  activeCultures = [],
  selectedCulture,
  onCultureChange,
  farmerName,
  onDateChange,
  selectedDate,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Pour fermer le menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-6 relative">
  {/* Titre principal dynamique */}
  <div className="flex justify-between items-start">
    <h1 className="text-2xl font-bold text-green-900 mb-4">
      {title} {selectedCulture ? `- ${selectedCulture}` : ""}
    </h1>

    {/* Profil aligné en haut à droite */}
    <div className="flex flex-col items-end mt-0" ref={menuRef}>
      <img
        src={profil}
        alt="Profil"
        className="h-10 cursor-pointer rounded-full"
        onClick={() => setShowMenu(!showMenu)}
      />
      <span
        className="mt-1 text-sm font-medium cursor-pointer text-green-900"
        onClick={() => setShowMenu(!showMenu)}
      >
        {farmerName}
      </span>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Mon compte
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Déconnexion
          </button>
        </div>
      )}
    </div>
  </div>

  {/* Filtres visibles uniquement sur le Dashboard */}
  {location.pathname === '/farmer/Dashboard' && (
    <div className="flex items-center gap-4 mt-4">
      <p>
        🌱 Cultures :{" "}
        <span className="text-green-700 font-bold">
          {activeCultures.length} active{activeCultures.length > 1 ? "s" : ""}
        </span>
      </p>

      <select
        className="border p-1 rounded"
        value={selectedCulture}
        onChange={(e) => onCultureChange(e.target.value)}
      >
        {activeCultures.map((culture, index) => (
          <option key={index} value={culture}>
            {culture}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="border p-1 rounded"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  )}
</div>
  );
};

export default Headerboard;
