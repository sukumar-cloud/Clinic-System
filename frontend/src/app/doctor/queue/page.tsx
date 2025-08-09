export default function DoctorQueuePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white p-8">
      <div className="max-w-2xl w-full text-center bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Doctor - Queue Management</h2>
        <p className="text-gray-600 mb-8">View and manage your queue here.</p>
        {/* Placeholder for queue table/list */}
        <div className="border rounded p-4 bg-green-50">No queue data yet.</div>
      </div>
    </main>
  );
}
