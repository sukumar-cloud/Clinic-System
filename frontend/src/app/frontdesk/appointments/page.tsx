export default function FrontDeskAppointmentsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white p-8">
      <div className="max-w-2xl w-full text-center bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Front Desk - Appointment Management</h2>
        <p className="text-gray-600 mb-8">View, book, and manage appointments here.</p>
        {/* Placeholder for appointment table/list */}
        <div className="border rounded p-4 bg-purple-50">No appointment data yet.</div>
      </div>
    </main>
  );
}
