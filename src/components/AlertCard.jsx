import { BellAlertIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function RecentAlertCard({ alert }) {
  const navigate = useNavigate();

  const hasAlert = !!alert; // true si une alerte existe

  const bgColor = hasAlert ? 'bg-red-100 hover:bg-red-200 border-red-500 text-red-700' : 'bg-green-100 hover:bg-green-200 border-green-500 text-green-700';
  const Icon = hasAlert ? BellAlertIcon : CheckCircleIcon;
  const title = hasAlert ? alert.title : 'Aucune alerte';
  const message = hasAlert ? alert.message : 'Tout est sous contrôle.';
  const timestamp = hasAlert ? alert.timestamp : 'À jour';

  return (
    <div
      className={`cursor-pointer border-l-4 p-4 rounded-md shadow-sm flex items-start gap-3 ${bgColor}`}
      onClick={() => navigate("/recommendations")}
    >
      <Icon className="h-6 w-6 mt-0.5" />
      <div className="flex flex-col">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-700">{message}</p>
        <p className="text-xs text-gray-500 italic mt-1">{timestamp}</p>
      </div>
    </div>
  );
}
