"use client";
import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/app/components/StatusBadge";
import { Skeleton } from "@/app/components/Skeleton";

interface Appointment {
  id: number;
  patientName: string;
  doctor: { id: number; name: string };
  time: string;
  status: string;
}

type Priority = "normal" | "urgent";

export default function QueueTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [priorities, setPriorities] = useState<Record<number, Priority>>({});

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error((data as any).message || "Failed to fetch queue");
        }
        const data = await res.json();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const queue = useMemo(() => {
    const base = appointments.filter((a) => ["booked", "waiting"].includes(String(a.status).toLowerCase()));
    const searched = base.filter(
      (a) =>
        a.patientName.toLowerCase().includes(search.toLowerCase()) ||
        (a.doctor?.name || "").toLowerCase().includes(search.toLowerCase())
    );
    const filtered = filterStatus === "All" ? searched : searched.filter((a) => a.status.toLowerCase() === filterStatus.toLowerCase());
    return filtered
      .map((a) => ({ ...a, priority: priorities[a.id] || ("normal" as Priority) }))
      .sort((a, b) => {
        if (a.priority !== b.priority) return a.priority === "urgent" ? -1 : 1;
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      });
  }, [appointments, search, filterStatus, priorities]);

  const togglePriority = (id: number) => {
    setPriorities((prev) => ({ ...prev, [id]: prev[id] === "urgent" ? "normal" : "urgent" }));
  };

  const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-emerald-700">Queue</h2>
          <span className="text-sm text-gray-500">Front Desk view</span>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select
            className="w-36 rounded border-gray-300 bg-white shadow-sm px-2 py-2 text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option value="waiting">Waiting</option>
            <option value="booked">Booked</option>
          </select>
          <input
            type="text"
            placeholder="Search patients or doctors"
            className="flex-1 md:w-64 rounded border-gray-300 bg-white shadow-sm px-3 py-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : error ? (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-red-700 text-sm">{error}</div>
      ) : queue.length === 0 ? (
        <div className="rounded border border-gray-200 bg-white p-3 text-gray-600 text-sm">No patients in queue.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium">Doctor</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((appt, idx) => (
                <tr key={appt.id} className={idx % 2 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                  <td className="px-4 py-3 font-medium text-gray-800">{appt.patientName}</td>
                  <td className="px-4 py-3 text-gray-700">{appt.doctor?.name || appt.doctor?.id}</td>
                  <td className="px-4 py-3 text-gray-700">{fmt.format(new Date(appt.time))}</td>
                  <td className="px-4 py-3"><StatusBadge status={appt.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => togglePriority(appt.id)}
                      className={`inline-flex items-center rounded px-3 py-1.5 text-xs font-medium shadow-sm border transition ${
                        (priorities[appt.id] || "normal") === "urgent"
                          ? "bg-rose-600 text-white border-rose-600 hover:bg-rose-700"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {(priorities[appt.id] || "normal") === "urgent" ? "Mark Normal" : "Mark Urgent"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
