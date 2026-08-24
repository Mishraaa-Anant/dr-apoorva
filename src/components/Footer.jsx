import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Shield, MessageCircle, CalendarCheck, ShieldCheck } from 'lucide-react';
import ClinicLogo from './ClinicLogo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Doctor info */}
          <div className="footer-brand">
            <Link to="/" className="nav-logo" style={{ marginBottom: '14px' }}>
              <ClinicLogo size={42} />
              <div className="nav-logo-text">
                <span className="dr-name">Dr. Apoorva's</span>
                <span className="clinic-sub">Pet Clinic & Care</span>
              </div>
            </Link>

            <p className="footer-bio">
              Led by Dr. Apoorva (BVSc & AH) with over 10+ years of compassionate veterinary surgical,
              medical, and preventive healthcare experience in Faridabad.
            </p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <a
                href="https://wa.me/919311672292"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageCircle size={14} /> WhatsApp Us
              </a>
              <a href="tel:+919311672292" className="btn btn-outline btn-sm">
                <Phone size={14} /> 093116 72292
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="footer-col">
            <h4>Veterinary Care</h4>
            <ul className="footer-links">
              <li><Link to="/services">General Checkup (₹300)</Link></li>
              <li><Link to="/services">Vaccinations & Deworming</Link></li>
              <li><Link to="/services">Soft Tissue Surgery</Link></li>
              <li><Link to="/services">Dental Health & Scaling</Link></li>
              <li><Link to="/services">Emergency Care</Link></li>
              <li><Link to="/services">Pet Nutrition Counseling</Link></li>
            </ul>
          </div>

          {/* Col 3: Patient Portal & Links */}
          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/book">Book Appointment Online</Link></li>
              <li><Link to="/my-appointments">Track / Manage Booking</Link></li>
              <li><Link to="/about">About Dr. Apoorva</Link></li>
              <li><Link to="/reviews">Patient Reviews (4.5★)</Link></li>
              <li><Link to="/contact">Directions & Clinic Facade</Link></li>
            </ul>
          </div>

          {/* Col 4: Timings & Location */}
          <div className="footer-col">
            <h4>Clinic Timings & Location</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--clr-text-2)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Clock size={16} style={{ color: 'var(--clr-primary)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--clr-text)' }}>Mon – Sat:</strong> 10:00 AM – 09:30 PM<br />
                  <strong style={{ color: 'var(--clr-text)' }}>Sunday:</strong> 10:00 AM – 09:00 PM
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--clr-primary)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  2259M, Street Number 1, Sector 49, Aravali Vihar, Faridabad, Haryana 121001
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--clr-primary)', marginTop: '4px' }}>
                <Shield size={14} /> Registered & Licensed Veterinary Facility
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Dr. Apoorva's Pet Clinic (Signature Pet Clinic). All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Sector 49, Faridabad</span>
            <span>Emergency: 093116 72292</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
