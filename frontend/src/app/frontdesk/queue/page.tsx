import ProtectedRoute from "../../../components/ProtectedRoute";
import DashboardHeader from "../../../components/DashboardHeader";
import QueueTable from "./QueueTable";
import AvailableDoctors from "../components/AvailableDoctors";

export default function FrontDeskQueuePage() {
  return (
    <ProtectedRoute allowedRole="frontdesk" redirectTo="/frontdesk-login">
      <DashboardHeader />
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white p-0">
        <div className="w-full min-h-screen bg-white rounded-none shadow-none p-6 md:p-10">
          <h2 className="text-3xl font-bold text-black mb-2 text-center">Front Desk - Queue Management</h2>
          <p className="text-black mb-6 text-center">View and manage the current patient queue here.</p>
          {/* Queue table/list */}
          <QueueTable />
          <AvailableDoctors />
        </div>
      </main>
    </ProtectedRoute>
  );
}
