import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Syringe,
  Scissors,
  Activity,
  HeartPulse,
  Sparkles,
  CheckCircle2,
  CalendarCheck,
  Phone,
  ArrowRight,
  Shield,
  HelpCircle
} from 'lucide-react';

const CATEGORIES = ['All Services', 'Consultations', 'Vaccinations', 'Surgeries', 'Dental Care', 'Diagnostics'];

const SERVICES_DATA = [
  {
    category: 'Consultations',
    title: 'General Clinical Consultation',
    icon: '🩺',
    fee: '₹300',
    duration: '20-30 Mins',
    desc: 'Comprehensive physical examination including vitals check (temperature, pulse, respiration), eye, ear, coat, abdominal palpation, and diagnosis.',
    features: ['Head-to-tail physical exam', 'Dietary & nutrition guidance', 'Prescription & symptom management', 'Follow-up advice'],
    popular: true
  },
  {
    category: 'Vaccinations',
    title: 'Core Canine & Feline Vaccinations',
    icon: '💉',
    fee: '₹400',
    duration: '15 Mins',
    desc: 'Essential immunizations including Rabies, DHPPi (7-in-1 / 9-in-1 for dogs), and Tricat (for cats) with digital vaccination record card.',
    features: ['High-efficacy cold chain vaccines', 'Pre-vaccine health checkup', 'Vaccination booklet issued', 'Deworming tablet guidance'],
    popular: true
  },
  {
    category: 'Surgeries',
    title: 'Spaying & Neutering (Sterilization)',
    icon: '🏥',
    fee: 'From ₹2500',
    duration: '1-2 Hours',
    desc: 'Safe, sterile surgical procedures with modern anesthesia protocols and post-operative pain management to prevent unwanted litters and health issues.',
    features: ['Pre-anesthetic evaluation', 'Dedicated monitoring during surgery', 'Absorbable sterile sutures', 'Post-op recovery support']
  },
  {
    category: 'Surgeries',
    title: 'Soft Tissue & Minor Wound Repair',
    icon: '🩹',
    fee: 'From ₹1200',
    duration: '30-45 Mins',
    desc: 'Trauma repair, bite wound debridement, abscess drainage, cyst removals, and hematoma treatments under sterile local or general anesthesia.',
    features: ['Antiseptic wound debridement', 'Tissue reconstruction', 'Medicated dressings', 'Antibiotic therapy']
  },
  {
    category: 'Dental Care',
    title: 'Ultrasonic Dental Scaling & Polishing',
    icon: '🦷',
    fee: '₹800',
    duration: '45 Mins',
    desc: 'Removal of severe tartar, plaque, and calculus buildup from teeth and gums to eliminate foul breath and prevent periodontal tooth decay.',
    features: ['Ultrasonic scaler technology', 'Gingivitis treatment', 'Tooth enamel polishing', 'Oral hygiene rinse']
  },
  {
    category: 'Diagnostics',
    title: 'Skin Scraping & Fungal Diagnostics',
    icon: '🔬',
    fee: '₹450',
    duration: '20 Mins',
    desc: 'Microscopic examination for demodectic/sarcoptic mange mites, fungal ringworm infections, yeast, and allergic dermatitis.',
    features: ['Microscopic slide analysis', 'Specific antifungal/antibacterial drops', 'Medicated shampoo plan', 'Itch relief therapy']
  },
  {
    category: 'Consultations',
    title: 'Online Video Vet Consultation',
    icon: '📱',
    fee: '₹250',
    duration: '15-20 Mins',
    desc: 'Convenient telemedicine session via WhatsApp video call for non-emergency diet queries, follow-up evaluations, and second opinions.',
    features: ['WhatsApp video call', 'Digital e-prescription sent', 'Dietary counseling', 'Follow-up review']
  },
  {
    category: 'Diagnostics',
    title: 'Emergency Trauma & Poisoning Triage',
    icon: '🚨',
    fee: 'Priority Fee',
    duration: 'Immediate',
    desc: '24/7 priority emergency triage for road accidents, toxic ingestion, severe vomiting/diarrhea, and acute respiratory distress.',
    features: ['Immediate triage protocol', 'IV fluid resuscitation', 'Oxygen therapy', 'Anti-toxin administration']
  }
];

