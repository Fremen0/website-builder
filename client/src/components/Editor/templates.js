export const INITIAL_TEMPLATES = [
    {
        id: 'landing-page',
        name: 'SaaS Hero',
        components: [
            { id: 1, type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '600px', backgroundColor: '#f8fafc', zIndex: '-1' } },
            { id: 2, type: 'heading', content: 'Design with Freedom', style: { position: 'absolute', left: '100px', top: '150px', width: '500px', fontSize: '56px', fontWeight: '800', color: '#111827', lineHeight: '1.1' } },
            { id: 3, type: 'text', content: 'Our new template engine allows absolute positioning, turning your canvas into an infinite playground.', style: { position: 'absolute', left: '100px', top: '300px', width: '450px', fontSize: '20px', color: '#4b5563', lineHeight: '1.6' } },
            { id: 4, type: 'button', content: 'Start Building', style: { position: 'absolute', left: '100px', top: '400px', width: '180px', height: '50px', backgroundColor: '#6366f1', color: '#ffffff', borderRadius: '30px', border: 'none', fontWeight: '600', fontSize: '16px', boxShadow: '0 4px 6px rgba(99, 102, 241, 0.2)' } },
            { id: 5, type: 'image', content: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '600px', top: '120px', width: '500px', height: '360px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' } }
        ]
    },
    {
        id: 'portfolio',
        name: 'Creative Portfolio',
        components: [
            { id: 30, type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '800px', backgroundColor: '#fafafa', zIndex: '-2' } },
            { id: 31, type: 'heading', content: 'Selected Works', style: { position: 'absolute', left: '60px', top: '60px', width: '400px', fontSize: '36px', fontWeight: '800', color: '#111827' } },
            { id: 32, type: 'image', content: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '60px', top: '150px', width: '500px', height: '350px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' } },
            { id: 33, type: 'image', content: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '600px', top: '150px', width: '500px', height: '350px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' } },
            { id: 34, type: 'text', content: 'Project Alpha', style: { position: 'absolute', left: '60px', top: '530px', width: '300px', fontSize: '20px', fontWeight: '700', color: '#111827' } },
            { id: 35, type: 'text', content: 'Project Beta', style: { position: 'absolute', left: '600px', top: '530px', width: '300px', fontSize: '20px', fontWeight: '700', color: '#111827' } }
        ]
    }
];

export const PREBUILT_SECTIONS = [
    {
        id: 'section-features',
        name: 'Features Box List',
        icon: 'fas fa-list',
        components: [
            { type: 'heading', content: 'Our Features', style: { position: 'absolute', left: '400px', top: '50px', width: '400px', fontSize: '36px', fontWeight: '800', color: '#1e293b', textAlign: 'center' } },
            { type: 'text', content: '', style: { position: 'absolute', left: '100px', top: '150px', width: '300px', height: '200px', backgroundColor: '#f1f5f9', borderRadius: '16px' } },
            { type: 'heading', content: '⚡ Speed', style: { position: 'absolute', left: '120px', top: '180px', width: '260px', fontSize: '20px', fontWeight: '700', color: '#0f172a' } },
            { type: 'text', content: '', style: { position: 'absolute', left: '450px', top: '150px', width: '300px', height: '200px', backgroundColor: '#f1f5f9', borderRadius: '16px' } },
            { type: 'heading', content: '🔍 SEO', style: { position: 'absolute', left: '470px', top: '180px', width: '260px', fontSize: '20px', fontWeight: '700', color: '#0f172a' } },
            { type: 'text', content: '', style: { position: 'absolute', left: '800px', top: '150px', width: '300px', height: '200px', backgroundColor: '#f1f5f9', borderRadius: '16px' } },
            { type: 'heading', content: '📱 Mobile', style: { position: 'absolute', left: '820px', top: '180px', width: '260px', fontSize: '20px', fontWeight: '700', color: '#0f172a' } }
        ]
    },
    {
        id: 'section-pricing',
        name: 'Pricing Table',
        icon: 'fas fa-tags',
        components: [
            { type: 'heading', content: 'Simple Pricing', style: { position: 'absolute', left: '400px', top: '60px', width: '400px', fontSize: '32px', fontWeight: '800', textAlign: 'center' } },
            { type: 'text', content: 'Choose the plan that fits your needs.', style: { position: 'absolute', left: '400px', top: '110px', width: '400px', fontSize: '18px', textAlign: 'center', color: '#64748b' } },
            { type: 'button', content: 'Pro Plan - $29/mo', style: { position: 'absolute', left: '450px', top: '180px', width: '300px', height: '60px', backgroundColor: '#6366f1', color: '#fff', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', border: 'none' } }
        ]
    }
];
