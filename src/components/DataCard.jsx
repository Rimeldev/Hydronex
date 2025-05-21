import 'swiper/css';

const DataCard = ({ icon, label, value, unit }) =>  {
     return (
  <div className="bg-[#CBD5C0] rounded shadow p-4 w-40">
    <div className="text-3xl">{icon}</div>
    <p className="font-bold text-xl">{value}{unit}</p>
    <p className="text-sm text-gray-700">{label}</p>
  </div>
); };
export default DataCard;
