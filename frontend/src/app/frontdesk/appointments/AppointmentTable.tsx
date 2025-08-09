"use client";
import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/app/components/StatusBadge";
import { Skeleton } from "@/app/components/Skeleton";
import Modal from "@/app/components/Modal";

interface Appointment {
  id: number;
  patientName: string;
  doctor: { id: number; name: string };
  time: string;
  status: string;
}

interface Doctor { id: number; name: string; specialization?: string; available?: boolean }

export default function AppointmentTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dayFilter, setDayFilter] = useState<string>("All");

  // schedule modal state
  const [open, setOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState<{ patientName: string; doctorId: string; time: string }>({ patientName: "", doctorId: "", time: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

  async function loadAppointments() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/appointments", { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as any).message || "Failed to fetch appointments");
      }
      const data = await res.json();
      setAppointments(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  const list = useMemo(() => {
    const searched = appointments.filter(
      (a) =>
        a.patientName.toLowerCase().includes(search.toLowerCase()) ||
        (a.doctor?.name || "").toLowerCase().includes(search.toLowerCase())
    );
    const byStatus = statusFilter === "All" ? searched : searched.filter((a) => a.status.toLowerCase() === statusFilter.toLowerCase());
    const today = new Date();
    const byDay =
      dayFilter === "All"
        ? byStatus
        : byStatus.filter((a) => {
            const d = new Date(a.time);
            return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
          });
    return byDay.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }, [appointments, search, statusFilter, dayFilter]);

  async function openScheduleModal() {
    setOpen(true);
    // fetch doctors list once modal opens
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/doctors", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json().catch(() => []);
      if (Array.isArray(data)) setDoctors(data);
    } catch {
      // ignore silently for demo
    }
  }

  async function submitSchedule(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      if (!form.patientName || !form.doctorId || !form.time) throw new Error("All fields are required");
      const payload = { patientName: form.patientName, doctorId: Number(form.doctorId), time: new Date(form.time) };
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as any).message || "Failed to schedule appointment");
      }
      await loadAppointments();
      setOpen(false);
      setForm({ patientName: "", doctorId: "", time: "" });
    } catch (err: any) {
      setSubmitError(err.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-purple-700">Appointments</h2>
          <span className="text-sm text-gray-500">Front Desk view</span>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="w-36 rounded border-gray-300 bg-white shadow-sm px-2 py-2 text-sm" value={dayFilter} onChange={(e) => setDayFilter(e.target.value)}>
            <option>All</option>
            <option value="Today">Today</option>
          </select>
          <select className="w-40 rounded border-gray-300 bg-white shadow-sm px-2 py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option value="booked">Booked</option>
            <option value="waiting">Waiting</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
          <input
            type="text"
            placeholder="Search patients or doctors"
            className="flex-1 md:w-64 rounded border-gray-300 bg-white shadow-sm px-3 py-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={openScheduleModal} className="rounded bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-purple-700">Schedule</button>
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
      ) : list.length === 0 ? (
        <div className="rounded border border-gray-200 bg-white p-3 text-gray-600 text-sm">No appointments found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium">Doctor</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((appt, idx) => (
                <tr key={appt.id} className={idx % 2 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                  <td className="px-4 py-3 font-medium text-gray-800">{appt.patientName}</td>
                  <td className="px-4 py-3 text-gray-700">{appt.doctor?.name || appt.doctor?.id}</td>
                  <td className="px-4 py-3 text-gray-700">{fmt.format(new Date(appt.time))}</td>
                  <td className="px-4 py-3"><StatusBadge status={appt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Schedule New Appointment">
        <form onSubmit={submitSchedule} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient</label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              placeholder="Enter patient name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor</label>
            <select
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm bg-white"
              value={form.doctorId}
              onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
            >
              <option value="">Select a doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="datetime-local"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
          </div>
          {submitError && <div className="text-sm text-red-600">{submitError}</div>}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Cancel</button>
            <button disabled={submitting} type="submit" className="rounded bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-purple-700 disabled:opacity-50">
              {submitting ? "Scheduling..." : "Schedule Appointment"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
