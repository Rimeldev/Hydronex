import { HelpCircle, MessageSquare } from "lucide-react";

export default function Support() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-black-700">Centre de Support</h1>

      {/* Section FAQ */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 flex items-center text-blue-600 gap-2">
          <HelpCircle className="w-5 h-5" />
          Questions fréquentes
        </h2>
        <div className="space-y-4">
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-medium text-gray-800">Comment ajouter un capteur ?</h3>
            <p className="text-sm text-gray-600 mt-1">
              Allez dans la section “Devices”, cliquez sur “Ajouter un dispositif” et remplissez le formulaire.
            </p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-medium text-gray-800">Pourquoi un appareil apparaît inactif ?</h3>
            <p className="text-sm text-gray-600 mt-1">
              Il peut être hors ligne ou ne pas avoir envoyé de données récemment.
            </p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="font-medium text-gray-800">Puis-je recevoir les alertes par email ?</h3>
            <p className="text-sm text-gray-600 mt-1">
              Oui, activez l’option “Rester alerté” dans la section Alerte.
            </p>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 flex items-center text-blue-600 gap-2">
          <MessageSquare className="w-5 h-5" />
          Nous contacter
        </h2>
        <form className="space-y-4 bg-white p-6 rounded shadow max-w-xl">
          <div>
            <label className="block text-sm mb-1 text-gray-700">Nom</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={4}
              placeholder="Votre message..."
            ></textarea>
          </div>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </form>
      </section>

      <p className="text-xs text-gray-500 text-center">
        Pour toute urgence, veuillez contacter l'équipe technique directement par téléphone.
      </p>
    </div>
  );
}