const FAQS = [
  {
    q: 'What is the consultation fee at Dr. Apoorva\'s clinic?',
    a: 'The general in-clinic consultation fee is ₹300, which includes a comprehensive physical examination, vitals check, and customized treatment plan.'
  },
  {
    q: 'Do I need to book an appointment in advance?',
    a: 'While walk-ins are welcomed, booking an appointment online guarantees minimal waiting time for you and your pet.'
  },
  {
    q: 'What vaccines does my puppy or kitten need?',
    a: 'Puppies require DHLPPi (distemper, hepatitis, leptospirosis, parvo, parainfluenza) starting at 6-8 weeks, followed by Rabies at 3 months. Kittens need Tricat (feline viral rhinotracheitis, calicivirus, panleukopenia) and Rabies.'
  },
  {
    q: 'What should I do in an emergency situation?',
    a: 'Please call our emergency hotline at 093116 72292 immediately before traveling so we can prepare the treatment room and equipment for your pet.'
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('All Services');

  const filtered = activeTab === 'All Services'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeTab);

  return (
    <>
      <Helmet>
        <title>Veterinary Services & Pricing — Dr. Apoorva's Pet Clinic Faridabad</title>
        <meta name="description" content="Transparent pricing for veterinary services at Dr. Apoorva's Pet Clinic: ₹300 general consultation, ₹400 vaccinations, dental scaling, spaying/neutering surgeries." />
      </Helmet>

      {/* Header */}
      <section className="section-sm" style={{ background: 'var(--grad-hero)', paddingTop: 'calc(var(--nav-height) + 30px)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <div className="badge-pill" style={{ marginBottom: '16px' }}>
            <Stethoscope size={14} />
            <span>Comprehensive Care & Transparent Pricing</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>
            Veterinary <span className="gradient-text">Services & Treatments</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--clr-text-2)', lineHeight: 1.6 }}>
            Modern medical equipment, gentle patient handling, and transparent fees. Consultations start at just ₹300.
          </p>
        </div>
      </section>

      {/* Category Tabs & Service Cards */}
      <section className="section">
        <div className="container">
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                className={`btn ${activeTab === cat ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.88rem', padding: '10px 20px' }}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="services-grid" style={{ marginTop: '36px' }}>
            {filtered.map(s => (
              <div className="glass-card service-card" key={s.title}>
                {s.popular && (
                  <span className="badge-pill" style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '0.72rem', background: 'var(--clr-gold-l)', color: 'var(--clr-gold)' }}>
                    Most Popular
                  </span>
                )}
                <div className="service-icon-wrap">{s.icon}</div>
                <h3 className="service-title">{s.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.82rem', color: 'var(--clr-text-3)' }}>
                  <span>⏱ {s.duration}</span>
                  <span>•</span>
                  <span>{s.category}</span>
                </div>
                <p className="service-desc">{s.desc}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0', fontSize: '0.85rem' }}>
                  {s.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--clr-text-2)' }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="service-footer" style={{ marginTop: 'auto' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--clr-text-3)' }}>Consultation / Fee</span>
                    <span className="service-price">{s.fee}</span>
                  </div>
                  <Link
                    to="/book"
                    state={{ preSelectedService: s.title }}
                    className="btn btn-primary btn-sm"
                  >
                    <CalendarCheck size={14} /> Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ background: 'var(--clr-bg-2)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="badge-pill" style={{ marginBottom: '12px' }}>
              <HelpCircle size={14} />
              <span>Got Questions?</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map(faq => (
              <div key={faq.q} className="glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--clr-primary)' }}>Q:</span> {faq.q}
                </h3>
                <p style={{ color: 'var(--clr-text-2)', fontSize: '0.92rem', lineHeight: 1.6, paddingLeft: '22px' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA Banner */}
      <section className="section" style={{ background: 'var(--grad-primary)', color: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#FFFFFF', marginBottom: '14px' }}>
            Need Immediate Veterinary Advice?
          </h2>
          <p style={{ fontSize: '1.05rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '28px' }}>
            Our veterinary team is standing by to answer your urgent questions and schedule your appointment.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-lg" style={{ background: '#FFFFFF', color: 'var(--clr-primary)', fontWeight: 800 }}>
              <CalendarCheck size={18} /> Book Appointment
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
              <Phone size={18} /> Call 093116 72292
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
