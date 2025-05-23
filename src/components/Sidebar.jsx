import { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";
import culture from "../assets/icons/culture.png";
import dashboard from "../assets/icons/dashboard.png";
import exporter from "../assets/icons/exporter.png";
import market from "../assets/icons/market.png";
import truck from "../assets/icons/truck.png";
import toggleIcon from "../assets/icons/toggleIcon.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`
        h-screen bg-white border-r border-gray-100 shadow-md
        flex flex-col
        transition-all duration-300
        ${isOpen ? "w-52" : "w-16"}
      `}
    >
      {/* En-tête avec logo et bouton toggle */}
      <div className="flex items-center justify-between bg-[#233D1C] p-2">
        {isOpen && <img src={logo} alt="Logo" className="h-10" />}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-200"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <img src={toggleIcon} alt="Toggle menu" className="h-6 w-6" />
        </button>
      </div>

      {/* Recherche */}
      {isOpen && (
        <div className="p-2">
          <input
            type="text"
            placeholder="Rechercher ..."
            className="w-full mt-1 px-2 py-1 rounded border border-[#FFBE00] bg-white focus:outline-none text-sm"
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-4 flex flex-col gap-2 px-2 flex-1">
        <SidebarItem
          to="/farmer/Dashboard"
          icon={<img src={dashboard} alt="" className="h-5 w-5" />}
          label={isOpen ? "Tableau de bord" : ""}
        />
        <SidebarItem
          to="/farmer/Culture"
          icon={<img src={culture} alt="" className="h-5 w-5" />}
          label={isOpen ? "Cultures" : ""}
        />
        <SidebarItem
          to="/farmer/Transports"
          icon={<img src={exporter} alt="" className="h-5 w-5" />}
          label={isOpen ? "Transports" : ""}
        />
        <SidebarItem
          to="/farmer/Market"
          icon={<img src={market} alt="" className="h-5 w-5" />}
          label={isOpen ? "Mise sur le marché" : ""}
        />
        <SidebarItem
          to="/farmer/Exportations"
          icon={<img src={truck} alt="" className="h-5 w-5" />}
          label={isOpen ? "Exportations" : ""}
        />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          isActive
            ? "bg-[#DDE3C2] border-l-4 border-[#FFCA28] text-black"
            : "hover:bg-[#F0F2E8] text-gray-700"
        }`
      }
    >
      {icon}
      {label && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
