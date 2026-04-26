import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";

const NAV_LINKS = ["Home", "Features", "Gallery", "Contact"];

const FEATURES = [
  {
    title: "Design",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="9" height="9" rx="1" stroke="#c9a84c" strokeWidth="1.4" />
        <rect x="16" y="3" width="9" height="9" rx="1" stroke="#c9a84c" strokeWidth="1.4" />
        <rect x="3" y="16" width="9" height="9" rx="1" stroke="#c9a84c" strokeWidth="1.4" />
        <rect x="16" y="16" width="9" height="9" rx="1" stroke="#c9a84c" strokeWidth="1.4" />
      </svg>
    ),
    desc: "Tailored spatial blueprints shaped by your vision, taste, and lifestyle — from first sketch to final finish.",
  },
  {
    title: "Visualize",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#c9a84c" strokeWidth="1.4" />
        <circle cx="14" cy="14" r="4" stroke="#c9a84c" strokeWidth="1.4" />
        <line x1="14" y1="4" x2="14" y2="8" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="14" y1="20" x2="14" y2="24" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="4" y1="14" x2="8" y2="14" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="20" y1="14" x2="24" y2="14" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    desc: "Step into photorealistic renders of your unbuilt space. Every texture, shadow, and light simulated with precision.",
  },
  {
    title: "Innovate",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4 L14 8 M14 20 L14 24 M20 8 L17 11 M11 17 L8 20 M24 14 L20 14 M8 14 L4 14 M20 20 L17 17 M11 11 L8 8" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14" cy="14" r="4" stroke="#c9a84c" strokeWidth="1.4" />
      </svg>
    ),
    desc: "AI-driven material selection and layout intelligence that evolves with your preferences over time.",
  },
];

const GALLERY_ITEMS = [
  { label: "Living Spaces", accent: "from-amber-900/30" },
  { label: "Master Suites", accent: "from-stone-800/30" },
  { label: "Study & Library", accent: "from-zinc-900/30" },
  { label: "Dining Rooms", accent: "from-amber-900/20" },
  { label: "Bathrooms", accent: "from-neutral-800/30" },
  { label: "Outdoor Terraces", accent: "from-stone-900/30" },
];

function FadeInSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Landing() {
  const scrollRef = useRef(null);
  const [activeNav, setActiveNav] = useState("Home");
  const { scrollY } = useScroll({ container: scrollRef });
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.06]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --gold: #b48f2a;
          --gold-light: #e2c97e;
          --gold-dim: rgba(201, 168, 76, 0.18);
          --charcoal: #141820;
          --charcoal-deep: #0d1017;
          --charcoal-mid: #1a1f2a;
          --charcoal-surface: #1f2535;
          --text-muted: #7a8394;
          --text-soft: #b8c0cc;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .scroll-container {
          height: 90vh;
          overflow-y: scroll;
          scroll-behavior: smooth;
        }

        .scroll-container::-webkit-scrollbar { width: 4px; }
        .scroll-container::-webkit-scrollbar-track { background: var(--charcoal-deep); }
        .scroll-container::-webkit-scrollbar-thumb {
          background: var(--gold-dim);
          border-radius: 2px;
        }
        .scroll-container::-webkit-scrollbar-thumb:hover { background: var(--gold); }

        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Jost', sans-serif; }

        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0.35;
        }

        .feature-card {
          border: 1px solid rgba(201, 168, 76, 0.2);
          background: var(--charcoal-mid);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .feature-card:hover {
          border-color: rgba(201, 168, 76, 0.55);
          box-shadow: 0 0 32px rgba(201, 168, 76, 0.07), inset 0 0 20px rgba(201, 168, 76, 0.03);
        }

        .gallery-card {
          background: var(--charcoal-mid);
          border: 1px solid rgba(201, 168, 76, 0.12);
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          cursor: pointer;
        }
        .gallery-card:hover {
          border-color: rgba(201, 168, 76, 0.4);
          transform: translateY(-4px);
        }
        .gallery-card:hover .gallery-label { color: var(--gold-light); }

        .nav-link {
          cursor: pointer;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.2s;
          letter-spacing: 0.12em;
          font-size: 11px;
          font-weight: 300;
          text-transform: uppercase;
          color: var(--text-soft);
        }
        .nav-link.active, .nav-link:hover { color: var(--gold); }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0; right: 100%;
          height: 1px;
          background: var(--gold);
          transition: right 0.3s ease;
        }
        .nav-link.active::after, .nav-link:hover::after { right: 0; }

        .try-btn {
          border: 1px solid var(--gold);
          color: var(--gold);
          background: transparent;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          letter-spacing: 0.18em;
          font-size: 11px;
          text-transform: uppercase;
          padding: 8px 22px;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.25s, color 0.25s, box-shadow 0.25s;
        }
        .try-btn:hover {
          background: var(--gold);
          color: var(--charcoal-deep);
          box-shadow: 0 0 24px rgba(201, 168, 76, 0.3);
        }

        .grain-overlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px;
        }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          color: var(--gold);
          line-height: 1;
        }
        .stat-label {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 6px;
        }

        .cta-section {
          background: linear-gradient(135deg, var(--charcoal-mid) 0%, rgba(201,168,76,0.06) 50%, var(--charcoal-mid) 100%);
          border: 1px solid rgba(201, 168, 76, 0.2);
        }
      `}</style>

      {/* PAGE WRAPPER */}
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #080b11 0%, #0f1219 50%, #0a0d13 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            maxWidth: "1200px",
            height: "90vh",
            background: "var(--charcoal)",
            borderRadius: "20px",
            boxShadow: "0 0 120px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.04)",
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(201,168,76,0.08)",
          }}
        >
          <div className="grain-overlay" />

          {/* SCROLLABLE INNER */}
          <div className="scroll-container" ref={scrollRef} style={{ height: "100%", position: "relative", zIndex: 1 }}>

            {/* ── NAVBAR ── */}
            <nav
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "22px 40px",
                position: "sticky",
                top: 0,
                zIndex: 50,
                background: "rgba(20,24,32,0.85)",
                backdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(201,168,76,0.08)",
              }}
            >
              <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                {NAV_LINKS.map((link) => (
                  <span
                    key={link}
                    className={`nav-link font-sans${activeNav === link ? " active" : ""}`}
                    onClick={() => setActiveNav(link)}
                  >
                    {link}
                  </span>
                ))}
              </div>
              <button className="try-btn">Try Now</button>
            </nav>

            {/* ── HERO ── */}
            <div style={{ padding: "12px 24px 0" }}>
              <div
                style={{
                  position: "relative",
                  height: "440px",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >

                {/* IMAGE BACKGROUND */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    scale: heroScale,
                    opacity: heroOpacity,
                    backgroundImage: "url('/interio-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Decorative arch shape */}
                <div
                  style={{
                    position: "absolute",
                    right: "10%",
                    top: 0,
                    bottom: 0,
                    width: "38%",
                    background:
                      "linear-gradient(180deg, rgba(201,168,76,0.06) 0%, rgba(180,140,60,0.03) 60%, transparent 100%)",
                    borderLeft: "1px solid rgba(201,168,76,0.1)",
                    borderRadius: "0 60px 60px 0",
                    clipPath: "ellipse(100% 100% at 100% 50%)",
                  }}
                />

                {/* Fireplace glow */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "60px",
                    left: "35%",
                    width: "120px",
                    height: "80px",
                    background:
                      "radial-gradient(ellipse, rgba(220,120,20,0.25) 0%, rgba(180,80,10,0.12) 50%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(20px)",
                  }}
                />

                {/* Dark overlays */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(100deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
                  }}
                />

                {/* Decorative vertical lines */}
                {[0.18, 0.22].map((left, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: `${left * 100}%`,
                      top: "10%",
                      height: "60%",
                      width: "1px",
                      background:
                        "linear-gradient(180deg, transparent, rgba(201,168,76,0.4), transparent)",
                      opacity: 0.6,
                    }}
                  />
                ))}

                {/* Hero text */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingLeft: "52px",
                    paddingBottom: "20px",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.35em",
                        color: "var(--gold)",
                        textTransform: "uppercase",
                        marginBottom: "16px",
                        opacity: 0.85,
                      }}
                    >
                      AI-Powered Interior Design
                    </div>
                    <h1
                      className="font-serif"
                      style={{
                        fontSize: "68px",
                        fontWeight: 300,
                        color: "#e8dcc8",
                        lineHeight: 0.95,
                        letterSpacing: "-0.01em",
                        marginBottom: "14px",
                      }}
                    >
                      INTERIO <span style={{ fontStyle: "italic", color: "var(--gold-light)" }}>AI</span>
                    </h1>
                    <p
                      className="font-sans"
                      style={{
                        fontSize: "18px",
                        fontWeight: 300,
                        color: "var(--gold)",
                        letterSpacing: "0.08em",
                        marginBottom: "32px",
                      }}
                    >
                      Redefine Luxury Living.
                    </p>
                    <div style={{ display: "flex", gap: "14px" }}>
                      <button
                        className="try-btn"
                        style={{ borderRadius: "4px", padding: "10px 28px", fontSize: "11px" }}
                      >
                        Explore Spaces
                      </button>
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--text-soft)",
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "11px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 0",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                        onMouseLeave={(e) => (e.target.style.color = "var(--text-soft)")}
                      >
                        Watch Demo
                        <span style={{ fontSize: "16px" }}>→</span>
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "24px",
                    border: "1px solid rgba(201,168,76,0.25)",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    background: "rgba(20,24,32,0.7)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--gold)",
                      boxShadow: "0 0 8px var(--gold)",
                    }}
                  />
                  <span
                    className="font-sans"
                    style={{ fontSize: "10px", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    AI Rendering Live
                  </span>
                </div>
              </div>
            </div>

            {/* ── FEATURES ── */}
            <div style={{ padding: "32px 24px" }}>
              <FadeInSection>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  {FEATURES.map((f, i) => (
                    <motion.div
                      key={i}
                      className="feature-card"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ padding: "28px 24px", borderRadius: "10px" }}
                    >
                      <div style={{ marginBottom: "14px" }}>{f.icon}</div>
                      <h3
                        className="font-serif"
                        style={{
                          color: "var(--gold-light)",
                          fontSize: "22px",
                          fontWeight: 400,
                          marginBottom: "10px",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {f.title}
                      </h3>
                      <p
                        className="font-sans"
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "13px",
                          lineHeight: 1.7,
                          fontWeight: 300,
                        }}
                      >
                        {f.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </FadeInSection>
            </div>

            {/* ── DIVIDER ── */}
            <div style={{ padding: "0 24px" }}>
              <div className="gold-divider" />
            </div>

            {/* ── STATS ── */}
            <FadeInSection delay={0.1}>
              <div
                style={{
                  padding: "52px 24px",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "0",
                  position: "relative",
                }}
              >
                {[
                  { num: "2,400+", label: "Spaces Designed" },
                  { num: "98%", label: "Client Satisfaction" },
                  { num: "40+", label: "Material Libraries" },
                  { num: "< 2s", label: "Render Time" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign: "center",
                      padding: "24px",
                      borderRight: i < 3 ? "1px solid rgba(201,168,76,0.1)" : "none",
                    }}
                  >
                    <div className="stat-number">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeInSection>

            {/* ── PRECISION SECTION ── */}
            <div style={{ padding: "0 24px 48px", background: "var(--charcoal-deep)" }}>
              <div
                style={{
                  background: "var(--charcoal-mid)",
                  borderRadius: "14px",
                  padding: "56px 52px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "64px",
                  alignItems: "center",
                  border: "1px solid rgba(201,168,76,0.1)",
                }}
              >
                <FadeInSection>
                  <div
                    className="font-sans"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.35em",
                      color: "var(--gold)",
                      textTransform: "uppercase",
                      marginBottom: "18px",
                    }}
                  >
                    The Technology
                  </div>
                  <h2
                    className="font-serif"
                    style={{
                      fontSize: "42px",
                      fontWeight: 300,
                      color: "#ddd3bb",
                      lineHeight: 1.15,
                      marginBottom: "22px",
                    }}
                  >
                    Precision{" "}
                    <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Interface</em>
                  </h2>
                  <p
                    className="font-sans"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "14px",
                      lineHeight: 1.85,
                      fontWeight: 300,
                      maxWidth: "380px",
                    }}
                  >
                    Walk through your future space before it's built. AI-driven rendering meets architectural
                    precision — every sightline, shadow, and surface calibrated to perfection.
                  </p>
                  <div style={{ marginTop: "32px", display: "flex", gap: "16px" }}>
                    {["Photorealistic", "Real-time", "Customizable"].map((tag) => (
                      <span
                        key={tag}
                        className="font-sans"
                        style={{
                          border: "1px solid rgba(201,168,76,0.25)",
                          color: "var(--gold)",
                          fontSize: "10px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          padding: "5px 12px",
                          borderRadius: "3px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </FadeInSection>

                <FadeInSection delay={0.15}>
                  <div style={{ position: "relative" }}>
                    {/* Decorative render preview card */}
                    <div
                      style={{
                        background: "var(--charcoal-deep)",
                        borderRadius: "10px",
                        border: "1px solid rgba(201,168,76,0.15)",
                        padding: "24px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "160px",
                          background:
                            "linear-gradient(135deg, #1e1a10 0%, #2a200e 40%, #1a1510 70%, #0f0e0c 100%)",
                          borderRadius: "6px",
                          marginBottom: "16px",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: "20px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "60px",
                            height: "40px",
                            background:
                              "radial-gradient(ellipse, rgba(220,140,30,0.4) 0%, transparent 70%)",
                            filter: "blur(8px)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: 0,
                            bottom: 0,
                            width: "30%",
                            background:
                              "linear-gradient(90deg, transparent, rgba(201,168,76,0.04))",
                          }}
                        />
                        <span
                          className="font-sans"
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "14px",
                            fontSize: "9px",
                            letterSpacing: "0.2em",
                            color: "rgba(201,168,76,0.5)",
                            textTransform: "uppercase",
                          }}
                        >
                          Rendering...
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="font-sans" style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
                          Living Room · Classic Suite
                        </span>
                        <span style={{ color: "var(--gold)", fontSize: "11px" }}>↗</span>
                      </div>
                    </div>

                    {/* Floating accent */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        right: "-12px",
                        width: "56px",
                        height: "56px",
                        border: "1px solid rgba(201,168,76,0.3)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--charcoal-mid)",
                      }}
                    >
                      <span style={{ color: "var(--gold)", fontSize: "20px" }}>✦</span>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>

            {/* ── GALLERY ── */}
            <div style={{ padding: "0 24px 48px" }}>
              <FadeInSection>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
                  <div>
                    <div
                      className="font-sans"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.35em",
                        color: "var(--gold)",
                        textTransform: "uppercase",
                        marginBottom: "10px",
                      }}
                    >
                      Curated Collection
                    </div>
                    <h2
                      className="font-serif"
                      style={{ fontSize: "36px", fontWeight: 300, color: "#ddd3bb" }}
                    >
                      The Gallery
                    </h2>
                  </div>
                  <span
                    className="font-sans"
                    style={{
                      fontSize: "11px",
                      color: "var(--gold)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderBottom: "1px solid rgba(201,168,76,0.3)",
                      paddingBottom: "2px",
                    }}
                  >
                    View All →
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
                  {GALLERY_ITEMS.map((item, i) => (
                    <motion.div
                      key={i}
                      className="gallery-card"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      style={{
                        borderRadius: "10px",
                        height: i < 3 ? "180px" : "130px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "18px",
                        background: `linear-gradient(180deg, ${
                          i % 2 === 0 ? "#1a1810" : "#181820"
                        } 0%, #141820 100%)`,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* subtle shimmer */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `radial-gradient(ellipse at ${i % 2 === 0 ? "80%" : "20%"} 30%, rgba(201,168,76,0.05) 0%, transparent 60%)`,
                        }}
                      />
                      <span
                        className="font-sans gallery-label"
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                          transition: "color 0.3s",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </FadeInSection>
            </div>

            {/* ── CTA ── */}
            <div style={{ padding: "0 24px 48px" }}>
              <FadeInSection delay={0.05}>
                <div
                  className="cta-section"
                  style={{
                    borderRadius: "14px",
                    padding: "60px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      width: "300px",
                      height: "300px",
                      background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                  <p
                    className="font-sans"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.35em",
                      color: "var(--gold)",
                      textTransform: "uppercase",
                      marginBottom: "16px",
                    }}
                  >
                    Begin Your Journey
                  </p>
                  <h2
                    className="font-serif"
                    style={{
                      fontSize: "48px",
                      fontWeight: 300,
                      color: "#e2d8c4",
                      marginBottom: "18px",
                      lineHeight: 1.1,
                    }}
                  >
                    Your Space. <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Perfected.</em>
                  </h2>
                  <p
                    className="font-sans"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "14px",
                      maxWidth: "440px",
                      margin: "0 auto 36px",
                      lineHeight: 1.8,
                      fontWeight: 300,
                    }}
                  >
                    Experience the future of interior design — where artificial intelligence meets timeless
                    craftsmanship.
                  </p>
                  <button className="try-btn" style={{ borderRadius: "4px", padding: "13px 40px", fontSize: "12px" }}>
                    Start Designing Free
                  </button>
                </div>
              </FadeInSection>
            </div>

            {/* ── FOOTER ── */}
            <div
              style={{
                padding: "24px 40px 28px",
                borderTop: "1px solid rgba(201,168,76,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="font-serif"
                style={{ fontSize: "18px", color: "var(--gold)", fontWeight: 300, letterSpacing: "0.05em" }}
              >
                Interio AI
              </span>
              <div style={{ display: "flex", gap: "28px" }}>
                {["Privacy", "Terms", "Careers"].map((l) => (
                  <span
                    key={l}
                    className="font-sans"
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      letterSpacing: "0.1em",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
                  >
                    {l}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "14px" }}>
                {["𝕏", "in", "●"].map((icon, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: i === 2 ? "8px" : "13px",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
}