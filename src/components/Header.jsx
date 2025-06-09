// src/components/Header.jsx
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="w-full bg-[#022B78]  shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Nom */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="HydroNex Logo" className="h-10" />
        </div>

        {/* Liens de navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/login" className="text-white hover:text-blue-800">Se connecter</Link>
          <Link
            to="/register"
            className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Créer un compte
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
