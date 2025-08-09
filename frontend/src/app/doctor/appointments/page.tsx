import ProtectedRoute from "../../../components/ProtectedRoute";
import DashboardHeader from "../../../components/DashboardHeader";
import AppointmentTable from "./AppointmentTable";

export default function DoctorAppointmentsPage() {
  return (
    <ProtectedRoute allowedRole="doctor" redirectTo="/doctor-login">
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white p-8">
        <div className="max-w-2xl w-full text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Doctor - Appointment Management</h2>
          <p className="text-gray-600 mb-8">View and manage your appointments here.</p>
          {/* Appointment table/list */}
          <AppointmentTable />
        </div>
      </main>
    </ProtectedRoute>
  );
}
