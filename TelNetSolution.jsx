import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Services", "Projects", "Process", "Contact"];

const SERVICES = [
  {
    icon: "🔗",
    title: "LAN Networking",
    desc: "End-to-end local area network design, installation, and management tailored for enterprise environments.",
    tag: "Infrastructure",
  },
  {
    icon: "⚡",
    title: "Fiber Optic Installation",
    desc: "High-speed fiber optic cabling solutions delivering unmatched bandwidth and signal integrity.",
    tag: "Connectivity",
  },
  {
    icon: "📷",
    title: "CCTV Surveillance",
    desc: "IP-based intelligent surveillance systems with remote monitoring and analytics capabilities.",
    tag: "Security",
  },
  {
    icon: "📡",
    title: "Wireless Solutions",
    desc: "Enterprise-grade Wi-Fi infrastructure with seamless roaming and centralized management.",
    tag: "Wireless",
  },
  {
    icon: "🖥",
    title: "Server Management",
    desc: "24/7 server provisioning, virtualization, and proactive monitoring for maximum uptime.",
    tag: "Cloud & Servers",
  },
  {
    icon: "🏗",
    title: "IT Infrastructure",
    desc: "Complete data center and office IT buildouts engineered for scalability and performance.",
    tag: "Enterprise",
  },
];

const PROJECTS = [
  {
    title: "Corporate HQ Network",
    client: "Financial Services Firm",
    detail: "8-floor structured cabling + fiber backbone",
    metric: "99.99% uptime",
    color: "#0a1628",
    light: "#e8f0fe",
  },
  {
    title: "Campus Surveillance Grid",
    client: "University Campus",
    detail: "400+ IP cameras, centralized NOC",
    metric: "400 cameras",
    color: "#0d2137",
    light: "#e0f2fe",
  },
  {
    title: "Retail Chain WAN",
    client: "National Retail Brand",
    detail: "45 branches connected via MPLS + SD-WAN",
    metric: "45 locations",
    color: "#0f1f3d",
    light: "#ede9fe",
  },
  {
    title: "Hospital IT Buildout",
    client: "Multi-Specialty Hospital",
    detail: "Zero-downtime server migration + fiber",
    metric: "Zero downtime",
    color: "#0c2340",
    light: "#f0fdf4",
  },
];

const PROCESS = [
  { num: "01", title: "Consultation", desc: "We begin with a thorough site assessment and requirements gathering to understand your exact needs." },
  { num: "02", title: "Planning", desc: "Our engineers design a precise network blueprint with full bill of materials and project timeline." },
  { num: "03", title: "Installation", desc: "Certified technicians execute the project with minimal disruption to your ongoing operations." },
  { num: "04", title: "Testing", desc: "Rigorous performance validation, load testing, and documentation before handover." },
  { num: "05", title: "Support", desc: "Ongoing SLA-backed support, remote monitoring, and preventive maintenance programs." },
];

