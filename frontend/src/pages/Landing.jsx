import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const NAV_LINKS = ["Home", "Features", "Gallery", "Contact"];

const FEATURES = [
  {
    title: "Design",
    icon: "grid",
    desc: "Tailored spatial blueprints shaped by your vision, taste, and lifestyle - from first sketch to final finish.",
  },
  {
    title: "Visualize",
    icon: "focus",
    desc: "Step into photorealistic renders of your unbuilt space. Every texture, shadow, and light simulated with precision.",
  },
  {
    title: "Innovate",
    icon: "spark",
    desc: "AI-driven material selection and layout intelligence that evolves with your preferences over time.",
  },
];

const GALLERY_ITEMS = [
  {
    label: "Living Spaces",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    position: "center",
  },
  {
    label: "Master Suites",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    position: "center",
  },
  {
    label: "Study & Library",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=85",
    position: "center",
  },
  {
    label: "Dining Rooms",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85",
    position: "center",
  },
  {
    label: "Bathrooms",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=85",
    position: "center",
  },
  {
    label: "Outdoor Terraces",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    position: "center",
  },
];

const STATS = [
  { num: "2,400+", label: "Spaces Designed" },
  { num: "98%", label: "Client Satisfaction" },
  { num: "40+", label: "Material Libraries" },
  { num: "< 2s", label: "Render Time" },
];

const STYLE_PRESETS = [
  {
    name: "Modern",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=85",
    palette: ["#171b22", "#d8d0c2", "#a88339"],
    prompt: "Open-plan modern lounge with warm marble, low-profile seating, and soft indirect lighting.",
  },
  {
    name: "Japandi",
    image: "https://images.unsplash.com/photo-1616486701797-0f33f61038ec?auto=format&fit=crop&w=1200&q=85",
    palette: ["#141820", "#b9aa91", "#5d4938"],
    prompt: "Calm Japandi suite with oak textures, linen upholstery, and balanced negative space.",
  },
  {
    name: "Classic",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    palette: ["#10141b", "#e2c97e", "#75523c"],
    prompt: "Timeless classic interior with paneled walls, brass accents, and sculptural lighting.",
  },
  {
    name: "Minimal",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    palette: ["#101318", "#f1eadc", "#8b8c86"],
    prompt: "Minimal warm apartment with clean silhouettes, natural stone, and uncluttered styling.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Upload Room",
    type: "upload",
    desc: "Start with a room photo, floor plan, or empty shell and let the AI read the space.",
  },
  {
    step: "02",
    title: "Choose Style",
    type: "style",
    desc: "Pick a design direction, palette, material mood, and the level of luxury you want.",
  },
  {
    step: "03",
    title: "Get AI Design",
    type: "render",
    desc: "Receive a polished concept with visual direction, material cues, and render-ready detail.",
  },
];

const MATERIAL_SWATCHES = [
  { name: "Walnut", color: "#6f4a2f" },
  { name: "Linen", color: "#c8bfa8" },
  { name: "Brass", color: "#b48f2a" },
  { name: "Stone", color: "#8b8c86" },
];

const DESIGN_INSIGHTS = [
  { label: "Light Balance", value: "94%" },
  { label: "Material Match", value: "88%" },
  { label: "Space Flow", value: "91%" },
];

const easeOut = [0.22, 1, 0.36, 1];

const staggerGroup = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const riseIn = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: easeOut },
  },
};

function FeatureIcon({ type }) {
  if (type === "focus") {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="#c9a84c" strokeWidth="1.4" />
        <circle cx="14" cy="14" r="4" stroke="#c9a84c" strokeWidth="1.4" />
        <path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4v4M14 20v4M20 8l-3 3M11 17l-3 3M24 14h-4M8 14H4M20 20l-3-3M11 11 8 8" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14" cy="14" r="4" stroke="#c9a84c" strokeWidth="1.4" />
      </svg>
    );
  }

  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {[3, 16].map((x) =>
        [3, 16].map((y) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="9" height="9" rx="1" stroke="#c9a84c" strokeWidth="1.4" />
        )),
      )}
    </svg>
  );
}

function FadeInSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedStat({ num, label, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easeOut }}
    >
      <motion.div
        className="stat-number"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.15 + index * 0.08, ease: easeOut }}
      >
        {num}
      </motion.div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

