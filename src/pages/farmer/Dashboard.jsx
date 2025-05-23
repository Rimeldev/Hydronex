import Sidebar from "@/components/Sidebar";
import Headerboard from "@/components/Headerboard";
import DataCard from "@/components/DataCard";
import ChartsCarousel from "@/components/ChartsCarousel";
import { useState } from "react";

const mockData = {
  Ananas1: {
    "2025-05-20": {
      temp_sol: 28, hum_sol: 45, temp_air: 32, hum_air: 60, ph_sol: 6.5, qual_air: 80
    },
    "2025-05-21": {
      temp_sol: 29, hum_sol: 42, temp_air: 31, hum_air: 58, ph_sol: 6.4, qual_air: 78
    },
  },
  Ananas2: {
    "2025-05-20": {
      temp_sol: 30, hum_sol: 50, temp_air: 34, hum_air: 62, ph_sol: 6.8, qual_air: 82
    },
  },
};

const mockChartData = {
  Ananas1: {
    "Température du sol": [
      { date: "14 mai", valeur: 22 },
      { date: "15 mai", valeur: 21 },
      { date: "16 mai", valeur: 23 },
      { date: "17 mai", valeur: 22 },
    ],
    "Température de l’air": [ { date: "14 mai", valeur: 23 },
      { date: "15 mai", valeur: 22 },
      { date: "16 mai", valeur: 13 },
      { date: "17 mai", valeur: 32 },],
   
  },
  Ananas2: {
    "Température du sol": [{ date: "14 mai", valeur: 12 },
      { date: "15 mai", valeur: 11 },
      { date: "16 mai", valeur: 13 },
      { date: "17 mai", valeur: 12 }, ],
    // etc.
  }
};



const Dashboard = () => {
const activeCultures = ["Ananas1", "Ananas2"];
const [sidebarOpen, setSidebarOpen] = useState(true);
const [selectedCulture, setSelectedCulture] = useState(activeCultures[0]);
const [selectedDate, setSelectedDate] = useState("2025-05-20");
const selectedData = mockData[selectedCulture]?.[selectedDate] || {};
const chartDataByParameter = mockChartData[selectedCulture] || {};


const dataCards = [
  { icon: "🌡️", label: "Température du sol", key: "temp_sol", value: selectedData.temp_sol ?? "-", unit: "°C" },
  { icon: "💧", label: "Humidité du sol", key: "hum_sol", value: selectedData.hum_sol ?? "-", unit: "%" },
  { icon: "🌤️", label: "Température de l’air", key: "temp_air", value: selectedData.temp_air ?? "-", unit: "°C" },
  { icon: "💦", label: "Humidité de l’air", key: "hum_air", value: selectedData.hum_air ?? "-", unit: "%" },
  { icon: "🧪", label: "pH du sol", key: "ph_sol", value: selectedData.ph_sol ?? "-", unit: "" },
  { icon: "💨", label: "Qualité de l’air", key: "qual_air", value: selectedData.qual_air ?? "-", unit: "" },
];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
     <main className="flex-1 p-6 bg-white w-full overflow-hidden">
        <Headerboard
  farmerName="Agriculteur"
  activeCultures={activeCultures}
  selectedCulture={selectedCulture}
  title="Tableau de bord"
  onCultureChange={setSelectedCulture}
   selectedDate={selectedDate}
  onDateChange={setSelectedDate}/>

        {/* Grille responsive des cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 w-full max-w-full">
          {dataCards.map((data) => (
            <DataCard
              key={data.key}
              icon={data.icon}
              label={data.label}
              value={data.value}
              unit={data.unit}
            />
          ))}
        </div>

       <ChartsCarousel 
  culture={selectedCulture}
  date={selectedDate}
  chartData={chartDataByParameter}
/>

      </main>
    </div>
  );
};

export default Dashboard;
