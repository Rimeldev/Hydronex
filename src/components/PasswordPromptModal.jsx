import { useState } from "react";

export default function PasswordPromptModal({ onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const correctPassword = "admin123";
    const correctEmail = "yannickbossa@gmail.com";

    if (password === correctPassword && email === correctEmail) {
      setError("");
      onSuccess(); // Active le mode édition
      onClose();   // Ferme la modale
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-brightness-90 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Connexion requise</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          placeholder="Mot de passe"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
