// components/DashboardLayout.jsx
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F9FAF8]">
      <Sidebar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
