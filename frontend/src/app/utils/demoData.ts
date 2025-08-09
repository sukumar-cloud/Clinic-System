// Simple localStorage-backed demo data seeding and helpers
// Ensures UI has 20+ doctors and appointments for demos and that newly created
// appointments appear even if backend is unavailable.

export type DemoDoctor = { id: number; name: string; specialization?: string; available?: boolean };
export type DemoAppointment = {
  id: number;
  patientName: string;
  doctor: { id: number; name: string };
  time: string; // ISO string
  status: 'booked' | 'waiting' | 'completed' | 'canceled';
};

const DOCTORS_KEY = 'demo_doctors';
const APPTS_KEY = 'demo_appointments';

function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function doctorNames() {
  return [
    'Dr. Olivia Wilson','Dr. Ethan Miller','Dr. Ava Johnson','Dr. Liam Brown','Dr. Sophia Davis',
    'Dr. Noah Garcia','Dr. Isabella Martinez','Dr. Mason Rodriguez','Dr. Mia Hernandez','Dr. Lucas Lopez',
    'Dr. Amelia Gonzalez','Dr. Elija Perez','Dr. Charlotte Sanchez','Dr. James Rivera','Dr. Harper Torres',
    'Dr. Benjamin Ramirez','Dr. Evelyn Flores','Dr. Henry Gomez','Dr. Abigail Diaz','Dr. Alexander Morales',
    'Dr. Emily Reyes','Dr. Michael Cruz','Dr. Elizabeth Ortiz','Dr. Daniel Gutierrez','Dr. Sofia Chavez'
  ];
}

function specializations() {
  return ['General Medicine','Pediatrics','Dermatology','Cardiology','Orthopedics','ENT','Neurology'];
}

function patientFirstNames() {
  return ['Aarav','Vivaan','Aditya','Vihaan','Arjun','Sai','Ayaan','Krishna','Ishaan','Shaurya','Ananya','Diya','Ira','Mira','Saanvi','Pari','Aadhya','Avni','Navya','Sara'];
}

function patientLastNames() { return ['Sharma','Verma','Reddy','Iyer','Gupta','Kapoor','Patel','Mehta','Rao','Nair']; }

export function getLocalDoctors(): DemoDoctor[] {
  try {
    const raw = localStorage.getItem(DOCTORS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function getLocalAppointments(): DemoAppointment[] {
  try {
    const raw = localStorage.getItem(APPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function setLocalDoctors(docs: DemoDoctor[]) {
  localStorage.setItem(DOCTORS_KEY, JSON.stringify(docs));
}

export function setLocalAppointments(appts: DemoAppointment[]) {
  localStorage.setItem(APPTS_KEY, JSON.stringify(appts));
}

export function seedDemoDoctors(minCount = 20): DemoDoctor[] {
  let docs = getLocalDoctors();
  if (docs.length >= minCount) return docs;
  const names = doctorNames();
  const specs = specializations();
  const startId = docs.length ? Math.max(...docs.map(d => d.id)) + 1 : 1;
  while (docs.length < minCount) {
    const name = names[docs.length % names.length];
    const spec = specs[randInt(0, specs.length - 1)];
    docs.push({ id: startId + (docs.length - (startId - 1)), name, specialization: spec, available: Math.random() > 0.3 });
  }
  setLocalDoctors(docs);
  return docs;
}

export function seedDemoAppointments(minCount = 20): DemoAppointment[] {
  let appts = getLocalAppointments();
  if (appts.length >= minCount) return appts;
  const docs = seedDemoDoctors(minCount);
  const first = patientFirstNames();
  const last = patientLastNames();
  const startId = appts.length ? Math.max(...appts.map(a => a.id)) + 1 : 1;
  while (appts.length < minCount) {
    const patient = `${first[randInt(0, first.length - 1)]} ${last[randInt(0, last.length - 1)]}`;
    const d = docs[randInt(0, docs.length - 1)];
    const minutesAhead = randInt(10, 60 * 24 * 5); // within next 5 days
    const time = new Date(Date.now() + minutesAhead * 60 * 1000).toISOString();
    const statuses: DemoAppointment['status'][] = ['booked','waiting','completed','canceled'];
    const status = statuses[randInt(0, statuses.length - 1)];
    appts.push({ id: startId + (appts.length - (startId - 1)), patientName: patient, doctor: { id: d.id, name: d.name }, time, status });
  }
  setLocalAppointments(appts);
  return appts;
}

export function addLocalAppointment(a: Omit<DemoAppointment,'id'>): DemoAppointment {
  const appts = getLocalAppointments();
  const id = appts.length ? Math.max(...appts.map(x => x.id)) + 1 : 1;
  const newAppt: DemoAppointment = { id, ...a };
  appts.push(newAppt);
  setLocalAppointments(appts);
  return newAppt;
}

export function ensureSeeded() {
  seedDemoDoctors(20);
  seedDemoAppointments(20);
}
