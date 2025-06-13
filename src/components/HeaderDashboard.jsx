const HeaderDashboard = ({ batteryLevel = 30, location = "Cotonou", dateRange = "Today" }) => {
  // Détermine la couleur de la batterie selon le niveau
  const batteryColor =
    batteryLevel > 60
      ? "bg-green-500"
      : batteryLevel > 30
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      {/* Batterie */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-4 bg-gray-300 rounded-sm">
          <div
            className={`h-full rounded-sm ${batteryColor}`}
            style={{ width: `${batteryLevel}%` }}
          />
          <div className="absolute top-1 left-full w-1.5 h-2 bg-gray-300 rounded-r-sm ml-0.5" />
        </div>
        <span className="text-sm font-medium">{batteryLevel}%</span>
      </div>

      {/* Sélecteur de localisation */}
      <div className="w-full sm:w-auto">
        <select
          defaultValue={location}
          className="bg-gray-100 text-sm px-4 py-2 rounded-lg shadow-sm focus:outline-none"
        >
          <option value="Cotonou">Location : Cotonou</option>
          <option value="Dakar">Location : Dakar</option>
          <option value="Lomé">Location : Lomé</option>
        </select>
      </div>

      {/* Sélecteur de date */}
      <div className="w-full sm:w-auto">
        <select
          defaultValue={dateRange}
          className="bg-gray-100 text-sm px-4 py-2 rounded-lg shadow-sm focus:outline-none"
        >
          <option value="Today">Date : Today</option>
          <option value="Yesterday">Date : Yesterday</option>
          <option value="Last7">Date : Last 7 Days</option>
        </select>
      </div>
    </div>
  );
};

export default HeaderDashboard;
