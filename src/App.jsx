import React, { useState, useEffect } from 'react';
import { initialWorks } from './data/portfolio';
import AdminPortal from './components/AdminPortal';
import { initialServices, getIcon } from './data/services.jsx';
import { supabase } from './supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone, Mail, Instagram, Menu, X, ArrowRight, ChevronDown, ArrowUp,
    Mic, Tv, Award, Calendar, Globe, Star, Play, Music, Download,
    Video, Headphones, Newspaper, Smartphone, MessagesSquare, Users
} from 'lucide-react';

/* 
    Sarah Esinam Atiemo | Branding System
    Sophisticated. Editorial. Unforgettable.
*/

const Navbar = ({ onAdminClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Insights', href: '#insights' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: scrolled || mobileOpen ? '80px' : '100px',
            background: scrolled || mobileOpen ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
            backdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 5%',
            zIndex: 3000,
            borderBottom: scrolled || mobileOpen ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <a href="#home" style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '4px', color: 'var(--primary)', zIndex: 3001 }}>
                SEA<span style={{ color: 'var(--text-primary)' }}> JOURNALISM</span>
            </a>

            {/* Desktop Menu */}
            <div className="nav-desktop" style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
                {navLinks.map((link) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        className="nav-item-link"
                        whileHover={{ scale: 1.05, color: 'var(--primary)' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: 'var(--text-grey)',
                            transition: 'color 0.3s'
                        }}
                    >
                        {link.name}
                    </motion.a>
                ))}
                <motion.a
                    href="#contact"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px var(--primary-light)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ padding: '12px 32px' }}
                >
                    Book Sarah
                </motion.a>
                <button 
                    onClick={onAdminClick}
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        padding: 0, 
                        color: 'var(--text-slate)', 
                        fontSize: '11px', 
                        letterSpacing: '1.5px', 
                        textTransform: 'uppercase', 
                        fontWeight: '600',
                        cursor: 'pointer',
                        opacity: 0.6,
                        transition: '0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0.6'}
                >
                    Admin
                </button>
            </div>

            {/* Mobile Trigger */}
            <div className="nav-mobile-trigger" onClick={() => setMobileOpen(!mobileOpen)} style={{ cursor: 'pointer', color: 'var(--primary)', zIndex: 3001, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px' }}>
                {mobileOpen ? <X size={32} /> : <Menu size={32} />}
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence mode="wait">
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'var(--bg-primary)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '40px',
                            zIndex: 2999,
                            padding: '0 5%'
                        }}
                    >
                        {navLinks.map((link, idx) => (
                            <motion.a
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'var(--font-display)',
                                    letterSpacing: '1px'
                                }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.a
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            href="#contact"
                            className="btn btn-primary"
                            style={{ padding: '20px 48px', width: '100%', maxWidth: '300px' }}
                            onClick={() => setMobileOpen(false)}
                        >
                            Book Sarah Now
                        </motion.a>

                        <button 
                            onClick={() => { setMobileOpen(false); onAdminClick(); }}
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: 'var(--primary-light)', 
                                fontSize: '11px', 
                                letterSpacing: '2px', 
                                textTransform: 'uppercase', 
                                fontWeight: '700',
                                marginTop: '20px',
                                opacity: 0.5
                            }}
                        >
                            Admin Access
                        </button>


                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 991px) {
                    .nav-desktop { display: none !important; }
                    .nav-mobile-trigger { display: block !important; }
                    body { overflow: ${mobileOpen ? 'hidden' : 'auto'} }
                }
                @media (min-width: 992px) {
                    .nav-mobile-trigger { display: none !important; }
                }
                .nav-item-link:hover { color: var(--primary) !important; transform: translateY(-2px); }
            `}</style>
        </nav>
    );
};

const Hero = () => {
    return (
        <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Top Glow Inspired by the User's Image */}
            <div style={{ 
                position: 'absolute', 
                top: '-10%', 
                left: '20%', 
                width: '60vw', 
                height: '60vw', 
                background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, transparent 70%)', 
                filter: 'blur(100px)',
                zIndex: 0 
            }}></div>
            <div style={{ 
                position: 'absolute', 
                bottom: '-10%', 
                right: '-10%', 
                width: '50vw', 
                height: '50vw', 
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', 
                filter: 'blur(80px)',
                zIndex: 0 
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
                    <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                        <span className="label-small" style={{ display: 'block', marginBottom: '32px' }}>Professional TV/Radio Host & MC</span>
                        <h1 className="display-large" style={{ marginBottom: '40px', lineHeight: '0.95', color: 'var(--text-primary)' }}>
                            Your Event. <br />
                            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>My Voice.</span>
                        </h1>
                        <p style={{ fontSize: '22px', color: 'var(--text-grey)', maxWidth: '560px', marginBottom: '60px', fontWeight: '300', lineHeight: '1.7' }}>
                            Bridging the gap between journalism and engagement. Sarah Esinam Atiemo delivers a masterclass in sophistication for the world's most prestigious stages.
                        </p>
                        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                            <motion.a
                                href="#contact"
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--primary-light)' }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                            >
                                Elevate Your Event
                            </motion.a>
                            <motion.a
                                href="#portfolio"
                                className="btn btn-outline"
                                whileHover={{ scale: 1.05, borderColor: 'var(--primary)', color: 'var(--primary)' }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                                style={{ display: 'flex', gap: '12px' }}
                            >
                                View Portfolio <ArrowRight size={18} />
                            </motion.a>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} style={{ position: 'relative' }}>
                        <div style={{
                            width: '100%',
                            aspectRatio: '0.85',
                            background: 'url("/sarah-hero.jpg") center/cover no-repeat',
                            borderRadius: '2px',
                            boxShadow: '40px 40px 0px rgba(37, 99, 235, 0.05)',
                            position: 'relative',
                            border: '1px solid rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--primary-light)', transform: 'translate(-20px, -20px)', zIndex: -1, opacity: 0.3 }}></div>
                        </div>
                        {/* Status Float */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                            className="glass-panel"
                            style={{ position: 'absolute', bottom: '10%', right: '-15%', padding: '24px 40px', borderRadius: '4px', background: 'white' }}
                        >
                            <span style={{ display: 'block', fontSize: '12px', letterSpacing: '2px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px' }}>NOW BOOKING</span>
                            <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>2026</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    #home { padding-top: 120px; text-align: center; }
                    #home .container > div { grid-template-columns: 1fr !important; gap: 60px; }
                    #home p { margin: 0 auto 60px; }
                    #home div:last-child { margin-top: 24px; padding: 20px !important; right: 0 !important; bottom: 0 !important; position: relative !important; }
                    .display-large { line-height: 1.1 !important; }
                }
            `}</style>
        </section>
    );
};

