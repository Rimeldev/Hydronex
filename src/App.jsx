
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import 'leaflet/dist/leaflet.css';

const alerts = [
  {
    id: 1,
    title: "Risque de turbidité élevé",
    message: "Évitez les intrants chimiques pour l’instant.",
    recommendation: "Utilisez de l’eau filtrée dans les prochaines 12h.",
    type: "alert",
    date: "2025-06-09T10:00:00Z",
  },
  {
    id: 2,
    title: "Température optimale",
    message: "La température est idéale pour le maïs.",
    recommendation: "Poursuivez l’irrigation normale.",
    type: "alert",
    date: "2025-06-08T15:30:00Z",
  },
  {
    id: 3,
    title: "Température optimale",
    message: "La température est idéale pour le maïs.",
    recommendation: "Poursuivez l’irrigation normale.",
    type: "info",
    date: "2025-06-08T15:30:00Z",
  },
  {
    id: 4,
    title: "Température optimale",
    message: "La température est idéale pour le maïs.",
    recommendation: "Poursuivez l’irrigation normale.",
    type: "info",
    date: "2025-06-08T15:30:00Z",
  },
  {
    id: 5,
    title: "Température optimale",
    message: "La température est idéale pour le maïs.",
    recommendation: "Poursuivez l’irrigation normale.",
    type: "info",
    date: "2025-06-08T15:30:00Z",
  },
  {
    id: 6,
    title: "Température optimale",
    message: "La température est idéale pour le maïs.",
    recommendation: "Poursuivez l’irrigation normale.",
    type: "info",
    date: "2025-06-08T15:30:00Z",
  },
  {
    id: 2,
    title: "Température optimale",
    message: "La température est idéale pour le maïs.",
    recommendation: "Poursuivez l’irrigation normale.",
    type: "info",
    date: "2025-06-08T15:30:00Z",
  },
  {
    id: 7,
    title: "Température optimale",
    message: "La température est idéale pour le maïs.",
    recommendation: "Poursuivez l’irrigation normale.",
    type: "info",
    date: "2025-06-08T15:30:00Z",
  },
];

function App() {
  return (
       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Recommendations" element={<DashboardLayout><Recommendations alerts={alerts} /></DashboardLayout>} />
          
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