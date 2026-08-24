import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, AlertTriangle, CheckCircle, ArrowRight, Activity, Sparkles } from 'lucide-react';

const SYMPTOM_DATA = [
  {
    category: 'Vomiting & Digestive',
    icon: '🥣',
    symptoms: [
      { name: 'Vomiting or Lethargy', severity: 'urgent', advise: 'Could indicate gastrointestinal distress or poisoning. Fast vet consultation recommended.' },
      { name: 'Loss of Appetite > 24hrs', severity: 'medium', advise: 'Needs clinical evaluation to check for underlying infections or dental issues.' },
      { name: 'Loose Stools / Diarrhea', severity: 'medium', advise: 'Deworming or electrolyte hydration support might be needed.' }
    ]
  },
  {
    category: 'Skin, Fur & Itching',
    icon: '✨',
    symptoms: [
      { name: 'Continuous Scratching / Ticks', severity: 'low', advise: 'Anti-tick treatment and medicated medicated wash recommended.' },
      { name: 'Hair Loss / Red Patches', severity: 'medium', advise: 'Fungal or bacterial skin test needed to prescribe specific ointment/drops.' },
      { name: 'Ear Scratching / Odor', severity: 'low', advise: 'Ear mite or otitis infection. Professional ear cleaning and drops needed.' }
    ]
  },
  {
    category: 'Eyes, Ears & Respiratory',
    icon: '👀',
    symptoms: [
      { name: 'Sneezing, Coughing or Wheezing', severity: 'medium', advise: 'Respiratory checkup required to rule out kennel cough or feline flu.' },
      { name: 'Eye Discharge / Redness', severity: 'medium', advise: 'Corneal stain test and antibiotic ophthalmic drops may be needed.' },
      { name: 'Difficulty Breathing / Panting', severity: 'emergency', advise: 'Immediate emergency attention required. Bring your pet directly to the clinic.' }
    ]
  },
  {
    category: 'Mobility & Routine Care',
    icon: '🐕',
    symptoms: [
      { name: 'Limping or Joint Stiffness', severity: 'medium', advise: 'Orthopedic palpation and joint supplements/pain management needed.' },
      { name: 'Due for Annual Vaccination', severity: 'routine', advise: 'Keep your pet safe with Rabies & DHPPi / Tricat vaccination for ₹300-₹400.' },
      { name: 'Bad Breath / Tartar Buildup', severity: 'routine', advise: 'Ultrasonic dental scaling will prevent gum infections and organ damage.' }
    ]
  }
];

export default function PetSymptomChecker() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const activeCategory = SYMPTOM_DATA[selectedCategory];

  return (
    <div className="symptom-checker-card">
      <div className="symptom-checker-header">
        <div className="badge-pill">
          <Stethoscope size={14} />
          <span>Interactive Health Triage</span>
        </div>
        <h3>Pet Symptom & Care Guide</h3>
        <p>Select your pet's symptoms to receive quick guidance from Dr. Apoorva's clinical protocols.</p>
      </div>

      {/* Category Tabs */}
      <div className="symptom-cat-tabs">
        {SYMPTOM_DATA.map((cat, idx) => (
          <button
            key={cat.category}
            type="button"
            className={`symptom-tab ${selectedCategory === idx ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(idx);
              setSelectedSymptom(null);
            }}
          >
            <span className="tab-icon">{cat.icon}</span>
            <span className="tab-title">{cat.category}</span>
          </button>
        ))}
      </div>

      {/* Symptom Selection Grid */}
      <div className="symptom-list-grid">
        {activeCategory.symptoms.map((sym) => {
          const isSelected = selectedSymptom?.name === sym.name;
          const isEmergency = sym.severity === 'emergency' || sym.severity === 'urgent';

          return (
            <div
              key={sym.name}
              className={`symptom-item-card ${isSelected ? 'selected' : ''} ${isEmergency ? 'urgent-border' : ''}`}
              onClick={() => setSelectedSymptom(sym)}
            >
              <div className="symptom-item-top">
                <div className="symptom-name">
                  <Activity size={16} className="symptom-pulse-icon" />
                  <strong>{sym.name}</strong>
                </div>
                <span className={`severity-tag ${sym.severity}`}>
                  {sym.severity === 'emergency' ? '🚨 Urgent' : sym.severity === 'urgent' ? '⚠️ High Priority' : sym.severity === 'medium' ? '🩺 Needs Exam' : '🌿 Routine'}
                </span>
              </div>
              <p className="symptom-advice">{sym.advise}</p>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="symptom-action-footer">
        <div className="doctor-note">
          <Sparkles size={16} className="sparkle-icon" />
          <span>Need personalized medical diagnosis? Consult Dr. Apoorva for only <strong>₹300</strong>.</span>
        </div>
        <Link to="/book" className="btn btn-primary btn-sm">
          Book Consultation Now <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