const About = () => {
    return (
        <section id="about" className="section-padding" style={{ 
            background: 'var(--bg-secondary)',
            position: 'relative'
        }}>
            {/* Subtle Vertical Glow to mimic curtain highlights */}
            <div style={{ position: 'absolute', top: 0, left: '50%', width: '1px', height: '100%', background: 'rgba(255,255,255,0.05)', boxShadow: '0 0 100px 50px rgba(11, 53, 142, 0.1)', zIndex: 0 }}></div>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '100px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ width: '100%', aspectRatio: '1', background: 'url("/radio-studio.jpg") center/cover no-repeat', filter: 'grayscale(0.3)' }}></div>
                        <div style={{ position: 'absolute', top: '30px', left: '-30px', width: '100%', height: '100%', border: '1px solid var(--primary)', zIndex: -1 }}></div>
                    </div>
                    <div>
                        <span className="label-small" style={{ marginBottom: '24px', display: 'block' }}>The Editorial Profile</span>
                        <h2 className="display-medium" style={{ marginBottom: '40px' }}>Beyond the <span style={{ color: 'var(--primary)' }}>Mic.</span></h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <p style={{ fontSize: '18px', color: 'var(--text-grey)', fontWeight: '300' }}>
                                Sarah Esinam Atiemo represents the new generation of media professionals. Her path from investigative journalism to master of ceremonies has been defined by a singular commitment: the pursuit of excellence.
                            </p>
                            <p style={{ fontSize: '18px', color: 'var(--text-grey)', fontWeight: '300' }}>
                                Known for her poise under pressure and her ability to captivate audiences ranging from international dignitaries to radio listeners, Sarah transforms every platform into an unforgettable experience.
                            </p>
                            <div style={{ marginTop: '40px' }}>
                                <h4 style={{ fontSize: '13px', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px', fontWeight: '700' }}>Key Achievements</h4>
                                <ul style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                                    {[
                                        "Host of Economy Vibe-Joynews",
                                        "Head of Business Desk – Radio Univers",
                                        "Hosted Talking Business-Radio Univers",
                                        "Event Host & Red Carpet Presenter"
                                    ].map((achievement, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-primary)', fontSize: '15px', fontWeight: '300' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }}></div>
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '40px' }}>
                                <div><h4 style={{ fontSize: '32px', color: 'var(--primary)' }}>150+</h4><p style={{ fontSize: '12px', letterSpacing: '1px' }}>Global Events hosted</p></div>
                                <div><h4 style={{ fontSize: '32px', color: 'var(--primary)' }}>JoyFM</h4><p style={{ fontSize: '12px', letterSpacing: '1px' }}>Broadcast Partner</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 900px) {
                    #about .container > div { grid-template-columns: 1fr !important; }
                    #about div:first-child { max-width: 80% !important; margin: 0 auto; }
                }
            `}</style>
        </section>
    );
};

const Services = ({ services, onEnquire, onViewAll }) => {
    const list = services || [];

    return (
        <section id="services" className="section-padding" style={{ padding: '80px 0' }}>
            <div className="container">
                <div style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <span className="label-small" style={{ marginBottom: '16px', display: 'block' }}>Area of Expertise</span>
                        <h2 className="display-medium" style={{ fontSize: '44px' }}>Core <span style={{ color: 'var(--primary)' }}>Services.</span></h2>
                    </div>
                    <motion.button
                        onClick={onViewAll}
                        className="btn btn-primary"
                        style={{ padding: '14px 28px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px var(--primary-light)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Full Breakdown <ArrowRight size={14} />
                    </motion.button>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px',
                    padding: '2px'
                }}>
                    {list.map((item, i) => (
                        <div key={i} className="service-compact-card" style={{
                            padding: '32px',
                            background: 'var(--bg-primary)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            position: 'relative',
                            transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '4px' }}>{getIcon(item.iconName)}</div>
                                <div>
                                    <h3 style={{ fontSize: '18px', marginBottom: '12px', fontFamily: 'var(--font-sans)', fontWeight: '600', letterSpacing: '0.5px' }}>{item.title}</h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-slate)', lineHeight: '1.6', fontWeight: '300' }}>{item.desc}</p>
                                </div>
                            </div>
                            <div
                                onClick={() => onEnquire(item.title)}
                                style={{
                                    marginTop: 'auto',
                                    cursor: 'pointer',
                                    color: 'var(--primary-light)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.5px',
                                    opacity: 0.7
                                }}
                            >
                                Enquire <ArrowRight size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                .service-compact-card { border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; box-shadow: var(--shadow-sm); }
                .service-compact-card:hover { background: var(--bg-accent) !important; z-index: 2; transform: translateY(-5px); box-shadow: var(--shadow-lg); }
                .service-compact-card:hover h3 { color: var(--primary); }
            `}</style>
        </section>
    );
};

