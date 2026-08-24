import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  CalendarCheck,
  User,
  Heart,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Phone,
  Sparkles,
  Search
} from 'lucide-react';
import { createAppointment, generateBookingId } from '../services/firebase';
import AppointmentReceipt from '../components/AppointmentReceipt';

const PET_TYPES = [
  { id: 'Dog', label: 'Dog / Puppy', icon: '🐶' },
  { id: 'Cat', label: 'Cat / Kitten', icon: '🐱' },
  { id: 'Bird', label: 'Bird', icon: '🦜' },
  { id: 'Rabbit', label: 'Rabbit', icon: '🐰' },
  { id: 'Other', label: 'Other Pet', icon: '🐾' }
];

const SERVICE_OPTIONS = [
  { id: 'General Consultation (₹300)', name: 'General Clinical Consultation', fee: 300, desc: 'Full physical exam, diagnosis & prescription' },
  { id: 'Vaccination & Deworming (₹400)', name: 'Vaccination & Deworming Booster', fee: 400, desc: 'Rabies, DHPPi or Tricat core immunization' },
  { id: 'Soft Tissue Surgery Consultation (₹500)', name: 'Surgical Evaluation & Spay/Neuter', fee: 500, desc: 'Pre-surgery health exam and counseling' },
  { id: 'Dental Checkup & Scaling (₹800)', name: 'Dental Hygiene & Tartar Cleaning', fee: 800, desc: 'Ultrasonic cleaning for healthy teeth' },
  { id: 'Online Video Consultation (₹250)', name: 'Telemedicine / Video Call', fee: 250, desc: 'WhatsApp video session with Dr. Apoorva' },
  { id: 'Emergency Trauma Triage (₹500)', name: 'Priority Emergency / Urgent Care', fee: 500, desc: 'Immediate doctor priority evaluation' }
];

