"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/Skeleton";

interface Doctor { id: number; name: string; specialization?: string; available?: boolean }

export default function AvailableDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/doctors", { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        setDoctors(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black">Available Doctors</h3>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search doctors"
          className="w-56 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder:text-black/60 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 hover:border-gray-400"
        />
      </div>
      {loading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : error ? (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded border border-gray-200 bg-white p-3 text-sm text-black">No doctors found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((d) => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300">
              <div>
                <div className="font-medium text-black">{d.name}</div>
                {d.specialization && <div className="text-sm text-black">{d.specialization}</div>}
                <div className="mt-1 inline-flex items-center gap-2 text-xs">
                  <span className={`rounded-full px-2 py-0.5 font-medium ${d.available ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-black'}`}>
                    {d.available ? 'Available' : 'Offline'}
                  </span>
                </div>
              </div>
              <button
                className="rounded bg-green-600 px-3 py-2 text-xs font-medium text-white shadow hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                onClick={() => alert(`Schedule view for ${d.name} coming soon`)}
              >
                View Schedule
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
