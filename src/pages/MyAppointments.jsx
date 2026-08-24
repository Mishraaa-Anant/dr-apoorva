import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, MapPin, Phone, MessageCircle, AlertCircle, FileText, CheckCircle2, User, RefreshCw } from 'lucide-react';
import { findAppointments } from '../services/firebase';
import AppointmentReceipt from '../components/AppointmentReceipt';

export default function MyAppointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Auto search on initial mount if saved phone exists in localStorage
  useEffect(() => {
    const savedPhone = localStorage.getItem('apoorva_last_phone');
    if (savedPhone) {
      setSearchTerm(savedPhone);
      handleSearch(savedPhone);
    }
  }, []);

  const handleSearch = async (termToUse) => {
    const term = termToUse !== undefined ? termToUse : searchTerm;
    if (!term.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const results = await findAppointments(term);
      setAppointments(results);
      if (results.length > 0) {
        localStorage.setItem('apoorva_last_phone', term);
      }
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <>
      <Helmet>
        <title>Track & Manage Appointments — Dr. Apoorva's Pet Clinic</title>
        <meta name="description" content="Look up your veterinary appointment status, download your booking pass, or view consultation details at Dr. Apoorva's Pet Clinic Faridabad." />
      </Helmet>

      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + 30px)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="badge-pill" style={{ marginBottom: '12px' }}>
              <Search size={14} />
              <span>Patient Appointment Portal</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '12px' }}>
              Track Your <span className="gradient-text">Appointment</span>
            </h1>
            <p style={{ color: 'var(--clr-text-2)', fontSize: '0.98rem' }}>
              Enter your mobile number or Booking Reference ID (e.g. <code>APV-2026-1082</code>) to view scheduled appointments.
            </p>
          </div>

          {/* Search Box Card */}
          <div className="glass-card" style={{ padding: '28px', marginBottom: '32px' }}>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter 10-digit mobile number or Booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <RefreshCw size={16} className="spin" /> : <Search size={16} />}
                <span>Search Appointments</span>
              </button>
            </form>
          </div>

          {/* Detailed Receipt Modal View */}
          {selectedAppointment && (
            <div style={{ marginBottom: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Appointment Pass Details</h3>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSelectedAppointment(null)}>
                  ✕ Close Pass
                </button>
              </div>
              <AppointmentReceipt appointment={selectedAppointment} />
            </div>
          )}

          {/* Results List */}
          {hasSearched && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h2 style={{ fontSize: '1.3rem' }}>
                  Search Results ({appointments.length})
                </h2>
                {appointments.length > 0 && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-3)' }}>
                    Saved in Clinic Database
                  </span>
                )}
              </div>

              {appointments.length === 0 ? (
                <div className="glass-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
                  <AlertCircle size={40} style={{ color: 'var(--clr-pink)', margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No Appointments Found</h3>
                  <p style={{ color: 'var(--clr-text-2)', maxWidth: '420px', margin: '0 auto 20px', fontSize: '0.92rem' }}>
                    We could not find any active booking matching "{searchTerm}". Please verify your phone number or make a new booking.
                  </p>
                  <Link to="/book" className="btn btn-primary">
                    Book New Appointment (₹300)
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {appointments.map((apt) => (
                    <div key={apt.id || apt.bookingId} className="glass-card" style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="token-code" style={{ fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--clr-primary)', fontSize: '1.1rem' }}>
                              {apt.bookingId}
                            </span>
                            <span className={`status-badge ${(apt.status || 'confirmed').toLowerCase()}`}>
                              <CheckCircle2 size={12} /> {apt.status || 'Confirmed'}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-3)' }}>
                            Booked on {apt.createdAt ? new Date(apt.createdAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--clr-primary)' }}>
                            ₹{apt.fee || 300}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--clr-text-3)' }}>
                            {apt.paymentStatus || 'Pay at Clinic'}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', background: 'var(--clr-bg)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--clr-text-3)', textTransform: 'uppercase' }}>Patient</span>
                          <strong style={{ fontSize: '0.92rem' }}>{apt.petName} ({apt.petType})</strong>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--clr-text-3)', textTransform: 'uppercase' }}>Date & Slot</span>
                          <strong style={{ fontSize: '0.92rem', color: 'var(--clr-primary)' }}>{apt.appointmentDate} @ {apt.appointmentTime}</strong>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--clr-text-3)', textTransform: 'uppercase' }}>Service</span>
                          <strong style={{ fontSize: '0.92rem' }}>{apt.serviceType}</strong>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--clr-text-3)', textTransform: 'uppercase' }}>Pet Parent</span>
                          <strong style={{ fontSize: '0.92rem' }}>{apt.ownerName} ({apt.ownerPhone})</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => setSelectedAppointment(apt)}
                        >
                          <FileText size={14} /> View Digital Pass / Print
                        </button>
                        <a
                          href={`https://wa.me/919311672292?text=${encodeURIComponent(`Hello Dr. Apoorva! Regarding my appointment ${apt.bookingId} for ${apt.petName}...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-whatsapp btn-sm"
                        >
                          <MessageCircle size={14} /> WhatsApp Clinic
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
