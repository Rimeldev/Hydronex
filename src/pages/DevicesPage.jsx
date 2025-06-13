import { useState } from "react";
import { Eye, Plus, SatelliteDish } from "lucide-react";
import DeviceDetailsModal from "../components/DeviceDetailsModal";
import DeviceFormModal from "../components/DeviceFormModal";
import PasswordPromptModal from "../components/PasswordPromptModal";

export default function DevicesPage() {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Capteur Misérétté",
      location: "Misérétté, Cotonou",
      status: "active",
      battery: 89,
      parameters: ["pH", "Température", "Salinité", "Turbidité"],
    },
    {
      id: 2,
      name: "Capteur Akpakpa",
      location: "Akpakpa, Cotonou",
      status: "inactive",
      battery: 63,
      parameters: ["Température", "Salinité"],
    },
    {
      id: 3,
      name: "Capteur Zogbo",
      location: "Zogbo, Cotonou",
      status: "active",
      battery: 75,
      parameters: ["pH", "Turbidité"],
    },
  ]);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false); // ✅ état pour modale de mot de passe
  const [isEditMode, setIsEditMode] = useState(false); // ✅ mode édition activé ou non

  const handleViewClick = (device) => {
    setSelectedDevice(device);
    setShowModal(true);
  };

  const handleAddDevice = (newDevice) => {
    const deviceWithId = {
      ...newDevice,
      id: devices.length + 1,
      parameters: [],
    };
    setDevices([...devices, deviceWithId]);
    setShowAddModal(false);
  };

  const handleClickAddDispositif = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setIsEditMode(true);
    setShowAddModal(true);
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <SatelliteDish className="w-10 h-10 text-blue-600" />
            Liste de Dispositifs
          </h3>
          <button
            onClick={handleClickAddDispositif}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            <Plus className="w-4 h-4" />
            Ajouter un dispositif
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Nom</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Localisation</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Statut</th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
  {devices.map((device, index) => (
    <tr key={device.id} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        {isEditMode ? (
          <input
            type="text"
            value={device.name}
            onChange={(e) => {
              const updated = [...devices];
              updated[index].name = e.target.value;
              setDevices(updated);
            }}
            className="border border-gray-300 px-2 py-1 rounded w-full"
          />
        ) : (
          device.name
        )}
      </td>
      <td className="px-6 py-4">
        {isEditMode ? (
          <input
            type="text"
            value={device.location}
            onChange={(e) => {
              const updated = [...devices];
              updated[index].location = e.target.value;
              setDevices(updated);
            }}
            className="border border-gray-300 px-2 py-1 rounded w-full"
          />
        ) : (
          device.location
        )}
      </td>
      <td className="px-6 py-4">
        {isEditMode ? (
          <select
            value={device.status}
            onChange={(e) => {
              const updated = [...devices];
              updated[index].status = e.target.value;
              setDevices(updated);
            }}
            className="border border-gray-300 px-2 py-1 rounded"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        ) : (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              device.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full mr-2 ${
                device.status === "active" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {device.status === "active" ? "Actif" : "Inactif"}
          </span>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end">
          {isEditMode ? (
            <button
              className="inline-flex items-center text-green-600 hover:underline"
              onClick={() => alert("Les modifications sont déjà enregistrées en direct.")}
            >
              Modifier
            </button>
          ) : (
            <button
              className="inline-flex items-center text-blue-600 hover:underline"
              onClick={() => handleViewClick(device)}
            >
              <Eye className="w-4 h-4 mr-1" />
              Voir
            </button>
          )}
        </div>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        {/* Modales */}
        {showModal && selectedDevice && (
          <DeviceDetailsModal
            device={selectedDevice}
            onClose={() => setShowModal(false)}
          />
        )}

        {showPasswordModal && (
          <PasswordPromptModal
            onClose={() => setShowPasswordModal(false)}
            onSuccess={handlePasswordSuccess}
          />
        )}

        {showAddModal && isEditMode && (
          <DeviceFormModal
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddDevice}
          />
        )}
      </div>
    </div>
  );
}
