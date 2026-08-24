import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  Star,
  Shield,
  Clock,
  Phone,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Stethoscope,
  HeartHandshake,
  Sparkles,
  ChevronRight,
  Building2,
  Award
} from 'lucide-react';
import PetSymptomChecker from '../components/PetSymptomChecker';

const services = [
  { icon: '🩺', name: 'General Consultation', fee: '₹300', desc: 'Thorough head-to-tail clinical examination, symptom diagnosis, and customized medical care plan.' },
  { icon: '💉', name: 'Vaccination & Deworming', fee: '₹400', desc: 'Essential core immunizations (Rabies, DHPPi, Tricat) with immunity tracking and gentle injections.' },
  { icon: '🏥', name: 'Soft Tissue Surgery', fee: 'From ₹1500', desc: 'Modern sterile surgical suite for spaying, neutering, tumor removals, and emergency wound repair.' },
  { icon: '🦷', name: 'Dental Cleaning & Care', fee: '₹800', desc: 'Ultrasonic scaling, tartar removal, and oral hygiene treatments to prevent bad breath and gum diseases.' },
  { icon: '🔬', name: 'Diagnostics & Lab Tests', fee: '₹500', desc: 'On-site skin scrapings, blood profiles, fecal analysis, and quick pathology for accurate treatment.' },
  { icon: '🚨', name: '24/7 Emergency Care', fee: 'Priority', desc: 'Immediate trauma support, poisoning triage, and intensive care when every minute counts.' },
];

