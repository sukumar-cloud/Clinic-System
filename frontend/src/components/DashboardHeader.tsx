"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    if (user === "frontdesk") router.push("/frontdesk-login");
    else if (user === "doctor") router.push("/doctor-login");
  }

  return (
    <header className="w-full flex items-center justify-between bg-white shadow px-8 py-4 mb-8">
      <div className="font-bold text-xl text-blue-700">Clinic System</div>
      <nav className="flex gap-4">
        {user === "frontdesk" && (
          <>
            <Link href="/frontdesk/queue" className="text-blue-700 hover:underline">Queue</Link>
            <Link href="/frontdesk/appointments" className="text-purple-700 hover:underline">Appointments</Link>
          </>
        )}
        {user === "doctor" && (
          <>
            <Link href="/doctor/queue" className="text-blue-700 hover:underline">Queue</Link>
            <Link href="/doctor/appointments" className="text-purple-700 hover:underline">Appointments</Link>
          </>
        )}
        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 border border-gray-200"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
