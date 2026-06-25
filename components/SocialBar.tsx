"use client";

interface Props {
  locale: string;
}

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/luxdevelopmentpy?igsh=cjl2ZnY3bHNxcm52",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@luxdevelopmentpy?_r=1&_t=ZS-97MuD32Sa5l",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

const TRANSLATIONS = {
  en: { eyebrow: "Follow Our Journey" },
  es: { eyebrow: "Seguinos en redes" },
};

export default function SocialBar({ locale }: Props) {
  const t = TRANSLATIONS[locale as "en" | "es"] ?? TRANSLATIONS.en;

  return (
    <>
      <style>{`
        .social-bar-wrapper {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem 1.25rem;
          text-align: center;
        }
        .social-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0b27a3;
          margin: 0 0 1rem;
        }
        .social-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
        .social-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: 1px solid #c7d2fe;
          border-radius: 99px;
          color: #0b27a3;
          background: #fff;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .social-link:hover {
          background: #EEF2FF;
          border-color: #0b27a3;
          transform: translateY(-2px);
        }
        @media (max-width: 640px) {
          .social-bar {
            gap: 0.75rem;
          }
          .social-link span {
            display: none;
          }
          .social-link {
            padding: 10px 14px;
          }
        }
      `}</style>

      <div className="social-bar-wrapper">
        <p className="social-eyebrow">{t.eyebrow}</p>
        <div className="social-bar">
          {SOCIALS.map((s) => (
            
             <a key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              {s.icon}
              <span>{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}