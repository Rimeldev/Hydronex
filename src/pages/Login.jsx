import React from "react";
import { Link } from "react-router-dom";
import { Apple, LogIn, Mail } from "lucide-react";
import logo2Img from "../assets/4.png";
import appleImg from "../assets/apple.png";
import googleImg from "../assets/google.png";
import Header from "../components/Header";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center px-4 pb-10">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mt-8">
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
              Se connecter
            </h2>
          </div>

          {/* Boutons Connexion via services externes */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-100 transition">
              <img
                src={googleImg}
                alt="Google logo"
                className="w-5 h-5"
              />
              Se connecter avec Google
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:opacity-90 transition">
             <img
                src={appleImg}
                alt="aplle logo"
                className="w-5 h-5"
              />
              Se connecter avec Apple
            </button>
          </div>
<div className="flex items-center my-6">
  <div className="flex-grow h-px bg-gray-300" />
  <span className="px-3 text-gray-500 text-sm">ou</span>
  <div className="flex-grow h-px bg-gray-300" />
</div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-gray-700 font-semibold">Mot de passe</label>
              <Link to="#" className="text-green-600 text-sm hover:underline">
                Mot de passe oublié?
              </Link>
            </div>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Bouton principal */}
          <button className="w-full bg-green-800 hover:bg-green-900 text-white py-2 rounded-lg font-semibold transition">
            Se connecter
          </button>

          {/* Lien bas */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Vous n'avez pas de compte ?{" "}
            <Link
              to="/register"
              className="text-green-800 font-semibold hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
