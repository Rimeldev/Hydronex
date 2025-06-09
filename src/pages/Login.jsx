// src/pages/Login.jsx
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        {/* Logo + Titre */}
        <div className="flex flex-col items-center space-x-2 mb-6">
          <img src={logo} alt="HydroNex Logo" className="h-10 mb-2" />
          <h1 className="text-xl font-semibold text-gray-800">Connexion</h1>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Connectez-vous à votre compte pour accéder au tableau de bord HydroNex.
        </p>

        {/* Formulaire */}
        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Adresse e-mail"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>

        {/* Lien créer un compte */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Vous n’avez pas de compte ?{" "}
          <Link to="/register" className="text-blue-700 hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
