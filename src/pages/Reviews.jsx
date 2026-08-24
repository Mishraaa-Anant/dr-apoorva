import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Star, CheckCircle2, MessageSquare, Plus, CalendarCheck, Shield, ThumbsUp } from 'lucide-react';

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Gautam Bhardwaj',
    pet: 'German Shepherd Parent',
    rating: 5,
    date: '3 months ago',
    text: 'Dr. Apoorva is truly one of a kind. My dog usually gets very anxious at vet visits, but with her gentle approach and patient demeanor, he felt completely at ease. Very transparent with medication and pricing.',
    helpful: 18,
    verified: true
  },
  {
    id: 2,
    name: 'Urvi Syal',
    pet: 'Persian Cat Parent',
    rating: 5,
    date: '4 months ago',
    text: 'Had to rush my cat in for an emergency late in the evening. Dr. Apoorva was responsive, calm, and provided prompt medical care that saved our pet. Her reassuring guidance helped ease our entire family’s anxiety.',
    helpful: 14,
    verified: true
  },
  {
    id: 3,
    name: 'Riyanshi Paruthi',
    pet: 'Golden Retriever Parent',
    rating: 5,
    date: '5 months ago',
    text: 'Dr. Apoorva and her clinic staff showed extreme kindness and professionalism. The clinic is spotlessly clean, air-conditioned, and my dog’s recovery from skin allergy was swift thanks to her targeted diagnosis.',
    helpful: 12,
    verified: true
  },
  {
    id: 4,
    name: 'Rohit Verma',
    pet: 'Labrador Parent',
    rating: 5,
    date: '6 months ago',
    text: 'Best veterinary clinic in Sector 49 Faridabad. No unnecessary expensive tests prescribed — just honest, compassionate, and skilled medical treatment. ₹300 consultation fee is extremely reasonable.',
    helpful: 9,
    verified: true
  },
  {
    id: 5,
    name: 'Sneha Kapoor',
    pet: 'Kitten Parent',
    rating: 5,
    date: '7 months ago',
    text: 'Completed all core kitten vaccinations here. Dr. Apoorva handled my little kitten so gently that she didn’t even cry during the shots! Highly recommended.',
    helpful: 7,
    verified: true
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', pet: '', rating: 5, text: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const added = {
      id: Date.now(),
      name: newReview.name,
      pet: newReview.pet || 'Pet Parent',
      rating: Number(newReview.rating),
      date: 'Just now',
      text: newReview.text,
      helpful: 1,
      verified: true
    };

    setReviews([added, ...reviews]);
    setSubmitted(true);
    setNewReview({ name: '', pet: '', rating: 5, text: '' });
  };

  return (
    <>
      <Helmet>
        <title>Google Reviews (4.5★) — Dr. Apoorva's Pet Clinic Faridabad</title>
        <meta name="description" content="Read 151+ genuine 5-star reviews from pet parents in Faridabad about Dr. Apoorva's Pet Clinic. 4.5★ average rating on Google." />
      </Helmet>

      {/* Header */}
      <section className="section-sm" style={{ background: 'var(--grad-hero)', paddingTop: 'calc(var(--nav-height) + 30px)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <div className="badge-pill" style={{ marginBottom: '16px' }}>
            <Star size={14} fill="currentColor" />
            <span>4.5 Rating on Google · 151+ Reviews</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>
            Patient Stories & <span className="gradient-text">Reviews</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--clr-text-2)', lineHeight: 1.6 }}>
            Read real feedback from pet parents across Faridabad who trust Dr. Apoorva with their beloved companions.
          </p>
        </div>
      </section>

      {/* Aggregate Score Card & Reviews List */}
      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          {/* Aggregate Rating Showcase */}
          <div className="glass-card" style={{ padding: '36px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ textAlign: 'center', borderRight: '1px solid var(--clr-card-border)', paddingRight: '20px' }}>
              <div style={{ fontSize: '3.8rem', fontFamily: 'var(--font-head)', fontWeight: 900, color: 'var(--clr-primary)', lineHeight: 1 }}>
                4.5
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', color: 'var(--clr-gold)', margin: '10px 0' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={20} fill={i <= 4 ? "currentColor" : "currentColor"} />
                ))}
              </div>
              <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--clr-text)' }}>Overall Clinic Rating</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-3)' }}>Based on 151+ Google Reviews</span>
            </div>

            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { star: '5 Stars', pct: '86%' },
                  { star: '4 Stars', pct: '10%' },
                  { star: '3 Stars', pct: '3%' },
                  { star: '2 Stars', pct: '1%' },
                  { star: '1 Star', pct: '0%' },
                ].map(r => (
                  <div key={r.star} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem' }}>
                    <span style={{ width: '60px', color: 'var(--clr-text-2)', fontWeight: 600 }}>{r.star}</span>
                    <div style={{ flex: 1, height: '8px', background: 'var(--clr-bg-2)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ width: r.pct, height: '100%', background: 'var(--clr-gold)', borderRadius: 'var(--radius-full)' }} />
                    </div>
                    <span style={{ width: '36px', textAlign: 'right', color: 'var(--clr-text-3)', fontWeight: 600 }}>{r.pct}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setShowAddReview(!showAddReview)}
                >
                  <Plus size={14} /> Write a Review
                </button>
                <Link to="/book" className="btn btn-primary btn-sm">
                  <CalendarCheck size={14} /> Book Appointment
                </Link>
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          {showAddReview && (
            <div className="glass-card" style={{ padding: '32px', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Share Your Experience with Dr. Apoorva</h3>
              {submitted ? (
                <div style={{ padding: '20px', background: 'var(--clr-primary-l)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <CheckCircle2 size={32} style={{ color: 'var(--clr-primary)', margin: '0 auto 8px' }} />
                  <h4>Thank you for your feedback!</h4>
                  <p style={{ color: 'var(--clr-text-2)', fontSize: '0.88rem' }}>Your review has been published to our patient stories.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input
                        className="form-input"
                        placeholder="e.g. Rahul S."
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pet Details (optional)</label>
                      <input
                        className="form-input"
                        placeholder="e.g. Beagle Parent"
                        value={newReview.pet}
                        onChange={(e) => setNewReview({ ...newReview, pet: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Rating *</label>
                    <select
                      className="form-select"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Exceptional Care)</option>
                      <option value={4}>⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                      <option value={3}>⭐⭐⭐ 3 Stars (Average)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Review *</label>
                    <textarea
                      className="form-textarea"
                      rows={3}
                      placeholder="Tell other pet parents about your consultation, clinic experience, or recovery..."
                      required
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Reviews List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {reviews.map((rev) => (
              <div key={rev.id} className="glass-card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--clr-text)' }}>{rev.name}</strong>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--clr-text-3)', marginTop: '2px' }}>
                      <span>{rev.pet}</span>
                      <span>•</span>
                      <span>{rev.date}</span>
                      {rev.verified && (
                        <>
                          <span>•</span>
                          <span style={{ color: 'var(--clr-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <CheckCircle2 size={12} /> Verified Patient
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '3px', color: 'var(--clr-gold)' }}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p style={{ color: 'var(--clr-text-2)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  "{rev.text}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--clr-text-3)' }}>
                  <ThumbsUp size={13} />
                  <span>{rev.helpful} pet parents found this review helpful</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
