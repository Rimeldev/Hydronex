// src/components/Header.jsx
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    
     <header className="bg-[#284411] text-light border-b-[1px] border-accent py-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center space-y-2 md:space-y-0">
        
        {/* Logo centré en mobile */}
        <img src={logo} alt="Logo" className="h-14" />

        {isHomePage && (
          <div className="space-x-4">
            <a
              href="/login"
              className="text-white font-semibold"
            >
              SE CONNECTER
            </a>
             <a
              href="/register"
              className="bg-white text-primary font-semibold px-4 py-2 rounded-md shadow hover:bg-[#FFFFFFCF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFFFFCF]"
            >
              CRÉER UN COMPTE
              
            </a>
          </div>
        )}
      </div>
       
    </header>
  );
};

export default Header;