const TIME_SLOTS = [
  { label: 'Morning', slots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'] },
  { label: 'Afternoon', slots: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'] },
  { label: 'Evening', slots: ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'] }
];

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export default function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const preSelectedService = location.state?.preSelectedService;

  const [step, setStep] = useState(1);
  const [selectedPetType, setSelectedPetType] = useState('Dog');
  const [selectedService, setSelectedService] = useState(() => {
    if (preSelectedService) {
      const match = SERVICE_OPTIONS.find(s => s.name.toLowerCase().includes(preSelectedService.toLowerCase()));
      return match ? match.id : SERVICE_OPTIONS[0].id;
    }
    return SERVICE_OPTIONS[0].id;
  });
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    setValue
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      appointmentDate: getTomorrowDate(),
      consultationMode: 'In-Clinic Consultation'
    }
  });

  const watchedValues = watch();

  const handleNext = async () => {
    let fields = [];
    if (step === 1) fields = ['ownerName', 'ownerPhone', 'ownerEmail'];
    if (step === 2) fields = ['petName', 'petAge'];
    if (step === 3) fields = ['appointmentDate'];

    const isValid = await trigger(fields);
    if (isValid) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const currentServiceObj = SERVICE_OPTIONS.find(s => s.id === selectedService) || SERVICE_OPTIONS[0];

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const bookingData = {
        bookingId: generateBookingId(),
        ownerName: formData.ownerName,
        ownerPhone: formData.ownerPhone,
        ownerEmail: formData.ownerEmail || '',
        ownerAddress: formData.ownerAddress || 'Faridabad',
        petName: formData.petName,
        petType: selectedPetType,
        petBreed: formData.petBreed || 'Standard',
        petAge: formData.petAge,
        serviceType: selectedService,
        fee: currentServiceObj.fee,
        appointmentDate: formData.appointmentDate,
        appointmentTime: selectedSlot,
        consultationMode: formData.consultationMode || 'In-Clinic Consultation',
        notes: formData.notes || '',
        status: 'Confirmed',
        paymentStatus: formData.paymentChoice === 'online' ? 'Paid Online' : 'Pay at Clinic (Confirmed)'
      };

      const result = await createAppointment(bookingData);
      setBookingSuccess(result.appointment);
    } catch (e) {
      console.error("Booking error:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Book Veterinary Appointment — Dr. Apoorva's Pet Clinic | Faridabad</title>
        <meta name="description" content="Book an appointment online with Dr. Apoorva in Sector 49 Faridabad. Instant confirmation, ₹300 consultation fee, stored securely in database." />
      </Helmet>

      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + 30px)' }}>
        <div className="container">
          {/* Header */}
          <div className="booking-page-header">
            <div className="badge-pill" style={{ marginBottom: '12px' }}>
              <CalendarCheck size={14} />
              <span>Direct Online Scheduling</span>
            </div>
            <h1>
              Book an <span className="gradient-text">Appointment</span>
            </h1>
            <p style={{ color: 'var(--clr-text-2)', maxWidth: '520px', margin: '0 auto', fontSize: '0.98rem' }}>
              Schedule a visit with Dr. Apoorva. Appointments are saved directly to our clinic database with instant SMS & WhatsApp confirmation.
            </p>
          </div>

          {/* Success Card Screen */}
          {bookingSuccess ? (
            <div style={{ marginTop: '20px' }}>
              <AppointmentReceipt appointment={bookingSuccess} />
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <Link to="/my-appointments" className="btn btn-outline">
                  <Search size={16} /> Look Up & Manage All My Appointments
                </Link>
              </div>
            </div>
          ) : (
            <div className="booking-wizard-layout">
              {/* Left: Interactive Wizard Form */}
              <div className="glass-card" style={{ padding: '36px' }}>
                {/* Step Indicator */}
                <div className="wizard-steps-indicator">
                  {[
                    { num: 1, label: 'Your Details' },
                    { num: 2, label: 'Pet Profile' },
                    { num: 3, label: 'Date & Slot' },
                    { num: 4, label: 'Confirm' }
                  ].map((s) => (
                    <div
                      key={s.num}
                      className={`step-bubble ${step === s.num ? 'active' : step > s.num ? 'completed' : ''}`}
                    >
                      <div className="num">
                        {step > s.num ? <CheckCircle2 size={16} /> : s.num}
                      </div>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* ========================================================
                      STEP 1: OWNER / PARENT INFO
                      ======================================================== */}
                  {step === 1 && (
                    <div>
                      <h3 className="form-section-title">
                        <User size={20} style={{ color: 'var(--clr-primary)' }} />
                        Pet Parent Information
                      </h3>

                      <div className="form-group">
                        <label className="form-label" htmlFor="ownerName">Your Full Name *</label>
                        <input
                          id="ownerName"
                          className={`form-input ${errors.ownerName ? 'error' : ''}`}
                          placeholder="e.g. Rahul Sharma"
                          {...register('ownerName', { required: 'Please enter your name', minLength: { value: 2, message: 'Name too short' } })}
                        />
                        {errors.ownerName && <p className="form-error"><AlertCircle size={13} /> {errors.ownerName.message}</p>}
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label" htmlFor="ownerPhone">WhatsApp Mobile Number *</label>
                          <input
                            id="ownerPhone"
                            type="tel"
                            className={`form-input ${errors.ownerPhone ? 'error' : ''}`}
                            placeholder="10-digit mobile number"
                            {...register('ownerPhone', {
                              required: 'Phone number is required for SMS/WhatsApp pass',
                              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' }
                            })}
                          />
                          {errors.ownerPhone && <p className="form-error"><AlertCircle size={13} /> {errors.ownerPhone.message}</p>}
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="ownerEmail">Email Address (for receipt)</label>
                          <input
                            id="ownerEmail"
                            type="email"
                            className={`form-input ${errors.ownerEmail ? 'error' : ''}`}
                            placeholder="your.email@example.com"
                            {...register('ownerEmail', {
                              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter valid email' }
                            })}
                          />
                          {errors.ownerEmail && <p className="form-error"><AlertCircle size={13} /> {errors.ownerEmail.message}</p>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="ownerAddress">Locality / Address in Faridabad</label>
                        <input
                          id="ownerAddress"
                          className="form-input"
                          placeholder="e.g. Sector 49, NIT, Greenfield, etc."
                          {...register('ownerAddress')}
                        />
                      </div>

                      <div style={{ marginTop: '24px' }}>
                        <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleNext}>
                          <span>Next: Pet Profile</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ========================================================
                      STEP 2: PET DETAILS
                      ======================================================== */}
                  {step === 2 && (
                    <div>
                      <h3 className="form-section-title">
                        <Heart size={20} style={{ color: 'var(--clr-primary)' }} />
                        Pet Patient Profile
                      </h3>

                      <div className="form-group">
                        <label className="form-label">Select Pet Species *</label>
                        <div className="pet-type-selector">
                          {PET_TYPES.map(t => (
                            <button
                              key={t.id}
                              type="button"
                              className={`pet-type-btn ${selectedPetType === t.id ? 'selected' : ''}`}
                              onClick={() => setSelectedPetType(t.id)}
                            >
                              <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
                              <span>{t.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label" htmlFor="petName">Pet's Name *</label>
                          <input
                            id="petName"
                            className={`form-input ${errors.petName ? 'error' : ''}`}
                            placeholder="e.g. Bruno, Bella, Simba"
                            {...register('petName', { required: 'Please enter pet name' })}
                          />
                          {errors.petName && <p className="form-error"><AlertCircle size={13} /> {errors.petName.message}</p>}
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="petAge">Pet's Age *</label>
                          <input
                            id="petAge"
                            className={`form-input ${errors.petAge ? 'error' : ''}`}
                            placeholder="e.g. 2 Years, 6 Months"
                            {...register('petAge', { required: 'Please enter pet age' })}
                          />
                          {errors.petAge && <p className="form-error"><AlertCircle size={13} /> {errors.petAge.message}</p>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="petBreed">Breed (optional)</label>
                        <input
                          id="petBreed"
                          className="form-input"
                          placeholder="e.g. German Shepherd, Persian Cat, Golden Retriever"
                          {...register('petBreed')}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Service Type Required *</label>
                        <select
                          className="form-select"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                        >
                          {SERVICE_OPTIONS.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.name} — ₹{s.fee}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="notes">Symptoms or Chief Complaints (optional)</label>
                        <textarea
                          id="notes"
                          className="form-textarea"
                          rows={3}
                          placeholder="Describe symptoms, reason for visit, or current medications..."
                          {...register('notes')}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                        <button type="button" className="btn btn-ghost" onClick={handleBack}>
                          ← Back
                        </button>
                        <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={handleNext}>
                          <span>Next: Date & Time Slot</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ========================================================
                      STEP 3: DATE & TIME SLOT SELECTION
                      ======================================================== */}
                  {step === 3 && (
                    <div>
                      <h3 className="form-section-title">
                        <Clock size={20} style={{ color: 'var(--clr-primary)' }} />
                        Preferred Appointment Slot
                      </h3>

                      <div className="form-group">
                        <label className="form-label" htmlFor="appointmentDate">Select Consultation Date *</label>
                        <input
                          id="appointmentDate"
                          type="date"
                          min={getTomorrowDate()}
                          className={`form-input ${errors.appointmentDate ? 'error' : ''}`}
                          {...register('appointmentDate', { required: 'Please choose a date' })}
                        />
                        {errors.appointmentDate && <p className="form-error"><AlertCircle size={13} /> {errors.appointmentDate.message}</p>}
                      </div>

                      <div className="form-group" style={{ marginTop: '20px' }}>
                        <label className="form-label">Available Time Slots for Dr. Apoorva</label>
                        {TIME_SLOTS.map((group) => (
                          <div key={group.label} style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--clr-text-3)', textTransform: 'uppercase' }}>
                              {group.label} Slots
                            </span>
                            <div className="slot-picker-grid">
                              {group.slots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                                  onClick={() => setSelectedSlot(slot)}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                        <button type="button" className="btn btn-ghost" onClick={handleBack}>
                          ← Back
                        </button>
                        <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={handleNext}>
                          <span>Review & Confirm</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ========================================================
                      STEP 4: REVIEW & CONFIRM WITH FIREBASE SYNC
                      ======================================================== */}
                  {step === 4 && (
                    <div>
                      <h3 className="form-section-title">
                        <ShieldCheck size={20} style={{ color: 'var(--clr-primary)' }} />
                        Review Booking Details
                      </h3>

                      <div style={{ background: 'var(--clr-bg-2)', padding: '20px', borderRadius: 'var(--radius-lg)', marginBottom: '24px' }}>
                        <div className="summary-item-row" style={{ padding: '8px 0', borderBottom: '1px solid var(--clr-card-border)' }}>
                          <span className="label">Pet Parent:</span>
                          <strong className="value">{watchedValues.ownerName} ({watchedValues.ownerPhone})</strong>
                        </div>
                        <div className="summary-item-row" style={{ padding: '8px 0', borderBottom: '1px solid var(--clr-card-border)' }}>
                          <span className="label">Pet:</span>
                          <strong className="value">{watchedValues.petName} ({selectedPetType})</strong>
                        </div>
                        <div className="summary-item-row" style={{ padding: '8px 0', borderBottom: '1px solid var(--clr-card-border)' }}>
                          <span className="label">Service:</span>
                          <strong className="value">{currentServiceObj.name}</strong>
                        </div>
                        <div className="summary-item-row" style={{ padding: '8px 0', borderBottom: '1px solid var(--clr-card-border)' }}>
                          <span className="label">Scheduled Slot:</span>
                          <strong className="value" style={{ color: 'var(--clr-primary)' }}>{watchedValues.appointmentDate} at {selectedSlot}</strong>
                        </div>
                        <div className="summary-item-row" style={{ padding: '8px 0' }}>
                          <span className="label">Consultation Fee:</span>
                          <strong className="value" style={{ fontSize: '1.1rem', color: 'var(--clr-primary)' }}>₹{currentServiceObj.fee}</strong>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Payment Preference</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'var(--clr-surface)', border: '1.5px solid var(--clr-card-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              value="clinic"
                              defaultChecked
                              {...register('paymentChoice')}
                            />
                            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Pay at Clinic (Cash/UPI)</span>
                          </label>

                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'var(--clr-surface)', border: '1.5px solid var(--clr-card-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              value="online"
                              {...register('paymentChoice')}
                            />
                            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Prepay Online ₹{currentServiceObj.fee}</span>
                          </label>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                        <button type="button" className="btn btn-ghost" onClick={handleBack} disabled={isSubmitting}>
                          ← Back
                        </button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={isSubmitting}>
                          {isSubmitting ? (
                            <span>Saving to Firebase Database...</span>
                          ) : (
                            <>
                              <CalendarCheck size={18} />
                              <span>Confirm & Generate Booking Pass</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Right: Summary Card Sidebar */}
              <div className="glass-card booking-summary-sidebar">
                <div className="summary-clinic-header">
                  <img src="/4.jpeg" alt="Signature Pet Clinic" />
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block' }}>Dr. Apoorva's Pet Clinic</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--clr-text-2)' }}>Sector 49, Faridabad</span>
                  </div>
                </div>

                <div className="summary-rows-box">
                  <div className="summary-item-row">
                    <span className="label">Doctor:</span>
                    <span className="value">Dr. Apoorva (BVSc & AH)</span>
                  </div>
                  <div className="summary-item-row">
                    <span className="label">Pet:</span>
                    <span className="value">{watchedValues.petName || '—'} ({selectedPetType})</span>
                  </div>
                  <div className="summary-item-row">
                    <span className="label">Date:</span>
                    <span className="value">{watchedValues.appointmentDate || '—'}</span>
                  </div>
                  <div className="summary-item-row">
                    <span className="label">Time:</span>
                    <span className="value">{selectedSlot || '—'}</span>
                  </div>
                </div>

                <div className="summary-total-fee">
                  <span style={{ fontWeight: 600 }}>Consultation Fee</span>
                  <span className="total-price">₹{currentServiceObj.fee}</span>
                </div>

                <div style={{ padding: '14px', background: 'var(--clr-bg-2)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--clr-text-2)', lineHeight: 1.5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--clr-text)', fontWeight: 700, marginBottom: '4px' }}>
                    <ShieldCheck size={14} style={{ color: 'var(--clr-primary)' }} />
                    Zero Waiting Guarantee
                  </div>
                  Your slot is reserved exclusively with Dr. Apoorva. Instant database sync and WhatsApp confirmation pass generated upon booking.
                </div>

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <a href="tel:+919311672292" style={{ fontSize: '0.82rem', color: 'var(--clr-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={13} /> Need help? Call 093116 72292
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