function ProcessGraphic({ type }) {
  if (type === "style") {
    return (
      <div className="workflow-graphic style-graphic" aria-hidden="true">
        <div className="style-board">
          <span style={{ background: "#d7c7a8" }} />
          <span style={{ background: "#7c583e" }} />
          <span style={{ background: "#b48f2a" }} />
          <span style={{ background: "#252b35" }} />
        </div>
        <div className="style-slider">
          <span />
        </div>
        <div className="style-stack">
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }

  if (type === "render") {
    return (
      <div className="workflow-graphic render-graphic" aria-hidden="true">
        <div className="render-window">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80" alt="" loading="lazy" />
          <div className="render-window-shade" />
          <div className="render-hotspot one" />
          <div className="render-hotspot two" />
        </div>
        <div className="render-chip">HD</div>
      </div>
    );
  }

  return (
    <div className="workflow-graphic upload-graphic" aria-hidden="true">
      <div className="upload-photo">
        <img
          src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80"
          alt=""
          loading="lazy"
        />
        <div className="upload-photo-shade" />
        <div className="upload-frame-corners">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="upload-arrow">
        <span />
      </div>
    </div>
  );
}

export default function Landing() {
  const scrollRef = useRef(null);
  const [activeNav, setActiveNav] = useState("Home");
  const [activeStyle, setActiveStyle] = useState(STYLE_PRESETS[0]);
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(600);
  const mouseY = useMotionValue(250);
  const glowX = useSpring(mouseX, { stiffness: 90, damping: 28, mass: 0.4 });
  const glowY = useSpring(mouseY, { stiffness: 90, damping: 28, mass: 0.4 });
  const { scrollY } = useScroll({ container: scrollRef });
  const heroScale = useTransform(scrollY, [0, 420], [1, 1.08]);
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0.42]);
  const heroY = useTransform(scrollY, [0, 420], [0, 34]);
  const navShadow = useTransform(scrollY, [0, 120], ["0 0 0 rgba(0,0,0,0)", "0 18px 40px rgba(0,0,0,0.28)"]);
  const navBorder = useTransform(scrollY, [0, 120], ["rgba(201,168,76,0.08)", "rgba(201,168,76,0.2)"]);
  const bgDrift = useTransform(scrollY, [0, 900], [0, -70]);
  const ctaGlowScale = useTransform(scrollY, [900, 1450], [0.9, 1.18]);
  const cursorGlowX = useTransform(glowX, (value) => value - 180);
  const cursorGlowY = useTransform(glowY, (value) => value - 180);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --gold: #b48f2a;
          --gold-light: #e2c97e;
          --gold-dim: rgba(201, 168, 76, 0.18);
          --charcoal: #141820;
          --charcoal-deep: #0d1017;
          --charcoal-mid: #1a1f2a;
          --text-muted: #7a8394;
          --text-soft: #b8c0cc;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080b11; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Jost', sans-serif; }

        .page-shell {
          min-height: 100vh;
          background: linear-gradient(160deg, #080b11 0%, #0f1219 50%, #0a0d13 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Jost', sans-serif;
        }

        .main-card {
          width: 100%;
          max-width: 1200px;
          height: 90vh;
          background: var(--charcoal);
          border-radius: 20px;
          box-shadow: 0 0 120px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.04);
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(201,168,76,0.08);
        }

        .cursor-glow {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(226,201,126,0.11) 0%, rgba(180,143,42,0.05) 32%, transparent 68%);
          pointer-events: none;
          z-index: 0;
          mix-blend-mode: screen;
        }

        .ambient-grid {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(226,201,126,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(226,201,126,0.12) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at 50% 20%, black 0%, transparent 58%);
        }

        .scroll-container {
          height: 100%;
          overflow-y: auto;
          scroll-behavior: smooth;
          position: relative;
          z-index: 1;
        }

        .scroll-container::-webkit-scrollbar { width: 4px; }
        .scroll-container::-webkit-scrollbar-track { background: var(--charcoal-deep); }
        .scroll-container::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }

        .grain-overlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px;
        }

        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 40px;
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(20,24,32,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .nav-links { display: flex; gap: 32px; align-items: center; }
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
          left: 0;
          right: 100%;
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

        .hero-wrap { padding: 12px 24px 0; }
        .hero-panel {
          position: relative;
          min-height: 440px;
          border-radius: 14px;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/interio-bg.png');
          background-size: cover;
          background-position: center;
        }
        .hero-title span {
          background: linear-gradient(100deg, var(--gold), var(--gold-light), #fff3bd, var(--gold));
          background-size: 260% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: titleSheen 5s ease-in-out infinite;
        }
        .hero-sweep {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(110deg, transparent 0%, rgba(226,201,126,0.08) 45%, transparent 60%);
          animation: sweep 7s ease-in-out infinite;
        }
        .hero-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 55%, transparent 100%);
        }
        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 52px;
          padding-bottom: 20px;
        }
        .eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 0.35em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0.85;
        }
        .hero-title {
          font-size: clamp(46px, 7vw, 68px);
          font-weight: 300;
          color: #e8dcc8;
          line-height: 0.95;
          margin-bottom: 14px;
        }
        .hero-subtitle {
          font-size: 18px;
          font-weight: 300;
          color: var(--gold);
          letter-spacing: 0.08em;
          margin-bottom: 32px;
        }
        .hero-actions { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
        .text-btn {
          background: transparent;
          border: none;
          color: var(--text-soft);
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 0;
          transition: color 0.2s;
        }
        .text-btn:hover { color: var(--gold); }
        .animated-arrow { display: inline-block; transition: transform 0.2s ease; }
        button:hover .animated-arrow, .text-link:hover .animated-arrow { transform: translateX(4px); }

        .vertical-line {
          position: absolute;
          top: 10%;
          height: 60%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(201,168,76,0.4), transparent);
          transform-origin: top;
        }
        .orbital-ring {
          position: absolute;
          right: 12%;
          top: 68px;
          width: 150px;
          height: 150px;
          border: 1px solid rgba(226,201,126,0.15);
          border-radius: 50%;
          z-index: 4;
          animation: slowSpin 16s linear infinite;
        }
        .orbital-ring::before,
        .orbital-ring::after {
          content: '';
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--gold-light);
          box-shadow: 0 0 16px rgba(226,201,126,0.7);
        }
        .orbital-ring::before { top: -4px; left: 50%; }
        .orbital-ring::after { bottom: 16px; right: 12px; opacity: 0.55; }
        .arch-light {
          position: absolute;
          right: 10%;
          top: 0;
          bottom: 0;
          width: 38%;
          background: linear-gradient(180deg, rgba(201,168,76,0.06) 0%, rgba(180,140,60,0.03) 60%, transparent 100%);
          border-left: 1px solid rgba(201,168,76,0.1);
          border-radius: 0 60px 60px 0;
          clip-path: ellipse(100% 100% at 100% 50%);
        }
        .fireplace-glow {
          position: absolute;
          bottom: 60px;
          left: 35%;
          width: 120px;
          height: 80px;
          background: radial-gradient(ellipse, rgba(220,120,20,0.25) 0%, rgba(180,80,10,0.12) 50%, transparent 70%);
          border-radius: 50%;
          filter: blur(20px);
        }
        .live-badge {
          position: absolute;
          bottom: 20px;
          right: 24px;
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 6px;
          padding: 8px 16px;
          background: rgba(20,24,32,0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 12;
        }
        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          animation: pulseGlow 1.9s ease-in-out infinite;
        }

        .section-pad { padding: 32px 24px; }
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .feature-card {
          border: 1px solid rgba(201, 168, 76, 0.2);
          background: var(--charcoal-mid);
          position: relative;
          overflow: hidden;
          padding: 28px 24px;
          border-radius: 10px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(120deg, transparent, rgba(226,201,126,0.12), transparent);
          transform: translateX(-120%);
          transition: transform 0.7s ease;
        }
        .feature-card::after {
          content: '';
          position: absolute;
          inset: auto 18px 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(226,201,126,0.55), transparent);
          transform: scaleX(0);
          transition: transform 0.45s ease;
        }
        .feature-card:hover {
          border-color: rgba(201, 168, 76, 0.55);
          box-shadow: 0 0 32px rgba(201, 168, 76, 0.07), inset 0 0 20px rgba(201, 168, 76, 0.03);
        }
        .feature-card:hover::before { transform: translateX(120%); }
        .feature-card:hover::after { transform: scaleX(1); }
        .feature-inner { position: relative; z-index: 1; }
        .feature-title {
          color: var(--gold-light);
          font-size: 22px;
          font-weight: 400;
          margin: 14px 0 10px;
        }
        .muted-copy {
          color: var(--text-muted);
          font-size: 13px;
          line-height: 1.7;
          font-weight: 300;
        }
        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0.35;
        }
        .style-lab {
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: 22px;
          align-items: stretch;
          padding: 12px 0 8px;
        }
        .style-copy {
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 12px;
          background: linear-gradient(145deg, rgba(26,31,42,0.88), rgba(13,16,23,0.92));
          padding: 32px;
          position: relative;
          overflow: hidden;
        }
        .style-copy::after {
          content: '';
          position: absolute;
          right: -60px;
          bottom: -70px;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(226,201,126,0.08), transparent 68%);
        }
        .style-preview {
          min-height: 360px;
          border-radius: 12px;
          border: 1px solid rgba(201,168,76,0.16);
          overflow: hidden;
          position: relative;
          background: var(--charcoal-deep);
        }
        .style-preview img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.86) contrast(1.05);
        }
        .style-preview::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(8,11,17,0.84), rgba(8,11,17,0.28) 48%, rgba(8,11,17,0.62)),
            linear-gradient(180deg, transparent, rgba(8,11,17,0.82));
        }
        .style-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
        }
        .style-chip {
          border: 1px solid rgba(201,168,76,0.24);
          color: var(--text-soft);
          background: rgba(13,16,23,0.62);
          border-radius: 999px;
          padding: 9px 14px;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .style-chip.active,
        .style-chip:hover {
          border-color: rgba(226,201,126,0.72);
          color: var(--gold-light);
          background: rgba(201,168,76,0.1);
        }
        .style-overlay-content {
          position: absolute;
          inset: auto 28px 26px;
          z-index: 2;
        }
        .prompt-box {
          border: 1px solid rgba(226,201,126,0.22);
          background: rgba(10,13,19,0.72);
          backdrop-filter: blur(12px);
          border-radius: 8px;
          padding: 16px 18px;
          max-width: 520px;
          color: #ddd3bb;
          font-size: 13px;
          line-height: 1.65;
          box-shadow: 0 18px 44px rgba(0,0,0,0.28);
        }
        .palette-row {
          display: flex;
          gap: 8px;
          margin-top: 14px;
        }
        .palette-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow: 0 10px 20px rgba(0,0,0,0.28);
        }
        .process-section {
          padding: 0 24px 48px;
        }
        .process-panel {
          border: 1px solid rgba(201,168,76,0.14);
          border-radius: 14px;
          padding: 38px;
          background:
            radial-gradient(circle at 18% 0%, rgba(226,201,126,0.08), transparent 34%),
            linear-gradient(145deg, rgba(20,24,32,0.92), rgba(13,16,23,0.96));
          overflow: hidden;
          position: relative;
        }
        .process-head {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: flex-end;
          margin-bottom: 30px;
        }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          position: relative;
        }
        .process-grid::before {
          content: '';
          position: absolute;
          left: 16%;
          right: 16%;
          top: 92px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(226,201,126,0.34), rgba(226,201,126,0.34), transparent);
          z-index: 0;
        }
        .process-card {
          border: 1px solid rgba(201,168,76,0.14);
          border-radius: 10px;
          background: rgba(13,16,23,0.58);
          padding: 22px;
          min-height: 320px;
          position: relative;
          overflow: hidden;
          z-index: 1;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
        }
        .process-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 12%, rgba(226,201,126,0.1), transparent 28%),
            linear-gradient(120deg, transparent, rgba(226,201,126,0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .process-card:hover::before { opacity: 1; }
        .process-step {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 300;
          line-height: 1;
          opacity: 0.88;
          position: relative;
          z-index: 2;
        }
        .process-title {
          margin-top: 20px;
          color: #ddd3bb;
          font-size: 22px;
          font-weight: 400;
          position: relative;
          z-index: 2;
        }
        .workflow-graphic {
          height: 138px;
          margin: 18px 0 20px;
          border-radius: 10px;
          border: 1px solid rgba(226,201,126,0.14);
          background:
            linear-gradient(145deg, rgba(20,24,32,0.92), rgba(8,11,17,0.96)),
            radial-gradient(circle at 50% 0%, rgba(226,201,126,0.08), transparent 48%);
          position: relative;
          overflow: hidden;
          z-index: 2;
        }
        .workflow-graphic::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent, rgba(226,201,126,0.08), transparent);
          transform: translateX(-120%);
          animation: sweep 6s ease-in-out infinite;
        }
        .process-flow-arrow {
          position: absolute;
          right: -22px;
          top: 82px;
          width: 42px;
          height: 22px;
          z-index: 3;
          color: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(226,201,126,0.22);
          border-radius: 999px;
          background: rgba(13,16,23,0.92);
          box-shadow: 0 10px 24px rgba(0,0,0,0.28);
        }
        .upload-photo {
          position: absolute;
          inset: 16px 74px 16px 16px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(226,201,126,0.22);
          box-shadow: 0 18px 34px rgba(0,0,0,0.28);
        }
        .upload-photo img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.82) contrast(1.06);
          transform: scale(1.03);
        }
        .upload-photo-shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(8,11,17,0.08), rgba(8,11,17,0.58)),
            radial-gradient(circle at 24% 18%, rgba(226,201,126,0.22), transparent 38%);
        }
        .upload-frame-corners span {
          position: absolute;
          width: 18px;
          height: 18px;
          border-color: var(--gold-light);
          opacity: 0.72;
        }
        .upload-frame-corners span:nth-child(1) { left: 12px; top: 12px; border-left: 1px solid; border-top: 1px solid; }
        .upload-frame-corners span:nth-child(2) { right: 12px; top: 12px; border-right: 1px solid; border-top: 1px solid; }
        .upload-frame-corners span:nth-child(3) { left: 12px; bottom: 12px; border-left: 1px solid; border-bottom: 1px solid; }
        .upload-frame-corners span:nth-child(4) { right: 12px; bottom: 12px; border-right: 1px solid; border-bottom: 1px solid; }
        .upload-graphic:hover .upload-photo img {
          transform: scale(1.09);
        }
        .upload-arrow {
          position: absolute;
          right: 28px;
          top: 38px;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid rgba(226,201,126,0.24);
          display: grid;
          place-items: center;
          animation: floatParticle 4s ease-in-out infinite;
        }
        .upload-arrow span {
          width: 14px;
          height: 14px;
          border-top: 2px solid var(--gold-light);
          border-left: 2px solid var(--gold-light);
          transform: rotate(45deg);
          margin-top: 8px;
        }
        .style-board {
          position: absolute;
          left: 24px;
          top: 24px;
          display: grid;
          grid-template-columns: repeat(2, 42px);
          gap: 8px;
        }
        .style-board span {
          height: 34px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 10px 18px rgba(0,0,0,0.22);
        }
        .style-slider {
          position: absolute;
          right: 24px;
          top: 34px;
          width: 88px;
          height: 5px;
          border-radius: 999px;
          background: rgba(226,201,126,0.15);
        }
        .style-slider span {
          position: absolute;
          top: 50%;
          left: 58%;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--gold-light);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 18px rgba(226,201,126,0.62);
        }
        .style-stack {
          position: absolute;
          right: 24px;
          bottom: 24px;
          display: grid;
          gap: 7px;
        }
        .style-stack div {
          width: 102px;
          height: 8px;
          border-radius: 999px;
          background: rgba(226,201,126,0.18);
        }
        .style-stack div:nth-child(2) { width: 78px; }
        .style-stack div:nth-child(3) { width: 92px; }
        .render-window {
          position: absolute;
          inset: 16px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(226,201,126,0.18);
        }
        .render-window img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.88) contrast(1.08);
        }
        .render-window-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8,11,17,0.08), rgba(8,11,17,0.58));
        }
        .render-hotspot {
          position: absolute;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          border: 1px solid var(--gold-light);
          background: rgba(226,201,126,0.16);
          box-shadow: 0 0 16px rgba(226,201,126,0.7);
          animation: pulseGlow 2.4s ease-in-out infinite;
        }
        .render-hotspot.one { left: 32%; top: 42%; }
        .render-hotspot.two { right: 24%; top: 30%; animation-delay: 0.7s; }
        .render-chip {
          position: absolute;
          right: 24px;
          bottom: 24px;
          padding: 6px 9px;
          border-radius: 999px;
          border: 1px solid rgba(226,201,126,0.28);
          background: rgba(8,11,17,0.72);
          color: var(--gold-light);
          font-size: 10px;
          letter-spacing: 0.16em;
          z-index: 2;
        }
        .stats-grid {
          padding: 52px 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat-card {
          text-align: center;
          padding: 24px;
          border-right: 1px solid rgba(201,168,76,0.1);
        }
        .stat-card:last-child { border-right: none; }
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
        .tech-section { padding: 0 24px 48px; background: var(--charcoal-deep); }
        .tech-panel {
          background: var(--charcoal-mid);
          border-radius: 14px;
          padding: 56px 52px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          border: 1px solid rgba(201,168,76,0.1);
        }
        .section-title {
          font-size: 42px;
          font-weight: 300;
          color: #ddd3bb;
          line-height: 1.15;
          margin-bottom: 22px;
        }
        .tag-row { margin-top: 32px; display: flex; gap: 16px; flex-wrap: wrap; }
        .tag {
          border: 1px solid rgba(201,168,76,0.25);
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 3px;
        }
        .render-card {
          background: var(--charcoal-deep);
          border-radius: 10px;
          border: 1px solid rgba(201,168,76,0.15);
          padding: 24px;
          position: relative;
          overflow: hidden;
        }
        .render-preview {
          height: 160px;
          background: linear-gradient(135deg, #1e1a10 0%, #2a200e 40%, #1a1510 70%, #0f0e0c 100%);
          border-radius: 6px;
          margin-bottom: 16px;
          position: relative;
          overflow: hidden;
        }
        .render-preview::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent),
            radial-gradient(circle at 68% 30%, rgba(226,201,126,0.18), transparent 28%);
          transform: translateX(-130%);
          animation: renderSweep 4.6s ease-in-out infinite;
        }
        .render-scan {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          top: 25%;
          background: linear-gradient(90deg, transparent, rgba(226,201,126,0.75), transparent);
          animation: scan 3.2s ease-in-out infinite;
        }
        .floating-accent {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 56px;
          height: 56px;
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--charcoal-mid);
          color: var(--gold);
          font-size: 20px;
        }
        .design-console {
          position: relative;
          min-height: 390px;
        }
        .console-shell {
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid rgba(201,168,76,0.22);
          background:
            linear-gradient(150deg, rgba(12,15,22,0.96), rgba(20,24,32,0.88)),
            radial-gradient(circle at 20% 0%, rgba(226,201,126,0.12), transparent 42%);
          box-shadow: 0 28px 70px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
          padding: 14px;
        }
        .console-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 4px 14px;
          color: var(--text-muted);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .console-dots { display: flex; gap: 7px; }
        .console-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(201,168,76,0.45);
        }
        .design-preview {
          position: relative;
          min-height: 220px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(201,168,76,0.14);
          background: #10131a;
        }
        .design-preview img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.9) contrast(1.05);
          transform: scale(1.02);
          transition: transform 0.8s ease, filter 0.5s ease;
        }
        .console-shell:hover .design-preview img {
          transform: scale(1.08);
          filter: saturate(1.06) contrast(1.08);
        }
        .preview-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(9,11,16,0.1), rgba(9,11,16,0.72)),
            radial-gradient(circle at 72% 26%, rgba(226,201,126,0.25), transparent 34%);
        }
        .ai-scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(226,201,126,0.22) 48%, transparent 62%);
          transform: translateX(-120%);
          animation: renderSweep 4.8s ease-in-out infinite;
        }
        .plan-lines {
          position: absolute;
          inset: 22px;
          border: 1px solid rgba(226,201,126,0.28);
          border-radius: 6px;
          opacity: 0.85;
        }
        .plan-lines::before,
        .plan-lines::after {
          content: '';
          position: absolute;
          background: rgba(226,201,126,0.3);
        }
        .plan-lines::before { left: 34%; top: 0; bottom: 0; width: 1px; }
        .plan-lines::after { left: 34%; right: 0; top: 48%; height: 1px; }
        .console-badge {
          position: absolute;
          left: 18px;
          bottom: 18px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(226,201,126,0.24);
          background: rgba(9,11,16,0.68);
          backdrop-filter: blur(10px);
          color: var(--gold-light);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .console-bottom {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 18px;
          padding-top: 16px;
          align-items: center;
        }
        .insight-list { display: grid; gap: 10px; }
        .insight-row {
          display: grid;
          grid-template-columns: 120px 1fr 38px;
          gap: 10px;
          align-items: center;
          color: var(--text-muted);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .insight-track {
          height: 4px;
          border-radius: 999px;
          background: rgba(201,168,76,0.12);
          overflow: hidden;
        }
        .insight-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          box-shadow: 0 0 14px rgba(226,201,126,0.38);
        }
        .swatch-row { display: flex; gap: 8px; }
        .material-swatch {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 8px 16px rgba(0,0,0,0.24);
        }
        .floating-chip {
          position: absolute;
          right: -18px;
          top: 42px;
          padding: 12px 14px;
          border: 1px solid rgba(226,201,126,0.22);
          border-radius: 8px;
          background: rgba(15,18,25,0.86);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 38px rgba(0,0,0,0.32);
          color: var(--text-soft);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .floating-score {
          position: absolute;
          left: -22px;
          bottom: 72px;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: 1px solid rgba(226,201,126,0.28);
          background: radial-gradient(circle, rgba(226,201,126,0.16), rgba(15,18,25,0.92) 68%);
          color: var(--gold-light);
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          box-shadow: 0 20px 42px rgba(0,0,0,0.34);
        }
        .gallery-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 28px;
        }
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .gallery-card {
          border: 1px solid rgba(201, 168, 76, 0.12);
          overflow: hidden;
          cursor: pointer;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 18px;
          position: relative;
          background: #141820;
          transition: border-color 0.3s;
        }
        .gallery-card::before {
          content: '';
          position: absolute;
          inset: -40%;
          background: conic-gradient(from 180deg, transparent, rgba(226,201,126,0.16), transparent 34%);
          animation: slowSpin 9s linear infinite;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .gallery-card:hover { border-color: rgba(201, 168, 76, 0.4); }
        .gallery-card:hover::before { opacity: 1; }
        .gallery-card:hover .gallery-label { color: var(--gold-light); }
        .gallery-card:hover .gallery-image { transform: scale(1.08); filter: saturate(1) contrast(1.06); }
        .gallery-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.72;
          filter: saturate(0.78) contrast(1.02);
          transform: scale(1.01);
          transition: transform 0.8s ease, filter 0.5s ease, opacity 0.5s ease;
        }
        .gallery-card:hover .gallery-image { opacity: 0.88; }
        .gallery-shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(8,11,17,0.18) 0%, rgba(8,11,17,0.35) 45%, rgba(8,11,17,0.86) 100%),
            radial-gradient(ellipse at 70% 18%, rgba(201,168,76,0.16), transparent 45%);
          pointer-events: none;
          z-index: 1;
        }
        .gallery-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }
        .gallery-label {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: color 0.3s;
          position: relative;
          z-index: 3;
          text-shadow: 0 2px 12px rgba(0,0,0,0.85);
        }
        .cta-section {
          background: linear-gradient(135deg, var(--charcoal-mid) 0%, rgba(201,168,76,0.06) 50%, var(--charcoal-mid) 100%);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 14px;
          padding: 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(226,201,126,0.75);
          box-shadow: 0 0 14px rgba(226,201,126,0.8);
          animation: floatParticle 6s ease-in-out infinite;
        }
        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
          pointer-events: none;
          animation: breathe 5s ease-in-out infinite;
        }
        .footer {
          padding: 24px 40px 28px;
          border-top: 1px solid rgba(201,168,76,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }
        .footer-links { display: flex; gap: 28px; }
        .footer-link {
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          cursor: pointer;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--gold); }

        @keyframes sweep {
          0%, 18% { transform: translateX(-120%); opacity: 0; }
          35% { opacity: 1; }
          62%, 100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0.25; }
          50% { transform: translateY(105px); opacity: 0.9; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 8px var(--gold); }
          50% { transform: scale(1.35); box-shadow: 0 0 18px var(--gold); }
        }
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
        @keyframes titleSheen {
          0%, 35% { background-position: 0% 50%; }
          65%, 100% { background-position: 100% 50%; }
        }
        @keyframes slowSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes renderSweep {
          0%, 35% { transform: translateX(-130%); opacity: 0; }
          55% { opacity: 1; }
          80%, 100% { transform: translateX(130%); opacity: 0; }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(0.8); opacity: 0.2; }
          45% { transform: translateY(-26px) scale(1.2); opacity: 0.9; }
          70% { opacity: 0.45; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
        @media (max-width: 860px) {
          .page-shell { padding: 12px; }
          .main-card { height: 94vh; border-radius: 14px; }
          .top-nav { padding: 18px 20px; gap: 16px; }
          .nav-links { gap: 16px; overflow-x: auto; }
          .hero-panel { min-height: 500px; }
          .hero-content { padding: 44px 26px 90px; justify-content: flex-end; }
          .live-badge { left: 24px; right: auto; }
          .feature-grid, .gallery-grid, .tech-panel, .stats-grid, .style-lab, .process-grid { grid-template-columns: 1fr; }
          .style-copy { padding: 26px 22px; }
          .style-preview { min-height: 420px; }
          .style-overlay-content { inset: auto 20px 22px; }
          .process-section { padding: 0 24px 40px; }
          .process-panel { padding: 28px 22px; }
          .process-head { align-items: flex-start; flex-direction: column; }
          .process-grid::before { display: none; }
          .process-card { min-height: 300px; }
          .process-flow-arrow { right: 18px; top: auto; bottom: -18px; transform: rotate(90deg); }
          .tech-panel { padding: 36px 24px; gap: 32px; }
          .design-console { min-height: auto; padding-top: 18px; }
          .floating-chip { right: 12px; top: -8px; }
          .floating-score { left: 14px; bottom: -22px; width: 72px; height: 72px; font-size: 24px; }
          .console-bottom { grid-template-columns: 1fr; }
          .insight-row { grid-template-columns: 104px 1fr 38px; }
          .stat-card { border-right: none; border-bottom: 1px solid rgba(201,168,76,0.1); }
          .stat-card:last-child { border-bottom: none; }
          .gallery-head, .footer { align-items: flex-start; flex-direction: column; }
          .cta-section { padding: 44px 24px; }
        }
      `}</style>

      <div className="page-shell">
        <motion.main
          className="main-card"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: easeOut }}
        >
          {!prefersReducedMotion && (
            <>
              <motion.div className="ambient-grid" style={{ y: bgDrift }} />
              <motion.div
                className="cursor-glow"
                style={{
                  x: cursorGlowX,
                  y: cursorGlowY,
                }}
              />
            </>
          )}
          <div className="grain-overlay" />
          <div className="scroll-container" ref={scrollRef}>
            <motion.nav className="top-nav" style={{ boxShadow: navShadow, borderBottomColor: navBorder }}>
              <motion.div className="nav-links" variants={staggerGroup} initial="hidden" animate="show">
                {NAV_LINKS.map((link) => (
                  <motion.span
                    key={link}
                    variants={riseIn}
                    className={`nav-link${activeNav === link ? " active" : ""}`}
                    onClick={() => setActiveNav(link)}
                  >
                    {link}
                  </motion.span>
                ))}
              </motion.div>
              <motion.button
                className="try-btn"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.55, delay: 0.45, ease: easeOut }}
              >
                Try Now
              </motion.button>
            </motion.nav>

            <section className="hero-wrap">
              <div className="hero-panel">
                <motion.div
                  className="hero-bg"
                  style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: easeOut }}
                />
                {!prefersReducedMotion && <div className="hero-sweep" />}
                <motion.div className="arch-light" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, delay: 0.35, ease: easeOut }} />
                <motion.div className="fireplace-glow" animate={prefersReducedMotion ? {} : { opacity: [0.45, 0.9, 0.45], scale: [0.96, 1.08, 0.96] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} />
                {!prefersReducedMotion && <div className="orbital-ring" />}
                <div className="hero-overlay" />
                <div className="hero-gradient" />
                {[18, 22].map((left, i) => (
                  <motion.div
                    key={left}
                    className="vertical-line"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 0.6, scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.12, ease: easeOut }}
                    style={{ left: `${left}%` }}
                  />
                ))}

                <motion.div className="hero-content" variants={staggerGroup} initial="hidden" animate="show">
                  <motion.div className="eyebrow" variants={riseIn}>AI-Powered Interior Design</motion.div>
                  <motion.h1 className="font-serif hero-title" variants={riseIn}>
                    INTERIO <span style={{ fontStyle: "italic", color: "var(--gold-light)" }}>AI</span>
                  </motion.h1>
                  <motion.p className="font-sans hero-subtitle" variants={riseIn}>Redefine Luxury Living.</motion.p>
                  <motion.div className="hero-actions" variants={riseIn}>
                    <motion.button className="try-btn" whileHover={{ y: -2, boxShadow: "0 0 34px rgba(226,201,126,0.32)" }} whileTap={{ scale: 0.97 }} style={{ borderRadius: "4px", padding: "10px 28px" }}>
                      Explore Spaces
                    </motion.button>
                    <motion.button className="text-btn" whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}>
                      Watch Demo <span className="animated-arrow">-&gt;</span>
                    </motion.button>
                  </motion.div>
                </motion.div>

                <motion.div className="live-badge" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85, ease: easeOut }}>
                  <div className="pulse-dot" />
                  <span className="font-sans" style={{ fontSize: "10px", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    AI Rendering Live
                  </span>
                </motion.div>
              </div>
            </section>

            <section className="section-pad">
              <div className="feature-grid">
                {FEATURES.map((feature, i) => (
                  <motion.article
                    key={feature.title}
                    className="feature-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: easeOut }}
                  >
                    <div className="feature-inner">
                      <motion.div whileHover={{ rotate: -3, scale: 1.06 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}>
                        <FeatureIcon type={feature.icon} />
                      </motion.div>
                      <h3 className="font-serif feature-title">{feature.title}</h3>
                      <p className="font-sans muted-copy">{feature.desc}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="section-pad" style={{ paddingTop: 0 }}>
              <FadeInSection>
                <div className="style-lab">
                  <div className="style-copy">
                    <div className="eyebrow">Style Intelligence</div>
                    <h2 className="font-serif section-title" style={{ fontSize: "38px" }}>
                      Choose a mood. <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Watch it adapt.</em>
                    </h2>
                    <p className="font-sans muted-copy" style={{ fontSize: "14px", lineHeight: 1.85, position: "relative", zIndex: 1 }}>
                      Preview how Interio AI interprets different aesthetics before committing to a full room concept.
                    </p>
                    <div className="style-controls">
                      {STYLE_PRESETS.map((style) => (
                        <motion.button
                          key={style.name}
                          type="button"
                          className={`style-chip${activeStyle.name === style.name ? " active" : ""}`}
                          onClick={() => setActiveStyle(style)}
                          onMouseEnter={() => setActiveStyle(style)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {style.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    className="style-preview"
                    key={activeStyle.name}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                  >
                    <img src={activeStyle.image} alt={`${activeStyle.name} interior style preview`} loading="lazy" />
                    {!prefersReducedMotion && <div className="hero-sweep" />}
                    <div className="style-overlay-content">
                      <div className="eyebrow" style={{ marginBottom: "10px" }}>{activeStyle.name} Mode</div>
                      <div className="prompt-box font-sans">{activeStyle.prompt}</div>
                      <div className="palette-row">
                        {activeStyle.palette.map((color) => (
                          <span key={color} className="palette-dot" style={{ background: color }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </FadeInSection>
            </section>

            <div style={{ padding: "0 24px" }}>
              <div className="gold-divider" />
            </div>

            <FadeInSection delay={0.1}>
              <section className="stats-grid">
                {STATS.map((stat, i) => <AnimatedStat key={stat.label} {...stat} index={i} />)}
              </section>
            </FadeInSection>

            <section className="tech-section">
              <div className="tech-panel">
                <FadeInSection>
                  <div className="eyebrow">The Technology</div>
                  <h2 className="font-serif section-title">
                    Precision <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Interface</em>
                  </h2>
                  <p className="font-sans muted-copy" style={{ maxWidth: "390px", fontSize: "14px", lineHeight: 1.85 }}>
                    Walk through your future space before it is built. AI-driven rendering meets architectural precision - every sightline, shadow, and surface calibrated to perfection.
                  </p>
                  <div className="tag-row">
                    {["Photorealistic", "Real-time", "Customizable"].map((tag) => <span key={tag} className="font-sans tag">{tag}</span>)}
                  </div>
                </FadeInSection>

                <FadeInSection delay={0.15}>
                  <div className="design-console">
                    <motion.div
                      className="console-shell"
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    >
                      <div className="console-bar">
                        <div className="console-dots">
                          <span className="console-dot" />
                          <span className="console-dot" style={{ opacity: 0.65 }} />
                          <span className="console-dot" style={{ opacity: 0.35 }} />
                        </div>
                        <span>Interio Vision Engine</span>
                      </div>

                      <div className="design-preview">
                        <img
                          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                          alt="AI interior design preview"
                          loading="lazy"
                        />
                        <div className="preview-overlay" />
                        <div className="plan-lines" />
                        {!prefersReducedMotion && <div className="ai-scanline" />}
                        <motion.div
                          className="console-badge"
                          animate={prefersReducedMotion ? {} : { opacity: [0.74, 1, 0.74] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          Scene Optimized
                        </motion.div>
                      </div>

                      <div className="console-bottom">
                        <div className="insight-list">
                          {DESIGN_INSIGHTS.map((item, i) => (
                            <div className="insight-row" key={item.label}>
                              <span>{item.label}</span>
                              <div className="insight-track">
                                <motion.div
                                  className="insight-fill"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: item.value }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: easeOut }}
                                />
                              </div>
                              <span>{item.value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="swatch-row">
                          {MATERIAL_SWATCHES.map((swatch, i) => (
                            <motion.span
                              key={swatch.name}
                              className="material-swatch"
                              title={swatch.name}
                              style={{ background: swatch.color }}
                              initial={{ opacity: 0, scale: 0.6 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.35, delay: 0.35 + i * 0.08, ease: easeOut }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="floating-chip"
                      animate={prefersReducedMotion ? {} : { y: [-5, 5, -5] }}
                      transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      3D Layout Sync
                    </motion.div>
                    <motion.div
                      className="floating-score"
                      animate={prefersReducedMotion ? {} : { scale: [0.96, 1.04, 0.96] }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      97
                    </motion.div>
                  </div>
                </FadeInSection>
              </div>
            </section>

            <section className="process-section">
              <FadeInSection>
                <div className="process-panel">
                  <div className="process-head">
                    <div>
                      <div className="eyebrow" style={{ marginBottom: "10px" }}>How It Works</div>
                      <h2 className="font-serif" style={{ fontSize: "36px", fontWeight: 300, color: "#ddd3bb" }}>
                        From room to render in three steps.
                      </h2>
                    </div>
                    <p className="font-sans muted-copy" style={{ maxWidth: "320px", fontSize: "13px", lineHeight: 1.7 }}>
                      A simple flow for homeowners, studios, and designers who need fast visual direction.
                    </p>
                  </div>

                  <div className="process-grid">
                    {PROCESS_STEPS.map((item, i) => (
                      <motion.article
                        className="process-card"
                        key={item.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.45, delay: i * 0.09, ease: easeOut }}
                      >
                        <div className="process-step">{item.step}</div>
                        <ProcessGraphic type={item.type} />
                        <h3 className="font-serif process-title">{item.title}</h3>
                        <p className="font-sans muted-copy" style={{ marginTop: "10px" }}>{item.desc}</p>
                        {i < PROCESS_STEPS.length - 1 && (
                          <motion.div
                            className="process-flow-arrow"
                            animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                            aria-hidden="true"
                          >
                            -&gt;
                          </motion.div>
                        )}
                      </motion.article>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </section>

            <section className="section-pad" style={{ paddingTop: 0, paddingBottom: "48px" }}>
              <FadeInSection>
                <div className="gallery-head">
                  <div>
                    <div className="eyebrow" style={{ marginBottom: "10px" }}>Curated Collection</div>
                    <h2 className="font-serif" style={{ fontSize: "36px", fontWeight: 300, color: "#ddd3bb" }}>The Gallery</h2>
                  </div>
                  <span className="font-sans text-link" style={{ fontSize: "11px", color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", borderBottom: "1px solid rgba(201,168,76,0.3)", paddingBottom: "2px" }}>
                    View All <span className="animated-arrow">-&gt;</span>
                  </span>
                </div>

                <div className="gallery-grid">
                  {GALLERY_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="gallery-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      whileHover={{ scale: 1.015, y: -4 }}
                      transition={{ duration: 0.45, delay: i * 0.06, ease: easeOut }}
                      style={{
                        height: i < 3 ? "180px" : "130px",
                      }}
                    >
                      <img className="gallery-image" src={item.image} alt={`${item.label} interior design`} style={{ objectPosition: item.position }} loading="lazy" />
                      <div className="gallery-shade" />
                      <motion.div
                        className="gallery-glow"
                        animate={prefersReducedMotion ? {} : { opacity: [0.45, 0.8, 0.45] }}
                        transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ background: `radial-gradient(ellipse at ${i % 2 === 0 ? "80%" : "20%"} 30%, rgba(201,168,76,0.08) 0%, transparent 60%)` }}
                      />
                      <span className="font-sans gallery-label">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeInSection>
            </section>

            <section style={{ padding: "0 24px 48px" }}>
              <FadeInSection delay={0.05}>
                <div className="cta-section">
                  <motion.div className="cta-glow" style={{ scale: ctaGlowScale }} />
                  {!prefersReducedMotion && [12, 28, 44, 70, 86].map((left, i) => (
                    <span
                      key={left}
                      className="cta-particle"
                      style={{
                        left: `${left}%`,
                        top: `${i % 2 === 0 ? 72 : 28}%`,
                        animationDelay: `${i * 0.65}s`,
                      }}
                    />
                  ))}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <p className="eyebrow">Begin Your Journey</p>
                    <h2 className="font-serif" style={{ fontSize: "48px", fontWeight: 300, color: "#e2d8c4", marginBottom: "18px", lineHeight: 1.1 }}>
                      Your Space. <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Perfected.</em>
                    </h2>
                    <p className="font-sans muted-copy" style={{ fontSize: "14px", maxWidth: "440px", margin: "0 auto 36px", lineHeight: 1.8 }}>
                      Experience the future of interior design - where artificial intelligence meets timeless craftsmanship.
                    </p>
                    <motion.button className="try-btn" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} style={{ borderRadius: "4px", padding: "13px 40px", fontSize: "12px" }}>
                      Start Designing Free
                    </motion.button>
                  </div>
                </div>
              </FadeInSection>
            </section>

            <footer className="footer">
              <span className="font-serif" style={{ fontSize: "18px", color: "var(--gold)", fontWeight: 300, letterSpacing: "0.05em" }}>
                Interio AI
              </span>
              <div className="footer-links">
                {["Privacy", "Terms", "Careers"].map((link) => <span key={link} className="font-sans footer-link">{link}</span>)}
              </div>
              <div className="footer-links">
                {["X", "in", "o"].map((icon) => <span key={icon} className="footer-link">{icon}</span>)}
              </div>
            </footer>
          </div>
        </motion.main>
      </div>
    </>
  );
}
