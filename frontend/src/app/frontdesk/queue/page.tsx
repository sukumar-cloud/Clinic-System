import ProtectedRoute from "../../../components/ProtectedRoute";
import DashboardHeader from "../../../components/DashboardHeader";
import QueueTable from "./QueueTable";

export default function FrontDeskQueuePage() {
  return (
    <ProtectedRoute allowedRole="frontdesk" redirectTo="/frontdesk-login">
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white p-8">
        <div className="max-w-2xl w-full text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Front Desk - Queue Management</h2>
          <p className="text-gray-600 mb-8">View and manage the current patient queue here.</p>
          {/* Queue table/list */}
          <QueueTable />
        </div>
      </main>
    </ProtectedRoute>
  );
}
