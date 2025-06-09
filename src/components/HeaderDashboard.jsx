const HeaderDashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="w-full sm:w-auto">
        <select className="bg-gray-100 text-sm px-4 py-2 rounded-lg shadow-sm focus:outline-none">
          <option>Location : Cotonou</option>
          <option>Location : Dakar</option>
          <option>Location : Lomé</option>
        </select>
      </div>

      <div className="w-full sm:w-auto">
        <select className="bg-gray-100 text-sm px-4 py-2 rounded-lg shadow-sm focus:outline-none">
          <option>Date : Today</option>
          <option>Date : Yesterday</option>
          <option>Date : Last 7 Days</option>
        </select>
      </div>
    </div>
  );
};

export default HeaderDashboard;
