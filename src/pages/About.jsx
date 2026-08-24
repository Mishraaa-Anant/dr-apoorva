import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Award,
  Heart,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  Phone,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  Stethoscope,
  Building2,
  HeartHandshake
} from 'lucide-react';

const credentials = [
  'Bachelor of Veterinary Science & Animal Husbandry (BVSc & AH)',
  '10+ Years Dedicated Clinical & Surgical Experience',
  'Specialized Canine & Feline Preventive Healthcare',
  'Advanced Soft Tissue Surgery & Emergency Trauma Management',
  'Registered Veterinary Practitioner in Haryana & Delhi NCR',
  'Affordable Healthcare Advocate with Transparent ₹300 Consultation',
];

const clinicValues = [
  {
    icon: <Heart size={24} />,
    title: 'Compassion & Gentleness',
    desc: 'We never rush examinations. Pets are greeted warmly, given time to adjust, and treated with tender loving care to minimize anxiety.'
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Hospital-Grade Hygiene',
    desc: 'Our consultation tables and surgical instruments undergo strict medical-grade sterilization between every single patient.'
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Transparent Pricing',
    desc: 'No hidden emergency surcharges or unnecessary test recommendations. Complete honesty about your pet\'s condition and prognosis.'
  },
  {
    icon: <Award size={24} />,
    title: 'Decade of Proven Trust',
    desc: 'Over 10 years and thousands of successful treatments, surgeries, and immunizations backing our reputation in Faridabad.'
  }
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Dr. Apoorva — Lead Veterinary Surgeon | Faridabad Clinic</title>
        <meta name="description" content="Meet Dr. Apoorva (BVSc & AH), trusted veterinarian in Faridabad with 10+ years of clinical experience in canine, feline, and surgical care." />
      </Helmet>

      {/* Page Header */}
      <section className="section-sm" style={{ background: 'var(--grad-hero)', paddingTop: 'calc(var(--nav-height) + 30px)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <div className="badge-pill" style={{ marginBottom: '16px' }}>
            <Stethoscope size={14} />
            <span>Veterinary Profile & Philosophy</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>
            Meet <span className="gradient-text">Dr. Apoorva</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--clr-text-2)', lineHeight: 1.6 }}>
            Compassionate veterinary surgeon dedicated to providing high-quality, transparent, and gentle medical care for pets in Faridabad.
          </p>
        </div>
      </section>

      {/* Doctor Bio Section with Real Photos 1.jpeg & 2.jpeg */}
      <section className="section">
        <div className="container">
          <div className="doctor-grid">
            <div className="doctor-photo-frame">
              <img
                src="/1.jpeg"
                alt="Dr. Apoorva with patient in consultation room"
                className="doctor-primary-img"
              />
              <div className="doctor-floating-badge">
                <ShieldCheck size={28} style={{ color: 'var(--clr-primary)' }} />
                <div>
                  <strong style={{ fontSize: '1rem', display: 'block' }}>Certified & Licensed</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-2)' }}>State Veterinary Council Registered</span>
                </div>
              </div>
            </div>

            <div>
              <div className="badge-pill" style={{ marginBottom: '12px' }}>
                <Award size={14} />
                <span>10+ Years of Experience</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '16px' }}>
                A Lifelong Passion for Animal Wellbeing
              </h2>

              <p style={{ color: 'var(--clr-text-2)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '16px' }}>
                Dr. Apoorva established her practice with a single guiding mission: to make world-class veterinary healthcare accessible, compassionate, and transparent for every pet parent in Faridabad.
              </p>

              <p style={{ color: 'var(--clr-text-2)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                Having successfully treated thousands of dogs, cats, and small animals over the past decade, she is renowned for her gentle demeanor with nervous or fearful pets. Her clinical expertise spans internal medicine, preventive vaccinations, soft tissue surgeries, and critical trauma management.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {credentials.map((cred, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600 }}>{cred}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/book" className="btn btn-primary">
                  <CalendarCheck size={18} />
                  <span>Book Consultation With Dr. Apoorva</span>
                </Link>
                <a href="tel:+919311672292" className="btn btn-outline">
                  <Phone size={16} />
                  <span>Call 093116 72292</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Moments Gallery with 2.jpeg & 3.jpeg */}
      <section className="section" style={{ background: 'var(--clr-bg-2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 36px' }}>
            <div className="badge-pill" style={{ marginBottom: '12px' }}>
              <HeartHandshake size={14} />
              <span>Patient Stories & Examination Care</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '12px' }}>
              Every Patient Is Treated Like Family
            </h2>
            <p style={{ color: 'var(--clr-text-2)', fontSize: '0.95rem' }}>
              From playful puppies to feline recovery cases, our patient-first approach ensures minimal stress.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <img src="/2.jpeg" alt="Dr. Apoorva comforting patient dog" style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Fear-Free Canine Handling</h3>
                <p style={{ color: 'var(--clr-text-2)', fontSize: '0.88rem' }}>
                  Gentle touch, calming voice, and positive reinforcement to make clinic visits a joyful experience.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <img src="/3.jpeg" alt="Dr. Apoorva examining feline patient with e-collar" style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Specialized Feline Care</h3>
                <p style={{ color: 'var(--clr-text-2)', fontSize: '0.88rem' }}>
                  Cat-specific examination procedures and quiet recovery monitoring for swift healing.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <img src="/4.jpeg" alt="Signature Pet Clinic Exterior Facade" style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Modern Facility in Sector 49</h3>
                <p style={{ color: 'var(--clr-text-2)', fontSize: '0.88rem' }}>
                  Spacious clinic with easy access, pet-friendly entrance, and on-site pharmacy dispensary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Pillars / Core Values */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <div className="badge-pill" style={{ marginBottom: '12px' }}>
              <ShieldCheck size={14} />
              <span>Our Practice Principles</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
              Why Pet Parents <span className="gradient-text">Trust Us</span>
            </h2>
          </div>

          <div className="services-grid">
            {clinicValues.map((val) => (
              <div className="glass-card service-card" key={val.title}>
                <div className="service-icon-wrap" style={{ color: 'var(--clr-primary)' }}>
                  {val.icon}
                </div>
                <h3 className="service-title">{val.title}</h3>
                <p className="service-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility & Location Card (Responsive) */}
      <section className="section" style={{ background: 'var(--clr-bg-2)' }}>
        <div className="container">
          <div className="clinic-tour-card">
            <img src="/4.jpeg" alt="Dr. Apoorva's Clinic in Faridabad" className="clinic-tour-img" />
            <div className="clinic-tour-content">
              <div className="badge-pill" style={{ width: 'fit-content', marginBottom: '16px' }}>
                <Building2 size={14} />
                <span>Faridabad Clinic</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Visit Dr. Apoorva's Pet Clinic</h3>
              <p style={{ color: 'var(--clr-text-2)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                2259M, Street Number 1, near SP DCP HOUSE, Sector 49, Aravali Vihar, Faridabad, Haryana 121001.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                  <span><strong>Monday – Saturday:</strong> 10:00 AM – 09:30 PM</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                  <span><strong>Sunday:</strong> 10:00 AM – 09:00 PM</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/book" className="btn btn-primary">
                  <CalendarCheck size={16} /> Book Online (₹300)
                </Link>
                <a
                  href="https://maps.google.com/?q=Dr.+Apoorva's+Pet+Clinic+Sector+49+Faridabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <MapPin size={16} /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
