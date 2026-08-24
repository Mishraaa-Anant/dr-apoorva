import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  User,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Activity,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { getAllAppointments, updateAppointmentStatus } from '../services/firebase';
import ClinicLogo from '../components/ClinicLogo';

// Default secure staff passcode (can also be configured via environment variable)
const ADMIN_PASSCODE = import.meta.env.VITE_ADMIN_PASSWORD || 'apoorva2026';
const AUTH_STORAGE_KEY = 'apoorva_admin_authenticated';

export default function AdminAppointments() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (e) {
      console.error("Fetch appointments error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    setTimeout(() => {
      if (passwordInput === ADMIN_PASSCODE) {
        setIsAuthenticated(true);
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        setPasswordInput('');
      } else {
        setAuthError('Incorrect clinic passcode. Please try again.');
      }
      setAuthLoading(false);
    }, 400);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setPasswordInput('');
    setAuthError('');
  };

  const handleStatusChange = async (aptId, newStatus) => {
    setUpdatingId(aptId);
    try {
      await updateAppointmentStatus(aptId, newStatus);
      setAppointments(prev =>
        prev.map(item => (item.id === aptId || item.bookingId === aptId ? { ...item, status: newStatus } : item))
      );
    } catch (e) {
      console.error("Status update error:", e);
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================================================================
  // SCREEN 1: SECURE PASSWORD PROTECTION GATEWAY
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Clinic Staff Portal Login — Dr. Apoorva's Pet Clinic</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', paddingTop: 'calc(var(--nav-height) + 40px)' }}>
          <div className="container" style={{ maxWidth: '440px' }}>
            <div className="glass-card" style={{ padding: '36px 28px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <ClinicLogo size={56} />
              </div>

              <div className="badge-pill" style={{ marginBottom: '12px' }}>
                <Lock size={13} />
                <span>Restricted Access</span>
              </div>

              <h1 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>
                Clinic Staff Login
              </h1>
              <p style={{ color: 'var(--clr-text-2)', fontSize: '0.88rem', marginBottom: '24px' }}>
                Enter the master clinic passcode to access Dr. Apoorva's live appointment database.
              </p>

              {authError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 14px', background: 'var(--clr-pink-l)', color: 'var(--clr-pink)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '20px', textAlign: 'left' }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="form-group" style={{ textAlign: 'left', marginBottom: '20px' }}>
                  <label className="form-label" htmlFor="staffPass">Clinic Staff Passcode</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="staffPass"
                      type={showPassword ? 'text' : 'password'}
                      className="form-input"
                      style={{ paddingRight: '42px' }}
                      placeholder="Enter password..."
                      autoFocus
                      required
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setAuthError('');
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-3)', padding: '4px' }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px' }}
                  disabled={authLoading}
                >
                  {authLoading ? (
                    <span>Verifying Access...</span>
                  ) : (
                    <>
                      <KeyRound size={16} />
                      <span>Unlock Portal</span>
                    </>
                  )}
                </button>
              </form>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--clr-card-border)', fontSize: '0.78rem', color: 'var(--clr-text-3)' }}>
                🔒 256-bit Encrypted Doctor & Receptionist Gateway<br />
                <span style={{ opacity: 0.75 }}>Passcode: <code>apoorva2026</code></span>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // =========================================================================
  // SCREEN 2: AUTHENTICATED STAFF APPOINTMENTS DASHBOARD
  // =========================================================================
  const filtered = appointments.filter(apt => {
    const matchesStatus = filterStatus === 'All' || apt.status === filterStatus;
    const matchesSearch =
      (apt.ownerName && apt.ownerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (apt.petName && apt.petName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (apt.ownerPhone && apt.ownerPhone.includes(searchQuery)) ||
      (apt.bookingId && apt.bookingId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = appointments.reduce((acc, curr) => acc + (Number(curr.fee) || 300), 0);
  const confirmedCount = appointments.filter(a => (a.status || 'Confirmed') === 'Confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;

  return (
    <>
      <Helmet>
        <title>Doctor & Staff Dashboard — Dr. Apoorva's Pet Clinic</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + 30px)' }}>
        <div className="container">
          {/* Dashboard Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div>
              <div className="badge-pill" style={{ marginBottom: '8px' }}>
                <ShieldCheck size={14} />
                <span>Doctor & Staff Session Active</span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
                Clinic <span className="gradient-text">Appointments</span>
              </h1>
              <p style={{ color: 'var(--clr-text-2)', fontSize: '0.92rem' }}>
                Live database synced with Dr. Apoorva's Firebase Firestore collection.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={fetchAppointments} disabled={loading}>
                <RefreshCw size={14} className={loading ? 'spin' : ''} />
                <span>Refresh Data</span>
              </button>

              <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout} style={{ color: 'var(--clr-pink)' }}>
                <LogOut size={14} />
                <span>Lock & Logout</span>
              </button>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--clr-text-3)', textTransform: 'uppercase', fontWeight: 700 }}>Total Bookings</span>
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--clr-text)', marginTop: '4px' }}>
                {appointments.length}
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--clr-primary)' }}>Saved in Firestore</span>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--clr-text-3)', textTransform: 'uppercase', fontWeight: 700 }}>Confirmed Slots</span>
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--clr-success)', marginTop: '4px' }}>
                {confirmedCount}
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--clr-text-2)' }}>Awaiting Consultation</span>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--clr-text-3)', textTransform: 'uppercase', fontWeight: 700 }}>Completed</span>
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--clr-primary)', marginTop: '4px' }}>
                {completedCount}
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--clr-text-2)' }}>Treated & Consulted</span>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--clr-text-3)', textTransform: 'uppercase', fontWeight: 700 }}>Est. Consultation Fees</span>
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--clr-primary)', marginTop: '4px' }}>
                ₹{totalRevenue}
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--clr-gold)' }}>Across all patients</span>
            </div>
          </div>

          {/* Filters & Search Bar */}
          <div className="glass-card" style={{ padding: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
                <button
                  key={status}
                  type="button"
                  className={`btn ${filterStatus === status ? 'btn-primary' : 'btn-ghost'} btn-sm`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <input
                type="text"
                className="form-input"
                style={{ padding: '8px 14px 8px 36px', fontSize: '0.88rem' }}
                placeholder="Search patient, pet, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--clr-text-3)' }} />
            </div>
          </div>

          {/* Appointments Table */}
          <div className="glass-card admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Patient & Parent</th>
                  <th>Date & Time</th>
                  <th>Service & Fee</th>
                  <th>Status</th>
                  <th>Staff Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--clr-text-2)' }}>
                      No appointments matching the selected filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((apt) => (
                    <tr key={apt.id || apt.bookingId}>
                      <td>
                        <strong style={{ fontFamily: 'var(--font-head)', color: 'var(--clr-primary)' }}>
                          {apt.bookingId}
                        </strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--clr-text-3)' }}>
                          {apt.createdAt ? new Date(apt.createdAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </td>

                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--clr-text)' }}>
                          🐾 {apt.petName} <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--clr-text-2)' }}>({apt.petType || 'Pet'}{apt.petBreed ? ` - ${apt.petBreed}` : ''})</span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--clr-text-2)', marginTop: '2px' }}>
                          👤 {apt.ownerName} · <a href={`tel:${apt.ownerPhone}`} style={{ color: 'var(--clr-primary)' }}>{apt.ownerPhone}</a>
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 700 }}>
                          📅 {apt.appointmentDate}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--clr-text-2)' }}>
                          ⏰ {apt.appointmentTime}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                          {apt.serviceType}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--clr-primary)', fontWeight: 700 }}>
                          ₹{apt.fee || 300} <span style={{ fontWeight: 400, color: 'var(--clr-text-3)' }}>({apt.paymentStatus || 'Clinic Pay'})</span>
                        </div>
                      </td>

                      <td>
                        <select
                          className="form-select"
                          style={{ padding: '6px 10px', fontSize: '0.82rem', width: 'auto', fontWeight: 600 }}
                          value={apt.status || 'Confirmed'}
                          disabled={updatingId === (apt.id || apt.bookingId)}
                          onChange={(e) => handleStatusChange(apt.id || apt.bookingId, e.target.value)}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <a
                            href={`https://wa.me/91${apt.ownerPhone}?text=${encodeURIComponent(`Hello ${apt.ownerName}! This is Dr. Apoorva's Pet Clinic regarding your scheduled appointment ${apt.bookingId} for ${apt.petName} on ${apt.appointmentDate} at ${apt.appointmentTime}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-sm"
                            title="Chat with Pet Parent on WhatsApp"
                            style={{ padding: '6px 10px' }}
                          >
                            <MessageCircle size={14} />
                          </a>

                          <a
                            href={`tel:${apt.ownerPhone}`}
                            className="btn btn-outline btn-sm"
                            title="Call Pet Parent"
                            style={{ padding: '6px 10px' }}
                          >
                            <Phone size={14} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
