
import { Link } from "react-router-dom";

import logo2Img from "../assets/4.png";
import appleImg from "../assets/apple.png";
import googleImg from "../assets/google.png";
import Header from "../components/Header";

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Login Form */}
 <main className="flex-grow flex items-center justify-center px-4 pb-30">

        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center space-x-2 h-20">
              <img
                src={logo2Img}
                alt="logo2"
                className="w-50 h-50 object-contain"
              />
            </div>
            <h2 className="text-2xl font-semibold text-green-800 mt-2">
              Créer un compte
            </h2>
          </div>

          {/* Connexion Google / Apple */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-100 transition">
              <img src={googleImg} alt="Google" className="w-5 h-5" />
              S’inscrire avec Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:opacity-90 transition">
              <img src={appleImg} alt="Google" className="w-5 h-5" />
              S’inscrire avec Apple
            </button>
          </div>

          {/* Séparateur */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">ou</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Formulaire */}
          <form className="space-y-4">
            {/* Nom et Prénom */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="Nom"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="Prénom"
                />
              </div>
            </div>

            {/* Adresse et Téléphone */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Adresse</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="Adresse"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="Téléphone"
                />
              </div>
            </div>

            {/* Rôle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Rôle</label>
              <select className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600">
                <option value="">Choisir un rôle</option>
                <option value="agriculteur">Agriculteur</option>
                <option value="exportateur">Exportateur</option>
                <option value="revendeur">Revendeur</option>
                <option value="consommateur">Consommateur</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="votre@email.com"
              />
            </div>

            {/* Mot de passe et confirmation */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mot de passe</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="********"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmer</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                  placeholder="********"
                />
              </div>
            </div>

            {/* Conditions */}
            <div className="flex items-center text-sm text-gray-700">
              <input type="checkbox" className="mr-2" />
              <span>
                J'accepte{" "}
                <span className="text-green-700 font-semibold"> 
                  que AgriTraceBio puisse me contacter par e-mail ou par téléphone au sujet de ses produits, services ou événements.
               </span> 
              </span>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white py-2 rounded-lg font-semibold transition mt-2"
            >
              Continuer
            </button>

            {/* Lien de connexion */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-green-800 font-semibold hover:underline">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
    
  );
}