const BENEFITS = [
  { title: "Reliable Connectivity", stat: "99.99%", unit: "Uptime SLA", desc: "Our infrastructure guarantees near-zero downtime through redundancy and proactive monitoring." },
  { title: "Scalable Infrastructure", stat: "10x", unit: "Growth Ready", desc: "Architected to scale seamlessly as your business expands across floors, campuses, or cities." },
  { title: "Reduced Downtime", stat: "<2min", unit: "MTTR Average", desc: "Rapid incident response with our round-the-clock NOC and field support teams." },
  { title: "Secure Networking", stat: "Zero", unit: "Breaches", desc: "Enterprise-grade firewalls, VLANs, and encrypted tunnels protecting every layer of your network." },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function TelNetSolution() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#ffffff", color: "#0a1628", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f8f8f8; }
        ::-webkit-scrollbar-thumb { background: #c5d0e8; border-radius: 4px; }

        .nav-link {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4a5568;
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 4px 0;
          text-decoration: none;
        }
        .nav-link:hover { color: #0a1628; }

        .cta-primary {
          background: #0a1628;
          color: #ffffff;
          border: none;
          padding: 14px 32px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s;
          border-radius: 2px;
        }
        .cta-primary:hover { background: #1a3a6b; transform: translateY(-1px); }

        .cta-outline {
          background: transparent;
          color: #0a1628;
          border: 1px solid #0a1628;
          padding: 13px 32px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
          border-radius: 2px;
        }
        .cta-outline:hover { background: #0a1628; color: #ffffff; }

        .service-card {
          padding: 40px 36px;
          border: 1px solid #e8edf5;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          cursor: default;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #1a3a6b, #3b7bd4);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .service-card:hover { border-color: #c5d0e8; transform: translateY(-4px); box-shadow: 0 20px 60px rgba(10,22,40,0.08); }
        .service-card:hover::before { transform: scaleX(1); }

        .project-card {
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .project-card:hover { transform: translateY(-6px); }
        .project-card:hover .project-overlay { opacity: 1; }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,22,40,0.85);
          opacity: 0;
          transition: opacity 0.35s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
        }

        .process-step {
          display: flex;
          gap: 32px;
          padding: 40px 0;
          border-bottom: 1px solid #e8edf5;
          transition: padding 0.3s;
        }
        .process-step:last-child { border-bottom: none; }

        .benefit-card {
          padding: 48px 36px;
          background: #f7f9fc;
          transition: background 0.3s, transform 0.3s;
        }
        .benefit-card:hover { background: #f0f4fb; transform: translateY(-3px); }

        .form-input {
          width: 100%;
          padding: 14px 0;
          border: none;
          border-bottom: 1px solid #c5d0e8;
          font-size: 15px;
          font-family: inherit;
          color: #0a1628;
          background: transparent;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus { border-color: #1a3a6b; }
        .form-input::placeholder { color: #a0aec0; }

        .whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #25D366;
          color: #ffffff;
          padding: 14px 28px;
          border-radius: 2px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.25s, transform 0.2s;
          border: none;
          cursor: pointer;
        }
        .whatsapp-btn:hover { background: #1da851; transform: translateY(-1px); }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3b7bd4;
          margin-bottom: 16px;
          display: block;
        }

        .display-heading {
          font-family: 'DM Serif Display', Georgia, serif;
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #0a1628;
        }

        .stat-number {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 52px;
          color: #0a1628;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-line-1 { animation: heroIn 1s ease 0.1s both; }
        .hero-line-2 { animation: heroIn 1s ease 0.3s both; }
        .hero-line-3 { animation: heroIn 1s ease 0.5s both; }
        .hero-btns { animation: heroIn 1s ease 0.7s both; }
        .hero-stats { animation: heroIn 1s ease 0.9s both; }

        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .hero-line-accent {
          height: 1px;
          background: #3b7bd4;
          transform-origin: left;
          animation: lineGrow 1.4s ease 1.2s both;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .scroll-indicator {
          animation: float 2.5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .benefits-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .mobile-menu { display: flex !important; }
          .desktop-nav { display: none !important; }
          .hero-heading { font-size: clamp(36px, 8vw, 72px) !important; }
        }

        .tag-pill {
          display: inline-block;
          padding: 4px 12px;
          background: #eef2fb;
          color: #3b7bd4;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-radius: 100px;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%",
        height: "72px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #e8edf5" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: "#0a1628",
            display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="7" width="12" height="2" fill="#3b7bd4" rx="1"/>
              <rect x="2" y="2" width="5" height="5" fill="#ffffff" rx="1"/>
              <rect x="9" y="2" width="5" height="5" fill="#ffffff" rx="1"/>
              <rect x="5.5" y="11" width="5" height="3" fill="#3b7bd4" rx="1"/>
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", color: "#0a1628", textTransform: "uppercase" }}>
            TEL NET <span style={{ color: "#3b7bd4" }}>SOLUTION</span>
          </span>
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button key={link} className="nav-link" onClick={() => scrollTo(link.toLowerCase())}>
              {link}
            </button>
          ))}
          <button className="cta-primary" style={{ padding: "10px 24px", fontSize: 12 }} onClick={() => scrollTo("contact")}>
            Get a Quote
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}
          className="mobile-menu"
        >
          <div style={{ width: 22, height: 14, position: "relative" }}>
            <span style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 1.5, background: "#0a1628", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }}/>
            <span style={{ position: "absolute", top: 6, left: 0, width: "100%", height: 1.5, background: "#0a1628", opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }}/>
            <span style={{ position: "absolute", top: 12, left: 0, width: "100%", height: 1.5, background: "#0a1628", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }}/>
          </div>
        </button>

        {menuOpen && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "#ffffff", borderBottom: "1px solid #e8edf5",
            padding: "24px 5%", display: "flex", flexDirection: "column", gap: 24,
          }}>
            {NAV_LINKS.map(link => (
              <button key={link} className="nav-link" style={{ textAlign: "left", fontSize: 16 }} onClick={() => scrollTo(link.toLowerCase())}>
                {link}
              </button>
            ))}
            <button className="cta-primary" style={{ width: "fit-content" }} onClick={() => scrollTo("contact")}>
              Get a Quote
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" style={{
        minHeight: "100vh", padding: "140px 8% 100px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: "#ffffff",
      }}>
        {/* Background grid lines */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "linear-gradient(#0a1628 1px, transparent 1px), linear-gradient(90deg, #0a1628 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}/>

        {/* Blue accent dot */}
        <div style={{
          position: "absolute", right: "8%", top: "25%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,123,212,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>

        <div style={{ maxWidth: 900, position: "relative" }}>
          <div className="hero-line-1">
            <span className="section-label">Enterprise Network Solutions · Since 2010</span>
          </div>

          <div className="hero-line-2">
            <div className="hero-line-accent" style={{ width: 48, marginBottom: 32 }}/>
          </div>

          <h1 className="display-heading hero-heading hero-line-2" style={{ fontSize: "clamp(48px, 6.5vw, 88px)", marginBottom: 32 }}>
            Reliable Networking<br />
            Solutions for{" "}
            <em style={{ fontStyle: "italic", color: "#3b7bd4" }}>Modern</em><br />
            Businesses
          </h1>

          <p className="hero-line-3" style={{
            fontSize: 18, lineHeight: 1.7, color: "#5a6a84",
            maxWidth: 540, marginBottom: 48, fontWeight: 300,
          }}>
            From fiber optic cabling to enterprise surveillance and server infrastructure — TEL NET SOLUTION builds the network your business depends on.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="cta-primary" onClick={() => scrollTo("contact")}>Start Your Project</button>
            <button className="cta-outline" onClick={() => scrollTo("services")}>View Services</button>
          </div>

          <div className="hero-stats hero-stats-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4, auto)",
            gap: 0, marginTop: 80, width: "fit-content",
          }}>
            {[
              { stat: "500+", label: "Projects Delivered" },
              { stat: "99.9%", label: "Client Satisfaction" },
              { stat: "14+", label: "Years Experience" },
              { stat: "50+", label: "Enterprise Clients" },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "28px 40px 28px 0",
                borderRight: i < 3 ? "1px solid #e8edf5" : "none",
                marginRight: i < 3 ? 40 : 0,
              }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#0a1628", fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.02em" }}>{item.stat}</div>
                <div style={{ fontSize: 12, color: "#8a9bb8", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 4, fontWeight: 500 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" style={{
          position: "absolute", bottom: 40, left: "8%",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #3b7bd4)", margin: "0 auto" }}/>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a9bb8", fontWeight: 500 }}>Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "120px 8%", background: "#f7f9fc" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px 100px", alignItems: "center" }}>
          <FadeIn>
            <span className="section-label">About Us</span>
            <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", marginBottom: 28 }}>
              Engineering the backbone of modern enterprise
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "#5a6a84", marginBottom: 24, fontWeight: 300 }}>
              Founded in 2010, TEL NET SOLUTION has grown from a regional cabling contractor into one of the most trusted IT infrastructure partners for enterprises across India. We combine deep technical expertise with a consultative approach that prioritises your business outcomes.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "#5a6a84", marginBottom: 40, fontWeight: 300 }}>
              Our team of certified network engineers, fiber splicing technicians, and security specialists deliver solutions built not just for today, but for the next decade of growth.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <button className="cta-primary" onClick={() => scrollTo("contact")}>Work with Us</button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#e8edf5" }}>
              {[
                { title: "Certified Engineers", icon: "🎓", desc: "CCNA, CompTIA, and vendor-certified team members" },
                { title: "Nationwide Coverage", icon: "🗺", desc: "Active project delivery across 12 major cities" },
                { title: "Rapid Deployment", icon: "⚡", desc: "From signed contract to live network in days" },
                { title: "SLA Guaranteed", icon: "🛡", desc: "Contractual uptime commitments with penalty clauses" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#ffffff", padding: "36px 28px" }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{item.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0a1628", marginBottom: 8, lineHeight: 1.4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#8a9bb8", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "120px 8%", background: "#ffffff" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="section-label">Core Services</span>
            <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", marginBottom: 20 }}>
              What we build for you
            </h2>
            <p style={{ fontSize: 16, color: "#8a9bb8", maxWidth: 480, margin: "0 auto", fontWeight: 300, lineHeight: 1.7 }}>
              Six specialized disciplines. One integrated partner.
            </p>
          </div>
        </FadeIn>

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#e8edf5" }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="service-card" style={{ height: "100%" }}>
                <span className="tag-pill" style={{ marginBottom: 24, display: "inline-block" }}>{s.tag}</span>
                <div style={{ fontSize: 36, marginBottom: 20, lineHeight: 1 }}>{s.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#0a1628", marginBottom: 14, letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#6b7d99", fontWeight: 300 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "120px 8%", background: "#f7f9fc" }}>
        <FadeIn>
          <div style={{ marginBottom: 64 }}>
            <span className="section-label">Featured Projects</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
              <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 52px)" }}>
                Work that speaks<br />for itself
              </h2>
              <p style={{ fontSize: 15, color: "#8a9bb8", maxWidth: 280, fontWeight: 300, lineHeight: 1.7 }}>
                A selection of enterprise deployments across sectors.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="project-card">
                {/* Visual placeholder */}
                <div style={{
                  height: 280,
                  background: p.color,
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 32,
                }}>
                  {/* Network visualization */}
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 600 280">
                    <circle cx="100" cy="80" r="40" fill="none" stroke="#3b7bd4" strokeWidth="1"/>
                    <circle cx="300" cy="140" r="60" fill="none" stroke="#3b7bd4" strokeWidth="1"/>
                    <circle cx="500" cy="80" r="40" fill="none" stroke="#3b7bd4" strokeWidth="1"/>
                    <circle cx="200" cy="220" r="30" fill="none" stroke="#3b7bd4" strokeWidth="1"/>
                    <circle cx="420" cy="220" r="30" fill="none" stroke="#3b7bd4" strokeWidth="1"/>
                    <line x1="100" y1="80" x2="300" y2="140" stroke="#3b7bd4" strokeWidth="1"/>
                    <line x1="500" y1="80" x2="300" y2="140" stroke="#3b7bd4" strokeWidth="1"/>
                    <line x1="200" y1="220" x2="300" y2="140" stroke="#3b7bd4" strokeWidth="1"/>
                    <line x1="420" y1="220" x2="300" y2="140" stroke="#3b7bd4" strokeWidth="1"/>
                    <line x1="100" y1="80" x2="200" y2="220" stroke="#3b7bd4" strokeWidth="0.5" strokeDasharray="4,4"/>
                    <line x1="500" y1="80" x2="420" y2="220" stroke="#3b7bd4" strokeWidth="0.5" strokeDasharray="4,4"/>
                    <circle cx="100" cy="80" r="5" fill="#3b7bd4"/>
                    <circle cx="300" cy="140" r="8" fill="#3b7bd4"/>
                    <circle cx="500" cy="80" r="5" fill="#3b7bd4"/>
                    <circle cx="200" cy="220" r="5" fill="#3b7bd4"/>
                    <circle cx="420" cy="220" r="5" fill="#3b7bd4"/>
                  </svg>

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{
                      display: "inline-block",
                      padding: "5px 14px",
                      background: "rgba(59,123,212,0.3)",
                      color: "#a8c8f8",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                      borderRadius: 100,
                    }}>
                      {p.metric}
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 600, color: "#ffffff", lineHeight: 1.3 }}>{p.title}</h3>
                  </div>

                  <div className="project-overlay">
                    <div style={{ fontSize: 12, color: "#8ab4f8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{p.client}</div>
                    <div style={{ fontSize: 16, color: "#ffffff", fontWeight: 400, lineHeight: 1.5 }}>{p.detail}</div>
                  </div>
                </div>

                <div style={{ background: "#ffffff", padding: "24px 32px", borderBottom: "1px solid #e8edf5" }}>
                  <div style={{ fontSize: 12, color: "#8a9bb8", textTransform: "uppercase", letterSpacing: "0.12em" }}>{p.client}</div>
                  <div style={{ fontSize: 14, color: "#0a1628", marginTop: 4, fontWeight: 500 }}>{p.detail}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: "120px 8%", background: "#0a1628" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "80px 120px", alignItems: "start" }}>
          <FadeIn>
            <div style={{ position: "sticky", top: 120 }}>
              <span className="section-label" style={{ color: "#3b7bd4" }}>Our Process</span>
              <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", color: "#ffffff", marginBottom: 24 }}>
                Precision at every step
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "#8a9bb8", fontWeight: 300 }}>
                Our structured methodology ensures consistent results, transparent communication, and zero surprises from first consultation to final handover.
              </p>
            </div>
          </FadeIn>

          <div>
            {PROCESS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="process-step" style={{ borderBottomColor: "#1a2840" }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      width: 56, height: 56, border: "1px solid #1a3a6b",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 600, color: "#3b7bd4", letterSpacing: "0.05em",
                    }}>
                      {step.num}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: "#ffffff", marginBottom: 10, letterSpacing: "-0.01em" }}>{step.title}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: "#6b7d99", fontWeight: 300 }}>{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" style={{ padding: "120px 8%", background: "#ffffff" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="section-label">Business Benefits</span>
            <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", marginBottom: 20 }}>
              The business case for<br />better infrastructure
            </h2>
          </div>
        </FadeIn>

        <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "#e8edf5" }}>
          {BENEFITS.map((b, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="benefit-card" style={{ height: "100%" }}>
                <div className="stat-number" style={{ marginBottom: 4 }}>{b.stat}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#3b7bd4", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>{b.unit}</div>
                <div style={{ height: 1, background: "#dbe4f0", marginBottom: 20 }}/>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0a1628", marginBottom: 10 }}>{b.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#6b7d99", fontWeight: 300 }}>{b.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" style={{ padding: "120px 8%", background: "#f7f9fc" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span className="section-label">Get in Touch</span>
            <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 56px)", marginBottom: 20 }}>
              Let's build your network
            </h2>
            <p style={{ fontSize: 16, color: "#8a9bb8", maxWidth: 440, margin: "0 auto", fontWeight: 300, lineHeight: 1.7 }}>
              Tell us about your project. Our team will respond within one business day with a tailored proposal.
            </p>
          </div>
        </FadeIn>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px 120px", maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
                <div style={{ marginBottom: 40 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a9bb8" }}>Full Name</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div style={{ marginBottom: 40 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a9bb8" }}>Email Address</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: 40 }}>
                <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a9bb8" }}>Company Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Acme Corporation"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
              </div>
              <div style={{ marginBottom: 48 }}>
                <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a9bb8" }}>Tell us about your project</label>
                <textarea
                  className="form-input"
                  rows={5}
                  placeholder="Describe your networking needs, scale, and timeline..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  style={{ resize: "none", paddingTop: 16 }}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <button className="cta-primary" type="submit">
                  {formSent ? "✓ Message Sent" : "Send Message"}
                </button>
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20networking%20project%20with%20TEL%20NET%20SOLUTION"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
              {formSent && (
                <p style={{ marginTop: 16, fontSize: 14, color: "#25D366", fontWeight: 500 }}>
                  ✓ Your message has been received. We'll respond within one business day.
                </p>
              )}
            </form>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <div style={{ marginBottom: 48 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0a1628", marginBottom: 8 }}>Direct Contact</h3>
                <div style={{ height: 1, background: "#e8edf5", marginBottom: 32 }}/>
                {[
                  { label: "Phone", value: "+91 98765 43210", icon: "📞" },
                  { label: "Email", value: "info@telnetsolution.in", icon: "✉️" },
                  { label: "Office", value: "Hyderabad, Telangana, India", icon: "📍" },
                  { label: "Hours", value: "Mon–Sat, 9:00 AM – 7:00 PM", icon: "🕐" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28 }}>
                    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a9bb8", marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 15, color: "#0a1628", fontWeight: 400 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#0a1628", padding: "36px 32px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#3b7bd4", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Emergency Support</div>
                <p style={{ fontSize: 15, color: "#8a9bb8", lineHeight: 1.7, fontWeight: 300, marginBottom: 20 }}>
                  Network down? Our on-call engineers are available 24/7 for critical infrastructure emergencies.
                </p>
                <a
                  href="tel:+919876543210"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontSize: 13, fontWeight: 600, color: "#ffffff",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(59,123,212,0.5)",
                    paddingBottom: 2, transition: "border-color 0.2s",
                  }}
                >
                  Call Emergency Line →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060d1a", padding: "60px 8% 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 60 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, background: "#3b7bd4", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="7" width="12" height="2" fill="#ffffff" rx="1"/>
                  <rect x="2" y="2" width="5" height="5" fill="#ffffff" rx="1"/>
                  <rect x="9" y="2" width="5" height="5" fill="#ffffff" rx="1"/>
                </svg>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                TEL NET <span style={{ color: "#3b7bd4" }}>SOLUTION</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#4a5a70", lineHeight: 1.7, maxWidth: 260, fontWeight: 300 }}>
              Enterprise networking infrastructure, fiber optics, surveillance, and IT solutions since 2010.
            </p>
          </div>

          <div style={{ display: "flex", gap: 80, flexWrap: "wrap" }}>
            {[
              { heading: "Services", links: ["LAN Networking", "Fiber Optics", "CCTV Systems", "Wireless Solutions", "Server Management"] },
              { heading: "Company", links: ["About Us", "Projects", "Process", "Contact"] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a5a70", marginBottom: 20 }}>{col.heading}</div>
                {col.links.map(link => (
                  <div key={link} style={{ fontSize: 13, color: "#6b7d99", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#ffffff"}
                    onMouseLeave={e => e.target.style.color = "#6b7d99"}
                  >{link}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #111d2e", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 12, color: "#4a5a70" }}>
            © 2025 TEL NET SOLUTION. All rights reserved.
          </div>
          <div style={{ fontSize: 12, color: "#4a5a70" }}>
            Hyderabad, Telangana, India
          </div>
        </div>
      </footer>
    </div>
  );
}
