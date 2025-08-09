"use client";
import { useEffect, useState } from "react";

interface Appointment {
  id: number;
  patientName: string;
  doctor: { id: number; name: string };
  time: string;
  status: string;
}

export default function AppointmentTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch appointments");
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

  if (loading) return <div className="py-4">Loading appointments...</div>;
  if (error) return <div className="py-4 text-red-600">{error}</div>;
  if (!appointments.length) return <div className="py-4">No appointments found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border">
        <thead>
          <tr className="bg-purple-100">
            <th className="px-4 py-2">Patient</th>
            <th className="px-4 py-2">Doctor</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id} className="border-t">
              <td className="px-4 py-2">{appt.patientName}</td>
              <td className="px-4 py-2">{appt.doctor?.name || appt.doctor?.id}</td>
              <td className="px-4 py-2">{new Date(appt.time).toLocaleString()}</td>
              <td className="px-4 py-2">{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
