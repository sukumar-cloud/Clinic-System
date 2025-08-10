"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname?.startsWith(href);
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="w-full flex items-center justify-between bg-white shadow px-6 md:px-8 py-4 mb-8">
      <div className="font-bold text-xl text-black">Clinic System</div>
      <nav className="flex items-center gap-2 md:gap-3">
        {user === "frontdesk" && (
          <>
            <Link
              href="/frontdesk/queue"
              className={`btn ${isActive("/frontdesk/queue") ? "btn-primary" : "btn-outline"}`}
              aria-current={isActive("/frontdesk/queue") ? "page" : undefined}
            >
              Queue
            </Link>
            <Link
              href="/frontdesk/appointments"
              className={`btn ${isActive("/frontdesk/appointments") ? "btn-primary" : "btn-outline"}`}
              aria-current={isActive("/frontdesk/appointments") ? "page" : undefined}
            >
              Appointments
            </Link>
            <Link
              href="/frontdesk/patients"
              className={`btn ${isActive("/frontdesk/patients") ? "btn-primary" : "btn-outline"}`}
              aria-current={isActive("/frontdesk/patients") ? "page" : undefined}
            >
              Patients
            </Link>
          </>
        )}
        {user === "doctor" && (
          <>
            <Link
              href="/doctor/queue"
              className={`btn ${isActive("/doctor/queue") ? "btn-primary" : "btn-outline"}`}
              aria-current={isActive("/doctor/queue") ? "page" : undefined}
            >
              Queue
            </Link>
            <Link
              href="/doctor/appointments"
              className={`btn ${isActive("/doctor/appointments") ? "btn-primary" : "btn-outline"}`}
              aria-current={isActive("/doctor/appointments") ? "page" : undefined}
            >
              Appointments
            </Link>
          </>
        )}
        <button
          onClick={handleLogout}
          className="ml-2 md:ml-4 btn btn-danger"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
