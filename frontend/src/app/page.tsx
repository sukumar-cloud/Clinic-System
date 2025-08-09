import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-700 mb-4">Clinic Management System</h1>
        <p className="text-lg text-gray-600 mb-8">Modern, efficient, and easy-to-use platform for managing appointments, doctors, queues, and patients.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Link href="/frontdesk-login">
  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-full">Front Desk Login</button>
</Link>
          <Link href="/doctor-login">
  <button className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50 transition w-full">Doctor Login</button>
</Link>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/queue">
  <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition w-full">Queue Management</button>
</Link>
          <Link href="/appointments">
  <button className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition w-full">Appointment Management</button>
</Link>
        </div>
      </div>
    </main>
  );
}
