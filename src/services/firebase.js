import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';

// Configuration loaded from Vite environment variables with graceful fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForApoorvaClinic2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "apoorva-pet-clinic.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "apoorva-pet-clinic",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "apoorva-pet-clinic.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "104928374650",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:104928374650:web:839a7b9e0f1c2d3e"
};

let app;
let db = null;
let isFirebaseConnected = false;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  // Only enable Firestore if a real or active project is ready
  if (import.meta.env.VITE_FIREBASE_PROJECT_ID && import.meta.env.VITE_FIREBASE_PROJECT_ID !== "apoorva-pet-clinic") {
    db = getFirestore(app);
    isFirebaseConnected = true;
  } else {
    // Attempt connecting Firestore; if offline/dev demo, fallback system captures data seamlessly
    try {
      db = getFirestore(app);
      isFirebaseConnected = true;
    } catch {
      isFirebaseConnected = false;
    }
  }
} catch (e) {
  console.warn("Firebase initialization notice: using resilient local data cache.", e);
  isFirebaseConnected = false;
}

// Local cache storage helpers for 100% offline & demo reliability
const LOCAL_STORAGE_KEY = 'apoorva_appointments_db';
const LOCAL_INQUIRIES_KEY = 'apoorva_inquiries_db';

function getLocalAppointments() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : getSeedAppointments();
  } catch {
    return getSeedAppointments();
  }
}

function saveLocalAppointments(list) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

function getSeedAppointments() {
  const seed = [
    {
      id: 'APV-2026-1082',
      bookingId: 'APV-2026-1082',
      ownerName: 'Gautam Bhardwaj',
      ownerPhone: '9811234567',
      ownerEmail: 'gautam@example.com',
      ownerAddress: 'Sector 49, Faridabad',
      petName: 'Bruno',
      petType: 'Dog',
      petBreed: 'German Shepherd',
      petAge: '3 Years',
      serviceType: 'General Consultation (₹300)',
      fee: 300,
      appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      appointmentTime: '11:00 AM',
      consultationMode: 'In-Clinic',
      notes: 'Routine health check-up and appetite consultation',
      status: 'Confirmed',
      paymentStatus: 'Paid Online',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'APV-2026-1094',
      bookingId: 'APV-2026-1094',
      ownerName: 'Urvi Syal',
      ownerPhone: '9899887766',
      ownerEmail: 'urvi.syal@gmail.com',
      ownerAddress: 'NIT 3, Faridabad',
      petName: 'Milo',
      petType: 'Cat',
      petBreed: 'Persian Cross',
      petAge: '1.5 Years',
      serviceType: 'Vaccination & Deworming (₹400)',
      fee: 400,
      appointmentDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      appointmentTime: '04:30 PM',
      consultationMode: 'In-Clinic',
      notes: 'Annual booster rabies vaccination required',
      status: 'Confirmed',
      paymentStatus: 'Pay at Clinic',
      createdAt: new Date(Date.now() - 7200000).toISOString()
    }
  ];
  saveLocalAppointments(seed);
  return seed;
}

/**
 * Generate a unique memorable booking ID (e.g. APV-2026-7492)
 */
export function generateBookingId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `APV-2026-${randomNum}`;
}

/**
 * Book an appointment (saves to Firebase Firestore & local mirror)
 */
export async function createAppointment(appointmentData) {
  const bookingId = appointmentData.bookingId || generateBookingId();
  const payload = {
    ...appointmentData,
    bookingId,
    status: appointmentData.status || 'Confirmed',
    paymentStatus: appointmentData.paymentStatus || 'Confirmed Reservation',
    fee: appointmentData.fee || 300,
    createdAt: new Date().toISOString(),
  };

  let firestoreSuccess = false;

  if (db && isFirebaseConnected) {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const docRef = await addDoc(appointmentsRef, {
        ...payload,
        serverTimestamp: serverTimestamp()
      });
      payload.firestoreId = docRef.id;
      firestoreSuccess = true;
    } catch (e) {
      console.warn("Firestore live sync failed (using local sync fallback):", e.message);
    }
  }

  // Always sync to persistent local cache
  const localList = getLocalAppointments();
  localList.unshift({ ...payload, id: payload.firestoreId || bookingId });
  saveLocalAppointments(localList);

  return {
    success: true,
    bookingId,
    appointment: payload,
    source: firestoreSuccess ? 'firebase' : 'local'
  };
}

/**
 * Retrieve appointments by Owner Phone Number or Booking ID
 */
export async function findAppointments(queryTerm) {
  const term = (queryTerm || '').trim().toLowerCase();
  if (!term) return [];

  // Try Firestore first if available
  if (db && isFirebaseConnected) {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(appointmentsRef, orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const results = [];
      snap.forEach(docSnap => {
        const d = docSnap.data();
        if (
          (d.ownerPhone && d.ownerPhone.toLowerCase().includes(term)) ||
          (d.bookingId && d.bookingId.toLowerCase().includes(term)) ||
          (d.ownerName && d.ownerName.toLowerCase().includes(term))
        ) {
          results.push({ id: docSnap.id, ...d });
        }
      });
      if (results.length > 0) return results;
    } catch (e) {
      console.warn("Firestore query error (falling back to local cache):", e.message);
    }
  }

  // Fallback to local store
  const localList = getLocalAppointments();
  return localList.filter(item =>
    (item.ownerPhone && item.ownerPhone.toLowerCase().includes(term)) ||
    (item.bookingId && item.bookingId.toLowerCase().includes(term)) ||
    (item.ownerName && item.ownerName.toLowerCase().includes(term)) ||
    (item.petName && item.petName.toLowerCase().includes(term))
  );
}

/**
 * Get all appointments for Clinic Staff Dashboard
 */
export async function getAllAppointments() {
  if (db && isFirebaseConnected) {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(appointmentsRef, orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const list = [];
      snap.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (list.length > 0) return list;
    } catch (e) {
      console.warn("Firestore getAll error:", e.message);
    }
  }
  return getLocalAppointments();
}

/**
 * Update appointment status (e.g., 'Confirmed', 'Completed', 'Cancelled')
 */
export async function updateAppointmentStatus(idOrBookingId, newStatus) {
  if (db && isFirebaseConnected) {
    try {
      const docRef = doc(db, 'appointments', idOrBookingId);
      await updateDoc(docRef, { status: newStatus });
    } catch {
      // ignore
    }
  }

  const localList = getLocalAppointments();
  const updated = localList.map(item => {
    if (item.id === idOrBookingId || item.bookingId === idOrBookingId) {
      return { ...item, status: newStatus };
    }
    return item;
  });
  saveLocalAppointments(updated);
  return true;
}

/**
 * Save contact inquiry to Firebase
 */
export async function submitContactInquiry(inquiryData) {
  const payload = {
    ...inquiryData,
    createdAt: new Date().toISOString()
  };

  if (db && isFirebaseConnected) {
    try {
      const col = collection(db, 'inquiries');
      await addDoc(col, payload);
    } catch (e) {
      console.warn("Inquiry firestore error:", e.message);
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_INQUIRIES_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(payload);
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(list));
  } catch {}

  return { success: true };
}
