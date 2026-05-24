import { useState, useEffect, useRef, useCallback } from "react";
import {
  Network, Server, Shield, Wifi, Camera, Cable, Zap, Router,
  Building2, Wrench, Phone, Mail, MapPin, Menu, X, Sun, Moon,
  Star, ArrowRight, Users, Clock, Award, DollarSign, CheckCircle,
  MessageCircle, Globe, Cpu, Layers, ChevronRight, Lock, Settings,
  Activity, Database, MonitorPlay, GitBranch
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────────── */
const SERVICES = [
  { icon: Network, title: "LAN Networking", desc: "High-performance LAN design and deployment for seamless enterprise connectivity across every floor." },
  { icon: Cable, title: "Structured Cabling", desc: "CAT6/CAT6A cabling systems with professional cable management, labelling, and certified testing." },
  { icon: Zap, title: "Fiber Optic Networking", desc: "Ultra-fast single-mode and multi-mode fiber installations for long-distance, high-bandwidth backbones." },
  { icon: Camera, title: "CCTV Installation", desc: "IP camera systems with NVR storage, remote monitoring, and intelligent motion detection analytics." },
  { icon: Wifi, title: "WiFi Solutions", desc: "Enterprise wireless with seamless roaming, high-density AP deployment, and secure access control." },
  { icon: Server, title: "Server Installation", desc: "Physical rack setup, OS deployment, RAID configuration and full server commissioning." },
  { icon: Shield, title: "Network Security", desc: "Firewall setup, IDS/IPS, VPN, and end-to-end security hardening across your infrastructure." },
  { icon: Router, title: "Router & Switch Config", desc: "VLAN design, routing protocols, QoS, and managed switch configuration for optimized traffic." },
  { icon: Building2, title: "IT Infrastructure", desc: "Complete planning, design, and deployment of scalable IT infrastructure for modern enterprises." },
  { icon: Wrench, title: "Annual Maintenance", desc: "Proactive 24/7 AMC contracts with guaranteed SLAs, preventive care, and rapid response teams." },
];

const WHY_US = [
  { icon: Users, title: "Expert Engineers", desc: "Certified network professionals with 10+ years of enterprise-grade field experience." },
  { icon: Clock, title: "Fast Deployment", desc: "Agile delivery with minimal downtime. Most installations completed within 48 hours." },
  { icon: Award, title: "24/7 Support", desc: "Round-the-clock helpdesk with dedicated account managers and guaranteed response SLAs." },
  { icon: Building2, title: "Enterprise Grade", desc: "Cisco, Ubiquiti, Hikvision — we deploy only certified, industry-leading hardware and software." },
  { icon: DollarSign, title: "Competitive Pricing", desc: "Transparent, no-hidden-cost pricing models for SMBs and large enterprise clients alike." },
  { icon: CheckCircle, title: "Proven Track Record", desc: "500+ successful deployments across offices, hospitals, schools, and data centers nationwide." },
];

const PROJECTS = [
  { title: "Corporate Office LAN", category: "LAN + Structured Cabling", location: "Hyderabad", stat: "1,200-node enterprise LAN", color: "#00d4ff" },
  { title: "Multi-Site CCTV Network", category: "CCTV + Security", location: "Bengaluru", stat: "240-camera IP surveillance", color: "#0099ff" },
  { title: "Data Center Fiber Ring", category: "Fiber Optic", location: "Mumbai", stat: "40G fiber backbone", color: "#00e5c0" },
  { title: "University Campus WiFi", category: "Wireless Solutions", location: "Pune", stat: "60-AP seamless roaming", color: "#007bff" },
  { title: "Manufacturing Plant Cabling", category: "Structured Cabling", location: "Chennai", stat: "8,000m certified cabling", color: "#00b8ff" },
  { title: "Retail Chain SD-WAN", category: "WAN + Security", location: "Delhi NCR", stat: "50-branch unified network", color: "#0066cc" },
];

const INDUSTRIES = [
  { icon: Building2, name: "Corporate Offices" },
  { icon: Globe, name: "Schools & Universities" },
  { icon: Activity, name: "Hospitals" },
  { icon: Settings, name: "Factories" },
  { icon: Database, name: "Data Centers" },
  { icon: MonitorPlay, name: "Retail Stores" },
  { icon: Shield, name: "Government" },
  { icon: Layers, name: "Enterprises" },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar Sharma",
    role: "IT Director",
    company: "TechCorp India Pvt. Ltd.",
    text: "TEL NET SOLUTION transformed our entire office network infrastructure with zero downtime. Their engineers are exceptionally professional, and the post-deployment support has been outstanding. Highly recommended for any enterprise deployment.",
    rating: 5,
  },
  {
    name: "Dr. Anitha Reddy",
    role: "CTO",
    company: "MediCare Hospitals Group",
    text: "We trusted TEL NET with our hospital-wide CCTV and structured cabling across three floors. They delivered on schedule, within budget, and the quality is genuinely outstanding. Our operations team is very impressed.",
    rating: 5,
  },
  {
    name: "Mohammed Farhan",
    role: "Head of IT Operations",
    company: "GlobalRetail Chains",
    text: "Their fiber optic deployment across our distribution warehouses has dramatically improved our operations. The team is responsive, technically excellent, and their maintenance contract gives us real peace of mind.",
    rating: 5,
  },
];

