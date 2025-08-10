"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Modal from "@/app/components/Modal";
import { Skeleton } from "@/app/components/Skeleton";

interface Patient {
  id: number;
  fullName: string;
  phone?: string;
  gender?: "male" | "female" | "other" | "unknown";
  dob?: string | null; // ISO string for UI
  address?: string | null;
  notes?: string | null;
  createdAt?: string;
}

export default function PatientsTable() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState<{ fullName: string; phone: string; gender: string; dob: string; address: string; notes: string }>({
    fullName: "",
    phone: "",
    gender: "unknown",
    dob: "",
    address: "",
    notes: "",
  });

  async function loadPatients() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as any).message || "Failed to fetch patients");
      }
      const list: Patient[] = await res.json();
      setPatients(list);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  const list = useMemo(() => {
    const s = search.toLowerCase();
    return patients.filter(
      (p) =>
        p.fullName.toLowerCase().includes(s) ||
        (p.phone || "").toLowerCase().includes(s) ||
        (p.address || "").toLowerCase().includes(s)
    );
  }, [patients, search]);

  async function submitPatient(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      if (!form.fullName) throw new Error("Full name is required");
      const token = localStorage.getItem("token");
      const payload: any = {
        fullName: form.fullName,
        phone: form.phone || undefined,
        gender: form.gender || undefined,
        dob: form.dob ? new Date(form.dob) : undefined,
        address: form.address || undefined,
        notes: form.notes || undefined,
      };
      const res = await fetch("http://localhost:3000/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as any).message || "Failed to create patient");
      }
      await loadPatients();
      setOpen(false);
      setForm({ fullName: "", phone: "", gender: "unknown", dob: "", address: "", notes: "" });
    } catch (err: any) {
      setSubmitError(err.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:flex-wrap">
        <div className="flex items-center gap-3">
          <Link href="/frontdesk/appointments" className="btn btn-outline">← Back</Link>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-black">Patients</h2>
            <span className="text-sm text-black">Front Desk view</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full">
          <input
            type="text"
            placeholder="Search patients"
            className="min-w-[12rem] flex-1 rounded border-gray-300 bg-white shadow-sm px-3 py-2 text-sm text-black placeholder:text-black/60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setOpen(true)} className="shrink-0 btn btn-primary">Add Patient</button>
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
        <div className="rounded border border-gray-200 bg-white p-3 text-black text-sm">No patients found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 bg-gray-50 text-black">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Gender</th>
                <th className="px-4 py-3 font-medium">DOB</th>
                <th className="px-4 py-3 font-medium">Address</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p, idx) => (
                <tr key={p.id} className={idx % 2 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                  <td className="px-4 py-3 font-medium text-black">{p.fullName}</td>
                  <td className="px-4 py-3 text-black">{p.phone || "-"}</td>
                  <td className="px-4 py-3 text-black">{p.gender || "unknown"}</td>
                  <td className="px-4 py-3 text-black">{p.dob ? fmt.format(new Date(p.dob)) : "-"}</td>
                  <td className="px-4 py-3 text-black">{p.address || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add Patient">
        <form onSubmit={submitPatient} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-black">Full Name</label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-black/60"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Enter full name"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-black">Phone</label>
              <input
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-black/60"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Enter phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Gender</label>
              <select
                className="mt-1 w-full rounded border-gray-300 bg-white shadow-sm px-2 py-2 text-sm text-black"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option value="unknown">Unknown</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-black">DOB</label>
              <input
                type="date"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm text-black"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Address</label>
              <input
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-black/60"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Enter address"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Notes</label>
            <textarea
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-black/60"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Additional notes"
              rows={3}
            />
          </div>
          {submitError && <div className="rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700">{submitError}</div>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="btn btn-outline">Cancel</button>
            <button type="submit" disabled={submitting} className="btn btn-primary">{submitting ? "Saving..." : "Save"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
