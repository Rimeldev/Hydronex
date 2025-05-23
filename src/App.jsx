
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/farmer/Dashboard';
import Culture from './pages/farmer/Culture';
import VerificationPage from './pages/VerificationPage';


function App() {
  return (
       
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/VerificationPage" element={<VerificationPage />} />
        <Route path="/farmer/Dashboard" element={<Dashboard />} />
        <Route path="/farmer/Culture" element={<Culture/>} />

      </Routes>
  );
}

export default App;