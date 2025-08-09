import ProtectedRoute from "../../../components/ProtectedRoute";
import DashboardHeader from "../../../components/DashboardHeader";
import AppointmentTable from "./AppointmentTable";

export default function FrontDeskAppointmentsPage() {
  return (
    <ProtectedRoute allowedRole="frontdesk" redirectTo="/frontdesk-login">
      <DashboardHeader />
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-white p-0">
        <div className="w-full min-h-screen bg-white rounded-none shadow-none p-6 md:p-10">
          <h2 className="text-3xl font-bold text-black mb-2 text-center">Front Desk - Appointment Management</h2>
          <p className="text-black mb-6 text-center">View, book, and manage appointments here.</p>
          {/* Appointment table/list */}
          <AppointmentTable />
        </div>
      </main>
    </ProtectedRoute>
  );
}
