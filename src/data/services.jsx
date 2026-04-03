import React from 'react';
import { Mic, Globe, Tv, Video, Newspaper, Headphones, Users, Smartphone } from 'lucide-react';

export const initialServices = [
    { 
        id: 1, 
        iconName: 'Mic', 
        title: "Event Hosting / MC", 
        desc: "Setting the standard for energy and sophistication at high-end corporate events, weddings, and galas.",
        tagline: "High-Energy Presence",
        summary: "Setting the standard for energy and sophistication at high-end corporate events, weddings, and galas.",
        offerings: ["Corporate Events", "Event Launches", "Awards Night", "Conferences / Seminars", "Pageants", "Parties"],
        clients: ["High-net-worth individuals", "Luxury brands", "Global corporations"],
        booking: ["Date", "Event type", "Location", "Audience size"]
    },
    { 
        id: 2, 
        iconName: 'Globe', 
        title: "Panel Moderation", 
        desc: "Expert facilitation for international summits, focused conferences, and high-stakes executive dialogues.",
        tagline: "Expert Facilitation",
        summary: "Expert facilitation for international summits, focused conferences, and high-stakes executive dialogues.",
        offerings: ["International summits", "Corporate conferences", "Executive dialogues", "Political debates"],
        clients: ["Intergovernmental organizations", "Think tanks", "Corporate boards"],
        booking: ["Event theme", "Panelists overview", "Duration", "Platform"]
    },
    { 
        id: 3, 
        iconName: 'Tv', 
        title: "Media & Speaking Training", 
        desc: "Professional coaching for public speaking, camera presence, and effective media engagement for CEOs.",
        tagline: "Master the Camera",
        summary: "Professional training for individuals and groups to master public speaking and camera presence.",
        offerings: ["Media interview preparation", "News presentation coaching", "Public speaking", "Corporate media training"],
        clients: ["CEOs", "Entrepreneurs", "Students", "Spokespersons"],
        booking: ["Individual or group training", "Online or physical", "Duration"]
    },
    { 
        id: 4, 
        iconName: 'Video', 
        title: "Documentary Production", 
        desc: "End-to-end media production for cinematic documentaries and brand-focused visual storytelling.",
        tagline: "Cinematic Storytelling",
        summary: "Specialized media production for business spotlights and brand narratives.",
        offerings: ["Business documentary production", "Brand storytelling videos", "Corporate interviews", "Event coverage"],
        booking: ["Type of video", "Filming location", "Length of video", "Deadline"]
    },
    { 
        id: 5, 
        iconName: 'Newspaper', 
        title: "Advertisement", 
        desc: "Strategic brand placement and professional advertisement voice-overs for television, radio, and digital platforms.",
        tagline: "Brand Promotion",
        summary: "Strategic brand placement and professional advertisement voice-overs across all media platforms.",
        offerings: ["TV/Radio Advertisements", "Digital Brand Features", "Voice-over Services", "Commercial Endorsements"],
        clients: ["Corporate brands", "Agencies", "Small to medium enterprises"],
        booking: ["Campaign type", "Platform", "Duration", "Script availability"]
    },
    { 
        id: 6, 
        iconName: 'Headphones', 
        title: "Podcast Interviews", 
        desc: "Deeply engaging broadcast host for guest interviews and sponsored brand feature episodes.",
        tagline: "Broadcast Engagement",
        summary: "Invite brands and entrepreneurs to Sarah's high-impact podcast series.",
        offerings: ["Guest interviews", "Brand feature episodes", "Sponsored podcast discussions"],
        booking: ["Guest name", "Topic", "Business/brand", "Preferred recording date"]
    },
    { 
        id: 7, 
        iconName: 'Users', 
        title: "Speaking Engagements", 
        desc: "Inspiring audiences on entrepreneurship, youth innovation, media, and personal branding.",
        tagline: "Inspirational Voice",
        summary: "Book Sarah to inspire your audience on innovation, media, and branding.",
        offerings: ["Entrepreneurship", "Youth and innovation", "Media and journalism", "Personal branding", "Business storytelling"],
        booking: ["Topic", "Audience", "Event type", "Duration"]
    },
    { 
        id: 8, 
        iconName: 'Smartphone', 
        title: "Brand Content Creation", 
        desc: "Curated content creation and digital brand features for high-profile partners and media houses.",
        tagline: "Business-Focused Content",
        summary: "Strategic content creation for brands looking to leverage editorial expertise.",
        offerings: ["Business explainers", "Industry analysis", "Brand storytelling", "Promotional interviews"],
        booking: ["Campaign goals", "Platform target", "Deliverables", "Timeline"]
    }
];

export const getIcon = (iconName, size = 24) => {
    switch (iconName) {
        case 'Mic': return <Mic size={size} />;
        case 'Globe': return <Globe size={size} />;
        case 'Tv': return <Tv size={size} />;
        case 'Video': return <Video size={size} />;
        case 'Newspaper': return <Newspaper size={size} />;
        case 'Headphones': return <Headphones size={size} />;
        case 'Users': return <Users size={size} />;
        case 'Smartphone': return <Smartphone size={size} />;
        default: return <Mic size={size} />;
    }
};
