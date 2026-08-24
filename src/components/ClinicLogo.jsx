export default function ClinicLogo({ size = 42, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`clinic-logo-svg ${className}`}
      aria-label="Dr. Apoorva's Pet Clinic Logo"
    >
      <defs>
        {/* Modern Medical Gradient */}
        <linearGradient id="apoorvaLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--clr-primary, #0F766E)" />
          <stop offset="60%" stopColor="var(--clr-primary-d, #0D9488)" />
          <stop offset="100%" stopColor="var(--clr-accent, #6366F1)" />
        </linearGradient>

        <linearGradient id="pawAccentGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
        </linearGradient>

        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" floodColor="var(--clr-primary-rgb, 15, 118, 110)" />
        </filter>
      </defs>

      {/* Outer Rounded Medical Shield / Hexagon-Circle Base */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="26"
        fill="url(#apoorvaLogoGrad)"
        filter="url(#logoGlow)"
      />

      {/* Subtle Inner Medical Ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="2"
        strokeDasharray="4 3"
      />

      {/* Professional Medical Cross Base (Subtle) */}
      <path
        d="M44 26 H56 V44 H74 V56 H56 V74 H44 V56 H26 V44 H44 Z"
        fill="rgba(255, 255, 255, 0.18)"
        rx="3"
      />

      {/* Elegant Veterinary Emblem: Dog & Cat silhouettes merging with Stethoscope / Paw */}
      {/* Dog Head Profile Silhouette (Left) */}
      <path
        d="M34 68 C31 65 29 59 30 52 C30 46 34 40 37 36 C38 34 39 30 40 27 C41 29 44 33 46 36 C49 39 52 44 51 49 C47 48 43 51 42 55 C41 58 42 62 44 65 C41 67 37 68 34 68 Z"
        fill="url(#pawAccentGrad)"
      />

      {/* Cat Head Profile Silhouette (Right) */}
      <path
        d="M66 68 C68 64 70 59 69 53 C68 47 64 42 63 37 C61 33 63 29 64 26 C62 28 59 31 57 34 C54 38 52 43 53 47 C57 48 60 51 60 55 C60 58 59 62 57 65 C60 67 63 68 66 68 Z"
        fill="url(#pawAccentGrad)"
      />

      {/* Central Medical Stethoscope / Veterinary Care Star Emblem */}
      <circle cx="50" cy="53" r="5" fill="#FFFFFF" />
      <circle cx="50" cy="53" r="2.5" fill="var(--clr-primary, #0F766E)" />

      {/* Top Floating Care Paw Pads (3 delicate dots) */}
      <circle cx="50" cy="22" r="3" fill="#FFFFFF" />
      <circle cx="43" cy="24" r="2.2" fill="#FFFFFF" />
      <circle cx="57" cy="24" r="2.2" fill="#FFFFFF" />
    </svg>
  );
}
