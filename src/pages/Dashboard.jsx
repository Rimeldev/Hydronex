import ParameterCard from "../components/ParameterCard";
import ParameterChart from "../components/ParameterChart";
import HeaderDashboard from "../components/HeaderDashboard";
import LiveSensorFeed from "../components/LiveSensorFeed";
import MapSection from "../components/MapSection";
import AlertCard from "../components/AlertCard";
import salinityIcon from "../assets/icons/salinity.png";
import temperatureIcon from "../assets/icons/temperature.png";
import phIcon from "../assets/icons/ph.png";
import turbidityIcon from "../assets/icons/turbidity.png";



// Icônes personnalisés


// Données pour le graphique
const parameterData = [
  { time: "08h", salinity: 2.1, temperature: 26.5, pH: 7.2, turbidity: 10 },
  { time: "10h", salinity: 2.3, temperature: 26.8, pH: 7.3, turbidity: 11 },
  { time: "12h", salinity: 2.5, temperature: 27.1, pH: 7.4, turbidity: 12 },
  { time: "14h", salinity: 2.6, temperature: 27.4, pH: 7.3, turbidity: 13 },
  { time: "16h", salinity: 2.4, temperature: 27.3, pH: 7.3, turbidity: 12 },
];

export default function Dashboard() {
  const lastAlert ={
    id: 1,
    title: "Risque de turbidité élevé",
    message: "Évitez les intrants chimiques pour l’instant.",
    recommendation: "Utilisez de l’eau filtrée dans les prochaines 12h.",
    type: "alert",
    date: "2025-06-09T10:00:00Z",
  };
  return (
    <div className="space-y-6">
       {/* Filtres en haut */}
       <HeaderDashboard/>
       <LiveSensorFeed sensorData={parameterData} />
      {/* Section cartes paramètres */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <ParameterCard
    icon={salinityIcon}
    value="2.5"
    unit="psu"
    label="Salinity"
    gradientFrom="#ffe259"
    gradientTo="#ffa751"
  />
  <ParameterCard
    icon={temperatureIcon}
    value="27.4"
    unit="°C"
    label="Temperature"
    gradientFrom="#ff9a9e"
    gradientTo="#fad0c4"
  />
  <ParameterCard
    icon={phIcon}
    value="7.3"
    label="pH Average (24/7)"
    gradientFrom="#a1ffce"
    gradientTo="#faffd1"
  />
  <ParameterCard
    icon={turbidityIcon}
    value="16"
    unit="NTU"
    label="Turbidity"
    gradientFrom="#89f7fe"
    gradientTo="#66a6ff"
  />
</div>


      {/* Section graphique + carte */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ParameterChart data={parameterData} />
        <MapSection />
      </div>

      {/* Alertes + recommandation */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-3">
           {/* ✅ Alerte en haut */}
      <AlertCard alert={lastAlert} />

        </div>
      </div>
    </div>
  );
}
