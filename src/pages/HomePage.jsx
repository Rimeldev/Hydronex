import Header from "../components/Header";
import Wave from "../components/Wave";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-sky-100 pt-20 overflow-hidden">
      <Header />

      {/* Contenu principal */}
      <div className="z-10 relative flex flex-col items-center justify-center text-center px-4 pt-28">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Surveillez la qualité de l’eau en temps réel
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-xl">
          Une solution simple, intelligente et écologique pour un monde plus propre.
        </p>

        <div className="flex space-x-4">
          <a
            href="/dashboard"
            className="bg-blue-800 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
          >
            Créer un compte
          </a>
          <a
            href="/dashboard"
            className="border border-blue-800 text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-50"
          >
            Se connecter
          </a>
        </div>
      </div>

      <Wave />
    </div>
  );
};

export default HomePage;