const ServicesDetail = ({ services, onBack, onEnquire }) => {
    const fullServices = services || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="services-detail-page"
            style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}
        >
            <div className="container">
                <div style={{ marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                    <motion.button
                        onClick={onBack}
                        className="btn btn-outline"
                        style={{ borderRadius: '50%', width: '60px', height: '60px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        whileHover={{ scale: 1.1, borderColor: 'var(--primary)' }}
                    >
                        <X size={24} />
                    </motion.button>
                    <div>
                        <span className="label-small" style={{ marginBottom: '16px', display: 'block' }}>Dedicated Solutions</span>
                        <h1 className="display-medium" style={{ fontSize: '64px' }}>The <span style={{ color: 'var(--primary)' }}>Expertise</span> Grid.</h1>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px' }}>
                    {fullServices.map((s, i) => (
                        <div key={i} className="glass-panel" style={{ padding: '60px', display: 'flex', flexDirection: 'column', gap: '30px', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ color: 'var(--primary)' }}>{getIcon(s.iconName, 40)}</div>
                            <div>
                                {s.tagline && <span style={{ fontSize: '12px', color: 'var(--primary-light)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>{s.tagline}</span>}
                                <h3 style={{ fontSize: '32px', marginTop: '12px', marginBottom: '20px' }}>{s.title}</h3>
                                <p style={{ color: 'var(--text-slate)', lineHeight: '1.7', fontSize: '16px', fontWeight: '300' }}>{s.summary || s.desc}</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                                {(s.clients || s.offerings) && (
                                    <div>
                                        <h4 style={{ fontSize: '14px', marginBottom: '20px', color: 'var(--text-primary)', fontWeight: '600' }}>{s.clients ? 'Target Clients' : 'Service Inclusion'}</h4>
                                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {(s.clients || s.offerings || []).map((item, idx) => (
                                                <li key={idx} style={{ fontSize: '14px', color: 'var(--text-grey)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {s.booking && s.booking.length > 0 && (
                                    <div>
                                        <h4 style={{ fontSize: '14px', marginBottom: '20px', color: 'var(--text-primary)', fontWeight: '600' }}>Booking Specifics</h4>
                                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {s.booking.map((item, idx) => (
                                                <li key={idx} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: '300' }}>— {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <motion.button
                                onClick={() => { onBack(); setTimeout(() => onEnquire(s.title), 500); }}
                                className="btn btn-primary"
                                style={{ width: 'fit-content', marginTop: '20px', padding: '16px 40px' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Inquire About Service
                            </motion.button>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                @media (max-width: 600px) {
                    .services-detail-page { padding-top: 100px; }
                    .services-detail-page .container > div:last-child { grid-template-columns: 1fr !important; }
                    .glass-panel { padding: 40px 24px !important; }
                    .glass-panel > div:nth-child(3) { grid-template-columns: 1fr !important; gap: 30px !important; }
                }
            `}</style>
        </motion.div>
    );
};

const Portfolio = ({ works, onViewAll }) => {
    // Only show top 3 works on the home page
    const displayWorks = works.slice(0, 3);

    return (
        <section id="portfolio" className="section-padding" style={{ 
            background: 'var(--bg-primary)',
            borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '32px' }}>
                    <div>
                        <span className="label-small" style={{ marginBottom: '12px', display: 'block' }}>Recent work</span>
                        <h2 className="display-medium" style={{ fontSize: '38px' }}>My <span style={{ color: 'var(--primary)' }}>Portfolio.</span></h2>
                    </div>
                    <motion.button
                        onClick={onViewAll}
                        className="btn btn-primary"
                        style={{ padding: '14px 28px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px var(--primary-light)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        See All Projects <ArrowRight size={14} />
                    </motion.button>
                </div>

                {/* Compact Grid */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                    gap: '40px', 
                    alignItems: 'start' 
                }}>
                    {displayWorks.map((work, i) => (
                        <motion.div 
                            key={work.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="portfolio-card-compact"
                            style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                        >
                            <div style={{ 
                                width: '100%', 
                                overflow: 'hidden',
                                border: '1px solid var(--white-alpha)',
                                position: 'relative'
                            }}>
                                <img 
                                    src={work.img} 
                                    alt={work.title}
                                    className="portfolio-thumb"
                                    style={{ 
                                        width: '100%', 
                                        height: 'auto', 
                                        display: 'block',
                                        transition: '1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                />
                                <div className="hover-reveal" style={{ 
                                    position: 'absolute', 
                                    inset: 0, 
                                    background: 'linear-gradient(to top, rgba(5,10,20,0.9), transparent)',
                                    opacity: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: '24px',
                                    transition: '0.4s'
                                }}>
                                    <span style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700' }}>{work.date}</span>
                                </div>
                            </div>
                            <div style={{ paddingTop: '20px' }}>
                                <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{work.date}</span>
                                <h4 style={{ fontSize: '18px', marginBottom: '4px', fontWeight: '500', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>{work.title}</h4>
                                <p style={{ fontSize: '12px', color: 'var(--text-slate)', textTransform: 'uppercase', letterSpacing: '1px' }}>{work.type}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <style>{`
                .portfolio-card-compact:hover .portfolio-thumb { transform: scale(1.1); }
                .portfolio-card-compact:hover .hover-reveal { opacity: 1; }
                .portfolio-card-compact:hover h4 { color: var(--primary); }
            `}</style>
        </section>
    );
};

const PhotoGallery = ({ onBack }) => {
    const galleryItems = [
        { id: 1, img: '/awards-night.jpg', title: 'Global Awards Night Host' },
        { id: 2, img: '/radio-studio.jpg', title: 'Radio Univers Session' },
        { id: 3, img: '/entrepreneurship.jpg', title: 'Panel Moderation' },
        { id: 4, img: '/sarah-hero.jpg', title: 'Portrait' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}
        >
            <div className="container">
                <div style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <motion.button
                        onClick={onBack}
                        className="btn btn-outline"
                        style={{ borderRadius: '50%', width: '60px', height: '60px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        whileHover={{ scale: 1.1, borderColor: 'var(--primary)' }}
                    >
                        <X size={24} />
                    </motion.button>
                    <div>
                        <span className="label-small" style={{ marginBottom: '16px', display: 'block' }}>Visual Storytelling</span>
                        <h1 className="display-medium" style={{ fontSize: '64px' }}>Photo <span style={{ color: 'var(--primary)' }}>Gallery.</span></h1>
                    </div>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '24px' 
                }}>
                    {galleryItems.map((item) => (
                        <motion.div
                            key={item.id}
                            className="gallery-item-card"
                            whileHover={{ y: -10 }}
                            style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1', cursor: 'zoom-in' }}
                        >
                            <img 
                                src={item.img} 
                                alt={item.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s ease' }}
                            />
                            <div className="gallery-overlay" style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                opacity: 0,
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '24px',
                                transition: '0.4s'
                            }}>
                                <span style={{ color: 'white', fontSize: '14px', fontWeight: '500', letterSpacing: '1px' }}>{item.title}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <style>{`
                .gallery-item-card:hover .gallery-overlay { opacity: 1; }
                .gallery-item-card:hover img { transform: scale(1.1); }
            `}</style>
        </motion.div>
    );
};

const Insights = ({ onBack }) => {
    const posts = [
        {
            id: 1,
            title: "Navigating the New Economy: Key Takeaways from Economy Vibe",
            date: "March 15, 2026",
            excerpt: "In our latest segment of Economy Vibe on Joynews, we delved deep into the shifting paradigms of digital currency and sustainable growth and its impact on the local market...",
            category: "Published Story",
            link: "#"
        },
        {
            id: 2,
            title: "The Rhythm of the City: A Poet's Reflection on Midnight Broadcasts",
            date: "March 10, 2026",
            excerpt: "There is a silent heartbeat in the studio at midnight. Under the soft glow of the 'On Air' sign, the world feels both infinite and intimate. Read my latest poetic reflection...",
            category: "Poem",
            link: "#"
        },
        {
            id: 3,
            title: "Talking Business: Why Small Enterprises are the Real Goliaths",
            date: "March 5, 2026",
            excerpt: "A reflection on recent discussions hosted at Radio Univers. We explore why the most impactful innovations are often born in the smallest garages and radio booths...",
            category: "Article",
            link: "#"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}
        >
            <div className="container">
                <div style={{ marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <motion.button
                        onClick={onBack}
                        className="btn btn-outline"
                        style={{ borderRadius: '50%', width: '60px', height: '60px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        whileHover={{ scale: 1.1, borderColor: 'var(--primary)' }}
                    >
                        <X size={24} />
                    </motion.button>
                    <div>
                        <span className="label-small" style={{ marginBottom: '16px', display: 'block' }}>Reflections & Narratives</span>
                        <h1 className="display-medium" style={{ fontSize: '64px' }}>Sea <span style={{ color: 'var(--primary)' }}>Insights.</span></h1>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                    {posts.map((post) => (
                        <div key={post.id} className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px', background: '#fff' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700' }}>{post.category}</span>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{post.date}</span>
                            </div>
                            <h3 style={{ fontSize: '24px', lineHeight: '1.4', color: 'var(--text-primary)' }}>{post.title}</h3>
                            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7', fontWeight: '300' }}>{post.excerpt}</p>
                            <a href={post.link} style={{ 
                                marginTop: '10px',
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '10px', 
                                color: 'var(--primary)', 
                                fontSize: '13px', 
                                fontWeight: '700', 
                                textTransform: 'uppercase', 
                                letterSpacing: '1px' 
                            }}>
                                Read Full Article <ArrowRight size={16} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const PortfolioDetail = ({ works, onBack }) => {
    const [filter, setFilter] = useState('all');
    const categories = ['all', ...new Set(works.map(w => w.type.toLowerCase()))];
    const filteredWorks = filter === 'all' 
        ? works 
        : works.filter(w => w.type.toLowerCase() === filter);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ background: 'var(--navy-deep)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}
        >
            <div className="container">
                <div style={{ marginBottom: '80px', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                    <motion.button
                        onClick={onBack}
                        className="btn btn-outline"
                        style={{ borderRadius: '50%', width: '60px', height: '60px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        whileHover={{ scale: 1.1, borderColor: 'var(--primary)' }}
                    >
                        <X size={24} />
                    </motion.button>
                    <div>
                        <span className="label-small" style={{ marginBottom: '16px', display: 'block' }}>All work</span>
                        <h1 className="display-medium" style={{ fontSize: '64px' }}>My <span style={{ color: 'var(--primary)' }}>Projects.</span></h1>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '30px',
                                border: '1px solid',
                                borderColor: filter === cat ? 'var(--primary)' : 'var(--white-alpha)',
                                background: filter === cat ? 'var(--primary)' : 'transparent',
                                color: filter === cat ? 'var(--navy-deep)' : 'var(--text-slate)',
                                fontSize: '11px',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: '0.3s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                    gap: '40px' 
                }}>
                    <AnimatePresence mode="popLayout">
                        {filteredWorks.map((work) => (
                            <motion.div 
                                layout
                                key={work.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="portfolio-card-compact"
                                style={{ cursor: 'pointer' }}
                            >
                                <div style={{ 
                                    width: '100%', 
                                    overflow: 'hidden',
                                    border: '1px solid var(--white-alpha)',
                                    position: 'relative'
                                }}>
                                    <img 
                                        src={work.img} 
                                        alt={work.title}
                                        className="portfolio-thumb"
                                        style={{ 
                                            width: '100%', 
                                            height: 'auto', 
                                            display: 'block',
                                            transition: '1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                                        }}
                                    />
                                </div>
                                <div style={{ paddingTop: '24px' }}>
                                    <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{work.date}</span>
                                    <h4 style={{ fontSize: '22px', marginBottom: '8px', color: 'var(--text-primary)' }}>{work.title}</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--text-slate)', textTransform: 'uppercase', letterSpacing: '1px' }}>{work.type}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="btn btn-outline"
                        style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                        whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Back to Top <ArrowUp size={16} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

const Contact = ({ prefillService }) => {
    const [formData, setFormData] = React.useState({
        name: '',
        contact: '',
        service: '',
        organization: '',
        details: '',
        date: '',
        location: '',
        duration: '',
        audience: '',
    });

    React.useEffect(() => {
        if (prefillService) {
            setFormData(prev => ({ ...prev, service: prefillService }));
        }
    }, [prefillService]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, contact, service, organization, details, date, location, duration, audience } = formData;

        let bookingFields = `*Client Name:* ${name}\n*Contact Info:* ${contact}\n*Service:* ${service}\n`;
        if (organization) bookingFields += `*Organization:* ${organization}\n`;
        if (date) bookingFields += `*Date:* ${date}\n`;
        if (location) bookingFields += `*Location:* ${location}\n`;
        if (duration) bookingFields += `*Duration:* ${duration}\n`;
        if (audience) bookingFields += `*Audience Size:* ${audience}\n`;

        const message = encodeURIComponent(
            `*New Professional Inquiry*\n\n` +
            bookingFields +
            `*Additional Details:* ${details}`
        );

        const whatsappUrl = `https://wa.me/233555357010?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const servicePlaceholders = {
        "Event Hosting / MC": "Specify event type (Corporate, Gala, Award), expected audience size, and hours of service required.",
        "Panel Moderation": "Organization name, number of panelists, topic of discussion, and event duration.",
        "Media & Speaking Training": "Individual or group session? Online or in-person? Specify your primary goals (Interview prep, news presence, etc.)",
        "Documentary Production": "Type of video, filming location, estimated length, and desired deadline.",
        "Advertisement": "Campaign industry, platform requirements (TV/Radio/Digital), and estimated project timeline.",
        "Podcast Interviews": "Guest name/brand, topic, and preferred recording timeframe.",
        "Speaking Engagements": "Audience demographic, event theme, and the specific topic you'd like Sarah to cover.",
        "Brand Content Creation": "Content type (Explainers, analysis, promos), industry, and platform requirements."
    };

    return (
        <section id="contact" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px' }}>
                    <div>
                        <span className="label-small" style={{ marginBottom: '24px', display: 'block' }}>Get In Touch</span>
                        <h2 className="display-medium" style={{ marginBottom: '40px' }}>Secure Your <br /><span style={{ color: 'var(--primary)' }}>Booking.</span></h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '60px' }}>
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                <div style={{ color: 'var(--primary)' }}><Mail size={24} /></div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', letterSpacing: '1px', color: 'var(--text-slate)', textTransform: 'uppercase' }}>General Inquiries</span>
                                    <a href="mailto:satiemo2002@gmail.com" style={{ fontSize: '20px', fontWeight: '500', color: 'var(--text-primary)' }}>satiemo2002@gmail.com</a>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                <div style={{ color: 'var(--primary)' }}><Phone size={24} /></div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', letterSpacing: '1px', color: 'var(--text-slate)', textTransform: 'uppercase' }}>Direct Booking</span>
                                    <a href="tel:0555357010" style={{ fontSize: '20px', fontWeight: '500', color: 'var(--text-primary)' }}>0555357010</a>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                <div style={{ color: 'var(--primary)' }}><Instagram size={24} /></div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '11px', letterSpacing: '1px', color: 'var(--text-slate)', textTransform: 'uppercase' }}>Social Hub</span>
                                    <a href="https://www.instagram.com/value_goddess" target="_blank" rel="noopener noreferrer" style={{ fontSize: '20px', fontWeight: '500', color: 'var(--text-primary)' }}>@value_goddess</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '60px', borderRadius: '4px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="contact-input" />
                                <input name="contact" type="text" placeholder="Email / Phone" value={formData.contact} onChange={handleChange} required className="contact-input" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <select name="service" value={formData.service} onChange={handleChange} required className="contact-input" style={{ appearance: 'none' }}>
                                    <option value="" disabled>Select Service</option>
                                    {Object.keys(servicePlaceholders).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <input name="organization" type="text" placeholder="Company / Organization" value={formData.organization} onChange={handleChange} className="contact-input" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <input name="date" type="text" placeholder="Event Date" value={formData.date} onChange={handleChange} className="contact-input" />
                                <input name="location" type="text" placeholder="Location" value={formData.location} onChange={handleChange} className="contact-input" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <input name="duration" type="text" placeholder="Duration (e.g. 4 hrs)" value={formData.duration} onChange={handleChange} className="contact-input" />
                                <input name="audience" type="text" placeholder="Expected Audience" value={formData.audience} onChange={handleChange} className="contact-input" />
                            </div>

                            <textarea
                                name="details"
                                placeholder={servicePlaceholders[formData.service] || "Tell us more about your inquiry..."}
                                rows={2}
                                value={formData.details}
                                onChange={handleChange}
                                required
                                className="contact-input"
                                style={{ resize: 'none' }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Send Proposal</button>
                        </form>
                    </div>
                </div>
            </div>
            <style>{`
                .contact-input {
                    background: transparent; border: none; border-bottom: 1px solid var(--white-alpha);
                    padding: 16px 0; color: white; outline: none; width: 100%; font-size: 15px;
                }
                .contact-input:focus { border-color: var(--primary); }
                @media (max-width: 600px) {
                    #contact .glass-panel { padding: 40px 20px !important; }
                    #contact form > div { grid-template-columns: 1fr !important; gap: 20px !important; }
                }
            `}</style>
        </section>
    );
};

const Footer = ({ onAdminClick }) => {
    return (
        <footer style={{ padding: '120px 0 60px', borderTop: '1px solid var(--white-alpha)', background: 'var(--navy-deep)' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '80px',
                    marginBottom: '100px'
                }}>
                    {/* Brand Column */}
                    <div style={{ gridColumn: 'span 1.5' }}>
                        <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '4px', color: 'var(--primary)', marginBottom: '32px' }}>
                            SEA<span style={{ color: 'var(--text-primary)' }}> JOURNALISM</span>
                        </div>
                        <p style={{ fontSize: '16px', color: 'var(--text-slate)', lineHeight: '1.8', maxWidth: '300px', marginBottom: '32px', fontWeight: '300' }}>
                            Redefining the standard of stage engagement and broadcast journalism. Sarah Esinam Atiemo delivers a masterclass in professional hosting and event moderation.
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <a href="https://www.instagram.com/value_goddess" target="_blank" rel="noopener noreferrer" className="social-icon-box"><Instagram size={18} /></a>
                            <a href="https://www.tiktok.com/@value.goddess" target="_blank" rel="noopener noreferrer" className="social-icon-box">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                            </a>
                            <a href="javascript:void(0)" className="social-icon-box"><Tv size={18} /></a>
                            <a href="javascript:void(0)" className="social-icon-box"><Mic size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div>
                        <h5 style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '32px', fontWeight: '700' }}>Navigation</h5>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li><a href="#about" className="footer-link">The Studio</a></li>
                            <li><a href="#services" className="footer-link">Services</a></li>
                            <li><a href="#portfolio" className="footer-link">Legacy Portfolio</a></li>
                            <li><a href="#gallery" className="footer-link">Photo Gallery</a></li>
                            <li><a href="#insights" className="footer-link">Sea Insights</a></li>
                            <li><a href="#contact" className="footer-link">Booking</a></li>
                        </ul>
                    </div>

                    {/* Expertise Areas */}
                    <div>
                        <h5 style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '32px', fontWeight: '700' }}>Expertise</h5>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li><a href="#services" className="footer-link">Event Hosting / MC</a></li>
                            <li><a href="#services" className="footer-link">Panel Moderation</a></li>
                            <li><a href="#services" className="footer-link">Media Production</a></li>
                            <li><a href="#services" className="footer-link">Advertisement</a></li>
                            <li><a href="#services" className="footer-link">Speaking Engagements</a></li>
                        </ul>
                    </div>

                    {/* Contact & Legal */}
                    <div>
                        <h5 style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '32px', fontWeight: '700' }}>Direct Hub</h5>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li style={{ color: 'var(--text-grey)', fontSize: '14px' }}>satiemo2002@gmail.com</li>
                            <li style={{ color: 'var(--text-grey)', fontSize: '14px' }}>0555357010</li>
                            <li><button onClick={onAdminClick} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', textAlign: 'left', cursor: 'pointer' }} className="footer-link-small">Admin Access</button></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    paddingTop: '40px',
                    borderTop: '1px solid var(--white-alpha)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '24px'
                }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-slate)', fontWeight: '400' }}>
                        © 2026 Sarah Esinam Atiemo. Built with editorial precision.
                    </p>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <a href="#" className="footer-link-small" onClick={(e) => e.preventDefault()}>Privacy</a>
                        <a href="#" className="footer-link-small" onClick={(e) => e.preventDefault()}>Terms</a>
                        <a href="#" className="footer-link-small" onClick={(e) => e.preventDefault()}>Cookies</a>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-link { font-size: 14px; color: var(--text-grey); transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1); font-weight: 300; }
                .footer-link:hover { color: var(--primary); transform: translateX(8px); }
                .footer-link-small { font-size: 12px; color: var(--text-slate); transition: 0.3s; }
                .footer-link-small:hover { color: var(--primary); }
                .social-icon-box { 
                    width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; 
                    border: 1px solid var(--white-alpha); color: var(--text-grey); transition: 0.4s; 
                }
                .social-icon-box:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-5px); }
                @media (max-width: 900px) {
                    footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
                    footer .container > div:first-child > div:first-child { grid-column: span 2 !important; }
                }
                @media (max-width: 600px) {
                    footer .container > div:first-child { grid-template-columns: 1fr !important; }
                    footer .container > div:first-child > div:first-child { grid-column: span 1 !important; }
                }
            `}</style>
        </footer>
    );
};

function App() {
    const [view, setView] = useState("home");
    const [prefillService, setPrefillService] = useState("");
    const [works, setWorks] = useState(initialWorks);
    const [services, setServices] = useState(initialServices);

    useEffect(() => {
        const fetchData = async () => {
            const { data: worksData, error: worksError } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
            if (worksError) console.error('Error fetching portfolio:', worksError);
            if (worksData && worksData.length > 0) {
                setWorks(worksData);
            }
            
            const { data: servicesData, error: servicesError } = await supabase.from('services').select('*').order('created_at', { ascending: true });
            if (servicesError) console.error('Error fetching services:', servicesError);
            if (servicesData && servicesData.length > 0) {
                setServices(servicesData);
            }
        };
        fetchData();

        // Optional: Realtime subscription
        const worksSubscription = supabase.channel('portfolio_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio' }, () => fetchData())
            .subscribe();
            
        const servicesSubscription = supabase.channel('services_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => fetchData())
            .subscribe();

        return () => {
            supabase.removeChannel(worksSubscription);
            supabase.removeChannel(servicesSubscription);
        };
    }, []);

    useEffect(() => {
        const handleHash = () => {
            const homeItems = ['#about', '#services', '#portfolio', '#contact', '#home'];
            if (homeItems.includes(window.location.hash)) {
                setView("home");
                // Smooth scroll to section if hash exists
                const targetId = window.location.hash.substring(1);
                setTimeout(() => {
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else if (window.location.hash === '#gallery') {
                setView("gallery");
                window.scrollTo(0, 0);
            } else if (window.location.hash === '#insights') {
                setView("insights");
                window.scrollTo(0, 0);
            }
        };
        handleHash();
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    const handleEnquire = (service) => {
        setView("home");
        setPrefillService(service);
        // Small delay to ensure view transition completes before scrolling
        setTimeout(() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const toggleView = () => {
        const nextView = view === "home" ? "all-services" : "home";
        setView(nextView);
        window.scrollTo(0, 0);
    };

    const goToPortfolio = () => {
        setView("all-portfolio");
        window.scrollTo(0, 0);
    };


    const backFromPortfolio = () => {
        setView("home");
        window.location.hash = 'portfolio';
    };

    const goToAdmin = () => {
        setView("admin");
        window.scrollTo(0, 0);
    };

    return (
        <div style={{ position: 'relative' }}>
            {view !== "admin" && <Navbar onAdminClick={goToAdmin} />}
            <AnimatePresence mode="wait">
                {view === "home" && (
                    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Hero />
                        <About />
                        <Services services={services} onEnquire={handleEnquire} onViewAll={toggleView} />
                        <Portfolio works={works} onViewAll={goToPortfolio} />
                        <Contact prefillService={prefillService} />

                    </motion.div>
                )}
                {view === "all-services" && (
                    <ServicesDetail key="detail" services={services} onBack={toggleView} onEnquire={handleEnquire} />
                )}
                {view === "all-portfolio" && (
                    <PortfolioDetail key="portfolio-detail" works={works} onBack={backFromPortfolio} />
                )}
                {view === "gallery" && (
                    <PhotoGallery key="gallery" onBack={() => { setView("home"); window.location.hash = ""; }} />
                )}
                {view === "insights" && (
                    <Insights key="insights" onBack={() => { setView("home"); window.location.hash = ""; }} />
                )}
                {view === "admin" && (
                    <AdminPortal 
                        key="admin" 
                        works={works} 
                        setWorks={setWorks} 
                        services={services}
                        setServices={setServices}
                        onBack={() => setView("home")} 
                    />
                )}
            </AnimatePresence>
            {view !== "admin" && view !== "all-portfolio" && <Footer onAdminClick={goToAdmin} />}
        </div>
    )
}

export default App;
