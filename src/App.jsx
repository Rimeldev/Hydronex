
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import 'leaflet/dist/leaflet.css';



function App() {
  return (
       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
          
           {/* Pages avec layout */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

      </Routes>
  );
}

export default App;