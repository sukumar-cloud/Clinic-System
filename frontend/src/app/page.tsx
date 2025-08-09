import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-5xl w-full text-center select-none">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-black mb-4 caret-transparent leading-tight tracking-tight md:whitespace-nowrap">
          Clinic Management System
        </h1>
        <p className="text-base sm:text-lg text-black mb-8 caret-transparent max-w-3xl mx-auto">
          Modern, efficient, and easy-to-use platform for managing appointments, doctors, queues, and patients.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Link href="/frontdesk-login">
  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-0.5 focus:outline-none w-full">Front Desk Login</button>
</Link>
          <Link href="/doctor-login">
  <button className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50 hover:shadow-lg transition transform hover:-translate-y-0.5 focus:outline-none w-full">Doctor Login</button>
</Link>
        </div>

      </div>
    </main>
  );
}
