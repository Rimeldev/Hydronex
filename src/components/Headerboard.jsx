import React, { useState, useRef, useEffect } from 'react';
import profil from '../assets/icons/profil.png';

const Headerboard = ({   title,
  activeCultures = [],
  selectedCulture,
  onCultureChange,
  farmerName,
onDateChange,
selectedDate, }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);



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
      <h1 className="text-2xl font-bold text-green-900 mb-4">
        {title} {selectedCulture ? `- ${selectedCulture}` : ""}
      </h1>

      <div className="flex justify-between items-center relative">
        <div className="flex items-center gap-4">
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

        {/* Image profil avec bouton */}
        <div className="relative " ref={menuRef}>
          <img
            src={profil}
            alt="Profil"
            className="h-10 cursor-pointer -mt-20 rounded-full" // remonte ac -mt-4 et style sympa
            onClick={() => setShowMenu(!showMenu)}
          />
 {/* Nom dynamique en dessous */}
          <span className="mt-1 text-sm font-medium cursor-pointer text-green-900" onClick={() => setShowMenu(!showMenu)}>{farmerName}</span>
          {/* Menu popup */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Mon compte
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Headerboard;