const NAV_LINKS = ["Home", "About", "Services", "Why Us", "Projects", "Industries", "Testimonials", "Contact"];

/* ─── STYLES ─────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --accent: #00d4ff;
      --accent2: #0099e6;
      --transition: 0.3s cubic-bezier(0.4,0,0.2,1);
    }

    .tn-dark {
      --bg: #060e1a;
      --bg2: #0a1628;
      --bg3: #0e1f38;
      --card: rgba(10,22,40,0.85);
      --text: #e8f4fd;
      --muted: #6e91b0;
      --border: rgba(0,212,255,0.12);
      --nav-bg: rgba(6,14,26,0.85);
    }
    .tn-light {
      --bg: #f0f5fc;
      --bg2: #ffffff;
      --bg3: #e8f0fa;
      --card: rgba(255,255,255,0.92);
      --text: #0a1628;
      --muted: #4a6080;
      --border: rgba(0,120,200,0.15);
      --nav-bg: rgba(240,245,252,0.9);
    }

    .tn-root {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    /* ── Navbar ── */
    .tn-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 3rem; height: 72px;
      transition: background var(--transition), backdrop-filter var(--transition), box-shadow var(--transition);
    }
    .tn-nav.scrolled {
      background: var(--nav-bg);
      backdrop-filter: blur(16px);
      box-shadow: 0 1px 0 var(--border);
    }
    .tn-logo {
      font-family: 'Rajdhani', sans-serif;
      font-size: 1.5rem; font-weight: 700; letter-spacing: 0.04em;
      color: var(--text); text-decoration: none;
      display: flex; align-items: center; gap: 0.5rem;
    }
    .tn-logo-dot { color: var(--accent); }
    .tn-nav-links { display: flex; align-items: center; gap: 0.25rem; }
    .tn-nav-links a {
      color: var(--muted); font-size: 0.875rem; font-weight: 500;
      padding: 0.4rem 0.75rem; border-radius: 6px;
      text-decoration: none; transition: color var(--transition), background var(--transition);
      cursor: pointer;
    }
    .tn-nav-links a:hover { color: var(--accent); background: rgba(0,212,255,0.06); }
    .tn-nav-right { display: flex; align-items: center; gap: 1rem; }
    .tn-mode-btn {
      background: none; border: 1px solid var(--border); border-radius: 8px;
      color: var(--muted); padding: 0.45rem; cursor: pointer;
      display: flex; align-items: center; transition: all var(--transition);
    }
    .tn-mode-btn:hover { color: var(--accent); border-color: var(--accent); }
    .tn-cta-sm {
      font-size: 0.8rem; font-weight: 600; padding: 0.5rem 1.1rem;
      background: var(--accent); color: #060e1a; border: none;
      border-radius: 8px; cursor: pointer; transition: opacity var(--transition);
      font-family: 'DM Sans', sans-serif;
    }
    .tn-cta-sm:hover { opacity: 0.88; }
    .tn-burger { display: none; background: none; border: 1px solid var(--border); border-radius: 8px; padding: 0.45rem; cursor: pointer; color: var(--text); }
    .tn-mobile-menu {
      display: none; position: fixed; top: 72px; left: 0; right: 0;
      background: var(--nav-bg); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border); flex-direction: column; z-index: 999;
      padding: 1rem 2rem 1.5rem;
    }
    .tn-mobile-menu.open { display: flex; }
    .tn-mobile-menu a {
      padding: 0.75rem 0; color: var(--muted); font-size: 1rem; font-weight: 500;
      border-bottom: 1px solid var(--border); text-decoration: none; cursor: pointer;
      transition: color var(--transition);
    }
    .tn-mobile-menu a:hover { color: var(--accent); }

    /* ── Hero ── */
    .tn-hero {
      position: relative; min-height: 100vh;
      display: flex; align-items: center;
      background: linear-gradient(160deg, #060e1a 0%, #0a1e3d 50%, #060e1a 100%);
      overflow: hidden;
    }
    .tn-hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.7; }
    .tn-hero-overlay {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,150,220,0.08) 0%, transparent 70%);
    }
    .tn-hero-content {
      position: relative; z-index: 2;
      max-width: 860px; padding: 0 3rem; padding-top: 5rem;
    }
    .tn-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      border: 1px solid rgba(0,212,255,0.3); border-radius: 100px;
      padding: 0.35rem 1rem; font-size: 0.78rem; font-weight: 600;
      color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase;
      background: rgba(0,212,255,0.06); margin-bottom: 1.75rem;
    }
    .tn-hero h1 {
      font-family: 'Rajdhani', sans-serif;
      font-size: clamp(2.4rem, 6vw, 4.8rem);
      font-weight: 700; line-height: 1.05;
      letter-spacing: -0.01em; margin-bottom: 1.5rem;
    }
    .tn-hero h1 span { color: var(--accent); }
    .tn-hero p {
      font-size: 1.1rem; line-height: 1.75; color: var(--muted);
      max-width: 620px; margin-bottom: 2.5rem;
    }
    .tn-hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
    .tn-btn-primary {
      font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.95rem;
      padding: 0.85rem 2rem; background: var(--accent); color: #060e1a;
      border: none; border-radius: 10px; cursor: pointer;
      transition: all var(--transition); display: flex; align-items: center; gap: 0.5rem;
    }
    .tn-btn-primary:hover { background: #1ae0ff; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,212,255,0.35); }
    .tn-btn-outline {
      font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.95rem;
      padding: 0.85rem 2rem; background: transparent;
      border: 1.5px solid rgba(0,212,255,0.4); color: var(--text);
      border-radius: 10px; cursor: pointer; transition: all var(--transition);
    }
    .tn-btn-outline:hover { border-color: var(--accent); color: var(--accent); background: rgba(0,212,255,0.05); }
    .tn-hero-stats {
      display: flex; gap: 3rem; margin-top: 4rem;
      padding-top: 2rem; border-top: 1px solid var(--border);
    }
    .tn-stat-num {
      font-family: 'Rajdhani', sans-serif; font-size: 2.2rem; font-weight: 700; color: var(--accent);
    }
    .tn-stat-lbl { font-size: 0.8rem; color: var(--muted); font-weight: 500; margin-top: 0.1rem; }
    .tn-hero-scroll {
      position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
      color: var(--muted); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; z-index: 2;
    }
    .tn-scroll-line {
      width: 1px; height: 40px; background: linear-gradient(to bottom, var(--accent), transparent);
      animation: scrollPulse 2s ease-in-out infinite;
    }
    @keyframes scrollPulse { 0%,100%{opacity:0.4; transform:scaleY(1);} 50%{opacity:1; transform:scaleY(1.1);} }

    /* ── Section Common ── */
    .tn-section { padding: 6rem 3rem; }
    .tn-section-alt { background: var(--bg3); }
    .tn-section-tag {
      display: inline-block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.15em;
      text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem;
    }
    .tn-section-title {
      font-family: 'Rajdhani', sans-serif; font-size: clamp(1.8rem, 4vw, 3rem);
      font-weight: 700; line-height: 1.1; margin-bottom: 1rem;
    }
    .tn-section-sub { color: var(--muted); font-size: 1.05rem; line-height: 1.7; max-width: 580px; }
    .tn-container { max-width: 1180px; margin: 0 auto; }
    .tn-section-header { margin-bottom: 3.5rem; }
    .tn-section-header.center { text-align: center; }
    .tn-section-header.center .tn-section-sub { margin: 0 auto; }

    /* Reveal animations */
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.revealed { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }
    .reveal-delay-5 { transition-delay: 0.5s; }

    /* ── About ── */
    .tn-about-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
    }
    .tn-about-visual {
      position: relative; border-radius: 20px; overflow: hidden;
      background: linear-gradient(135deg, var(--bg3), var(--bg2));
      border: 1px solid var(--border); padding: 2.5rem; min-height: 420px;
      display: flex; flex-direction: column; justify-content: center;
    }
    .tn-about-hexgrid { position: absolute; inset: 0; opacity: 0.08; }
    .tn-about-card {
      position: relative; z-index: 1;
      background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.2);
      border-radius: 14px; padding: 1.25rem 1.5rem; margin-bottom: 1rem;
      display: flex; align-items: center; gap: 1rem;
      backdrop-filter: blur(8px);
    }
    .tn-about-icon {
      width: 44px; height: 44px; border-radius: 10px; background: rgba(0,212,255,0.12);
      display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0;
    }
    .tn-about-card h4 { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.15rem; }
    .tn-about-card p { font-size: 0.8rem; color: var(--muted); }
    .tn-about-text p { color: var(--muted); line-height: 1.8; font-size: 1rem; margin-bottom: 1.25rem; }
    .tn-cert-row { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 1.5rem; }
    .tn-cert {
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
      border: 1px solid rgba(0,212,255,0.3); color: var(--accent); padding: 0.3rem 0.7rem;
      border-radius: 6px; background: rgba(0,212,255,0.05);
    }

    /* ── Services ── */
    .tn-services-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.25rem;
    }
    .tn-service-card {
      background: var(--card); border: 1px solid var(--border); border-radius: 16px;
      padding: 1.75rem; position: relative; overflow: hidden;
      transition: all var(--transition); cursor: default;
      backdrop-filter: blur(10px);
    }
    .tn-service-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
      opacity: 0; transition: opacity var(--transition);
    }
    .tn-service-card:hover { border-color: rgba(0,212,255,0.4); transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
    .tn-service-card:hover::before { opacity: 1; }
    .tn-service-icon {
      width: 52px; height: 52px; border-radius: 12px;
      background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2);
      display: flex; align-items: center; justify-content: center;
      color: var(--accent); margin-bottom: 1.25rem; transition: all var(--transition);
    }
    .tn-service-card:hover .tn-service-icon { background: rgba(0,212,255,0.18); transform: scale(1.05); }
    .tn-service-card h3 { font-family: 'Rajdhani', sans-serif; font-size: 1.15rem; font-weight: 600; margin-bottom: 0.6rem; }
    .tn-service-card p { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }
    .tn-service-arrow { color: var(--accent); margin-top: 1.25rem; opacity: 0; transition: opacity var(--transition); display: flex; align-items: center; gap: 0.3rem; font-size: 0.82rem; font-weight: 600; }
    .tn-service-card:hover .tn-service-arrow { opacity: 1; }

    /* ── Why Choose Us ── */
    .tn-why-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.75rem;
    }
    .tn-why-card {
      border-radius: 16px; padding: 2rem; background: var(--card); border: 1px solid var(--border);
      transition: all var(--transition); backdrop-filter: blur(10px);
    }
    .tn-why-card:hover { border-color: rgba(0,212,255,0.35); box-shadow: 0 12px 40px rgba(0,0,0,0.2); }
    .tn-why-num {
      font-family: 'Rajdhani', sans-serif; font-size: 2.5rem; font-weight: 700;
      color: rgba(0,212,255,0.15); line-height: 1; margin-bottom: 1rem;
    }
    .tn-why-icon-wrap {
      width: 48px; height: 48px; border-radius: 12px;
      background: rgba(0,212,255,0.1); display: flex; align-items: center;
      justify-content: center; color: var(--accent); margin-bottom: 1.25rem;
    }
    .tn-why-card h3 { font-family: 'Rajdhani', sans-serif; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
    .tn-why-card p { font-size: 0.875rem; color: var(--muted); line-height: 1.7; }

    /* ── Projects ── */
    .tn-projects-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
    }
    .tn-project-card {
      border-radius: 16px; border: 1px solid var(--border);
      background: var(--card); overflow: hidden; backdrop-filter: blur(10px);
      transition: all var(--transition); position: relative;
    }
    .tn-project-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.25); border-color: rgba(0,212,255,0.3); }
    .tn-project-visual {
      height: 140px; position: relative; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }
    .tn-project-visual svg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.55; }
    .tn-project-cat {
      position: relative; z-index: 1; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; padding: 0.3rem 0.7rem; border-radius: 100px;
      background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); color: #fff; border: 1px solid rgba(255,255,255,0.1);
    }
    .tn-project-body { padding: 1.25rem 1.5rem 1.5rem; }
    .tn-project-body h3 { font-family: 'Rajdhani', sans-serif; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
    .tn-project-meta { display: flex; align-items: center; gap: 1rem; margin-top: 0.75rem; }
    .tn-project-stat { font-size: 0.8rem; font-weight: 600; color: var(--accent); }
    .tn-project-loc { font-size: 0.78rem; color: var(--muted); display: flex; align-items: center; gap: 0.25rem; }

    /* ── Industries ── */
    .tn-industries-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
    }
    .tn-industry-card {
      border-radius: 14px; padding: 1.75rem 1rem; text-align: center;
      background: var(--card); border: 1px solid var(--border);
      transition: all var(--transition); backdrop-filter: blur(10px);
    }
    .tn-industry-card:hover { border-color: rgba(0,212,255,0.4); transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    .tn-industry-icon {
      width: 56px; height: 56px; border-radius: 14px;
      background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2);
      display: flex; align-items: center; justify-content: center;
      color: var(--accent); margin: 0 auto 1rem; transition: all var(--transition);
    }
    .tn-industry-card:hover .tn-industry-icon { background: rgba(0,212,255,0.2); }
    .tn-industry-card h4 { font-size: 0.9rem; font-weight: 600; }

    /* ── Testimonials ── */
    .tn-testimonials-track { display: flex; gap: 1.5rem; }
    .tn-testimonial-card {
      flex: 0 0 calc(33.333% - 1rem); border-radius: 18px;
      background: var(--card); border: 1px solid var(--border);
      padding: 2rem; backdrop-filter: blur(10px);
      transition: all var(--transition); position: relative;
    }
    .tn-testimonial-card.active {
      border-color: rgba(0,212,255,0.4);
      box-shadow: 0 12px 40px rgba(0,212,255,0.08);
    }
    .tn-stars { display: flex; gap: 0.2rem; margin-bottom: 1.25rem; }
    .tn-testimonial-text { font-size: 0.92rem; color: var(--muted); line-height: 1.8; margin-bottom: 1.5rem; }
    .tn-testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
    .tn-author-avatar {
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), #0066cc);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 1rem; color: #060e1a; flex-shrink: 0;
    }
    .tn-author-name { font-weight: 600; font-size: 0.9rem; }
    .tn-author-role { font-size: 0.78rem; color: var(--muted); }
    .tn-dots { display: flex; gap: 0.5rem; justify-content: center; margin-top: 2rem; }
    .tn-dot {
      width: 8px; height: 8px; border-radius: 50%; border: none;
      background: var(--border); cursor: pointer; transition: all var(--transition);
    }
    .tn-dot.active { background: var(--accent); transform: scale(1.3); }

    /* ── Contact ── */
    .tn-contact-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;
    }
    .tn-contact-info h2 { font-family: 'Rajdhani', sans-serif; font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem; }
    .tn-contact-info p { color: var(--muted); font-size: 1rem; line-height: 1.7; margin-bottom: 2rem; }
    .tn-contact-item {
      display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.25rem;
    }
    .tn-contact-icon {
      width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0;
      background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2);
      display: flex; align-items: center; justify-content: center; color: var(--accent);
    }
    .tn-contact-item h4 { font-size: 0.8rem; color: var(--muted); margin-bottom: 0.2rem; font-weight: 500; }
    .tn-contact-item p { font-size: 0.95rem; font-weight: 500; color: var(--text); margin-bottom: 0; }
    .tn-map-wrap { border-radius: 16px; overflow: hidden; border: 1px solid var(--border); margin-top: 1.5rem; height: 220px; }
    .tn-map-wrap iframe { width: 100%; height: 100%; border: none; display: block; }

    .tn-form { display: flex; flex-direction: column; gap: 1rem; }
    .tn-input-group { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .tn-input, .tn-textarea {
      width: 100%; padding: 0.85rem 1.1rem; border-radius: 10px;
      background: var(--bg3); border: 1px solid var(--border);
      color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
      outline: none; transition: border-color var(--transition);
      resize: none;
    }
    .tn-input::placeholder, .tn-textarea::placeholder { color: var(--muted); }
    .tn-input:focus, .tn-textarea:focus { border-color: rgba(0,212,255,0.5); }
    .tn-form-submit {
      font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.95rem;
      padding: 0.9rem 2rem; background: var(--accent); color: #060e1a;
      border: none; border-radius: 10px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      transition: all var(--transition); width: 100%;
    }
    .tn-form-submit:hover { background: #1ae0ff; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(0,212,255,0.3); }

    /* ── WhatsApp FAB ── */
    .tn-whatsapp {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
      width: 56px; height: 56px; border-radius: 50%;
      background: #25D366; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 24px rgba(37,211,102,0.45);
      transition: all var(--transition); animation: waBounce 3s ease-in-out infinite;
    }
    .tn-whatsapp:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(37,211,102,0.55); animation: none; }
    @keyframes waBounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-5px);} }
    .tn-whatsapp svg { width: 28px; height: 28px; }

    /* ── Footer ── */
    .tn-footer {
      background: #040b16; border-top: 1px solid var(--border);
      padding: 5rem 3rem 2rem;
    }
    .tn-footer-grid {
      display: grid; grid-template-columns: 1.8fr 1fr 1fr 1.2fr; gap: 3rem;
      max-width: 1180px; margin: 0 auto 3rem;
    }
    .tn-footer-brand p { color: var(--muted); font-size: 0.875rem; line-height: 1.7; margin-top: 1rem; margin-bottom: 1.5rem; max-width: 280px; }
    .tn-footer-socials { display: flex; gap: 0.6rem; }
    .tn-social-btn {
      width: 36px; height: 36px; border-radius: 8px;
      background: rgba(255,255,255,0.04); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      color: var(--muted); cursor: pointer; transition: all var(--transition);
      font-size: 0.75rem; font-weight: 700;
    }
    .tn-social-btn:hover { background: rgba(0,212,255,0.1); border-color: rgba(0,212,255,0.3); color: var(--accent); }
    .tn-footer-col h4 {
      font-family: 'Rajdhani', sans-serif; font-size: 0.95rem; font-weight: 600;
      margin-bottom: 1.25rem; color: var(--text);
    }
    .tn-footer-col ul { list-style: none; }
    .tn-footer-col li { margin-bottom: 0.6rem; }
    .tn-footer-col a { color: var(--muted); font-size: 0.875rem; text-decoration: none; transition: color var(--transition); cursor: pointer; }
    .tn-footer-col a:hover { color: var(--accent); }
    .tn-footer-contact li { display: flex; align-items: flex-start; gap: 0.6rem; color: var(--muted); font-size: 0.875rem; margin-bottom: 0.75rem; }
    .tn-footer-contact span { color: var(--accent); flex-shrink: 0; margin-top: 0.1rem; }
    .tn-footer-bottom {
      max-width: 1180px; margin: 0 auto; padding-top: 2rem;
      border-top: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
      font-size: 0.8rem; color: var(--muted);
    }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .tn-about-grid { grid-template-columns: 1fr; gap: 3rem; }
      .tn-why-grid { grid-template-columns: repeat(2, 1fr); }
      .tn-projects-grid { grid-template-columns: repeat(2, 1fr); }
      .tn-footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 768px) {
      .tn-nav-links, .tn-nav-right .tn-cta-sm { display: none; }
      .tn-burger { display: flex; }
      .tn-section { padding: 4rem 1.5rem; }
      .tn-hero-content { padding: 0 1.5rem; padding-top: 5rem; }
      .tn-services-grid { grid-template-columns: 1fr; }
      .tn-why-grid { grid-template-columns: 1fr; }
      .tn-projects-grid { grid-template-columns: 1fr; }
      .tn-industries-grid { grid-template-columns: repeat(2, 1fr); }
      .tn-testimonials-track { flex-direction: column; }
      .tn-testimonial-card { flex: unset; }
      .tn-contact-grid { grid-template-columns: 1fr; }
      .tn-input-group { grid-template-columns: 1fr; }
      .tn-footer-grid { grid-template-columns: 1fr; gap: 2rem; }
      .tn-footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
      .tn-hero-stats { gap: 1.5rem; flex-wrap: wrap; }
      .tn-nav { padding: 0 1.5rem; }
      .tn-footer { padding: 3rem 1.5rem 2rem; }
    }

    .tn-divider {
      height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent);
    }
  `}</style>
);

/* ─── CANVAS ANIMATION ──────────────────────────────────────── */
function NetworkCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let id;
    const fit = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    fit();
    window.addEventListener("resize", fit);
    const N = 65;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2 + 1,
      phase: Math.random() * Math.PI * 2,
      big: Math.random() < 0.18,
    }));
    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 125) {
            ctx.globalAlpha = (1 - d / 125) * 0.55;
            ctx.strokeStyle = "#00d4ff"; ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      nodes.forEach(n => {
        n.phase += 0.022;
        const pulse = 1 + Math.sin(n.phase) * 0.3;
        const r = (n.big ? n.r * 2.5 : n.r) * pulse;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
        g.addColorStop(0, `rgba(0,212,255,${n.big ? 0.85 : 0.65})`);
        g.addColorStop(1, "rgba(0,212,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, r * 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#00d4ff"; ctx.globalAlpha = 0.9;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.big ? n.r * 1.4 : n.r, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", fit); };
  }, []);
  return <canvas ref={ref} className="tn-hero-canvas" />;
}

/* ─── SCROLL REVEAL HOOK ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── PROJECT VISUAL ──────────────────────────────────────────── */
function ProjectVisual({ color }) {
  return (
    <svg viewBox="0 0 320 140" xmlns="http://www.w3.org/2000/svg" style={{ background: `linear-gradient(135deg, #060e1a, #0a1e3d)` }}>
      {[...Array(5)].map((_, i) => (
        <circle key={i} cx={40 + i * 60} cy={50 + (i % 2) * 40} r={6} fill={color} opacity={0.7} />
      ))}
      {[...Array(4)].map((_, i) => (
        <line key={i} x1={46 + i * 60} y1={50 + (i % 2) * 40} x2={94 + i * 60} y2={50 + ((i + 1) % 2) * 40}
          stroke={color} strokeWidth={1.2} opacity={0.4} />
      ))}
      {[...Array(3)].map((_, i) => (
        <rect key={i} x={30 + i * 100} y={105} width={60} height={16} rx={4}
          fill={color} opacity={0.12} />
      ))}
    </svg>
  );
}

