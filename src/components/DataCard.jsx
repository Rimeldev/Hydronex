// src/components/DataCard.jsx

const DataCard = ({ icon, label, value, unit, bgColor = "#E0F2FE" }) => {
  return (
    <div
      className="rounded-xl shadow-md px-4 py-6 w-40 text-center"
      style={{ backgroundColor: bgColor }}
    >
      {/* Icône */}
      <div className="text-4xl text-blue-600 mb-2 flex justify-center">{icon}</div>

      {/* Valeur */}
      <div className="text-xl font-semibold text-gray-800">
        {value}
        <span className="text-sm font-normal">{unit}</span>
      </div>

      {/* Label */}
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
};

export default DataCard;
