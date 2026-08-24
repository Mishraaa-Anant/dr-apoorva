import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Menu,
  X,
  CalendarCheck,
  ShieldCheck,
  Heart,
  Home,
  UserCheck,
  Stethoscope,
  Search,
  Star,
  MapPin,
  MessageCircle,
  Clock
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ClinicLogo from './ClinicLogo';

const navItems = [
  { to: '/', label: 'Home', icon: <Home size={18} /> },
  { to: '/about', label: 'About Dr. Apoorva', icon: <UserCheck size={18} /> },
  { to: '/services', label: 'Services & Fees', icon: <Stethoscope size={18} /> },
  { to: '/my-appointments', label: 'Track Booking', icon: <Search size={18} /> },
  { to: '/reviews', label: 'Patient Reviews', icon: <Star size={18} /> },
  { to: '/contact', label: 'Contact & Clinic', icon: <MapPin size={18} /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          {/* Brand Logo */}
          <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
            <ClinicLogo size={42} />
            <div className="nav-logo-text">
              <span className="dr-name">Dr. Apoorva's</span>
              <span className="clinic-sub">Pet Clinic & Care</span>
            </div>
          </Link>

          {/* Desktop Navigation Links (>= 1080px) */}
          <ul className="nav-links">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop & Tablet Actions */}
          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <div className="desktop-theme-toggle">
              <ThemeToggle />
            </div>

            {/* Emergency Hotline (Desktop only) */}
            <a href="tel:+919311672292" className="nav-emergency-btn" title="Call Clinic Hotline">
              <Phone size={14} className="phone-icon" />
              <span>093116 72292</span>
            </a>

            {/* Quick Call Icon (Tablet & Mobile only) */}
            <a href="tel:+919311672292" className="nav-mobile-call-btn" title="Call Clinic">
              <Phone size={16} />
            </a>

            {/* Book CTA Button */}
            <Link to="/book" className="btn btn-primary btn-sm nav-book-btn">
              <CalendarCheck size={16} />
              <span>Book Appointment</span>
            </Link>

            {/* Hamburger Toggle Button */}
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay for Mobile Drawer */}
      <div
        className={`mobile-drawer-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in Mobile & Tablet Navigation Drawer */}
      <aside className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
        <div className="mobile-drawer-header">
          <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
            <ClinicLogo size={38} />
            <div className="nav-logo-text">
              <span className="dr-name" style={{ fontSize: '1.05rem' }}>Dr. Apoorva's</span>
              <span className="clinic-sub">Pet Clinic & Care</span>
            </div>
          </Link>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mobile-drawer-body">
          {/* Quick Theme Switcher in Drawer */}
          <div className="drawer-theme-box">
            <span className="drawer-theme-label">Theme Mode:</span>
            <ThemeToggle showLabels />
          </div>

          {/* Navigation Links */}
          <nav className="mobile-drawer-nav">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="drawer-item-icon">{icon}</span>
                <span className="drawer-item-label">{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Quick Contact & Action Buttons */}
          <div className="drawer-actions-box">
            <Link
              to="/book"
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px 20px', justifyContent: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              <CalendarCheck size={18} />
              <span>Book Appointment (₹300)</span>
            </Link>

            <a
              href="tel:+919311672292"
              className="btn btn-outline"
              style={{ width: '100%', padding: '12px 20px', justifyContent: 'center' }}
            >
              <Phone size={16} />
              <span>Call 093116 72292</span>
            </a>

            <a
              href="https://wa.me/919311672292"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', padding: '12px 20px', justifyContent: 'center' }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Clinic Hours Micro-info */}
          <div className="drawer-clinic-hours">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--clr-text)' }}>
              <Clock size={14} style={{ color: 'var(--clr-primary)' }} />
              <span>Clinic Hours:</span>
            </div>
            <p>Mon–Sat: 10:00 AM – 09:30 PM</p>
            <p>Sun: 10:00 AM – 09:00 PM</p>
            <p className="address-line"><MapPin size={12} /> Sector 49, Faridabad</p>
          </div>
        </div>
      </aside>
    </>
  );
}