/* ─── MAIN APP ────────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className={`tn-root ${dark ? "tn-dark" : "tn-light"}`}>
      <Styles />

      {/* ── NAVBAR ── */}
      <nav className={`tn-nav ${scrolled ? "scrolled" : ""}`}>
        <a className="tn-logo" onClick={() => go("home")}>
          <Network size={22} color="#00d4ff" />
          TEL NET<span className="tn-logo-dot"> SOLUTION</span>
        </a>
        <div className="tn-nav-links">
          {NAV_LINKS.map(l => (
            <a key={l} onClick={() => go(l.toLowerCase().replace(/\s+/g, "-"))}>{l}</a>
          ))}
        </div>
        <div className="tn-nav-right">
          <button className="tn-mode-btn" onClick={() => setDark(d => !d)}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="tn-cta-sm" onClick={() => go("contact")}>Get Consultation</button>
          <button className="tn-burger" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`tn-mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(l => (
          <a key={l} onClick={() => go(l.toLowerCase().replace(/\s+/g, "-"))}>{l}</a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section id="home" className="tn-hero">
        <NetworkCanvas />
        <div className="tn-hero-overlay" />
        <div className="tn-container" style={{ width: "100%", padding: "0 3rem" }}>
          <div className="tn-hero-content" style={{ padding: 0, paddingTop: "4rem" }}>
            <div className="tn-badge">
              <Activity size={12} />
              Trusted Enterprise IT Partner Since 2012
            </div>
            <h1>
              Building Reliable<br />
              <span>Network Infrastructure</span><br />
              for Modern Businesses
            </h1>
            <p>
              From structured cabling to enterprise-grade fiber optics, CCTV systems, and cloud-ready server deployments — TEL NET SOLUTION delivers end-to-end IT infrastructure with precision, speed, and unmatched support.
            </p>
            <div className="tn-hero-btns">
              <button className="tn-btn-primary" onClick={() => go("contact")}>
                Get Free Consultation <ArrowRight size={16} />
              </button>
              <button className="tn-btn-outline" onClick={() => go("services")}>
                Our Services
              </button>
            </div>
            <div className="tn-hero-stats">
              {[
                { num: "500+", lbl: "Projects Delivered" },
                { num: "12+", lbl: "Years Experience" },
                { num: "200+", lbl: "Enterprise Clients" },
                { num: "24/7", lbl: "Support Available" },
              ].map(s => (
                <div key={s.lbl}>
                  <div className="tn-stat-num">{s.num}</div>
                  <div className="tn-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="tn-hero-scroll">
          <span style={{ letterSpacing: "0.12em" }}>SCROLL</span>
          <div className="tn-scroll-line" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="tn-section">
        <div className="tn-container">
          <div className="tn-about-grid">
            {/* Visual side */}
            <div className="tn-about-visual reveal">
              <svg className="tn-about-hexgrid" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                {[...Array(8)].map((_, r) =>
                  [...Array(7)].map((_, c) => (
                    <polygon key={`${r}${c}`}
                      points="30,0 60,17 60,52 30,69 0,52 0,17"
                      transform={`translate(${c * 62 + (r % 2) * 31},${r * 55})`}
                      fill="none" stroke="currentColor" strokeWidth="0.5" />
                  ))
                )}
              </svg>
              {[
                { icon: <Shield size={18} />, title: "Cisco Certified Engineers", sub: "CCNA / CCNP qualified field team" },
                { icon: <Server size={18} />, title: "Full-Stack IT Deployment", sub: "Design → Deploy → Maintain" },
                { icon: <Clock size={18} />, title: "48-Hour Deployment SLA", sub: "Fast turnaround, zero compromise" },
              ].map((c, i) => (
                <div key={i} className="tn-about-card">
                  <div className="tn-about-icon">{c.icon}</div>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Text side */}
            <div className="tn-about-text reveal reveal-delay-2">
              <div className="tn-section-tag">About TEL NET SOLUTION</div>
              <h2 className="tn-section-title">
                Your Trusted Partner for<br /><span style={{ color: "var(--accent)" }}>Enterprise IT Excellence</span>
              </h2>
              <p>
                Since 2012, TEL NET SOLUTION has been designing, deploying, and maintaining mission-critical network infrastructure for enterprises across India. We bring engineering excellence to every project — from a 10-node office network to a 1,200-seat data center buildout.
              </p>
              <p>
                Our team of certified engineers specializes in structured cabling, fiber optics, enterprise WiFi, CCTV systems, and server infrastructure. Every solution we build is designed for reliability, scalability, and long-term performance.
              </p>
              <p>
                We're not just vendors — we're long-term technology partners committed to keeping your business connected, secure, and future-ready.
              </p>
              <div className="tn-cert-row">
                {["Cisco CCNA", "Ubiquiti UEWA", "CompTIA Network+", "ISO 27001", "Hikvision Certified"].map(c => (
                  <span key={c} className="tn-cert">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tn-divider" />

      {/* ── SERVICES ── */}
      <section id="services" className="tn-section tn-section-alt">
        <div className="tn-container">
          <div className="tn-section-header center reveal">
            <div className="tn-section-tag">What We Do</div>
            <h2 className="tn-section-title">Comprehensive IT Infrastructure Services</h2>
            <p className="tn-section-sub">End-to-end networking and IT solutions designed for performance, security, and scalability.</p>
          </div>
          <div className="tn-services-grid">
            {SERVICES.map((s, i) => (
              <div key={s.title} className={`tn-service-card reveal reveal-delay-${Math.min(i % 3 + 1, 5)}`}>
                <div className="tn-service-icon"><s.icon size={22} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="tn-service-arrow">Learn More <ChevronRight size={14} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="tn-divider" />

      {/* ── WHY CHOOSE US ── */}
      <section id="why-us" className="tn-section">
        <div className="tn-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
            <div className="reveal">
              <div className="tn-section-tag">Why TEL NET</div>
              <h2 className="tn-section-title">The Advantage That<br /><span style={{ color: "var(--accent)" }}>Delivers Results</span></h2>
              <p className="tn-section-sub">We combine deep technical expertise with enterprise-grade processes to deliver infrastructure that works.</p>
              <button className="tn-btn-primary" style={{ marginTop: "2rem" }} onClick={() => go("contact")}>
                Work With Us <ArrowRight size={16} />
              </button>
            </div>
            <div className="tn-why-grid">
              {WHY_US.map((w, i) => (
                <div key={w.title} className={`tn-why-card reveal reveal-delay-${Math.min(i % 3 + 1, 5)}`}>
                  <div className="tn-why-num">0{i + 1}</div>
                  <div className="tn-why-icon-wrap"><w.icon size={20} /></div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="tn-divider" />

      {/* ── PROJECTS ── */}
      <section id="projects" className="tn-section tn-section-alt">
        <div className="tn-container">
          <div className="tn-section-header center reveal">
            <div className="tn-section-tag">Portfolio</div>
            <h2 className="tn-section-title">Projects That Speak for Themselves</h2>
            <p className="tn-section-sub">A selection of enterprise deployments across industries and geographies.</p>
          </div>
          <div className="tn-projects-grid">
            {PROJECTS.map((p, i) => (
              <div key={p.title} className={`tn-project-card reveal reveal-delay-${Math.min(i % 3 + 1, 5)}`}>
                <div className="tn-project-visual" style={{ background: `linear-gradient(135deg, #060e1a, #0a1e3d)` }}>
                  <ProjectVisual color={p.color} />
                  <span className="tn-project-cat">{p.category}</span>
                </div>
                <div className="tn-project-body">
                  <h3>{p.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{p.stat}</p>
                  <div className="tn-project-meta">
                    <span className="tn-project-stat">{p.stat.split(" ")[0]} {p.stat.split(" ")[1]}</span>
                    <span className="tn-project-loc">
                      <MapPin size={11} /> {p.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="tn-divider" />

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="tn-section">
        <div className="tn-container">
          <div className="tn-section-header center reveal">
            <div className="tn-section-tag">Industries Served</div>
            <h2 className="tn-section-title">Connecting Every Sector</h2>
            <p className="tn-section-sub">We bring enterprise-grade infrastructure expertise to every industry vertical.</p>
          </div>
          <div className="tn-industries-grid">
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.name} className={`tn-industry-card reveal reveal-delay-${Math.min(i % 4 + 1, 5)}`}>
                <div className="tn-industry-icon"><ind.icon size={24} /></div>
                <h4>{ind.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="tn-divider" />

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="tn-section tn-section-alt">
        <div className="tn-container">
          <div className="tn-section-header center reveal">
            <div className="tn-section-tag">Client Testimonials</div>
            <h2 className="tn-section-title">What Our Clients Say</h2>
            <p className="tn-section-sub">Real feedback from enterprise clients who trust TEL NET SOLUTION for their infrastructure.</p>
          </div>
          <div className="tn-testimonials-track reveal">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`tn-testimonial-card ${i === active ? "active" : ""}`}>
                <div className="tn-stars">
                  {[...Array(t.rating)].map((_, s) => <Star key={s} size={14} fill="#00d4ff" color="#00d4ff" />)}
                </div>
                <p className="tn-testimonial-text">"{t.text}"</p>
                <div className="tn-testimonial-author">
                  <div className="tn-author-avatar">{t.name.charAt(0)}{t.name.split(" ")[1]?.charAt(0)}</div>
                  <div>
                    <div className="tn-author-name">{t.name}</div>
                    <div className="tn-author-role">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="tn-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`tn-dot ${i === active ? "active" : ""}`} onClick={() => setActive(i)} />
            ))}
          </div>
        </div>
      </section>

      <div className="tn-divider" />

      {/* ── CONTACT ── */}
      <section id="contact" className="tn-section">
        <div className="tn-container">
          <div className="tn-contact-grid">
            {/* Info + Map */}
            <div className="reveal">
              <div className="tn-section-tag">Get In Touch</div>
              <h2 className="tn-section-title">Let's Build Your<br /><span style={{ color: "var(--accent)" }}>Network Together</span></h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
                Ready to upgrade your IT infrastructure? Our team is standing by for a free consultation. We'll assess your needs and design the perfect solution.
              </p>
              {[
                { icon: <Phone size={18} />, label: "Phone / WhatsApp", val: "+91 98765 43210" },
                { icon: <Mail size={18} />, label: "Email Address", val: "info@telnetsolution.in" },
                { icon: <MapPin size={18} />, label: "Office Address", val: "Madhapur, Hyderabad, Telangana 500 081" },
                { icon: <Clock size={18} />, label: "Working Hours", val: "Mon–Sat: 9:00 AM – 7:00 PM IST" },
              ].map(c => (
                <div key={c.label} className="tn-contact-item">
                  <div className="tn-contact-icon">{c.icon}</div>
                  <div>
                    <h4>{c.label}</h4>
                    <p>{c.val}</p>
                  </div>
                </div>
              ))}
              <div className="tn-map-wrap">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=78.37&bbox=78.39&lat=17.44&lon=78.38&layer=mapnik&zoom=14&mlat=17.4486&mlon=78.3908"
                  allowFullScreen loading="lazy"
                  title="TEL NET SOLUTION Office Location"
                />
              </div>
            </div>
            {/* Form */}
            <div className="reveal reveal-delay-2">
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "20px", padding: "2.5rem", backdropFilter: "blur(10px)" }}>
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.4rem", fontWeight: 600, marginBottom: "0.5rem" }}>Send Us a Message</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginBottom: "1.75rem" }}>We'll get back to you within 2 business hours.</p>
                <div className="tn-form">
                  <div className="tn-input-group">
                    <input className="tn-input" placeholder="Your Name" type="text" />
                    <input className="tn-input" placeholder="Company Name" type="text" />
                  </div>
                  <div className="tn-input-group">
                    <input className="tn-input" placeholder="Email Address" type="email" />
                    <input className="tn-input" placeholder="Phone Number" type="tel" />
                  </div>
                  <select className="tn-input" style={{ cursor: "pointer" }}>
                    <option value="">Select Service Required</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                  <textarea className="tn-textarea" rows={5} placeholder="Tell us about your project requirements, site size, and timeline..." />
                  <button className="tn-form-submit">
                    Send Message <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="tn-footer">
        <div className="tn-footer-grid">
          <div className="tn-footer-brand">
            <a className="tn-logo"><Network size={22} color="#00d4ff" /> TEL NET<span className="tn-logo-dot"> SOLUTION</span></a>
            <p>Delivering enterprise-grade IT infrastructure with precision, reliability, and expert support since 2012. Your network is our mission.</p>
            <div className="tn-footer-socials">
              {["Li", "Tw", "Fb", "Yt", "Ig"].map(s => <button key={s} className="tn-social-btn">{s}</button>)}
            </div>
          </div>
          <div className="tn-footer-col">
            <h4>Quick Links</h4>
            <ul>
              {["Home", "About Us", "Services", "Projects", "Testimonials", "Contact"].map(l => (
                <li key={l}><a onClick={() => go(l.toLowerCase().replace(/\s+/g, "-"))}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="tn-footer-col">
            <h4>Our Services</h4>
            <ul>
              {SERVICES.slice(0, 7).map(s => <li key={s.title}><a>{s.title}</a></li>)}
            </ul>
          </div>
          <div className="tn-footer-col">
            <h4>Contact Us</h4>
            <ul className="tn-footer-contact">
              <li><span><Phone size={13} /></span> +91 98765 43210</li>
              <li><span><Mail size={13} /></span> info@telnetsolution.in</li>
              <li><span><MapPin size={13} /></span> Madhapur, Hyderabad, Telangana 500 081, India</li>
              <li><span><Clock size={13} /></span> Mon–Sat: 9AM – 7PM IST</li>
            </ul>
          </div>
        </div>
        <div className="tn-footer-bottom">
          <span>© 2025 TEL NET SOLUTION. All rights reserved.</span>
          <span>Designed for enterprise excellence.</span>
        </div>
      </footer>

      {/* ── WhatsApp FAB ── */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
        <button className="tn-whatsapp" title="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>
      </a>
    </div>
  );
}
