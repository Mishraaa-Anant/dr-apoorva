import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Calendar, Home } from 'lucide-react';

export default function PaymentSuccess() {
  const location = useLocation();
  const { booking = {}, txnId = 'TXN000000', amount = 300 } = location.state || {};

  return (
    <>
      <Helmet>
        <title>Booking Confirmed! — Dr. Apoorva's Pet Clinic</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="success-page">
        <div className="glass-card success-card">
          <div className="success-icon">✅</div>

          <div className="badge badge--green" style={{ display: 'inline-flex', marginBottom: '16px' }}>
            Payment Successful
          </div>

          <h1 className="success-title">
            🐾 Appointment <span className="gradient-text">Confirmed!</span>
          </h1>

          <p className="success-desc">
            Your appointment has been booked successfully. Dr. Apoorva's team will call you
            to confirm your slot. Please arrive 10 minutes early.
          </p>

          <div className="success-ref">
            Transaction ID: <strong>{txnId}</strong><br />
            Amount Paid: <strong style={{ color: 'var(--clr-primary)' }}>₹{amount}</strong>
          </div>

          {booking.petName && (
            <div style={{ background: 'rgba(0,201,167,0.06)', border: '1px solid rgba(0,201,167,0.15)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
              {[
                { label: '🐶 Pet', value: `${booking.petName} (${booking.petType})` },
                { label: '🩺 Service', value: booking.serviceType },
                { label: '📅 Date', value: booking.date },
                { label: '⏰ Time', value: booking.time },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.875rem', borderBottom: '1px solid var(--clr-border)' }}>
                  <span style={{ color: 'var(--clr-text-2)' }}>{r.label}</span>
                  <span style={{ fontWeight: 600 }}>{r.value}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ padding: '16px', background: 'rgba(132,94,194,0.08)', border: '1px solid rgba(132,94,194,0.15)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--clr-text-2)', marginBottom: '24px' }}>
            📍 <strong style={{ color: 'var(--clr-text)' }}>Location:</strong> 2259M, Street No. 1, Sector 49, Faridabad, Haryana 121001<br />
            📞 <strong style={{ color: 'var(--clr-text)' }}>Phone:</strong> <a href="tel:+919311672292" style={{ color: 'var(--clr-primary)' }}>093116 72292</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              <Home size={16} /> Back to Home
            </Link>
            <Link to="/book" className="btn btn-ghost" style={{ justifyContent: 'center' }}>
              <Calendar size={16} /> Book Another Appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