const testimonials = [
  {
    name: 'Gautam Bhardwaj',
    pet: 'Dog Parent',
    text: 'Dr. Apoorva is truly exceptional. My German Shepherd usually gets very anxious at vet clinics, but with her calm, gentle touch, he felt safe and relaxed immediately.',
    rating: 5,
    tag: 'Verified Google Review'
  },
  {
    name: 'Urvi Syal',
    pet: 'Cat Parent',
    text: 'Had to rush my cat in for an emergency late in the evening. Dr. Apoorva provided prompt, expert treatment and her friendly, reassuring demeanor kept our family calm.',
    rating: 5,
    tag: 'Verified Google Review'
  },
  {
    name: 'Riyanshi Paruthi',
    pet: 'Puppy Parent',
    text: 'Extremely professional and clean clinic! Dr. Apoorva explained the entire vaccination schedule and diet tips in detail. Truly the best veterinary doctor in Faridabad.',
    rating: 5,
    tag: 'Verified Google Review'
  }
];

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'VeterinaryCare',
  name: "Dr. Apoorva's Pet Clinic",
  description: 'Compassionate, expert veterinary care in Faridabad led by Dr. Apoorva (BVSc & AH). Consultation fee ₹300.',
  telephone: '+919311672292',
  url: 'https://drapoorva.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2259M, Street Number 1, near SP DCP HOUSE, Sector 49, Aravali Vihar',
    addressLocality: 'Faridabad',
    addressRegion: 'Haryana',
    postalCode: '121001',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 28.3947907, longitude: 77.2751723 },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', reviewCount: '151' },
  openingHours: ['Mo-Sa 10:00-21:30', 'Su 10:00-21:00'],
  priceRange: '₹300',
  image: '/4.jpeg',
};

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Dr. Apoorva's Pet Clinic — Expert Veterinary Care in Faridabad | ₹300 Consultation</title>
        <meta name="description" content="Dr. Apoorva's Pet Clinic in Sector 49, Faridabad offers professional veterinary care, surgical procedures, vaccinations, and pet wellness. 4.5★ rated with 151+ Google reviews." />
        <script type="application/ld+json">{JSON.stringify(LOCAL_BUSINESS_SCHEMA)}</script>
      </Helmet>

      {/* =================================================================
          HERO SECTION (Real Photo 1.jpeg + 4.jpeg)
          ================================================================= */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-eyebrow">
                <div className="hero-rating-badge">
                  <Star size={14} fill="currentColor" />
                  <span>4.5 / 5 · 151 Google Reviews</span>
                </div>
                <div className="badge-pill">
                  <Shield size={13} />
                  <span>Licensed & Certified Vet</span>
                </div>
              </div>

              <h1 className="hero-title">
                Compassionate & <br />
                <span className="gradient-text">Professional Care</span> <br />
                For Your Beloved Pets
              </h1>

              <p className="hero-desc">
                Led by <strong>Dr. Apoorva</strong> with 10+ years of clinical excellence in Faridabad.
                From routine wellness check-ups to advanced surgical care, we treat every pet with gentle, personalized attention.
              </p>

              <div className="hero-actions">
                <Link to="/book" className="btn btn-primary btn-lg">
                  <CalendarCheck size={20} />
                  <span>Book Appointment (₹300)</span>
                </Link>

                <a href="tel:+919311672292" className="btn btn-outline btn-lg">
                  <Phone size={18} />
                  <span>Call 093116 72292</span>
                </a>
              </div>

              {/* Clinic Key Stats */}
              <div className="hero-stats-row">
                <div className="hero-stat-item">
                  <div className="stat-value">10+</div>
                  <div className="stat-label">Years Clinical Exp.</div>
                </div>
                <div className="hero-stat-item">
                  <div className="stat-value">151+</div>
                  <div className="stat-label">Verified Reviews</div>
                </div>
                <div className="hero-stat-item">
                  <div className="stat-value">4.5★</div>
                  <div className="stat-label">Google Rating</div>
                </div>
                <div className="hero-stat-item">
                  <div className="stat-value">₹300</div>
                  <div className="stat-label">Consultation Fee</div>
                </div>
              </div>
            </div>

            {/* Right Visual Montage with Real Photos */}
            <div className="hero-visual-montage">
              {/* Main Doctor Photo Card (1.jpeg) */}
              <div className="hero-main-photo-card">
                <img
                  src="/1.jpeg"
                  alt="Dr. Apoorva caring for a German Shepherd patient in clinic"
                />
                <div className="hero-photo-tag">
                  <div className="hero-doc-meta">
                    <div className="doc-title">Dr. Apoorva (BVSc & AH)</div>
                    <div className="doc-spec">Veterinary Surgeon & Physician</div>
                  </div>
                  <div className="hero-consult-badge">
                    <span className="live-dot" />
                    <span>In Consultation</span>
                  </div>
                </div>
              </div>

              {/* Floating Mini Clinic Facility Previews (4.jpeg & 3.jpeg) */}
              <div className="hero-floating-clinic-preview">
                <div className="mini-photo-card">
                  <img src="/4.jpeg" alt="Dr. Apoorva's Signature Pet Clinic Facade" />
                  <div className="mini-info">
                    <h4>Modern Clinic</h4>
                    <p>Sector 49, Faridabad</p>
                  </div>
                </div>

                <div className="mini-photo-card">
                  <img src="/3.jpeg" alt="Dr. Apoorva Feline Treatment Care" />
                  <div className="mini-info">
                    <h4>Feline & Canine</h4>
                    <p>Specialized Diagnostics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          DOCTOR SPOTLIGHT SECTION (Real Photos 1.jpeg, 2.jpeg, 3.jpeg)
          ================================================================= */}
      <section className="section doctor-spotlight-section">
        <div className="container">
          <div className="doctor-grid">
            {/* Doctor Photo (2.jpeg) */}
            <div className="doctor-photo-frame">
              <img
                src="/2.jpeg"
                alt="Dr. Apoorva comforting pet patient with love"
                className="doctor-primary-img"
              />
              <div className="doctor-floating-badge">
                <Award size={28} style={{ color: 'var(--clr-primary)' }} />
                <div>
                  <strong style={{ fontSize: '1rem', display: 'block' }}>10+ Years Trust</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-2)' }}>Over 5,000+ Pets Healed</span>
                </div>
              </div>
            </div>

            {/* Doctor Details */}
            <div>
              <div className="badge-pill" style={{ marginBottom: '16px' }}>
                <Stethoscope size={14} />
                <span>Lead Veterinary Surgeon</span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '16px' }}>
                Meet <span className="gradient-text">Dr. Apoorva</span>
              </h2>

              <p style={{ fontSize: '1.05rem', color: 'var(--clr-text-2)', lineHeight: 1.7, marginBottom: '18px' }}>
                Dr. Apoorva is a dedicated veterinary surgeon who believes in an unhurried, gentle, and scientifically rigorous approach to animal healthcare. She understands that pets are family, ensuring each patient receives stress-free clinical care.
              </p>

              <p style={{ fontSize: '0.95rem', color: 'var(--clr-text-2)', lineHeight: 1.6, marginBottom: '24px' }}>
                Equipped with advanced diagnostic protocols and a dedicated surgical facility at Sector 49, Faridabad, she specializes in canine and feline preventive wellness, soft tissue surgeries, and critical emergency response.
              </p>

              <div className="doctor-credentials-list">
                <div className="credential-item">
                  <CheckCircle2 size={18} />
                  <span>BVSc & AH Certified</span>
                </div>
                <div className="credential-item">
                  <CheckCircle2 size={18} />
                  <span>Surgical & Trauma Care</span>
                </div>
                <div className="credential-item">
                  <CheckCircle2 size={18} />
                  <span>Vaccination Specialist</span>
                </div>
                <div className="credential-item">
                  <CheckCircle2 size={18} />
                  <span>Transparent ₹300 Fee</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '30px', flexWrap: 'wrap' }}>
                <Link to="/book" className="btn btn-primary">
                  <CalendarCheck size={18} />
                  <span>Book Consultation With Dr. Apoorva</span>
                </Link>
                <Link to="/about" className="btn btn-outline">
                  <span>Read Full Bio & Credentials</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          CLINIC FACILITY SHOWCASE (Real Photo 4.jpeg)
          ================================================================= */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 30px' }}>
            <div className="badge-pill" style={{ marginBottom: '12px' }}>
              <Building2 size={14} />
              <span>Modern Clinical Facility</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '12px' }}>
              Designed For <span className="gradient-text">Comfort & Hygiene</span>
            </h2>
            <p style={{ color: 'var(--clr-text-2)', fontSize: '0.95rem' }}>
              Located in Aravali Vihar, Sector 49, Faridabad — featuring clean air-conditioned consultation rooms, dedicated pet food dispensary, and on-site pharmacy.
            </p>
          </div>

          <div className="clinic-tour-card">
            <img
              src="/4.jpeg"
              alt="Dr. Apoorva's Signature Pet Clinic & Care Exterior Facade in Faridabad"
              className="clinic-tour-img"
            />
            <div className="clinic-tour-content">
              <span className="badge-pill" style={{ width: 'fit-content', marginBottom: '16px' }}>
                <MapPin size={14} />
                <span>Sector 49, Faridabad</span>
              </span>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>
                Signature Pet Clinic & Care
              </h3>

              <p style={{ color: 'var(--clr-text-2)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Our welcoming clinic environment ensures that dogs and cats feel comfortable from the moment they arrive. Ample parking, separate waiting areas, and strict sanitization standards provide peace of mind.
              </p>

              <div className="clinic-amenities-grid">
                <div className="amenity-chip">
                  <CheckCircle2 size={16} style={{ color: 'var(--clr-primary)' }} />
                  <span>Air-Conditioned Consult Rooms</span>
                </div>
                <div className="amenity-chip">
                  <CheckCircle2 size={16} style={{ color: 'var(--clr-primary)' }} />
                  <span>Sterile Surgical Suite</span>
                </div>
                <div className="amenity-chip">
                  <CheckCircle2 size={16} style={{ color: 'var(--clr-primary)' }} />
                  <span>Prescription Diet Dispensary</span>
                </div>
                <div className="amenity-chip">
                  <CheckCircle2 size={16} style={{ color: 'var(--clr-primary)' }} />
                  <span>Wheelchair & Pet Ramp Access</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '14px', flexWrap: 'wrap' }}>
                <a
                  href="https://maps.google.com/?q=Dr.+Apoorva's+Pet+Clinic+Sector+49+Faridabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <MapPin size={14} /> Get Driving Directions
                </a>
                <Link to="/contact" className="btn btn-outline btn-sm">
                  View Clinic Hours & Map
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          VETERINARY SERVICES GRID
          ================================================================= */}
      <section className="section" style={{ background: 'var(--clr-bg-2)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="badge-pill" style={{ marginBottom: '12px' }}>
                <Stethoscope size={14} />
                <span>Our Medical Services</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                Comprehensive Care <span className="gradient-text">Under One Roof</span>
              </h2>
            </div>
            <Link to="/services" className="btn btn-outline">
              <span>View All Services & Pricing</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <div className="glass-card service-card" key={s.name}>
                <div className="service-icon-wrap">{s.icon}</div>
                <h3 className="service-title">{s.name}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-footer">
                  <span className="service-price">{s.fee}</span>
                  <Link to="/book" className="service-book-link">
                    Book Service <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          PATIENT CARE PHOTO GALLERY (1.jpeg, 2.jpeg, 3.jpeg, 4.jpeg)
          ================================================================= */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 30px' }}>
            <div className="badge-pill" style={{ marginBottom: '12px' }}>
              <HeartHandshake size={14} />
              <span>Real Clinical Moments</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '10px' }}>
              Caring For Every <span className="gradient-text">Paw & Claw</span>
            </h2>
            <p style={{ color: 'var(--clr-text-2)', fontSize: '0.95rem' }}>
              Genuine moments of Dr. Apoorva treating happy dogs and cats at the clinic.
            </p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-card">
              <img src="/1.jpeg" alt="Dr. Apoorva consultation with German Shepherd" />
              <div className="gallery-caption">
                <h4>Routine Health Check</h4>
                <p>Gentle canine examination</p>
              </div>
            </div>

            <div className="gallery-card">
              <img src="/2.jpeg" alt="Dr. Apoorva comforting pet patient" />
              <div className="gallery-caption">
                <h4>Comfort & Reassurance</h4>
                <p>Zero anxiety pet handling</p>
              </div>
            </div>

            <div className="gallery-card">
              <img src="/3.jpeg" alt="Dr. Apoorva feline examination table treatment" />
              <div className="gallery-caption">
                <h4>Feline Medical Care</h4>
                <p>Post-procedure monitoring</p>
              </div>
            </div>

            <div className="gallery-card">
              <img src="/4.jpeg" alt="Signature Pet Clinic exterior in Faridabad" />
              <div className="gallery-caption">
                <h4>Clinic Exterior</h4>
                <p>Sector 49, Aravali Vihar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          INTERACTIVE SYMPTOM CHECKER
          ================================================================= */}
      <section className="section" style={{ background: 'var(--clr-bg-2)' }}>
        <div className="container">
          <PetSymptomChecker />
        </div>
      </section>

      {/* =================================================================
          PATIENT TESTIMONIALS (4.5★ Google Reviews)
          ================================================================= */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <div className="badge-pill" style={{ marginBottom: '12px' }}>
              <Star size={14} fill="currentColor" />
              <span>4.5 Rating on Google</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '10px' }}>
              Loved By <span className="gradient-text">Pet Parents</span>
            </h2>
            <p style={{ color: 'var(--clr-text-2)', fontSize: '0.95rem' }}>
              Over 151+ genuine 5-star reviews from families across Faridabad and Delhi NCR.
            </p>
          </div>

          <div className="services-grid">
            {testimonials.map((t) => (
              <div className="glass-card" key={t.name} style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '4px', color: 'var(--clr-gold)', marginBottom: '16px' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--clr-text)', lineHeight: 1.6, flexGrow: 1, marginBottom: '20px', fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--clr-card-border)' }}>
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block' }}>{t.name}</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--clr-text-3)' }}>{t.pet}</span>
                  </div>
                  <span className="badge-pill" style={{ fontSize: '0.72rem', background: 'var(--clr-bg-2)', color: 'var(--clr-text-2)' }}>
                    Google
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/reviews" className="btn btn-outline">
              <span>Read All 151+ Google Reviews</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================
          CALL TO ACTION BANNER
          ================================================================= */}
      <section className="section" style={{ background: 'var(--grad-primary)', color: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '16px' }}>
            Give Your Pet The Care They Deserve
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '32px' }}>
            Consultation fee is only ₹300. Book your slot online in 60 seconds or call our clinic directly.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-lg" style={{ background: '#FFFFFF', color: 'var(--clr-primary)', fontWeight: 800 }}>
              <CalendarCheck size={20} />
              <span>Book Appointment (₹300)</span>
            </Link>
            <a
              href="tel:+919311672292"
              className="btn btn-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.18)',
                color: '#FFFFFF',
                border: '1.5px solid rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(8px)',
                fontWeight: 700
              }}
            >
              <Phone size={18} />
              <span>Call 093116 72292</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
