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
            // ─── Background & Layout ───
            { id: 20, type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '1800px', background: 'radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.05) 0%, #ffffff 50%)', zIndex: '-2' } },
            
            // ─── Header ───
            { id: 21, type: 'heading', content: 'AR.', style: { position: 'absolute', left: '60px', top: '40px', width: '80px', fontSize: '28px', fontWeight: '900', color: '#111827', letterSpacing: '-1.5px' } },
            { id: 22, type: 'text', content: 'Work      About      Services      Contact', style: { position: 'absolute', left: '720px', top: '45px', width: '300px', fontSize: '13px', color: '#6b7280', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' } },
            { id: 23, type: 'button', content: 'Let\'s Talk', style: { position: 'absolute', left: '1040px', top: '35px', width: '100px', height: '40px', backgroundColor: '#111827', color: '#ffffff', borderRadius: '4px', fontSize: '13px', fontWeight: '700', border: 'none' } },

            // ─── Hero Section ───
            { id: 24, type: 'heading', content: 'Designing digital\nproducts with impact.', style: { position: 'absolute', left: '60px', top: '160px', width: '650px', fontSize: '72px', fontWeight: '900', color: '#111827', letterSpacing: '-3px', lineHeight: '1.05' } },
            { id: 25, type: 'text', content: 'Alex Rivera — Independent UI/UX Designer', style: { position: 'absolute', left: '65px', top: '380px', width: '450px', fontSize: '16px', color: '#6366f1', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' } },
            { id: 26, type: 'text', content: 'I specialize in creating high-end digital experiences for startups and established brands. Currently shaping the future of decentralized finance at Nexus.', style: { position: 'absolute', left: '65px', top: '430px', width: '480px', fontSize: '18px', color: '#4b5563', lineHeight: '1.7', fontWeight: '400' } },
            
            // Decorative Element
            { id: 27, type: 'text', content: '', style: { position: 'absolute', left: '65px', top: '560px', width: '80px', height: '2px', backgroundColor: '#e5e7eb' } },

            // Main Visual
            { id: 28, type: 'image', content: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '620px', top: '150px', width: '520px', height: '650px', borderRadius: '8px', objectFit: 'cover', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.12)' } },
            { id: 29, type: 'text', content: '', style: { position: 'absolute', left: '580px', top: '700px', width: '120px', height: '120px', backgroundColor: '#6366f1', borderRadius: '50%', opacity: '0.1', zIndex: '-1', filter: 'blur(40px)' } },
            
            // ─── Process / Services ───
            { id: 30, type: 'heading', content: 'Capabilities', style: { position: 'absolute', left: '60px', top: '920px', width: '200px', fontSize: '14px', fontWeight: '800', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' } },
            { id: 31, type: 'heading', content: 'Product Strategy . UI/UX Design . Prototyping . Interaction Design', style: { position: 'absolute', left: '60px', top: '960px', width: '1080px', fontSize: '28px', fontWeight: '800', color: '#111827', letterSpacing: '-1px' } },

            // ─── Case Studies ───
            { id: 32, type: 'heading', content: 'Selected Works', style: { position: 'absolute', left: '60px', top: '1120px', width: '400px', fontSize: '42px', fontWeight: '900', color: '#111827', letterSpacing: '-1.5px' } },
            
            // Work Card 1
            { id: 33, type: 'image', content: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '60px', top: '1220px', width: '510px', height: '400px', borderRadius: '4px', objectFit: 'cover' } },
            { id: 34, type: 'text', content: '01. FinTech Dashboard', style: { position: 'absolute', left: '60px', top: '1640px', width: '300px', fontSize: '20px', fontWeight: '800', color: '#111827' } },
            { id: 35, type: 'text', content: 'UX Research & Interface Design', style: { position: 'absolute', left: '60px', top: '1675px', width: '300px', fontSize: '14px', color: '#6b7280', fontWeight: '600' } },
            
            // Work Card 2
            { id: 36, type: 'image', content: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '630px', top: '1220px', width: '510px', height: '400px', borderRadius: '4px', objectFit: 'cover' } },
            { id: 37, type: 'text', content: '02. Crypto Wallet', style: { position: 'absolute', left: '630px', top: '1640px', width: '300px', fontSize: '20px', fontWeight: '800', color: '#111827' } },
            { id: 38, type: 'text', content: 'Visual Identity & Mobile App', style: { position: 'absolute', left: '630px', top: '1675px', width: '300px', fontSize: '14px', color: '#6b7280', fontWeight: '600' } },

            // ─── Footer ───
            { id: 39, type: 'text', content: '© 2026 Alex Rivera. Built with SiteCraft.', style: { position: 'absolute', left: '60px', top: '1750px', width: '1080px', fontSize: '12px', color: '#94a3b8', fontWeight: '600', borderTop: '1px solid #f1f5f9', paddingTop: '30px', textAlign: 'center' } },
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
            { id: 44, type: 'image', content: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80', style: { position: 'absolute', left: '40px', top: '150px', width: '1120px', height: '550px', borderRadius: '0px', objectFit: 'cover' } },
            
            // Hero Overlay Box
            { id: 45, type: 'text', content: '', style: { position: 'absolute', left: '80px', top: '350px', width: '400px', height: '260px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(5px)' } },
            { id: 46, type: 'heading', content: 'Autumn\nCollection', style: { position: 'absolute', left: '110px', top: '390px', width: '300px', fontSize: '48px', fontWeight: '800', color: '#0f172a', lineHeight: '1.1' } },
            { id: 47, type: 'button', content: 'Shop Now', style: { position: 'absolute', left: '110px', top: '530px', width: '160px', height: '48px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' } },

            // Featured Categories
            { id: 48, type: 'heading', content: 'Curated Categories', style: { position: 'absolute', left: '40px', top: '780px', width: '400px', fontSize: '32px', fontWeight: '800', color: '#0f172a' } },
            
            // Cat 1
            { id: 49, type: 'image', content: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '40px', top: '850px', width: '350px', height: '450px', objectFit: 'cover' } },
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
            { id: 119, type: 'image', content: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80', style: { position: 'absolute', left: '820px', top: '274px', width: '88px', height: '66px', objectFit: 'cover', borderRadius: '4px' } },
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

    // ─────────────────── 6. Travel Explorer Blog ───────────────────
    {
        id: 'travel-explorer',
        name: 'Travel Explorer',
        category: 'blog',
        description: 'A visual-heavy travel blog template with large images and elegant serif typography.',
        tags: ['blog', 'travel', 'photo', 'editorial'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #fdfbfb, #ebedee)',
            accent: '#059669',
            preview: [
                { type: 'bar', color: '#059669', width: '90%', height: '15px', y: '20%' },
                { type: 'bar', color: '#10b981', width: '50%', height: '10px', y: '40%' },
            ]
        },
        components: [
            { id: 200, type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '1800px', backgroundColor: '#ffffff', zIndex: '-2' } },
            
            // Header
            { id: 201, type: 'heading', content: 'WANDERLUST', style: { position: 'absolute', left: '0px', top: '40px', width: '1200px', fontSize: '24px', fontWeight: '900', color: '#0f172a', letterSpacing: '8px', textAlign: 'center', fontFamily: 'serif' } },
            { id: 202, type: 'text', content: 'JOURNAL      DESTINATIONS      GUIDES      ABOUT', style: { position: 'absolute', left: '0px', top: '85px', width: '1200px', fontSize: '12px', color: '#64748b', fontWeight: '600', letterSpacing: '2px', textAlign: 'center' } },

            // Big Visual Hero
            { id: 203, type: 'image', content: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', style: { position: 'absolute', left: '60px', top: '150px', width: '1080px', height: '600px', borderRadius: '12px', objectFit: 'cover' } },
            { id: 204, type: 'text', content: 'LATEST STORY', style: { position: 'absolute', left: '100px', top: '190px', width: '150px', backgroundColor: 'rgba(255,255,255,0.9)', color: '#059669', fontSize: '11px', fontWeight: '900', letterSpacing: '2px', textAlign: 'center', padding: '6px 0', borderRadius: '4px' } },
            
            // Hero Title Overlay
            { id: 205, type: 'text', content: '', style: { position: 'absolute', left: '300px', top: '550px', width: '600px', height: '220px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
            { id: 206, type: 'heading', content: 'Hidden Gems of the\nAmalfi Coast', style: { position: 'absolute', left: '320px', top: '580px', width: '560px', fontSize: '42px', fontWeight: '900', color: '#0f172a', textAlign: 'center', fontFamily: 'serif', lineHeight: '1.2' } },
            { id: 207, type: 'text', content: 'Discovering the silent villages tucked away from the crowds.', style: { position: 'absolute', left: '320px', top: '690px', width: '560px', fontSize: '16px', color: '#64748b', textAlign: 'center' } },
            { id: 208, type: 'text', content: 'Read More', style: { position: 'absolute', left: '550px', top: '730px', width: '100px', fontSize: '14px', color: '#059669', fontWeight: '700', borderBottom: '2px solid #059669', cursor: 'pointer', textAlign: 'center' } },

            // Split Section
            { id: 209, type: 'image', content: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80', style: { position: 'absolute', left: '60px', top: '850px', width: '500px', height: '650px', borderRadius: '12px', objectFit: 'cover' } },
            { id: 210, type: 'heading', content: 'The Magic of\nSwiss Peaks', style: { position: 'absolute', left: '620px', top: '950px', width: '450px', fontSize: '36px', fontWeight: '900', color: '#0f172a', fontFamily: 'serif' } },
            { id: 211, type: 'text', content: 'There is a certain stillness found only at 3,000 meters. The air is thinner, the light is sharper, and the world feels infinitely larger than the one we leave behind in the valley below.', style: { position: 'absolute', left: '620px', top: '1060px', width: '450px', fontSize: '18px', color: '#4b5563', lineHeight: '1.8' } },
            { id: 212, type: 'button', content: 'Explore the Alps', style: { position: 'absolute', left: '620px', top: '1220px', width: '200px', height: '54px', backgroundColor: '#0f172a', color: '#ffffff', borderRadius: '4px', border: 'none', fontWeight: '600' } }
        ]
    },

    // ─────────────────── 7. The Modern Blogger (Multi-Page Pack) ───────────────────
    {
        id: 'modern-blogger-pack',
        name: 'The Modern Blogger (Full Pack)',
        category: 'blog',
        description: 'A complete blog setup with Home, Single Post, and About pages pre-configured.',
        tags: ['blog', 'multi-page', 'pack', 'editorial'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            accent: '#6366f1',
            preview: [
                { type: 'bar', color: '#6366f1', width: '80%', height: '12px', y: '20%' },
                { type: 'bar', color: '#94a3b8', width: '40%', height: '8px', y: '40%' },
                { type: 'bar', color: '#94a3b8', width: '40%', height: '8px', y: '55%' },
            ]
        },
        pages: [
            {
                id: 'home',
                name: 'Home',
                path: '/',
                components: [
                    { type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '1500px', backgroundColor: '#ffffff', zIndex: '-2' } },
                    // Header
                    { type: 'heading', content: 'INSIGHTS.', style: { position: 'absolute', left: '60px', top: '40px', width: '200px', fontSize: '28px', fontWeight: '900', color: '#0f172a', letterSpacing: '-1px' } },
                    { type: 'text', content: 'Home      Articles      About      Search', style: { position: 'absolute', left: '800px', top: '50px', width: '340px', fontSize: '13px', color: '#64748b', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' } },
                    
                    // Featured Post
                    { type: 'image', content: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80', style: { position: 'absolute', left: '60px', top: '120px', width: '1080px', height: '500px', borderRadius: '24px', objectFit: 'cover' } },
                    { type: 'text', content: 'FEATURED ARTICLE', style: { position: 'absolute', left: '100px', top: '400px', width: '180px', backgroundColor: '#6366f1', color: '#ffffff', fontSize: '11px', fontWeight: '900', textAlign: 'center', padding: '8px 0', borderRadius: '4px' } },
                    { type: 'heading', content: 'The Architecture of\nModern Web Graphics', style: { position: 'absolute', left: '100px', top: '440px', width: '700px', fontSize: '48px', fontWeight: '900', color: '#ffffff', lineHeight: '1.1' } },
                    
                    // Grid
                    { type: 'heading', content: 'Recent Stories', style: { position: 'absolute', left: '60px', top: '700px', width: '300px', fontSize: '32px', fontWeight: '900', color: '#0f172a' } },
                    
                    { type: 'image', content: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '60px', top: '780px', width: '340px', height: '230px', borderRadius: '16px', objectFit: 'cover' } },
                    { type: 'heading', content: 'Mastering React 19 Styles', style: { position: 'absolute', left: '60px', top: '1030px', width: '340px', fontSize: '20px', fontWeight: '800' } },
                    
                    { type: 'image', content: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '430px', top: '780px', width: '340px', height: '230px', borderRadius: '16px', objectFit: 'cover' } },
                    { type: 'heading', content: 'Setup your Dev Space', style: { position: 'absolute', left: '430px', top: '1030px', width: '340px', fontSize: '20px', fontWeight: '800' } },
                    
                    { type: 'image', content: 'https://images.unsplash.com/photo-1581291518066-cd07a869062a?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '800px', top: '780px', width: '340px', height: '230px', borderRadius: '16px', objectFit: 'cover' } },
                    { type: 'heading', content: 'Future of No-Code', style: { position: 'absolute', left: '800px', top: '1030px', width: '340px', fontSize: '20px', fontWeight: '800' } },
                ]
            },
            {
                id: 'post',
                name: 'Single Post',
                path: '/post',
                components: [
                    { type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '2000px', backgroundColor: '#ffffff', zIndex: '-2' } },
                    { type: 'image', content: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '500px', objectFit: 'cover' } },
                    { type: 'heading', content: 'The Architecture of Modern Web Graphics', style: { position: 'absolute', left: '250px', top: '550px', width: '700px', fontSize: '56px', fontWeight: '900', color: '#0f172a', textAlign: 'center', lineHeight: '1.2' } },
                    { type: 'text', content: 'BY JONATHAN WRIGHT • MARCH 13, 2026', style: { position: 'absolute', left: '0px', top: '720px', width: '1200px', textAlign: 'center', fontSize: '13px', fontWeight: '800', color: '#6366f1', letterSpacing: '2px' } },
                    { type: 'text', content: 'As web developers, we often focus on the logic and the data, but the visual layer is what truly connects with the user. In this deep dive, we explore how modern rendering engines and browser APIs are pushing the boundaries of what is possible on the web.\n\nFrom Canvas to WebGL, and now WebGPU, the landscape is shifting rapidly. We are moving towards a world where high-fidelity graphics are no longer the exclusive domain of native applications.', style: { position: 'absolute', left: '250px', top: '780px', width: '700px', fontSize: '18px', color: '#334155', lineHeight: '1.8' } },
                    { type: 'image', content: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80', style: { position: 'absolute', left: '250px', top: '1050px', width: '700px', height: '400px', borderRadius: '12px', objectFit: 'cover' } },
                    { type: 'heading', content: 'Discussion', style: { position: 'absolute', left: '250px', top: '1500px', width: '200px', fontSize: '24px', fontWeight: '800' } }
                ]
            },
            {
                id: 'about',
                name: 'About Author',
                path: '/about',
                components: [
                    { type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '1200px', backgroundColor: '#ffffff', zIndex: '-2' } },
                    
                    // Profile Header
                    { type: 'image', content: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=300&q=80', style: { position: 'absolute', left: '100px', top: '100px', width: '250px', height: '250px', borderRadius: '50%', objectFit: 'cover', border: '6px solid #f8fafc' } },
                    { type: 'heading', content: 'Jonathan Wright', style: { position: 'absolute', left: '380px', top: '130px', width: '600px', fontSize: '48px', fontWeight: '900', color: '#0f172a' } },
                    { type: 'text', content: 'Design Engineer & Tech Writer', style: { position: 'absolute', left: '380px', top: '195px', width: '600px', fontSize: '20px', color: '#6366f1', fontWeight: '700' } },
                    
                    // Main Bio
                    { type: 'heading', content: 'MY STORY', style: { position: 'absolute', left: '100px', top: '420px', width: '200px', fontSize: '14px', fontWeight: '800', color: '#94a3b8', letterSpacing: '2px' } },
                    { type: 'text', content: 'I started my journey in web development over a decade ago. My passion lies at the intersection of complex backend logic and pixel-perfect frontend aesthetics. I believe that every line of code should contribute to a seamless user experience.\n\nToday, I focus on building open-source tools that empower designers and developers to collaborate more effectively.', style: { position: 'absolute', left: '100px', top: '460px', width: '650px', fontSize: '18px', color: '#334155', lineHeight: '1.8' } },
                    
                    // Skills Tags
                    { type: 'heading', content: 'EXPERTISE', style: { position: 'absolute', left: '800px', top: '420px', width: '200px', fontSize: '14px', fontWeight: '800', color: '#94a3b8', letterSpacing: '2px' } },
                    { type: 'button', content: 'React / Next.js', style: { position: 'absolute', left: '800px', top: '460px', width: '150px', height: '35px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '20px', border: 'none', fontSize: '13px', fontWeight: '700' } },
                    { type: 'button', content: 'TypeScript', style: { position: 'absolute', left: '960px', top: '460px', width: '120px', height: '35px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '20px', border: 'none', fontSize: '13px', fontWeight: '700' } },
                    { type: 'button', content: 'UI/UX Design', style: { position: 'absolute', left: '800px', top: '505px', width: '150px', height: '35px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '20px', border: 'none', fontSize: '13px', fontWeight: '700' } },
                    { type: 'button', content: 'Node.js', style: { position: 'absolute', left: '960px', top: '505px', width: '120px', height: '35px', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '20px', border: 'none', fontSize: '13px', fontWeight: '700' } },
                    
                    // Social & Connect
                    { type: 'heading', content: 'CONNECT', style: { position: 'absolute', left: '100px', top: '700px', width: '200px', fontSize: '14px', fontWeight: '800', color: '#94a3b8', letterSpacing: '2px' } },
                    { type: 'button', content: 'Twitter', style: { position: 'absolute', left: '100px', top: '740px', width: '120px', height: '40px', backgroundColor: '#0f172a', color: '#ffffff', borderRadius: '8px', border: 'none', fontWeight: '700' } },
                    { type: 'button', content: 'GitHub', style: { position: 'absolute', left: '230px', top: '740px', width: '120px', height: '40px', backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: '700' } },
                    { type: 'button', content: 'LinkedIn', style: { position: 'absolute', left: '360px', top: '740px', width: '120px', height: '40px', backgroundColor: '#0a66c2', color: '#ffffff', borderRadius: '8px', border: 'none', fontWeight: '700' } }
                ]
            }
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
    },
    {
        id: 'section-blog-grid',
        name: 'Blog Post Cards',
        icon: 'fas fa-th',
        components: [
            { type: 'heading', content: 'Recent Articles', style: { position: 'absolute', left: '40px', top: '40px', width: '400px', fontSize: '32px', fontWeight: '800', color: '#0f172a' } },
            { type: 'text', content: '', style: { position: 'absolute', left: '40px', top: '110px', width: '350px', height: '420px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' } },
            { type: 'image', content: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '40px', top: '110px', width: '350px', height: '200px', borderRadius: '12px 12px 0 0', objectFit: 'cover' } },
            { type: 'text', content: 'TECHNOLOGY', style: { position: 'absolute', left: '60px', top: '330px', width: '150px', fontSize: '12px', color: '#6366f1', fontWeight: '700' } },
            { type: 'heading', content: 'How AI is Changing Web Development', style: { position: 'absolute', left: '60px', top: '350px', width: '310px', fontSize: '20px', fontWeight: '800', color: '#1e293b' } },
            { type: 'text', content: 'Explore the latest impact of artificial intelligence on modern workflows...', style: { position: 'absolute', left: '60px', top: '410px', width: '310px', fontSize: '14px', color: '#64748b' } },
            
            { type: 'text', content: '', style: { position: 'absolute', left: '425px', top: '110px', width: '350px', height: '420px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' } },
            { type: 'image', content: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '425px', top: '110px', width: '350px', height: '200px', borderRadius: '12px 12px 0 0', objectFit: 'cover' } },
            { type: 'text', content: 'DESIGN', style: { position: 'absolute', left: '445px', top: '330px', width: '150px', fontSize: '12px', color: '#ec4899', fontWeight: '700' } },
            { type: 'heading', content: 'Minimalist UX Design Patterns', style: { position: 'absolute', left: '445px', top: '350px', width: '310px', fontSize: '20px', fontWeight: '800', color: '#1e293b' } },
            { type: 'text', content: 'Why less is more when it comes to building user-friendly interfaces...', style: { position: 'absolute', left: '445px', top: '410px', width: '310px', fontSize: '14px', color: '#64748b' } },

            { type: 'text', content: '', style: { position: 'absolute', left: '810px', top: '110px', width: '350px', height: '420px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' } },
            { type: 'image', content: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80', style: { position: 'absolute', left: '810px', top: '110px', width: '350px', height: '200px', borderRadius: '12px 12px 0 0', objectFit: 'cover' } },
            { type: 'text', content: 'CULTURE', style: { position: 'absolute', left: '830px', top: '330px', width: '150px', fontSize: '12px', color: '#f59e0b', fontWeight: '700' } },
            { type: 'heading', content: 'The Future of Remote Work', style: { position: 'absolute', left: '830px', top: '350px', width: '310px', fontSize: '20px', fontWeight: '800', color: '#1e293b' } },
            { type: 'text', content: 'How companies are adapting to a global, distributed workforce culture...', style: { position: 'absolute', left: '830px', top: '410px', width: '310px', fontSize: '14px', color: '#64748b' } }
        ]
    },
    {
        id: 'section-blog-author',
        name: 'Author Bio (Detailed)',
        icon: 'fas fa-user-circle',
        components: [
            { type: 'text', content: '', style: { position: 'absolute', left: '150px', top: '50px', width: '900px', height: '320px', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)' } },
            
            // Photo & Name
            { type: 'image', content: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=200&q=80', style: { position: 'absolute', left: '200px', top: '85px', width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #f8fafc' } },
            { type: 'heading', content: 'Jonathan Wright', style: { position: 'absolute', left: '350px', top: '100px', width: '400px', fontSize: '28px', fontWeight: '900', color: '#0f172a' } },
            { type: 'text', content: 'Senior Editor & Design Lead', style: { position: 'absolute', left: '350px', top: '135px', width: '400px', fontSize: '16px', color: '#6366f1', fontWeight: '700' } },
            
            // Bio Text
            { type: 'text', content: 'Passionate about documenting the evolution of web technologies. Jonathan has been writing about design systems and frontend architecture for over 8 years.', style: { position: 'absolute', left: '350px', top: '180px', width: '650px', fontSize: '15px', color: '#64748b', lineHeight: '1.6' } },
            
            // Social Links
            { type: 'text', content: '', style: { position: 'absolute', left: '350px', top: '260px', width: '40px', height: '40px', backgroundColor: '#0f172a', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            { id: 601, type: 'text', content: 'T', style: { position: 'absolute', left: '350px', top: '260px', width: '40px', height: '40px', color: '#ffffff', textAlign: 'center', lineHeight: '40px', fontWeight: '900' } },
            
            { type: 'text', content: '', style: { position: 'absolute', left: '400px', top: '260px', width: '40px', height: '40px', backgroundColor: '#333', borderRadius: '8px', cursor: 'pointer' } },
            { id: 602, type: 'text', content: 'G', style: { position: 'absolute', left: '400px', top: '260px', width: '40px', height: '40px', color: '#ffffff', textAlign: 'center', lineHeight: '40px', fontWeight: '900' } },
            
            { type: 'button', content: 'View Full Bio →', style: { position: 'absolute', left: '850px', top: '260px', width: '150px', height: '40px', backgroundColor: 'transparent', color: '#0f172a', border: '2px solid #0f172a', borderRadius: '8px', fontWeight: '800', fontSize: '13px' } }
        ]
    },
    {
        id: 'section-newsletter-sidebar',
        name: 'Newsletter Signup (Clean)',
        icon: 'fas fa-envelope-open-text',
        components: [
            { type: 'text', content: '', style: { position: 'absolute', left: '300px', top: '50px', width: '600px', height: '350px', backgroundColor: '#ffffff', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' } },
            { type: 'heading', content: 'Join the Weekly Digest', style: { position: 'absolute', left: '350px', top: '100px', width: '500px', fontSize: '28px', fontWeight: '800', color: '#1e293b', textAlign: 'center' } },
            { type: 'text', content: 'Get the latest design and tech news delivered to your inbox every Monday morning.', style: { position: 'absolute', left: '350px', top: '150px', width: '500px', fontSize: '16px', color: '#64748b', textAlign: 'center', lineHeight: '1.5' } },
            { type: 'input', content: 'Your primary email...', style: { position: 'absolute', left: '375px', top: '220px', width: '450px', height: '50px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 20px' } },
            { type: 'button', content: 'Subscribe →', style: { position: 'absolute', left: '375px', top: '290px', width: '450px', height: '50px', backgroundColor: '#0f172a', color: '#ffffff', borderRadius: '12px', fontWeight: '700', fontSize: '16px', border: 'none', cursor: 'pointer' } }
        ]
    },
    {
        id: 'section-blog-hero',
        name: 'Minimal Blog Header',
        icon: 'fas fa-newspaper',
        components: [
            { type: 'text', content: '', style: { position: 'absolute', left: '0px', top: '0px', width: '1200px', height: '400px', backgroundColor: '#0f172a', zIndex: '-1' } },
            { type: 'text', content: 'OUR JOURNAL', style: { position: 'absolute', left: '0px', top: '130px', width: '1200px', fontSize: '14px', color: '#6366f1', fontWeight: '800', letterSpacing: '4px', textAlign: 'center' } },
            { type: 'heading', content: 'Insights for the\nModern Designer.', style: { position: 'absolute', left: '0px', top: '170px', width: '1200px', fontSize: '64px', fontWeight: '900', color: '#ffffff', textAlign: 'center', lineHeight: '1.1' } },
            { type: 'text', content: 'Exploring the intersection of art, technology, and strategy.', style: { position: 'absolute', left: '0px', top: '320px', width: '1200px', fontSize: '18px', color: '#94a3b8', textAlign: 'center' } },
            { type: 'text', content: '', style: { position: 'absolute', left: '550px', top: '380px', width: '100px', height: '4px', backgroundColor: '#6366f1' } }
        ]
    },
    {
        id: 'section-blog-comments',
        name: 'Blog Comments System',
        icon: 'fas fa-comments',
        components: [
            { type: 'heading', content: 'Comments (3)', style: { position: 'absolute', left: '40px', top: '40px', width: '300px', fontSize: '24px', fontWeight: '800', color: '#0f172a' } },
            
            // Comment 1
            { id: 301, type: 'image', content: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=100&q=80', style: { position: 'absolute', left: '40px', top: '100px', width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' } },
            { id: 302, type: 'text', content: 'Alex Johnson', style: { position: 'absolute', left: '105px', top: '100px', width: '200px', fontSize: '15px', fontWeight: '700', color: '#1e293b' } },
            { id: 303, type: 'text', content: '2 hours ago', style: { position: 'absolute', left: '105px', top: '122px', width: '200px', fontSize: '12px', color: '#94a3b8' } },
            { id: 304, type: 'text', content: 'Great article! I really appreciate the depth of research here. The points about AI ethics were particularly enlightening.', style: { position: 'absolute', left: '105px', top: '150px', width: '600px', fontSize: '15px', color: '#475569', lineHeight: '1.5' } },
            { id: 305, type: 'text', content: 'Reply', style: { position: 'absolute', left: '105px', top: '200px', width: '60px', fontSize: '13px', fontWeight: '700', color: '#6366f1', cursor: 'pointer' } },

            // Comment 2 (Reply)
            { id: 306, type: 'image', content: 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?auto=format&fit=crop&w=100&q=80', style: { position: 'absolute', left: '105px', top: '250px', width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' } },
            { id: 307, type: 'text', content: 'Sarah Williams', style: { position: 'absolute', left: '160px', top: '250px', width: '200px', fontSize: '14px', fontWeight: '700', color: '#1e293b' } },
            { id: 308, type: 'text', content: '1 hour ago', style: { position: 'absolute', left: '160px', top: '270px', width: '200px', fontSize: '11px', color: '#94a3b8' } },
            { id: 309, type: 'text', content: 'Totally agree with Alex. More content like this please!', style: { position: 'absolute', left: '160px', top: '295px', width: '500px', fontSize: '14px', color: '#475569' } },

            // Input Area
            { id: 310, type: 'text', content: '', style: { position: 'absolute', left: '40px', top: '380px', width: '1120px', height: '1px', backgroundColor: '#e2e8f0' } },
            { id: 311, type: 'heading', content: 'Leave a Reply', style: { position: 'absolute', left: '40px', top: '420px', width: '300px', fontSize: '20px', fontWeight: '800', color: '#0f172a' } },
            { id: 312, type: 'input', content: 'Write your comment here...', style: { position: 'absolute', left: '40px', top: '470px', width: '1120px', height: '120px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '15px' } },
            { id: 313, type: 'button', content: 'Post Comment', style: { position: 'absolute', left: '40px', top: '610px', width: '180px', height: '45px', backgroundColor: '#6366f1', color: '#ffffff', borderRadius: '6px', fontWeight: '700', border: 'none' } }
        ]
    },
    {
        id: 'section-blog-sidebar',
        name: 'Trending & Categories Sidebar',
        icon: 'fas fa-columns',
        components: [
            { type: 'text', content: '', style: { position: 'absolute', left: '850px', top: '50px', width: '310px', height: '800px', backgroundColor: '#fcfcfc', borderLeft: '1px solid #f1f5f9' } },
            
            // Search
            { id: 401, type: 'input', content: 'Search articles...', style: { position: 'absolute', left: '870px', top: '70px', width: '270px', height: '44px', borderRadius: '22px', border: '1px solid #e2e8f0', padding: '0 20px', fontSize: '14px' } },
            
            // Categories
            { id: 402, type: 'heading', content: 'Categories', style: { position: 'absolute', left: '870px', top: '150px', width: '200px', fontSize: '18px', fontWeight: '800', color: '#0f172a', borderBottom: '2px solid #6366f1', paddingBottom: '8px' } },
            { id: 403, type: 'text', content: 'Technology (12)', style: { position: 'absolute', left: '870px', top: '200px', width: '250px', fontSize: '15px', color: '#475569', cursor: 'pointer' } },
            { id: 404, type: 'text', content: 'Design Systems (8)', style: { position: 'absolute', left: '870px', top: '235px', width: '250px', fontSize: '15px', color: '#475569', cursor: 'pointer' } },
            { id: 405, type: 'text', content: 'Lifestyle & Travel (15)', style: { position: 'absolute', left: '870px', top: '270px', width: '250px', fontSize: '15px', color: '#475569', cursor: 'pointer' } },
            { id: 406, type: 'text', content: 'Business Strategy (6)', style: { position: 'absolute', left: '870px', top: '305px', width: '250px', fontSize: '15px', color: '#475569', cursor: 'pointer' } },

            // Trending Posts
            { id: 407, type: 'heading', content: 'Trending Now', style: { position: 'absolute', left: '870px', top: '380px', width: '200px', fontSize: '18px', fontWeight: '800', color: '#0f172a' } },
            
            { id: 408, type: 'image', content: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=150&q=80', style: { position: 'absolute', left: '870px', top: '420px', width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' } },
            { id: 409, type: 'text', content: 'The ROI of Good Design', style: { position: 'absolute', left: '945px', top: '420px', width: '190px', fontSize: '14px', fontWeight: '700', color: '#1e293b', lineHeight: '1.3' } },
            { id: 410, type: 'text', content: '2.5k views', style: { position: 'absolute', left: '945px', top: '465px', width: '100px', fontSize: '11px', color: '#94a3b8' } },

            { id: 411, type: 'image', content: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=150&q=80', style: { position: 'absolute', left: '870px', top: '500px', width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' } },
            { id: 412, type: 'text', content: 'JavaScript in 2026', style: { position: 'absolute', left: '945px', top: '500px', width: '190px', fontSize: '14px', fontWeight: '700', color: '#1e293b', lineHeight: '1.3' } },
            { id: 413, type: 'text', content: '1.8k views', style: { position: 'absolute', left: '945px', top: '545px', width: '100px', fontSize: '11px', color: '#94a3b8' } },

            // Ad banner placeholder
            { id: 414, type: 'text', content: 'Ad Space', style: { position: 'absolute', left: '870px', top: '620px', width: '270px', height: '180px', backgroundColor: '#f1f5f9', borderRadius: '12px', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: '700' } }
        ]
    }
];
