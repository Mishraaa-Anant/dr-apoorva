import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Shield, CreditCard, Smartphone, Building2, AlertCircle, ArrowRight } from 'lucide-react';
import ClinicLogo from '../components/ClinicLogo';

const paymentMethods = [
  { id: 'card',  icon: <CreditCard size={22} />,   label: 'Card' },
  { id: 'upi',   icon: <Smartphone size={22} />,    label: 'UPI' },
  { id: 'netbanking', icon: <Building2 size={22} />, label: 'Net Banking' },
];

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking || {};

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [cardNum, setCardNum] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const formatCardNum = (val) => {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  const onSubmit = (data) => {
    setLoading(true);
    // TODO: Integrate Razorpay/Stripe SDK here
    // Example for Razorpay:
    // const options = { key: 'RAZORPAY_KEY_ID', amount: 30000, currency: 'INR', ... }
    // const rzp = new window.Razorpay(options);
    // rzp.open();

    // Mock success after 2 seconds
    setTimeout(() => {
      setLoading(false);
      navigate('/payment/success', {
        state: {
          booking,
          txnId: 'TXN' + Math.random().toString(36).substring(2, 10).toUpperCase(),
          amount: 300,
        }
      });
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Secure Payment — Dr. Apoorva's Pet Clinic</title>
        <meta name="description" content="Securely pay ₹300 consultation fee for your appointment at Dr. Apoorva's Pet Clinic, Faridabad." />
      </Helmet>

      <div className="payment-page">
        <div className="container section">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="tag" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <Lock size={12} /> Secure Checkout
            </span>
            <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '12px' }}>
              Complete Your <span className="gradient-text">Payment</span>
            </h1>
            <p style={{ color: 'var(--clr-text-2)' }}>
              Your consultation fee of ₹300 is payable below. 256-bit SSL encrypted.
            </p>
          </div>

          <div className="payment-layout">
            {/* Payment Form */}
            <div className="glass-card payment-form-wrap">
              {/* Method selector */}
              <p style={{ fontWeight: 700, fontFamily: 'var(--font-head)', marginBottom: '16px' }}>Choose Payment Method</p>
              <div className="payment-methods">
                {paymentMethods.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    className={`payment-method-btn ${selectedMethod === m.id ? 'selected' : ''}`}
                    onClick={() => setSelectedMethod(m.id)}
                  >
                    <span className="payment-method-icon">{m.icon}</span>
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Secure badge */}
              <div className="secure-badge">
                <Shield size={16} />
                Your payment is secured with 256-bit SSL encryption. We do not store card details.
              </div>

              {/* Card form */}
              {selectedMethod === 'card' && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Card visual */}
                  <div className="card-visual">
                    <div className="card-chip" />
                    <div className="card-number-display">
                      {cardNum || '•••• •••• •••• ••••'}
                    </div>
                    <div className="card-meta">
                      <span>Card Holder Name</span>
                      <span>MM / YY</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cardHolder">Cardholder Name *</label>
                    <input
                      id="cardHolder"
                      className={`form-input ${errors.cardHolder ? 'error' : ''}`}
                      placeholder="Name as on card"
                      {...register('cardHolder', { required: 'Cardholder name is required' })}
                    />
                    {errors.cardHolder && <p className="form-error"><AlertCircle size={12} /> {errors.cardHolder.message}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cardNumber">Card Number *</label>
                    <input
                      id="cardNumber"
                      className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                      placeholder="1234 5678 9012 3456"
                      value={cardNum}
                      onChange={e => setCardNum(formatCardNum(e.target.value))}
                      maxLength={19}
                      {...register('cardNumber', {
                        required: 'Card number is required',
                        validate: v => v.replace(/\s/g,'').length === 16 || 'Enter valid 16-digit number'
                      })}
                    />
                    {errors.cardNumber && <p className="form-error"><AlertCircle size={12} /> {errors.cardNumber.message}</p>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="expiry">Expiry Date *</label>
                      <input
                        id="expiry"
                        className={`form-input ${errors.expiry ? 'error' : ''}`}
                        placeholder="MM / YY"
                        maxLength={7}
                        {...register('expiry', {
                          required: 'Expiry required',
                          pattern: { value: /^(0[1-9]|1[0-2]) \/ \d{2}$/, message: 'Use MM / YY format' }
                        })}
                        onInput={(e) => {
                          let v = e.target.value.replace(/\D/g,'');
                          if (v.length >= 2) v = v.slice(0,2) + ' / ' + v.slice(2,4);
                          e.target.value = v;
                        }}
                      />
                      {errors.expiry && <p className="form-error"><AlertCircle size={12} /> {errors.expiry.message}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="cvv">CVV *</label>
                      <input
                        id="cvv"
                        type="password"
                        className={`form-input ${errors.cvv ? 'error' : ''}`}
                        placeholder="•••"
                        maxLength={4}
                        {...register('cvv', {
                          required: 'CVV required',
                          pattern: { value: /^\d{3,4}$/, message: 'Enter 3 or 4 digit CVV' }
                        })}
                      />
                      {errors.cvv && <p className="form-error"><AlertCircle size={12} /> {errors.cvv.message}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '8px', padding: '18px' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: '50%',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff',
                          animation: 'spin 0.8s linear infinite',
                          display: 'inline-block'
                        }} />
                        Processing Payment...
                      </span>
                    ) : (
                      <>Pay ₹300 Securely <Lock size={16} /></>
                    )}
                  </button>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </form>
              )}

              {/* UPI form */}
              {selectedMethod === 'upi' && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="upiId">UPI ID *</label>
                    <input
                      id="upiId"
                      className={`form-input ${errors.upiId ? 'error' : ''}`}
                      placeholder="yourname@upi"
                      {...register('upiId', {
                        required: 'UPI ID required',
                        pattern: { value: /^[\w.\-]+@[\w]+$/, message: 'Enter valid UPI ID' }
                      })}
                    />
                    {errors.upiId && <p className="form-error"><AlertCircle size={12} /> {errors.upiId.message}</p>}
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(0,201,167,0.06)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--clr-text-2)', marginBottom: '24px' }}>
                    💡 You will receive a payment request on your UPI app. Approve it to confirm your booking.
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px' }} disabled={loading}>
                    {loading ? 'Sending Request...' : <>Send UPI Request ₹300 <ArrowRight size={16} /></>}
                  </button>
                </form>
              )}

              {/* Net Banking form */}
              {selectedMethod === 'netbanking' && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="bank">Select Your Bank *</label>
                    <select
                      id="bank"
                      className={`form-input form-select ${errors.bank ? 'error' : ''}`}
                      {...register('bank', { required: 'Please select a bank' })}
                    >
                      <option value="">Choose bank</option>
                      {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Other'].map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    {errors.bank && <p className="form-error"><AlertCircle size={12} /> {errors.bank.message}</p>}
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(132,94,194,0.06)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--clr-text-2)', marginBottom: '24px' }}>
                    🔒 You will be redirected to your bank's secure portal to complete the payment.
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px' }} disabled={loading}>
                    {loading ? 'Redirecting...' : <>Continue to Bank ₹300 <ArrowRight size={16} /></>}
                  </button>
                </form>
              )}
            </div>

            {/* Payment Summary */}
            <div className="glass-card payment-summary-card">
              <div className="payment-clinic-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ClinicLogo size={46} />
                <div>
                  <div className="clinic-name">Dr. Apoorva's Pet Clinic</div>
                  <div className="clinic-sub">Sector 49, Faridabad, Haryana</div>
                  <div className="clinic-sub" style={{ marginTop: '4px' }}>⭐ 4.5/5 · 151 Reviews</div>
                </div>
              </div>

              <div className="amount-display">
                <div className="amount-label">Amount to Pay</div>
                <div className="amount-value">
                  <span className="amount-currency">₹</span>300
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--clr-text-2)', marginTop: '8px' }}>Consultation Fee (inclusive of taxes)</div>
              </div>

              {/* Booking details */}
              {booking.ownerName && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    { label: 'Patient', value: `${booking.ownerName}` },
                    { label: 'Pet', value: `${booking.petName || '—'} (${booking.petType || '—'})` },
                    { label: 'Service', value: booking.serviceType },
                    { label: 'Date', value: booking.date },
                    { label: 'Time', value: booking.time },
                  ].map(row => (
                    <div key={row.label} className="summary-row" style={{ fontSize: '0.85rem' }}>
                      <span className="label">{row.label}</span>
                      <span className="value" style={{ textAlign: 'right', maxWidth: '160px' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {!booking.ownerName && (
                <div style={{ padding: '16px', background: 'rgba(255,107,138,0.08)', border: '1px solid rgba(255,107,138,0.2)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--clr-pink)' }}>
                  ⚠️ No booking details found. Please <a href="/book" style={{ color: 'var(--clr-primary)' }}>book an appointment</a> first.
                </div>
              )}

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--clr-text-2)' }}>
                  <Shield size={14} style={{ color: 'var(--clr-primary)' }} /> SSL Encrypted
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--clr-text-2)' }}>
                  <Lock size={14} style={{ color: 'var(--clr-primary)' }} /> No card data stored
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--clr-text-2)' }}>
                  <span style={{ color: 'var(--clr-primary)' }}>✓</span> Instant confirmation
                </div>
              </div>

              {/* Gateway note */}
              <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(255,209,102,0.06)', border: '1px solid rgba(255,209,102,0.15)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--clr-text-2)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--clr-gold)' }}>🔌 Gateway Integration Ready</strong><br />
                Drop in your Razorpay/Stripe API key to go live instantly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
