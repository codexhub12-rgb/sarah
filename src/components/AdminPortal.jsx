import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '../data/services.jsx';
import { 
    Trash2, Plus, LogOut, Save, X, Image as ImageIcon, 
    Calendar, Type, LayoutDashboard, Briefcase, Settings, 
    Search, Filter, ChevronRight, Edit3, Eye, MoreVertical, Menu, Mic, Upload
} from 'lucide-react';
import { supabase } from '../supabaseClient';

const AdminPortal = ({ works, setWorks, services, setServices, onBack }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [editingIndex, setEditingIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newWork, setNewWork] = useState({ title: '', type: '', date: '', img: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Services management state
    const [editingServiceIndex, setEditingServiceIndex] = useState(null);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [newService, setNewService] = useState({ title: '', desc: '', iconName: 'Mic' });

    // Handle initial login check
    const handleLogin = (e) => {
        e.preventDefault();
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'sarah2026';
        if (password === adminPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    const handleDelete = async (index) => {
        const item = works[index];
        if (window.confirm('Remove this project from the official portfolio?')) {
            if (item.id) {
                const { error } = await supabase.from('portfolio').delete().eq('id', item.id);
                if (error) {
                    console.error('Supabase Error:', error);
                    alert('Failed to delete from Cloud: ' + error.message);
                    return;
                }
            }
            const updatedWorks = works.filter((_, i) => i !== index);
            setWorks(updatedWorks);
        }
    };

    const handleAdd = async () => {
        if (!newWork.title || !newWork.type) return;
        
        try {
            // Sanitize payload: only send fields that exist in the database schema
            const payload = {
                title: newWork.title,
                type: newWork.type,
                date: newWork.date,
                img: newWork.img
            };

            const { data, error } = await supabase.from('portfolio').insert([payload]).select();
            
            if (error) throw error;

            if (data && data[0]) {
                setWorks([data[0], ...works]);
                setNewWork({ title: '', type: '', date: '', img: '' });
                setShowForm(false);
            }
        } catch (error) {
            console.error('Portfolio Add Error:', error);
            const isFetchError = error?.message?.toLowerCase().includes('fetch') || !error?.message;
            alert(`Failed to save to Cloud: ${error?.message || 'Network Error'}\n\n${isFetchError ? 'TIP: Both Cloudinary and Supabase seem to be blocked. Please DISABLE your Ad-blocker or try a different network/VPN.' : ''}`);
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewWork(works[index]);
        setShowForm(true);
    };

    const handleSaveEdit = async () => {
        const item = works[editingIndex];
        if (!item.id) return;

        try {
            // Sanitize payload: avoid sending primary key or auto-generated fields in the update body
            const payload = {
                title: newWork.title,
                type: newWork.type,
                date: newWork.date,
                img: newWork.img
            };

            const { error } = await supabase.from('portfolio').update(payload).eq('id', item.id);
            
            if (error) throw error;
            
            const updatedWorks = [...works];
            updatedWorks[editingIndex] = { ...item, ...payload };
            setWorks(updatedWorks);
            setEditingIndex(null);
            setNewWork({ title: '', type: '', date: '', img: '' });
            setShowForm(false);
        } catch (error) {
            console.error('Portfolio Update Error:', error);
            alert('Failed to update Cloud: ' + (error?.message || 'Network error or request blocked.'));
        }
    };

    // Service Actions
    const handleDeleteService = async (index) => {
        const item = services[index];
        if (window.confirm('Remove this service from your profile?')) {
            if (item.id) {
                const { error } = await supabase.from('services').delete().eq('id', item.id);
                if (error) {
                    console.error('Supabase Error:', error);
                    alert('Failed to delete Service from Cloud: ' + error.message);
                    return;
                }
            }
            const updated = services.filter((_, i) => i !== index);
            setServices(updated);
        }
    };

    const handleAddService = async () => {
        if (!newService.title || !newService.desc) return;
        
        try {
            const payload = {
                title: newService.title,
                desc: newService.desc,
                iconName: newService.iconName
            };

            const { data, error } = await supabase.from('services').insert([payload]).select();
            
            if (error) throw error;

            if (data && data[0]) {
                setServices([data[0], ...services]);
                setNewService({ title: '', desc: '', iconName: 'Mic' });
                setShowServiceForm(false);
            }
        } catch (error) {
            console.error('Service Add Error:', error);
            alert('Failed to save Service to Cloud: ' + (error?.message || 'Network error or request blocked.'));
        }
    };

    const handleEditService = (index) => {
        setEditingServiceIndex(index);
        setNewService(services[index]);
        setShowServiceForm(true);
    };

    const handleSaveServiceEdit = async () => {
        const item = services[editingServiceIndex];
        if (!item.id) return;

        try {
            const payload = {
                title: newService.title,
                desc: newService.desc,
                iconName: newService.iconName
            };

            const { error } = await supabase.from('services').update(payload).eq('id', item.id);
            
            if (error) throw error;
            
            const updated = [...services];
            updated[editingServiceIndex] = { ...item, ...payload };
            setServices(updated);
            setEditingServiceIndex(null);
            setNewService({ title: '', desc: '', iconName: 'Mic' });
            setShowServiceForm(false);
        } catch (error) {
            console.error('Service Update Error:', error);
            alert('Failed to update Service in Cloud: ' + (error?.message || 'Network error or request blocked.'));
        }
    };

    const openUploadWidget = () => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (cloudName === 'your_cloud_name' || !cloudName) {
            alert('Please configure your Cloudinary credentials in the .env file.');
            return;
        }

        window.cloudinary.openUploadWidget(
            {
                cloudName: cloudName,
                uploadPreset: uploadPreset,
                sources: ['local', 'url', 'camera'],
                showAdvancedOptions: false,
                cropping: true,
                multiple: false,
                defaultSource: 'local',
                styles: {
                    palette: {
                        window: '#03070d',
                        windowBorder: '#c5a059',
                        tabIcon: '#c5a059',
                        menuIcons: '#c5a059',
                        textDark: '#000000',
                        textLight: '#ffffff',
                        link: '#c5a059',
                        action: '#c5a059',
                        inactiveTabIcon: '#8892b0',
                        error: '#f44336',
                        inProgress: '#c5a059',
                        complete: '#4caf50',
                        sourceBg: '#050a14'
                    },
                    fonts: {
                        default: null,
                        "'Outfit', sans-serif": {
                            url: 'https://fonts.googleapis.com/css?family=Outfit',
                            active: true
                        }
                    }
                }
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    const imageUrl = result.info.secure_url || result.info.url;
                    console.log('Cloudinary Success:', imageUrl, result.info);
                    setNewWork(prev => ({ ...prev, img: imageUrl }));
                } else if (error) {
                    console.error('Cloudinary Error:', error);
                }
            }
        );
    };

    const filteredWorks = works.filter(w => 
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        w.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Close sidebar on tab change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [activeTab]);

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#03070d',
                padding: '20px'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel"
                    style={{ padding: '60px 40px', width: '100%', maxWidth: '400px', borderRadius: '12px', border: '1px solid rgba(197, 160, 89, 0.2)', textAlign: 'center' }}
                >
                    <div style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '4px', color: 'var(--gold-primary)', marginBottom: '8px' }}>
                        SEA<span style={{ color: 'var(--text-white)' }}> ADMIN</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text-slate)', marginBottom: '40px', letterSpacing: '2px' }}>RESTRICTED ACCESS</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--white-alpha)',
                                padding: '16px',
                                color: 'white',
                                borderRadius: '8px',
                                outline: 'none',
                                width: '100%',
                                fontSize: '16px',
                                textAlign: 'center'
                            }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Authorize</button>
                        <button type="button" onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-grey)', cursor: 'pointer', fontSize: '12px', opacity: 0.6 }}>Back to Site</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#03070d' }}>
            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="sidebar-overlay"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div style={{ padding: '0 32px', marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '3px', color: 'var(--gold-primary)' }}>
                        SEA<span style={{ color: 'var(--text-white)' }}> CRM</span>
                    </div>
                    <button className="mobile-only sidebar-close" onClick={() => setIsSidebarOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'white' }}>
                        <X size={24} />
                    </button>
                </div>

                <nav style={{ flex: 1 }}>
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
                        { id: 'portfolio', label: 'Portfolios', icon: <Briefcase size={20} /> },
                        { id: 'services', label: 'Services', icon: <Mic size={20} /> }
                    ].map(item => (
                        <div 
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
                            <span style={{ display: 'flex', alignItems: 'center' }}>{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div style={{ padding: '0 32px' }}>
                    <button 
                        onClick={onBack}
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            gap: '12px', 
                            color: 'var(--text-slate)', 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            fontSize: '14px',
                            padding: '12px 0',
                            width: 'fit-content'
                        }}
                    >
                        <LogOut size={18} /> Exit Portal
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button className="mobile-only menu-trigger" onClick={() => setIsSidebarOpen(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer' }}>
                            <Menu size={24} />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h1 style={{ fontSize: '24px', color: 'var(--text-white)', margin: 0 }}>
                                {activeTab === 'dashboard' ? 'Overview' : 
                                 activeTab === 'portfolio' ? 'Portfolios' : 
                                 activeTab === 'services' ? 'Services' : 'Settings'}
                            </h1>
                        </div>
                    </div>
                    
                    <div className="header-actions">
                        <div className="search-wrapper">
                            <Search size={18} className="search-icon" />
                            <input 
                                type="text" 
                                placeholder="Search inventory..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <div className="user-avatar"></div>
                    </div>
                </header>

                <div className="content-container">
                    <AnimatePresence mode="wait">
                        {activeTab === 'portfolio' && (
                            <motion.div key="portfolio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <div className="portfolio-toolbar">
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <div className="stat-pill">Total: {works.length}</div>
                                    </div>
                                    <button 
                                        onClick={() => { 
                                            setEditingIndex(null); 
                                            setNewWork({ title: '', type: services.length > 0 ? services[0].title : '', date: '', img: '' }); 
                                            setShowForm(true); 
                                        }}
                                        className="btn btn-primary create-btn"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <Plus size={18} /> <span className="desktop-only text-nowrap">Add Project</span>
                                    </button>
                                </div>

                                {/* Table / List View */}
                                <div className="glass-panel table-container">
                                    <table className="desktop-only-table">
                                        <thead>
                                            <tr>
                                                <th>Visual</th>
                                                <th>Project Details</th>
                                                <th>Timeline</th>
                                                <th style={{ textAlign: 'right' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredWorks.map((work, i) => (
                                                <tr key={i}>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <div className="table-img" style={{ backgroundImage: `url(${work.img})` }}></div>
                                                    </td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <div className="work-title">{work.title}</div>
                                                        <div className="work-type">{work.type}</div>
                                                    </td>
                                                    <td className="work-date" style={{ verticalAlign: 'middle' }}>{work.date}</td>
                                                    <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                                        <div className="action-group">
                                                            <button onClick={() => handleEdit(i)} className="icon-btn"><Edit3 size={16} /></button>
                                                            <button onClick={() => handleDelete(i)} className="icon-btn delete"><Trash2 size={16} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Mobile Cards */}
                                    <div className="mobile-only-list">
                                        {filteredWorks.map((work, i) => (
                                            <div key={i} className="mobile-work-card">
                                                <div className="card-visual" style={{ backgroundImage: `url(${work.img})` }}></div>
                                                <div className="card-info">
                                                    <h4>{work.title}</h4>
                                                    <p>{work.type} • {work.date}</p>
                                                </div>
                                                <div className="card-actions">
                                                    <button onClick={() => handleEdit(i)} className="icon-btn"><Edit3 size={16} /></button>
                                                    <button onClick={() => handleDelete(i)} className="icon-btn delete"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {filteredWorks.length === 0 && (
                                        <div className="empty-state">No entries found.</div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'services' && (
                            <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <div className="portfolio-toolbar">
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <div className="stat-pill">Active Services: {services.length}</div>
                                    </div>
                                    <button 
                                        onClick={() => { setEditingServiceIndex(null); setNewService({ title: '', desc: '', iconName: 'Mic' }); setShowServiceForm(true); }}
                                        className="btn btn-primary create-btn"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <Plus size={18} /> <span className="desktop-only text-nowrap">Add Service</span>
                                    </button>
                                </div>

                                <div className="glass-panel table-container">
                                    <table className="desktop-only-table">
                                        <thead>
                                            <tr>
                                                <th>Icon</th>
                                                <th>Service Name</th>
                                                <th>Description</th>
                                                <th style={{ textAlign: 'right' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.map((service, i) => (
                                                <tr key={service.id || i}>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <div style={{ color: 'var(--gold-primary)' }}>{getIcon(service.iconName, 20)}</div>
                                                    </td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <div className="work-title">{service.title}</div>
                                                    </td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <div style={{ fontSize: '13px', color: '#8892b0', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{service.desc}</div>
                                                    </td>
                                                    <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                                        <div className="action-group">
                                                            <button onClick={() => handleEditService(i)} className="icon-btn"><Edit3 size={16} /></button>
                                                            <button onClick={() => handleDeleteService(i)} className="icon-btn delete"><Trash2 size={16} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="mobile-only-list">
                                        {services.map((service, i) => (
                                            <div key={service.id || i} className="mobile-work-card">
                                                <div style={{ color: 'var(--gold-primary)', marginRight: '16px' }}>{getIcon(service.iconName, 24)}</div>
                                                <div className="card-info">
                                                    <h4>{service.title}</h4>
                                                </div>
                                                <div className="card-actions">
                                                    <button onClick={() => handleEditService(i)} className="icon-btn"><Edit3 size={16} /></button>
                                                    <button onClick={() => handleDeleteService(i)} className="icon-btn delete"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'dashboard' && (
                            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                {/* Welcome Hero */}
                                <div className="glass-panel" style={{ padding: '60px 40px', borderRadius: '12px', background: 'linear-gradient(90deg, rgba(10,25,47,0.8), rgba(0,0,0,0.5))', border: '1px solid var(--white-alpha)', textAlign: 'center' }}>
                                    <h2 style={{ fontSize: '32px', margin: 0, fontFamily: 'var(--font-display)', fontWeight: '600' }}>Welcome back, <span style={{ color: 'var(--gold-primary)' }}>Sarah.</span></h2>
                                </div>

                                {/* Quick Shortcuts */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                                    <button onClick={() => setActiveTab('portfolio')} className="btn btn-outline" style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', height: 'auto', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                                        <Briefcase size={28} style={{ color: 'var(--gold-primary)' }} />
                                        <span style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700' }}>Manage Projects</span>
                                    </button>
                                    <button onClick={() => { 
                                        setEditingIndex(null); 
                                        setNewWork({ title: '', type: services.length > 0 ? services[0].title : '', date: '', img: '' }); 
                                        setShowForm(true); 
                                    }} className="btn btn-outline" style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', height: 'auto', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                                        <Plus size={28} style={{ color: 'var(--gold-primary)' }} />
                                        <span style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700' }}>Add New Entry</span>
                                    </button>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Modal - Made Responsive */}
            <AnimatePresence>
                {showForm && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="modal-backdrop"
                        onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
                            className="glass-panel modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2 style={{ margin: 0 }}>{editingIndex !== null ? 'Edit Project' : 'New Project'}</h2>
                                <button onClick={() => setShowForm(false)} className="close-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={24} /></button>
                            </div>

                            <div className="form-stack">
                                <div className="field-group">
                                    <label>Project Title</label>
                                    <input value={newWork.title} onChange={(e) => setNewWork({...newWork, title: e.target.value})} placeholder="Title" />
                                </div>
                                <div className="field-group">
                                    <label>Category (Associated Service)</label>
                                    <select 
                                        value={newWork.type} 
                                        onChange={(e) => setNewWork({...newWork, type: e.target.value})}
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '12px', color: 'white', borderRadius: '6px' }}
                                    >
                                        <option value="">Select a Service</option>
                                        {services.map(service => (
                                            <option key={service.id} value={service.title}>{service.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field-row">
                                    <div className="field-group">
                                        <label>Date</label>
                                        <input value={newWork.date} onChange={(e) => setNewWork({...newWork, date: e.target.value})} placeholder="MAR 2026" />
                                    </div>
                                    <div className="field-group">
                                        <label>Image URL</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <input 
                                                value={newWork.img} 
                                                onChange={(e) => setNewWork({...newWork, img: e.target.value})} 
                                                placeholder="/hero.jpg" 
                                                style={{ flex: 1 }}
                                            />
                                            <button 
                                                type="button"
                                                onClick={openUploadWidget}
                                                className="btn btn-outline"
                                                style={{ 
                                                    width: '44px', 
                                                    height: '44px', 
                                                    padding: 0, 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}
                                                title="Upload to Cloudinary"
                                            >
                                                <Upload size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {newWork.img && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="field-group"
                                        >
                                            <label>Image Preview</label>
                                            <div style={{ 
                                                width: '100%', 
                                                height: '160px', 
                                                borderRadius: '8px', 
                                                overflow: 'hidden', 
                                                border: '1px solid rgba(197, 160, 89, 0.2)',
                                                background: 'rgba(0,0,0,0.3)',
                                                position: 'relative',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <img 
                                                    src={newWork.img} 
                                                    alt="Preview" 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onLoad={(e) => e.target.style.opacity = 1}
                                                    onError={(e) => {
                                                        e.target.style.opacity = 0;
                                                        // Instead of replacing innerHTML, we leave the background logic to show a subtle hint
                                                    }}
                                                />
                                                <div style={{ position: 'absolute', fontSize: '10px', color: '#8892b0', pointerEvents: 'none', textAlign: 'center', padding: '10px', zIndex: 0 }}>
                                                    If image doesn't appear, your browser may be blocking Cloudinary.
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '10px', color: 'var(--gold-soft)', marginTop: '4px', wordBreak: 'break-all', opacity: 0.6 }}>
                                                URL: {newWork.img}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="modal-actions">
                                    <button onClick={editingIndex !== null ? handleSaveEdit : handleAdd} className="btn btn-primary submit-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {editingIndex !== null ? 'Save Changes' : 'Create Project'}
                                    </button>
                                    <button onClick={() => setShowForm(false)} className="btn btn-outline" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Service Modal */}
            <AnimatePresence>
                {showServiceForm && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="modal-backdrop"
                        onClick={(e) => e.target === e.currentTarget && setShowServiceForm(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
                            className="glass-panel modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2 style={{ margin: 0 }}>{editingServiceIndex !== null ? 'Edit Service' : 'New Service'}</h2>
                                <button onClick={() => setShowServiceForm(false)} className="close-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={24} /></button>
                            </div>

                            <div className="form-stack">
                                <div className="field-group">
                                    <label>Service Title</label>
                                    <input value={newService.title} onChange={(e) => setNewService({...newService, title: e.target.value})} placeholder="e.g. Keynote Speaking" />
                                </div>
                                <div className="field-group">
                                    <label>Icon Choice</label>
                                    <select 
                                        value={newService.iconName} 
                                        onChange={(e) => setNewService({...newService, iconName: e.target.value})}
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '12px', color: 'white', borderRadius: '6px' }}
                                    >
                                        <option value="Mic">Mic</option>
                                        <option value="Globe">Globe</option>
                                        <option value="Tv">Tv</option>
                                        <option value="Video">Video</option>
                                        <option value="Newspaper">Newspaper</option>
                                        <option value="Headphones">Headphones</option>
                                        <option value="Users">Users</option>
                                        <option value="Smartphone">Smartphone</option>
                                    </select>
                                </div>
                                <div className="field-group">
                                    <label>Description</label>
                                    <textarea 
                                        value={newService.desc} 
                                        onChange={(e) => setNewService({...newService, desc: e.target.value})} 
                                        placeholder="Describe the value you bring..." 
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '12px', color: 'white', borderRadius: '6px', minHeight: '100px', resize: 'vertical' }}
                                    />
                                </div>

                                <div className="modal-actions">
                                    <button onClick={editingServiceIndex !== null ? handleSaveServiceEdit : handleAddService} className="btn btn-primary submit-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {editingServiceIndex !== null ? 'Save Changes' : 'Create Service'}
                                    </button>
                                    <button onClick={() => setShowServiceForm(false)} className="btn btn-outline" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                /* Base Styles */
                .admin-sidebar {
                    width: 280px; background: #050a14; border-right: 1px solid rgba(255,255,255,0.05);
                    display: flex; flex-direction: column; padding: 40px 0; position: fixed; height: 100vh;
                    z-index: 1000; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .admin-main { flex: 1; margin-left: 280px; background: #03070d; min-height: 100vh; position: relative; }
                .admin-header { height: 90px; padding: 0 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); position: sticky; top: 0; background: #03070d; z-index: 900; }
                .content-container { padding: 40px; max-width: 1400px; margin: 0 auto; width: 100%; }

                /* Sidebar Components */
                .nav-item { display: flex; align-items: center; gap: 16px; padding: 14px 32px; cursor: pointer; color: #8892b0; border-left: 3px solid transparent; transition: 0.3s; line-height: 1; }
                .nav-item:hover { color: #fff; background: rgba(255,255,255,0.02); }
                .nav-item.active { color: var(--gold-primary); background: rgba(197, 160, 89, 0.05); border-left-color: var(--gold-primary); font-weight: 600; }

                /* Header Actions */
                .header-actions { display: flex; gap: 24px; align-items: center; }
                .search-wrapper { position: relative; display: flex; align-items: center; }
                .search-icon { position: absolute; left: 14px; color: #8892b0; pointer-events: none; top: 50%; transform: translateY(-50%); display: flex; align-items: center; justify-content: center; }
                .search-input { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 10px 16px 10px 44px; color: white; border-radius: 6px; width: 240px; outline: none; transition: 0.3s; line-height: 1.5; height: 44px; }
                .search-input:focus { border-color: var(--gold-primary); width: 280px; }
                .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(45deg, #0a192f, #c5a059); border: 1px solid rgba(255,255,255,0.1); }

                /* Portfolio Tools */
                .portfolio-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .stat-pill { padding: 6px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; justify-content: center; height: 32px; }

                /* Table Styling */
                .table-container { border-radius: 12px; overflow: hidden; background: #050a14; }
                .desktop-only-table { width: 100%; border-collapse: collapse; text-align: left; }
                .desktop-only-table th { padding: 20px 24px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8892b0; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 700; }
                .desktop-only-table td { padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.03); vertical-align: middle; }
                .table-img { width: 56px; height: 40px; background-size: cover; background-position: center; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); }
                .work-title { font-size: 14px; font-weight: 500; color: #fff; margin-bottom: 4px; line-height: 1.2; }
                .work-type { font-size: 11px; color: var(--gold-soft); text-transform: uppercase; letter-spacing: 1px; line-height: 1; }
                .work-date { font-size: 12px; color: #8892b0; line-height: 1; }

                /* Action Buttons */
                .action-group { display: flex; gap: 8px; justify-content: flex-end; align-items: center; }
                .icon-btn { width: 34px; height: 34px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.05); background: transparent; color: #8892b0; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; padding: 0; }
                .icon-btn:hover { border-color: var(--gold-primary); color: var(--gold-primary); transform: translateY(-2px); }
                .icon-btn.delete:hover { border-color: #f44336; color: #f44336; }

                /* Dashboard Stats */
                .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
                .stat-card { padding: 32px; border-radius: 12px; display: flex; flex-direction: column; align-items: flex-start; }
                .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8892b0; margin: 0; }
                .stat-value { font-size: 32px; color: #c5a059; margin: 12px 0; font-family: var(--font-display); line-height: 1; }
                .stat-trend { font-size: 12px; color: #4caf50; font-weight: 500; margin: 0; }

                /* Modal Styling */
                .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(4px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; }
                .modal-content { width: 100%; max-width: 520px; padding: 40px; border-radius: 12px; border: 1px solid rgba(197, 160, 89, 0.2); }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .close-btn { background: none; border: none; color: #8892b0; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; padding: 0; }
                .close-btn:hover { color: #fff; }
                .form-stack { display: flex; flex-direction: column; gap: 20px; }
                .field-group label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--gold-primary); margin-bottom: 8px; line-height: 1; }
                .field-group input { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 12px 14px; color: #fff; border-radius: 6px; outline: none; transition: 0.3s; height: 44px; line-height: 1.5; }
                .field-group input:focus { border-color: var(--gold-primary); background: rgba(255,255,255,0.06); }
                .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .modal-actions { display: flex; gap: 14px; margin-top: 10px; }
                .submit-btn { flex: 2; padding: 0; height: 48px; }

                /* Utilities */
                .mobile-only { display: none; }
                .empty-state { padding: 60px; text-align: center; color: #8892b0; border-top: 1px solid rgba(255,255,255,0.05); }

                /* Responsive Breakpoints */
                @media (max-width: 991px) {
                    .admin-sidebar { transform: translateX(-100%); width: 260px; }
                    .admin-sidebar.open { transform: translateX(0); box-shadow: 20px 0 60px rgba(0,0,0,0.5); }
                    .admin-main { margin-left: 0; }
                    .admin-header { padding: 0 20px; }
                    .content-container { padding: 20px; }
                    .mobile-only { display: flex; align-items: center; justify-content: center; }
                    .menu-trigger { background: none; border: none; color: var(--gold-primary); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; }
                    .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 995; }
                    .search-input { width: 140px; padding-left: 36px; font-size: 13px; height: 36px; }
                    .search-input:focus { width: 180px; }
                    .header-actions { gap: 12px; }
                    .desktop-only { display: none; }
                    .desktop-only-table { display: none; }
                    .mobile-only-list { display: block; }
                    .mobile-work-card { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; gap: 16px; }
                    .card-visual { width: 60px; height: 60px; border-radius: 6px; background-size: cover; background-position: center; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.1); }
                    .card-info { flex: 1; min-width: 0; display: flex; flex-direction: column; justify-content: center; }
                    .card-info h4 { font-size: 14px; color: #fff; margin: 0 0 4px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; }
                    .card-info p { font-size: 12px; color: #8892b0; margin: 0; line-height: 1; }
                    .card-actions { display: flex; gap: 8px; align-items: center; }
                }

                @media (max-width: 600px) {
                    .field-row { grid-template-columns: 1fr; }
                    .modal-content { padding: 24px; margin-top: auto; border-radius: 20px 20px 0 0; }
                    .modal-backdrop { align-items: flex-end; padding: 0; }
                    .stat-value { font-size: 28px; }
                    .stat-card { padding: 24px; }
                    .status-row { flex-direction: column; align-items: flex-start; gap: 12px; }
                    .header-actions { display: none; }
                }
            `}</style>
        </div>
    );
};

export default AdminPortal;
