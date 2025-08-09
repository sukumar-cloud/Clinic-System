"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function DoctorLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // TODO: Replace with real API call
    await new Promise(r => setTimeout(r, 800));
    // Call backend API for login
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        login("doctor");
        setLoading(false);
        router.push("/doctor/queue");
        return;
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-md w-full text-center bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Doctor Login</h2>
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-200 rounded p-2">
            {error}
          </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    </main>
  );
}
