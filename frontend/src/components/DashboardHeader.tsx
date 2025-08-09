"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="w-full flex items-center justify-between bg-white shadow px-8 py-4 mb-8">
      <div className="font-bold text-xl text-black">Clinic System</div>
      <nav className="flex gap-4">
        {user === "frontdesk" && (
          <>
            <Link href="/frontdesk/queue" className="text-black hover:underline">Queue</Link>
            <Link href="/frontdesk/appointments" className="text-black hover:underline">Appointments</Link>
          </>
        )}
        {user === "doctor" && (
          <>
            <Link href="/doctor/queue" className="text-black hover:underline">Queue</Link>
            <Link href="/doctor/appointments" className="text-black hover:underline">Appointments</Link>
          </>
        )}
        <button
          onClick={handleLogout}
          className="ml-4 btn btn-danger"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
