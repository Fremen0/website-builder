// ========================================================
// Professional Template Data (Hybrid Absolute Positioning)
// Designed for a 1200px Canvas Width
// ========================================================

export const TEMPLATE_CATEGORIES = [
    { id: 'all', label: 'All Templates', icon: 'fas fa-th-large' },
    { id: 'business', label: 'Business', icon: 'fas fa-briefcase' },
    { id: 'portfolio', label: 'Portfolio', icon: 'fas fa-palette' },
    { id: 'store', label: 'Store', icon: 'fas fa-shopping-bag' },
    { id: 'restaurant', label: 'Restaurant', icon: 'fas fa-utensils' },
    { id: 'landing', label: 'Landing Page', icon: 'fas fa-rocket' },
];

export const TEMPLATES = [
    // ─────────────────── 1. Creative Agency ───────────────────
    {
        id: 'creative-agency',
        name: 'Creative Agency',
        category: 'business',
        description: 'A bold, modern agency website with dark theme and absolute positioning.',
        tags: ['agency', 'dark', 'modern', 'business'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
            accent: '#a78bfa',
            preview: [
                { type: 'bar', color: '#a78bfa', width: '60%', height: '10px', y: '18%' },
                { type: 'bar', color: 'rgba(167,139,250,0.4)', width: '40%', height: '7px', y: '32%' },
                { type: 'btn', color: '#a78bfa', width: '110px', height: '28px', y: '60%' },
            ]
        },
        components: [
            // Header
            { id: 1, type: 'heading', content: 'NEXUS.', style: { position: 'absolute', left: '40px', top: '30px', width: '150px', fontSize: '24px', fontWeight: '900', color: '#ffffff', letterSpacing: '2px', backgroundColor: 'transparent' } },
            { id: 2, type: 'text', content: 'Services        Work        About        Contact', style: { position: 'absolute', left: '750px', top: '35px', width: '400px', fontSize: '14px', color: '#d1d5db', letterSpacing: '1px', fontWeight: '600', display: 'flex', justifyContent: 'space-between' } },
            
            // Hero
            { id: 3, type: 'heading', content: 'WE BUILD\nDIGITAL\nEXPERIENCES.', style: { position: 'absolute', left: '40px', top: '180px', width: '550px', fontSize: '72px', fontWeight: '900', color: '#ffffff',  lineHeight: '1.05', letterSpacing: '-2px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' } },
            { id: 4, type: 'text', content: 'Award-winning creative agency specialized in branding, web design, and digital strategy. We help ambitious companies scale their vision.', style: { position: 'absolute', left: '40px', top: '480px', width: '450px', fontSize: '18px', color: '#a78bfa', lineHeight: '1.6', fontWeight: '400' } },
            { id: 5, type: 'button', content: 'View Our Work', style: { position: 'absolute', left: '40px', top: '590px', width: '200px', height: '56px', backgroundColor: '#a78bfa', color: '#0f0c29', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 12px 24px rgba(167,139,250,0.3)' } },
            
            // Decorative Elements & Images
            { id: 6, type: 'image', content: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '600px', top: '150px', width: '540px', height: '600px', borderRadius: '24px', objectFit: 'cover', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' } },
            { id: 7, type: 'text', content: '', style: { position: 'absolute', left: '550px', top: '650px', width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa 0%, #302b63 100%)', filter: 'blur(60px)', opacity: '0.6', zIndex: '-1' } },
            
            // Stats Section
            { id: 8, type: 'text', content: '150+', style: { position: 'absolute', left: '40px', top: '850px', width: '150px', fontSize: '48px', color: '#ffffff', fontWeight: '900' } },
            { id: 9, type: 'text', content: 'Projects Completed', style: { position: 'absolute', left: '40px', top: '910px', width: '150px', fontSize: '14px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase' } },

            { id: 10, type: 'text', content: '24', style: { position: 'absolute', left: '260px', top: '850px', width: '150px', fontSize: '48px', color: '#ffffff', fontWeight: '900' } },
            { id: 11, type: 'text', content: 'Industry Awards', style: { position: 'absolute', left: '260px', top: '910px', width: '150px', fontSize: '14px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase' } },
        ]
    },

    // ─────────────────── 2. Personal Portfolio ───────────────────
    {
        id: 'personal-portfolio',
        name: 'Minimal Portfolio',
        category: 'portfolio',
        description: 'Clean and minimal portfolio to showcase your work elegantly using spacious grids.',
        tags: ['portfolio', 'minimal', 'clean', 'creative'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            accent: '#6366f1',
            preview: [
                { type: 'circle', color: '#6366f1', size: '40px', x: '50%', y: '20%' },
                { type: 'bar', color: '#1e293b', width: '50%', height: '10px', y: '42%' },
            ]
        },
        components: [
            // Background Layer
            { id: 20, type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '1200px', backgroundColor: '#fafafa', zIndex: '-2' } },
            
            // Header
            { id: 21, type: 'heading', content: 'ar.', style: { position: 'absolute', left: '60px', top: '40px', width: '80px', fontSize: '32px', fontWeight: '900', color: '#111827', letterSpacing: '-1px' } },
            { id: 22, type: 'text', content: 'Say Hello  →', style: { position: 'absolute', left: '1000px', top: '45px', width: '120px', fontSize: '16px', color: '#111827', fontWeight: '700', cursor: 'pointer' } },

            // Hero
            { id: 23, type: 'heading', content: 'Alex Rivera', style: { position: 'absolute', left: '60px', top: '200px', width: '600px', fontSize: '84px', fontWeight: '800', color: '#111827', letterSpacing: '-3px', lineHeight: '1' } },
            { id: 24, type: 'text', content: 'UI/UX Designer & Creative Developer', style: { position: 'absolute', left: '65px', top: '300px', width: '400px', fontSize: '20px', color: '#6366f1', fontWeight: '600', letterSpacing: '1px' } },
            { id: 25, type: 'text', content: 'Crafting digital experiences that merge functional design with aesthetic brilliance. Based in San Francisco, working globally.', style: { position: 'absolute', left: '65px', top: '350px', width: '450px', fontSize: '18px', color: '#4b5563', lineHeight: '1.7' } },
            
            // Decor
            { id: 26, type: 'text', content: '', style: { position: 'absolute', left: '65px', top: '450px', width: '60px', height: '4px', backgroundColor: '#6366f1', borderRadius: '2px' } },

            // Profile / Hero Image
            { id: 27, type: 'image', content: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '650px', top: '120px', width: '450px', height: '550px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' } },
            
            // Selected Works Section
            { id: 28, type: 'heading', content: 'Selected Works', style: { position: 'absolute', left: '60px', top: '750px', width: '400px', fontSize: '36px', fontWeight: '800', color: '#111827' } },
            
            // Work 1
            { id: 29, type: 'image', content: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80', style: { position: 'absolute', left: '60px', top: '830px', width: '500px', height: '350px', borderRadius: '12px', objectFit: 'cover' } },
            { id: 30, type: 'text', content: 'E-Commerce Redesign', style: { position: 'absolute', left: '60px', top: '1200px', width: '300px', fontSize: '20px', fontWeight: '700', color: '#111827' } },
            
            // Work 2
            { id: 31, type: 'image', content: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80', style: { position: 'absolute', left: '600px', top: '830px', width: '500px', height: '350px', borderRadius: '12px', objectFit: 'cover' } },
            { id: 32, type: 'text', content: 'SaaS Dashboard', style: { position: 'absolute', left: '600px', top: '1200px', width: '300px', fontSize: '20px', fontWeight: '700', color: '#111827' } },
        ]
    },

    // ─────────────────── 3. E-Commerce Store ───────────────────
    {
        id: 'ecommerce-store',
        name: 'Luxe E-Commerce',
        category: 'store',
        description: 'A sleek, premium online store aesthetic with large typography and grid placements.',
        tags: ['store', 'ecommerce', 'shop', 'premium'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #fff, #f1f5f9)',
            accent: '#f59e0b',
            preview: [
                { type: 'bar', color: '#0f172a', width: '100%', height: '18px', y: '0%' },
            ]
        },
        components: [
            // Top Bar
            { id: 40, type: 'text', content: 'FREE WORLDWIDE SHIPPING ON ORDERS OVER $150', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '40px', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '12px', fontWeight: '600', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            
            // Nav
            { id: 41, type: 'heading', content: 'V E L U R E', style: { position: 'absolute', left: '500px', top: '70px', width: '200px', fontSize: '28px', fontWeight: '900', color: '#0f172a', textAlign: 'center', letterSpacing: '4px' } },
            { id: 42, type: 'text', content: 'New-In    Brands    Clothing    Accessories', style: { position: 'absolute', left: '60px', top: '80px', width: '400px', fontSize: '14px', color: '#334155', fontWeight: '600', letterSpacing: '1px' } },
            { id: 43, type: 'text', content: 'Search    Account    Cart(0)', style: { position: 'absolute', left: '900px', top: '80px', width: '250px', fontSize: '14px', color: '#334155', fontWeight: '600', letterSpacing: '1px' } },

            // Big Hero Full Width
            { id: 44, type: 'image', content: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80', style: { position: 'absolute', left: '40px', top: '150px', width: '1120px', height: '550px', borderRadius: '0px', objectFit: 'cover' } },
            
            // Hero Overlay Box
            { id: 45, type: 'text', content: '', style: { position: 'absolute', left: '80px', top: '350px', width: '400px', height: '260px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(5px)' } },
            { id: 46, type: 'heading', content: 'Autumn\nCollection', style: { position: 'absolute', left: '110px', top: '390px', width: '300px', fontSize: '48px', fontWeight: '800', color: '#0f172a', lineHeight: '1.1' } },
            { id: 47, type: 'button', content: 'Shop Now', style: { position: 'absolute', left: '110px', top: '530px', width: '160px', height: '48px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' } },

            // Featured Categories
            { id: 48, type: 'heading', content: 'Curated Categories', style: { position: 'absolute', left: '40px', top: '780px', width: '400px', fontSize: '32px', fontWeight: '800', color: '#0f172a' } },
            
            // Cat 1
            { id: 49, type: 'image', content: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '40px', top: '850px', width: '350px', height: '450px', objectFit: 'cover' } },
            { id: 50, type: 'text', content: 'Women\'s Apparel', style: { position: 'absolute', left: '40px', top: '1320px', width: '350px', fontSize: '18px', fontWeight: '700', color: '#0f172a', textAlign: 'center' } },

            // Cat 2
            { id: 51, type: 'image', content: 'https://images.unsplash.com/photo-1490578474895-699bc4e3f44f?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '425px', top: '850px', width: '350px', height: '450px', objectFit: 'cover' } },
            { id: 52, type: 'text', content: 'Essentials', style: { position: 'absolute', left: '425px', top: '1320px', width: '350px', fontSize: '18px', fontWeight: '700', color: '#0f172a', textAlign: 'center' } },

            // Cat 3
            { id: 53, type: 'image', content: 'https://images.unsplash.com/photo-1511511450040-677116e4db3a?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '810px', top: '850px', width: '350px', height: '450px', objectFit: 'cover' } },
            { id: 54, type: 'text', content: 'Footwear', style: { position: 'absolute', left: '810px', top: '1320px', width: '350px', fontSize: '18px', fontWeight: '700', color: '#0f172a', textAlign: 'center' } },
        ]
    },
    
    // ─────────────────── 4. SaaS Landing Page ───────────────────
    {
        id: 'saas-landing',
        name: 'SaaS Software',
        category: 'landing',
        description: 'Vibrant, tech-focused layout with rounded corners and gradients.',
        tags: ['saas', 'software', 'tech', 'startup'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #f8fafc, #e0e7ff)',
            accent: '#4f46e5',
            preview: [
                { type: 'bar', color: '#4f46e5', width: '80%', height: '10px', y: '20%' },
            ]
        },
        components: [
            { id: 60, type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '1000px', background: 'radial-gradient(circle at 50% -20%, #e0e7ff 0%, #fafafa 60%)', zIndex: '-1' } },
            
            // Nav
            { id: 61, type: 'heading', content: 'SyncApp', style: { position: 'absolute', left: '50px', top: '35px', width: '150px', fontSize: '24px', fontWeight: '900', color: '#4f46e5' } },
            { id: 62, type: 'text', content: 'Product    Solutions    Pricing    Resources', style: { position: 'absolute', left: '400px', top: '40px', width: '400px', fontSize: '15px', color: '#475569', fontWeight: '600', align: 'center' } },
            { id: 63, type: 'button', content: 'Start Free Trial', style: { position: 'absolute', left: '980px', top: '25px', width: '160px', height: '46px', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '30px', fontWeight: '700', fontSize: '14px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(79,70,229,0.3)' } },

            // Hero
            { id: 64, type: 'text', content: '🎯 Announcing SyncApp 2.0 - Read the release notes →', style: { position: 'absolute', left: '350px', top: '130px', width: '500px', backgroundColor: '#ffffff', color: '#4f46e5', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e0e7ff' } },
            { id: 65, type: 'heading', content: 'Bring your team\'s\nwork together.', style: { position: 'absolute', left: '200px', top: '200px', width: '800px', fontSize: '72px', fontWeight: '900', color: '#0f172a', textAlign: 'center', lineHeight: '1.1', letterSpacing: '-2px' } },
            { id: 66, type: 'text', content: 'The fastest, most secure way to collaborate, manage projects, and hit your goals. Built for modern high-performing teams.', style: { position: 'absolute', left: '300px', top: '380px', width: '600px', fontSize: '20px', color: '#475569', textAlign: 'center', lineHeight: '1.6' } },
            
            // CTA
            { id: 67, type: 'button', content: 'Get Started for Free', style: { position: 'absolute', left: '400px', top: '480px', width: '200px', height: '54px', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '8px', fontWeight: '700', fontSize: '16px', border: 'none' } },
            { id: 68, type: 'button', content: 'Book a Demo', style: { position: 'absolute', left: '620px', top: '480px', width: '200px', height: '54px', backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '8px', fontWeight: '700', fontSize: '16px', border: '1px solid #cbd5e1' } },

            // Dashboard Image Mockup
            { id: 69, type: 'image', content: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', style: { position: 'absolute', left: '100px', top: '600px', width: '1000px', height: '500px', borderRadius: '24px', objectFit: 'cover', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '8px solid #ffffff' } },
        ]
    }
];

// ─────────────────── PREBUILT SECTIONS ───────────────────
export const PREBUILT_SECTIONS = [
    {
        id: 'section-hero',
        name: 'Hero Section (Absolute)',
        icon: 'fas fa-star',
        components: [
            { type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '600px', backgroundColor: '#f8fafc', zIndex: '-1' } },
            { type: 'heading', content: 'Transform Your Business', style: { position: 'absolute', left: '100px', top: '150px', width: '500px', fontSize: '56px', fontWeight: '800', color: '#111827', lineHeight: '1.1' } },
            { type: 'text', content: 'Build beautiful websites in minutes with our intuitive drag-and-drop designer.', style: { position: 'absolute', left: '100px', top: '300px', width: '450px', fontSize: '20px', color: '#4b5563', lineHeight: '1.6' } },
            { type: 'button', content: 'Start Building', style: { position: 'absolute', left: '100px', top: '400px', width: '180px', height: '50px', backgroundColor: '#6366f1', color: '#ffffff', borderRadius: '30px', border: 'none', fontWeight: '600', fontSize: '16px' } },
            { type: 'image', content: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '600px', top: '120px', width: '500px', height: '360px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' } }
        ]
    },
    {
        id: 'section-features',
        name: 'Features Grid (Absolute)',
        icon: 'fas fa-list',
        components: [
            { type: 'heading', content: 'Our Features', style: { position: 'absolute', left: '400px', top: '50px', width: '400px', fontSize: '36px', fontWeight: '800', color: '#1e293b', textAlign: 'center' } },
            
            { type: 'text', content: '', style: { position: 'absolute', left: '100px', top: '150px', width: '300px', height: '200px', backgroundColor: '#f1f5f9', borderRadius: '16px' } },
            { type: 'heading', content: '⚡ Fast Performance', style: { position: 'absolute', left: '120px', top: '180px', width: '260px', fontSize: '20px', fontWeight: '700', color: '#0f172a' } },
            { type: 'text', content: 'Optimized for speed and high conversion rates.', style: { position: 'absolute', left: '120px', top: '220px', width: '260px', fontSize: '16px', color: '#475569' } },

            { type: 'text', content: '', style: { position: 'absolute', left: '450px', top: '150px', width: '300px', height: '200px', backgroundColor: '#f1f5f9', borderRadius: '16px' } },
            { type: 'heading', content: '🔍 SEO Optimized', style: { position: 'absolute', left: '470px', top: '180px', width: '260px', fontSize: '20px', fontWeight: '700', color: '#0f172a' } },
            { type: 'text', content: 'Built-in tools to help you rank higher on Google.', style: { position: 'absolute', left: '470px', top: '220px', width: '260px', fontSize: '16px', color: '#475569' } },

            { type: 'text', content: '', style: { position: 'absolute', left: '800px', top: '150px', width: '300px', height: '200px', backgroundColor: '#f1f5f9', borderRadius: '16px' } },
            { type: 'heading', content: '📱 Mobile Ready', style: { position: 'absolute', left: '820px', top: '180px', width: '260px', fontSize: '20px', fontWeight: '700', color: '#0f172a' } },
            { type: 'text', content: 'Looks perfect on all screen sizes automatically.', style: { position: 'absolute', left: '820px', top: '220px', width: '260px', fontSize: '16px', color: '#475569' } },
        ]
    },
    {
        id: 'section-cta',
        name: 'Call to Action Bar',
        icon: 'fas fa-bullhorn',
        components: [
            { type: 'text', content: '', style: { position: 'absolute', left: '50px', top: '50px', width: '1100px', height: '300px', backgroundColor: '#4f46e5', borderRadius: '24px' } },
            { type: 'heading', content: 'Ready to modernize your workflow?', style: { position: 'absolute', left: '100px', top: '130px', width: '600px', fontSize: '40px', fontWeight: '800', color: '#ffffff', lineHeight: '1.2' } },
            { type: 'button', content: 'Get Started Now', style: { position: 'absolute', left: '850px', top: '160px', width: '200px', height: '56px', backgroundColor: '#ffffff', color: '#4f46e5', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '18px', cursor: 'pointer' } }
        ]
    }
];
