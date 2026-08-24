import { CheckCircle2, Calendar, Clock, MapPin, Phone, Download, Printer, Share2, MessageCircle } from 'lucide-react';

export default function AppointmentReceipt({ appointment }) {
  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  const clinicPhone = '9311672292';
  const whatsappMessage = encodeURIComponent(
    `Hello Dr. Apoorva's Clinic! I have booked an appointment with Reference: ${appointment.bookingId} for my pet ${appointment.petName} on ${appointment.appointmentDate} at ${appointment.appointmentTime}.`
  );

  return (
    <div className="appointment-receipt-card" id="printable-receipt">
      <div className="receipt-banner">
        <div className="receipt-badge-top">
          <CheckCircle2 size={24} className="check-icon" />
          <div>
            <h3>Appointment Confirmed</h3>
            <p>Saved securely to Dr. Apoorva's Clinic Database</p>
          </div>
        </div>
        <div className="receipt-token">
          <span className="token-label">Booking Reference</span>
          <span className="token-code">{appointment.bookingId}</span>
        </div>
      </div>

      <div className="receipt-body">
        <div className="receipt-grid">
          <div className="receipt-field">
            <span className="field-label">Pet Patient</span>
            <strong className="field-value">{appointment.petName} ({appointment.petType || 'Pet'}{appointment.petBreed ? ` - ${appointment.petBreed}` : ''})</strong>
          </div>

          <div className="receipt-field">
            <span className="field-label">Pet Parent</span>
            <strong className="field-value">{appointment.ownerName}</strong>
          </div>

          <div className="receipt-field">
            <span className="field-label"><Calendar size={14} /> Scheduled Date</span>
            <strong className="field-value highlight">{appointment.appointmentDate}</strong>
          </div>

          <div className="receipt-field">
            <span className="field-label"><Clock size={14} /> Slot Time</span>
            <strong className="field-value highlight">{appointment.appointmentTime}</strong>
          </div>

          <div className="receipt-field">
            <span className="field-label">Selected Service</span>
            <strong className="field-value">{appointment.serviceType}</strong>
          </div>

          <div className="receipt-field">
            <span className="field-label">Consultation Fee</span>
            <strong className="field-value price">₹{appointment.fee || 300} ({appointment.paymentStatus || 'Pay at Clinic'})</strong>
          </div>
        </div>

        {appointment.notes && (
          <div className="receipt-notes">
            <span className="field-label">Patient Symptoms / Notes:</span>
            <p>{appointment.notes}</p>
          </div>
        )}

        <div className="receipt-clinic-box">
          <div className="clinic-facade-mini">
            <img src="/4.jpeg" alt="Dr. Apoorva's Clinic Exterior" className="mini-facade-img" />
          </div>
          <div className="clinic-location-details">
            <h4><MapPin size={16} /> Dr. Apoorva's Pet Clinic (Signature Pet Clinic)</h4>
            <p>2259M, Street No. 1, Sector 49, Aravali Vihar, Faridabad, Haryana 121001</p>
            <p className="timings-text">Mon–Sat: 10:00 AM – 09:30 PM | Sun: 10:00 AM – 09:00 PM</p>
          </div>
        </div>
      </div>

      <div className="receipt-actions no-print">
        <a
          href={`https://wa.me/91${clinicPhone}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp"
        >
          <MessageCircle size={16} /> WhatsApp Clinic
        </a>

        <button type="button" onClick={handlePrint} className="btn btn-outline btn-sm">
          <Printer size={16} /> Print / Save PDF
        </button>

        <a href="tel:+919311672292" className="btn btn-ghost btn-sm">
          <Phone size={16} /> Call Clinic
        </a>
      </div>
    </div>
  );
}
