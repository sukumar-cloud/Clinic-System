import ProtectedRoute from "../../../components/ProtectedRoute";
import DashboardHeader from "../../../components/DashboardHeader";
import QueueTable from "./QueueTable";

export default function DoctorQueuePage() {
  return (
    <ProtectedRoute allowedRole="doctor" redirectTo="/">
      <DashboardHeader />
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white p-0">
        <div className="w-full min-h-screen bg-white rounded-none shadow-none p-6 md:p-10">
          <h2 className="text-3xl font-bold text-black mb-2 text-center">Doctor - Queue Management</h2>
          <p className="text-black mb-6 text-center">View and manage your queue here.</p>
          {/* Queue table/list */}
          <QueueTable />
        </div>
      </main>
    </ProtectedRoute>
  );
}
