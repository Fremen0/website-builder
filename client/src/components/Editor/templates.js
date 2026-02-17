export const INITIAL_TEMPLATES = [
    {
        id: 'landing-page',
        name: 'Landing Page',
        components: [
            { id: 1, type: 'text', content: 'Welcome to Our Website', style: { fontSize: '42px', textAlign: 'center', fontWeight: '700', padding: '60px 20px', backgroundColor: '#f8f9fa', color: '#111827', margin: '0', fontFamily: 'Roboto, sans-serif' } },
            { id: 2, type: 'image', content: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', style: { width: '100%', height: 'auto', display: 'block', margin: '0' } },
            { id: 3, type: 'text', content: 'We provide the best services for you. Build your dream website today.', style: { fontSize: '20px', textAlign: 'center', padding: '40px 20px', color: '#4b5563', lineHeight: '1.6', fontFamily: 'Open Sans, sans-serif' } },
            { id: 4, type: 'button', content: 'Get Started', style: { backgroundColor: '#6366f1', color: '#fff', padding: '15px 40px', border: 'none', borderRadius: '30px', display: 'block', margin: '20px auto', cursor: 'pointer', textAlign: 'center', fontSize: '18px', fontWeight: '600', boxShadow: '0 4px 6px rgba(99, 102, 241, 0.2)' } }
        ]
    },
    {
        id: 'digital-resume',
        name: 'Digital Resume',
        components: [
            { id: 50, type: 'heading', content: 'John Doe', style: { fontSize: '48px', fontWeight: '900', color: '#1e293b', textAlign: 'center', padding: '40px 0 10px 0', margin: '0' } },
            { id: 51, type: 'text', content: 'Full Stack Developer & UI/UX Enthusiast', style: { fontSize: '18px', color: '#6366f1', textAlign: 'center', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '30px' } },
            { id: 52, type: 'divider', content: '', style: { width: '80px', height: '4px', backgroundColor: '#6366f1', margin: '0 auto 40px auto', borderRadius: '2px' } },
            { id: 53, type: 'text', content: 'Passionate about building scalable web applications and creating intuitive user experiences. Expert in React, Node.js, and Cloud Architecture.', style: { fontSize: '18px', lineHeight: '1.8', color: '#475569', textAlign: 'justify', padding: '20px 40px', backgroundColor: '#f8fafc', borderRadius: '12px', margin: '20px 40px' } },
            { id: 54, type: 'heading', content: 'Experience', style: { fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: '40px 40px 10px 40px', borderLeft: '4px solid #6366f1', paddingLeft: '15px' } },
            { id: 55, type: 'text', content: 'Senior Developer @ TechCorp (2020 - Present)\nBuilt and maintained high-performance microservices and responsive frontends.', style: { fontSize: '16px', color: '#334155', padding: '10px 40px 10px 55px', margin: '0' } },
            { id: 56, type: 'button', content: 'Download CV', style: { backgroundColor: '#1e293b', color: '#fff', padding: '12px 30px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'block', margin: '40px auto', fontSize: '16px', fontWeight: '600' } }
        ]
    },
    {
        id: 'portfolio',
        name: 'Creative Portfolio',
        components: [
            { id: 30, type: 'heading', content: 'My Creative Work', style: { fontSize: '36px', textAlign: 'center', margin: '40px 0', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#1e293b' } },
            { id: 32, type: 'image', content: 'https://images.unsplash.com/photo-1542641728-6ca359b085f4?auto=format&fit=crop&w=400&q=80', style: { width: '45%', display: 'inline-block', margin: '2%', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' } },
            { id: 33, type: 'image', content: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80', style: { width: '45%', display: 'inline-block', margin: '2%', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' } },
            { id: 34, type: 'text', content: 'Minimalist approach to design and functionality.', style: { textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '18px', fontStyle: 'italic' } }
        ]
    },
    {
        id: 'contact-page',
        name: 'Clean Contact',
        components: [
            { id: 20, type: 'heading', content: 'Get in Touch', style: { fontSize: '36px', textAlign: 'center', color: '#1e293b', padding: '40px 0', fontWeight: 'bold' } },
            { id: 21, type: 'text', content: 'Feel free to reach out for collaborations or just a friendly hello!', style: { textAlign: 'center', color: '#64748b', padding: '0 40px 40px 40px' } },
            { id: 22, type: 'input', content: 'Your Name', style: { width: '80%', display: 'block', margin: '0 auto 15px auto', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' } },
            { id: 23, type: 'input', content: 'Your Email', style: { width: '80%', display: 'block', margin: '0 auto 15px auto', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' } },
            { id: 24, type: 'button', content: 'Send Message', style: { width: '80%', display: 'block', margin: '20px auto', backgroundColor: '#6366f1', color: '#fff', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' } }
        ]
    }
];

export const PREBUILT_SECTIONS = [
    {
        id: 'section-hero',
        name: 'Hero Section',
        icon: 'fas fa-star',
        components: [
            { type: 'heading', content: 'Transform Your Business', style: { fontSize: '48px', fontWeight: '800', textAlign: 'center', padding: '60px 40px 10px 40px', color: '#111827', margin: '0' } },
            { type: 'text', content: 'Build beautiful websites in minutes with our intuitive drag-and-drop builder.', style: { fontSize: '20px', textAlign: 'center', padding: '10px 40px 30px 40px', color: '#4b5563', lineHeight: '1.6' } },
            { type: 'button', content: 'Start Building', style: { backgroundColor: '#6366f1', color: '#ffffff', padding: '15px 40px', border: 'none', borderRadius: '30px', display: 'block', margin: '0 auto 60px auto', cursor: 'pointer', fontSize: '18px', fontWeight: '600' } }
        ]
    },
    {
        id: 'section-features',
        name: 'Features Grid',
        icon: 'fas fa-list',
        components: [
            { type: 'heading', content: 'Our Features', style: { fontSize: '32px', fontWeight: 'bold', textAlign: 'center', padding: '40px 0 20px 0' } },
            { type: 'text', content: 'Fast Performance • SEO Optimized • Fully Responsive', style: { fontSize: '18px', textAlign: 'center', padding: '0 40px 40px 40px', color: '#6366f1', fontWeight: '600' } }
        ]
    },
    {
        id: 'section-footer',
        name: 'Modern Footer',
        icon: 'fas fa-window-minimize',
        components: [
            { type: 'divider', content: '', style: { width: '100%', height: '1px', backgroundColor: '#e2e8f0', margin: '40px 0' } },
            { type: 'text', content: '© 2024 Website Builder. All rights reserved.', style: { textAlign: 'center', padding: '20px', color: '#94a3b8', fontSize: '14px' } }
        ]
    }
];
