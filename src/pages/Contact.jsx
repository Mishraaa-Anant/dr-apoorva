import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageCircle,
  CheckCircle2,
  CalendarCheck,
  Send,
  AlertCircle,
  Building2,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { submitContactInquiry } from '../services/firebase';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await submitContactInquiry(data);
      setSubmitted(true);
      reset();
    } catch (e) {
      console.error("Inquiry error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact & Location — Dr. Apoorva's Pet Clinic Faridabad | Sector 49</title>
        <meta name="description" content="Visit Dr. Apoorva's Pet Clinic at 2259M, Street 1, Sector 49, Aravali Vihar, Faridabad. Call: 093116 72292. Timings: Mon-Sat 10am-9:30pm, Sun 10am-9pm." />
      </Helmet>

      {/* Page Header */}
      <section className="section-sm" style={{ background: 'var(--grad-hero)', paddingTop: 'calc(var(--nav-height) + 30px)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <div className="badge-pill" style={{ marginBottom: '16px' }}>
            <MapPin size={14} />
            <span>Sector 49, Faridabad</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>
            Find & <span className="gradient-text">Contact Our Clinic</span>
          </h1>
          <p style={{ fontSize: '1.08rem', color: 'var(--clr-text-2)', lineHeight: 1.6 }}>
            Easily reachable from anywhere in Faridabad and Delhi NCR. Ample parking, pet-friendly access, and emergency triage.
          </p>
        </div>
      </section>

      {/* Main Location & Contact Grid */}
      <section className="section">
        <div className="container">
          <div className="contact-main-grid">
            {/* Left Column: Clinic Facade Photo, Hours, Contact Cards */}
            <div className="contact-left-col">
              {/* Facade Card */}
              <div className="glass-card contact-facade-card">
                <div className="contact-facade-img-wrap">
                  <img
                    src="/4.jpeg"
                    alt="Dr. Apoorva's Signature Pet Clinic Exterior Facade in Sector 49 Faridabad"
                    className="contact-facade-img"
                  />
                  <div className="facade-badge-floating">
                    <Building2 size={15} />
                    <span>Clinic Exterior (Street No. 1)</span>
                  </div>
                </div>

                <div className="contact-facade-info">
                  <h2 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>
                    Dr. Apoorva's Pet Clinic
                  </h2>
                  <p style={{ color: 'var(--clr-primary)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '8px' }}>
                    Signature Pet Clinic & Care
                  </p>
                  <p style={{ color: 'var(--clr-text-2)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                    <MapPin size={15} style={{ display: 'inline', verticalAlign: 'text-bottom', color: 'var(--clr-primary)', marginRight: '4px' }} />
                    2259M, Street Number 1, near SP DCP HOUSE, Sector 49, Aravali Vihar, Faridabad, Haryana 121001
                  </p>
                </div>
              </div>

              {/* Info Cards Grid (Hours & Helpline) */}
              <div className="contact-info-cards-grid">
                <div className="glass-card info-card-item">
                  <div className="info-card-icon"><Clock size={22} /></div>
                  <div>
                    <h3 className="info-card-title">Clinic Hours</h3>
                    <p className="info-card-desc">
                      <strong>Mon – Sat:</strong> 10:00 AM – 09:30 PM<br />
                      <strong>Sunday:</strong> 10:00 AM – 09:00 PM
                    </p>
                  </div>
                </div>

                <div className="glass-card info-card-item">
                  <div className="info-card-icon"><Phone size={22} /></div>
                  <div>
                    <h3 className="info-card-title">Helpline / Hotline</h3>
                    <p className="info-card-desc">
                      <a href="tel:+919311672292" className="phone-link">093116 72292</a><br />
                      <span>Direct Calls & WhatsApp</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="contact-actions-row">
                <a
                  href="https://maps.google.com/?q=Dr.+Apoorva's+Pet+Clinic+Sector+49+Faridabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Navigation size={16} /> Get Driving Directions
                </a>
                <a
                  href="https://wa.me/919311672292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={16} /> Message on WhatsApp
                </a>
              </div>

              {/* Interactive Google Map Responsive Embed */}
              <div className="glass-card contact-map-card">
                <div className="map-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} style={{ color: 'var(--clr-primary)' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Interactive Clinic Map & GPS</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Dr.+Apoorva's+Pet+Clinic+Sector+49+Faridabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-ext-link"
                  >
                    <span>Full Screen</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                <div className="map-iframe-wrapper">
                  <iframe
                    title="Dr. Apoorva's Pet Clinic Location Map"
                    src="https://maps.google.com/maps?q=28.3947907,77.2751723&hl=en&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Inquiry Form */}
            <div className="contact-right-col">
              <div className="glass-card contact-form-box">
                <div className="badge-pill" style={{ marginBottom: '12px' }}>
                  <Mail size={14} />
                  <span>Send a Message</span>
                </div>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                  Have a Question?
                </h2>
                <p style={{ color: 'var(--clr-text-2)', fontSize: '0.92rem', marginBottom: '24px' }}>
                  Fill in your details below and Dr. Apoorva's clinical team will get back to you promptly.
                </p>

                {submitted ? (
                  <div style={{ padding: '28px 20px', background: 'var(--clr-primary-l)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <CheckCircle2 size={38} style={{ color: 'var(--clr-primary)', margin: '0 auto 12px' }} />
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--clr-text)', marginBottom: '6px' }}>Message Sent Successfully!</h3>
                    <p style={{ color: 'var(--clr-text-2)', fontSize: '0.9rem' }}>
                      Thank you for contacting Dr. Apoorva's Pet Clinic. We will respond shortly.
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      style={{ marginTop: '18px' }}
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="fullName">Your Full Name *</label>
                      <input
                        id="fullName"
                        className={`form-input ${errors.fullName ? 'error' : ''}`}
                        placeholder="e.g. Rahul Sharma"
                        {...register('fullName', { required: 'Please enter your name' })}
                      />
                      {errors.fullName && <p className="form-error"><AlertCircle size={13} /> {errors.fullName.message}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="phoneNumber">Phone / WhatsApp Number *</label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                        placeholder="10-digit mobile number"
                        {...register('phoneNumber', { required: 'Please enter phone number' })}
                      />
                      {errors.phoneNumber && <p className="form-error"><AlertCircle size={13} /> {errors.phoneNumber.message}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="petDetails">Pet Details (e.g. Dog, Cat, Age)</label>
                      <input
                        id="petDetails"
                        className="form-input"
                        placeholder="e.g. 2 year old German Shepherd"
                        {...register('petDetails')}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="message">Your Message / Inquiry *</label>
                      <textarea
                        id="message"
                        rows={4}
                        className={`form-textarea ${errors.message ? 'error' : ''}`}
                        placeholder="Describe your inquiry, symptoms, or appointment request..."
                        {...register('message', { required: 'Please enter your message' })}
                      />
                      {errors.message && <p className="form-error"><AlertCircle size={13} /> {errors.message.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
                      {loading ? (
                        <span>Submitting Inquiry...</span>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit Message to Clinic</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
