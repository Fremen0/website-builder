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
    { id: 'blog', label: 'Blog', icon: 'fas fa-newspaper' },
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
            { id: 6, type: 'image', content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '600px', top: '150px', width: '540px', height: '600px', borderRadius: '24px', objectFit: 'cover', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' } },
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
            { id: 27, type: 'image', content: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '650px', top: '120px', width: '450px', height: '550px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' } },
            
            // Selected Works Section
            { id: 28, type: 'heading', content: 'Selected Works', style: { position: 'absolute', left: '60px', top: '750px', width: '400px', fontSize: '36px', fontWeight: '800', color: '#111827' } },
            
            // Work 1
            { id: 29, type: 'image', content: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80', style: { position: 'absolute', left: '60px', top: '830px', width: '500px', height: '350px', borderRadius: '12px', objectFit: 'cover' } },
            { id: 30, type: 'text', content: 'E-Commerce Redesign', style: { position: 'absolute', left: '60px', top: '1200px', width: '300px', fontSize: '20px', fontWeight: '700', color: '#111827' } },
            
            // Work 2
            { id: 31, type: 'image', content: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80', style: { position: 'absolute', left: '600px', top: '830px', width: '500px', height: '350px', borderRadius: '12px', objectFit: 'cover' } },
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
            { id: 44, type: 'image', content: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?auto=format&fit=crop&w=1200&q=80', style: { position: 'absolute', left: '40px', top: '150px', width: '1120px', height: '550px', borderRadius: '0px', objectFit: 'cover' } },
            
            // Hero Overlay Box
            { id: 45, type: 'text', content: '', style: { position: 'absolute', left: '80px', top: '350px', width: '400px', height: '260px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(5px)' } },
            { id: 46, type: 'heading', content: 'Autumn\nCollection', style: { position: 'absolute', left: '110px', top: '390px', width: '300px', fontSize: '48px', fontWeight: '800', color: '#0f172a', lineHeight: '1.1' } },
            { id: 47, type: 'button', content: 'Shop Now', style: { position: 'absolute', left: '110px', top: '530px', width: '160px', height: '48px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' } },

            // Featured Categories
            { id: 48, type: 'heading', content: 'Curated Categories', style: { position: 'absolute', left: '40px', top: '780px', width: '400px', fontSize: '32px', fontWeight: '800', color: '#0f172a' } },
            
            // Cat 1
            { id: 49, type: 'image', content: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '40px', top: '850px', width: '350px', height: '450px', objectFit: 'cover' } },
            { id: 50, type: 'text', content: 'Women\'s Apparel', style: { position: 'absolute', left: '40px', top: '1320px', width: '350px', fontSize: '18px', fontWeight: '700', color: '#0f172a', textAlign: 'center' } },

            // Cat 2
            { id: 51, type: 'image', content: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '425px', top: '850px', width: '350px', height: '450px', objectFit: 'cover' } },
            { id: 52, type: 'text', content: 'Essentials', style: { position: 'absolute', left: '425px', top: '1320px', width: '350px', fontSize: '18px', fontWeight: '700', color: '#0f172a', textAlign: 'center' } },

            // Cat 3
            { id: 53, type: 'image', content: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '810px', top: '850px', width: '350px', height: '450px', objectFit: 'cover' } },
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
            { id: 69, type: 'image', content: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80', style: { position: 'absolute', left: '100px', top: '600px', width: '1000px', height: '500px', borderRadius: '24px', objectFit: 'cover', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '8px solid #ffffff' } },
        ]
    },

    // ─────────────────── 5. Modern Blog ───────────────────
    {
        id: 'blog-magazine',
        name: 'Modern Blog',
        category: 'blog',
        description: 'An editorial blog layout with featured hero post, trending sidebar, 3-column article grid, and newsletter box.',
        tags: ['blog', 'magazine', 'editorial', 'articles'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #ffffff, #f8fafc)',
            accent: '#0f172a',
            preview: [
                { type: 'bar', color: '#0f172a', width: '100%', height: '10px', y: '0%' },
                { type: 'bar', color: '#0f172a', width: '65%', height: '14px', y: '22%' },
                { type: 'bar', color: '#94a3b8', width: '45%', height: '7px', y: '42%' },
                { type: 'bar', color: '#6366f1', width: '30%', height: '7px', y: '55%' },
            ]
        },
        components: [
            // background
            { id: 100, type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '2500px', backgroundColor: '#ffffff', zIndex: '-2' } },
            // top bar
            { id: 101, type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '3px', backgroundColor: '#0f172a' } },
            // nav
            { id: 102, type: 'heading', content: 'The Journal', style: { position: 'absolute', left: '460px', top: '22px', width: '280px', fontSize: '28px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px', textAlign: 'center' } },
            { id: 103, type: 'text', content: 'Design   Tech   Culture   Travel   Opinion', style: { position: 'absolute', left: '270px', top: '68px', width: '660px', fontSize: '12px', color: '#64748b', fontWeight: '600', letterSpacing: '0.5px', textAlign: 'center' } },
            { id: 104, type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '96px', width: '1200px', height: '1px', backgroundColor: '#e2e8f0' } },
            // issue strip
            { id: 105, type: 'text', content: 'MARCH 2026  .  ISSUE 12', style: { position: 'absolute', left: '40px', top: '112px', width: '300px', fontSize: '10px', color: '#94a3b8', fontWeight: '700', letterSpacing: '2px' } },
            // featured image
            { id: 106, type: 'image', content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', style: { position: 'absolute', left: '40px', top: '142px', width: '720px', height: '440px', objectFit: 'cover', borderRadius: '4px' } },
            { id: 107, type: 'text', content: 'FEATURED', style: { position: 'absolute', left: '40px', top: '149px', width: '92px', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '10px', fontWeight: '800', letterSpacing: '2px', textAlign: 'center', padding: '5px 0' } },
            // featured text
            { id: 108, type: 'text', content: 'DESIGN', style: { position: 'absolute', left: '40px', top: '598px', width: '80px', fontSize: '11px', color: '#6366f1', fontWeight: '800', letterSpacing: '2px' } },
            { id: 109, type: 'heading', content: 'The Future of UI Design Is More Human Than Ever', style: { position: 'absolute', left: '40px', top: '618px', width: '620px', fontSize: '36px', fontWeight: '900', color: '#0f172a', lineHeight: '1.18', letterSpacing: '-0.5px' } },
            { id: 110, type: 'text', content: 'As AI tools become ubiquitous, the defining edge for designers is empathy — understanding context, emotion, and human nuance that no algorithm can replicate.', style: { position: 'absolute', left: '40px', top: '745px', width: '580px', fontSize: '16px', color: '#475569', lineHeight: '1.7' } },
            { id: 111, type: 'text', content: 'By Laura Chen  .  8 min read  .  March 11, 2026', style: { position: 'absolute', left: '40px', top: '828px', width: '450px', fontSize: '12px', color: '#94a3b8', fontWeight: '600' } },
            // sidebar divider
            { id: 112, type: 'text', content: '', style: { position: 'absolute', left: '790px', top: '142px', width: '1px', height: '730px', backgroundColor: '#e2e8f0' } },
            { id: 113, type: 'text', content: 'TRENDING NOW', style: { position: 'absolute', left: '820px', top: '142px', width: '340px', fontSize: '10px', color: '#0f172a', fontWeight: '800', letterSpacing: '2px', borderBottom: '2px solid #0f172a', paddingBottom: '8px' } },
            // sidebar item 1
            { id: 114, type: 'image', content: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&q=80', style: { position: 'absolute', left: '820px', top: '176px', width: '88px', height: '66px', objectFit: 'cover', borderRadius: '4px' } },
            { id: 115, type: 'text', content: 'TECH', style: { position: 'absolute', left: '920px', top: '180px', width: '200px', fontSize: '10px', color: '#6366f1', fontWeight: '800', letterSpacing: '1px' } },
            { id: 116, type: 'heading', content: 'How Dashboards Are Reshaping Decision-Making', style: { position: 'absolute', left: '920px', top: '196px', width: '220px', fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: '1.3' } },
            { id: 117, type: 'text', content: '5 min read', style: { position: 'absolute', left: '920px', top: '238px', width: '150px', fontSize: '11px', color: '#94a3b8' } },
            { id: 118, type: 'text', content: '', style: { position: 'absolute', left: '820px', top: '260px', width: '340px', height: '1px', backgroundColor: '#f1f5f9' } },
            // sidebar item 2
            { id: 119, type: 'image', content: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?auto=format&fit=crop&w=200&q=80', style: { position: 'absolute', left: '820px', top: '274px', width: '88px', height: '66px', objectFit: 'cover', borderRadius: '4px' } },
            { id: 120, type: 'text', content: 'CULTURE', style: { position: 'absolute', left: '920px', top: '278px', width: '200px', fontSize: '10px', color: '#ec4899', fontWeight: '800', letterSpacing: '1px' } },
            { id: 121, type: 'heading', content: 'Why Minimalist Spaces Are Trending Globally', style: { position: 'absolute', left: '920px', top: '294px', width: '220px', fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: '1.3' } },
            { id: 122, type: 'text', content: '4 min read', style: { position: 'absolute', left: '920px', top: '336px', width: '150px', fontSize: '11px', color: '#94a3b8' } },
            { id: 123, type: 'text', content: '', style: { position: 'absolute', left: '820px', top: '358px', width: '340px', height: '1px', backgroundColor: '#f1f5f9' } },
            // sidebar item 3
            { id: 124, type: 'image', content: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80', style: { position: 'absolute', left: '820px', top: '372px', width: '88px', height: '66px', objectFit: 'cover', borderRadius: '4px' } },
            { id: 125, type: 'text', content: 'STYLE', style: { position: 'absolute', left: '920px', top: '376px', width: '200px', fontSize: '10px', color: '#f59e0b', fontWeight: '800', letterSpacing: '1px' } },
            { id: 126, type: 'heading', content: 'Products Redefining Modern Everyday Carry', style: { position: 'absolute', left: '920px', top: '392px', width: '220px', fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: '1.3' } },
            { id: 127, type: 'text', content: '3 min read', style: { position: 'absolute', left: '920px', top: '432px', width: '150px', fontSize: '11px', color: '#94a3b8' } },
            // newsletter box
            { id: 128, type: 'text', content: '', style: { position: 'absolute', left: '820px', top: '502px', width: '340px', height: '210px', backgroundColor: '#0f172a', borderRadius: '8px' } },
            { id: 129, type: 'heading', content: 'Get stories delivered daily.', style: { position: 'absolute', left: '844px', top: '524px', width: '290px', fontSize: '20px', fontWeight: '800', color: '#ffffff', lineHeight: '1.3' } },
            { id: 130, type: 'text', content: 'Join 42,000+ readers who get the best of the web every morning.', style: { position: 'absolute', left: '844px', top: '582px', width: '290px', fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' } },
            { id: 131, type: 'button', content: 'Subscribe Free', style: { position: 'absolute', left: '844px', top: '638px', width: '185px', height: '40px', backgroundColor: '#6366f1', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' } },
            // articles section header
            { id: 132, type: 'text', content: '', style: { position: 'absolute', left: '40px', top: '900px', width: '1120px', height: '1px', backgroundColor: '#e2e8f0' } },
            { id: 133, type: 'heading', content: 'Latest Articles', style: { position: 'absolute', left: '40px', top: '922px', width: '400px', fontSize: '20px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' } },
            { id: 134, type: 'text', content: 'View all', style: { position: 'absolute', left: '1060px', top: '928px', width: '100px', fontSize: '13px', color: '#6366f1', fontWeight: '700', cursor: 'pointer' } },
            // card 1
            { id: 135, type: 'image', content: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '40px', top: '966px', width: '350px', height: '210px', borderRadius: '6px', objectFit: 'cover' } },
            { id: 136, type: 'text', content: 'DEVELOPMENT', style: { position: 'absolute', left: '40px', top: '1190px', width: '200px', fontSize: '10px', color: '#6366f1', fontWeight: '800', letterSpacing: '2px' } },
            { id: 137, type: 'heading', content: 'Why Every Frontend Dev Should Learn Design Systems', style: { position: 'absolute', left: '40px', top: '1208px', width: '350px', fontSize: '17px', fontWeight: '800', color: '#0f172a', lineHeight: '1.35' } },
            { id: 138, type: 'text', content: 'Consistency at scale starts with a shared visual language between designers and engineers.', style: { position: 'absolute', left: '40px', top: '1272px', width: '350px', fontSize: '14px', color: '#64748b', lineHeight: '1.6' } },
            { id: 139, type: 'text', content: 'March 10  .  6 min read', style: { position: 'absolute', left: '40px', top: '1340px', width: '220px', fontSize: '11px', color: '#94a3b8', fontWeight: '600' } },
            // card 2
            { id: 140, type: 'image', content: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '425px', top: '966px', width: '350px', height: '210px', borderRadius: '6px', objectFit: 'cover' } },
            { id: 141, type: 'text', content: 'UX RESEARCH', style: { position: 'absolute', left: '425px', top: '1190px', width: '200px', fontSize: '10px', color: '#ec4899', fontWeight: '800', letterSpacing: '2px' } },
            { id: 142, type: 'heading', content: 'The Art of Asking the Right Question in User Interviews', style: { position: 'absolute', left: '425px', top: '1208px', width: '350px', fontSize: '17px', fontWeight: '800', color: '#0f172a', lineHeight: '1.35' } },
            { id: 143, type: 'text', content: 'Great research is not just about listening. It is about knowing what to listen for.', style: { position: 'absolute', left: '425px', top: '1272px', width: '350px', fontSize: '14px', color: '#64748b', lineHeight: '1.6' } },
            { id: 144, type: 'text', content: 'March 9  .  5 min read', style: { position: 'absolute', left: '425px', top: '1340px', width: '220px', fontSize: '11px', color: '#94a3b8', fontWeight: '600' } },
            // card 3
            { id: 145, type: 'image', content: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '810px', top: '966px', width: '350px', height: '210px', borderRadius: '6px', objectFit: 'cover' } },
            { id: 146, type: 'text', content: 'PRODUCTIVITY', style: { position: 'absolute', left: '810px', top: '1190px', width: '200px', fontSize: '10px', color: '#f59e0b', fontWeight: '800', letterSpacing: '2px' } },
            { id: 147, type: 'heading', content: 'Time Is a System: Structure Your Week Like a Pro', style: { position: 'absolute', left: '810px', top: '1208px', width: '350px', fontSize: '17px', fontWeight: '800', color: '#0f172a', lineHeight: '1.35' } },
            { id: 148, type: 'text', content: 'The highest performers do not manage time. They architect it into repeatable, intentional systems.', style: { position: 'absolute', left: '810px', top: '1272px', width: '350px', fontSize: '14px', color: '#64748b', lineHeight: '1.6' } },
            { id: 149, type: 'text', content: 'March 8  .  7 min read', style: { position: 'absolute', left: '810px', top: '1340px', width: '220px', fontSize: '11px', color: '#94a3b8', fontWeight: '600' } },
            // footer
            { id: 150, type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '1400px', width: '1200px', height: '1px', backgroundColor: '#e2e8f0' } },
            { id: 151, type: 'heading', content: 'The Journal', style: { position: 'absolute', left: '40px', top: '1428px', width: '180px', fontSize: '20px', fontWeight: '900', color: '#0f172a' } },
            { id: 152, type: 'text', content: 'Independent editorial. No ads. No paywalls.', style: { position: 'absolute', left: '40px', top: '1460px', width: '360px', fontSize: '14px', color: '#64748b' } },
            { id: 153, type: 'text', content: 'Design  .  Tech  .  Culture  .  Travel  .  About  .  Contact', style: { position: 'absolute', left: '450px', top: '1440px', width: '710px', fontSize: '13px', color: '#94a3b8', fontWeight: '600', textAlign: 'right' } },
            { id: 154, type: 'text', content: '2026 The Journal. All rights reserved.', style: { position: 'absolute', left: '40px', top: '1502px', width: '500px', fontSize: '12px', color: '#cbd5e1' } },
        ]
    },
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
            { type: 'image', content: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '600px', top: '120px', width: '500px', height: '360px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' } }
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
