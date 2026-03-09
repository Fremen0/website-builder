// ========================================================
// Professional Template Data
// Format matching the existing component structure
// ========================================================

export const TEMPLATE_CATEGORIES = [
    { id: 'all', label: 'All Templates', icon: 'fas fa-th-large' },
    { id: 'business', label: 'Business', icon: 'fas fa-briefcase' },
    { id: 'portfolio', label: 'Portfolio', icon: 'fas fa-palette' },
    { id: 'store', label: 'Store', icon: 'fas fa-shopping-bag' },
    { id: 'restaurant', label: 'Restaurant', icon: 'fas fa-utensils' },
    { id: 'blog', label: 'Blog', icon: 'fas fa-pen-nib' },
    { id: 'landing', label: 'Landing Page', icon: 'fas fa-rocket' },
];

export const TEMPLATES = [
    // ─────────────────── 1. Creative Agency ───────────────────
    {
        id: 'creative-agency',
        name: 'Creative Agency',
        category: 'business',
        description: 'A bold, modern agency website with dark theme and vibrant accents.',
        tags: ['agency', 'dark', 'modern', 'business'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
            accent: '#a78bfa',
            preview: [
                { type: 'bar', color: '#a78bfa', width: '60%', height: '10px', y: '18%' },
                { type: 'bar', color: 'rgba(167,139,250,0.4)', width: '40%', height: '7px', y: '32%' },
                { type: 'bar', color: 'rgba(167,139,250,0.25)', width: '55%', height: '7px', y: '45%' },
                { type: 'btn', color: '#a78bfa', width: '110px', height: '28px', y: '60%' },
            ]
        },
        components: [
            { id: 1, type: 'heading', content: 'WE BUILD DIGITAL EXPERIENCES', style: { fontSize: '52px', fontWeight: '900', color: '#ffffff', textAlign: 'center', padding: '80px 40px 16px 40px', margin: '0', backgroundColor: '#0f0c29', letterSpacing: '-1px', lineHeight: '1.1' } },
            { id: 2, type: 'text', content: 'Award-winning creative agency specialized in branding, web design, and digital strategy.', style: { fontSize: '20px', color: '#a78bfa', textAlign: 'center', padding: '0 80px 40px 80px', lineHeight: '1.7', backgroundColor: '#0f0c29', fontStyle: 'italic' } },
            { id: 3, type: 'button', content: 'View Our Work', style: { backgroundColor: '#a78bfa', color: '#000', padding: '16px 48px', border: 'none', borderRadius: '4px', display: 'block', margin: '0 auto 80px auto', cursor: 'pointer', fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' } },
            { id: 4, type: 'divider', content: '', style: { width: '100%', height: '1px', backgroundColor: '#302b63', margin: '0' } },
            { id: 5, type: 'heading', content: 'Our Services', style: { fontSize: '36px', fontWeight: '800', color: '#ffffff', textAlign: 'center', padding: '60px 40px 20px 40px', backgroundColor: '#0f0c29', margin: '0' } },
            { id: 6, type: 'text', content: '🎨 Brand Identity  •  💻 Web Development  •  📱 Mobile Apps  •  📈 Marketing', style: { fontSize: '18px', color: '#a78bfa', textAlign: 'center', padding: '0 40px 60px 40px', lineHeight: '2', backgroundColor: '#0f0c29', fontWeight: '600' } },
        ]
    },

    // ─────────────────── 2. Personal Portfolio ───────────────────
    {
        id: 'personal-portfolio',
        name: 'Personal Portfolio',
        category: 'portfolio',
        description: 'Clean and minimal portfolio to showcase your work elegantly.',
        tags: ['portfolio', 'minimal', 'clean', 'creative'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            accent: '#6366f1',
            preview: [
                { type: 'circle', color: '#6366f1', size: '40px', x: '50%', y: '20%' },
                { type: 'bar', color: '#1e293b', width: '50%', height: '10px', y: '42%' },
                { type: 'bar', color: '#64748b', width: '65%', height: '7px', y: '56%' },
                { type: 'bar', color: '#64748b', width: '40%', height: '7px', y: '69%' },
            ]
        },
        components: [
            { id: 10, type: 'heading', content: 'Alex Rivera', style: { fontSize: '56px', fontWeight: '900', color: '#1e293b', textAlign: 'center', padding: '80px 40px 8px 40px', margin: '0', letterSpacing: '-2px' } },
            { id: 11, type: 'text', content: 'UI/UX Designer & Creative Developer', style: { fontSize: '20px', color: '#6366f1', textAlign: 'center', padding: '0 40px 16px 40px', fontWeight: '600', letterSpacing: '1px' } },
            { id: 12, type: 'text', content: 'I create beautiful digital experiences that live at the intersection of design and technology. Based in San Francisco.', style: { fontSize: '18px', color: '#64748b', textAlign: 'center', padding: '0 120px 48px 120px', lineHeight: '1.8' } },
            { id: 13, type: 'button', content: 'See My Work', style: { backgroundColor: '#1e293b', color: '#fff', padding: '14px 40px', border: 'none', borderRadius: '8px', display: 'block', margin: '0 auto 32px auto', cursor: 'pointer', fontSize: '16px', fontWeight: '700' } },
            { id: 14, type: 'button', content: 'Download Resume', style: { backgroundColor: 'transparent', color: '#6366f1', padding: '14px 40px', border: '2px solid #6366f1', borderRadius: '8px', display: 'block', margin: '0 auto 80px auto', cursor: 'pointer', fontSize: '16px', fontWeight: '700' } },
            { id: 15, type: 'divider', content: '', style: { width: '60px', height: '4px', backgroundColor: '#6366f1', margin: '0 auto 60px auto', borderRadius: '2px' } },
            { id: 16, type: 'heading', content: 'Featured Projects', style: { fontSize: '36px', fontWeight: '800', color: '#1e293b', textAlign: 'center', padding: '0 40px 20px 40px', margin: '0' } },
            { id: 17, type: 'image', content: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80', style: { width: '80%', height: 'auto', display: 'block', margin: '0 auto 60px auto', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' } },
        ]
    },

    // ─────────────────── 3. E-Commerce Store ───────────────────
    {
        id: 'ecommerce-store',
        name: 'E-Commerce Store',
        category: 'store',
        description: 'A sleek online store ready for showcasing products.',
        tags: ['store', 'ecommerce', 'shop', 'products'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #fff, #f1f5f9)',
            accent: '#f59e0b',
            preview: [
                { type: 'bar', color: '#0f172a', width: '100%', height: '18px', y: '0%' },
                { type: 'rect', color: '#fef3c7', width: '42%', height: '40px', x: '4%', y: '22%' },
                { type: 'rect', color: '#fef3c7', width: '42%', height: '40px', x: '54%', y: '22%' },
                { type: 'btn', color: '#f59e0b', width: '80px', height: '22px', y: '75%' },
            ]
        },
        components: [
            { id: 20, type: 'heading', content: 'LUXE SHOP', style: { fontSize: '14px', fontWeight: '800', color: '#ffffff', textAlign: 'center', padding: '20px', margin: '0', backgroundColor: '#0f172a', letterSpacing: '4px' } },
            { id: 21, type: 'heading', content: 'New Arrivals', style: { fontSize: '48px', fontWeight: '900', color: '#0f172a', textAlign: 'center', padding: '60px 40px 16px 40px', margin: '0', letterSpacing: '-2px' } },
            { id: 22, type: 'text', content: 'Handpicked pieces for the modern wardrobe.', style: { fontSize: '18px', color: '#64748b', textAlign: 'center', padding: '0 40px 48px 40px', lineHeight: '1.7' } },
            { id: 23, type: 'image', content: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', style: { width: '90%', height: 'auto', display: 'block', margin: '0 auto 16px auto', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' } },
            { id: 24, type: 'button', content: 'Shop Now →', style: { backgroundColor: '#0f172a', color: '#fff', padding: '16px 48px', border: 'none', borderRadius: '4px', display: 'block', margin: '0 auto 80px auto', cursor: 'pointer', fontSize: '16px', fontWeight: '700', letterSpacing: '1px' } },
            { id: 25, type: 'heading', content: 'Featured Items', style: { fontSize: '32px', fontWeight: '800', color: '#0f172a', textAlign: 'center', padding: '0 40px 40px 40px', margin: '0' } },
            { id: 26, type: 'text', content: '✦ Free shipping on orders over $75  ✦  30-day returns  ✦  Sustainable packaging', style: { fontSize: '14px', color: '#f59e0b', textAlign: 'center', padding: '0 40px 60px 40px', fontWeight: '700', letterSpacing: '1px' } },
        ]
    },

    // ─────────────────── 5. Restaurant ───────────────────
    {
        id: 'restaurant-menu',
        name: 'Gourmet Restaurant',
        category: 'restaurant',
        description: 'An elegant restaurant site with warm tones and a rich feel.',
        tags: ['restaurant', 'food', 'menu', 'warm'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #1a0a00, #3d1a00)',
            accent: '#f97316',
            preview: [
                { type: 'bar', color: '#f97316', width: '45%', height: '10px', y: '22%' },
                { type: 'bar', color: 'rgba(249,115,22,0.5)', width: '65%', height: '7px', y: '38%' },
                { type: 'bar', color: 'rgba(249,115,22,0.25)', width: '50%', height: '7px', y: '51%' },
                { type: 'btn', color: '#f97316', width: '100px', height: '26px', y: '68%' },
            ]
        },
        components: [
            { id: 40, type: 'heading', content: 'La Maison', style: { fontSize: '68px', fontWeight: '800', color: '#ffffff', textAlign: 'center', padding: '80px 40px 8px 40px', margin: '0', backgroundColor: '#1a0a00', fontFamily: 'Georgia, serif', letterSpacing: '-2px' } },
            { id: 41, type: 'text', content: '— Fine Dining & Culinary Art —', style: { fontSize: '16px', color: '#f97316', textAlign: 'center', padding: '0 40px 48px 40px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', backgroundColor: '#1a0a00', margin: '0' } },
            { id: 42, type: 'image', content: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80', style: { width: '100%', height: '400px', objectFit: 'cover', display: 'block', margin: '0' } },
            { id: 43, type: 'heading', content: 'Our Menu', style: { fontSize: '42px', fontWeight: '800', color: '#ffffff', textAlign: 'center', padding: '60px 40px 16px 40px', backgroundColor: '#1a0a00', margin: '0', fontFamily: 'Georgia, serif' } },
            { id: 44, type: 'text', content: 'Seasonal ingredients. Expert techniques. Unforgettable flavors.', style: { fontSize: '18px', color: '#f97316', textAlign: 'center', padding: '0 80px 40px 80px', lineHeight: '1.8', backgroundColor: '#1a0a00', margin: '0', fontStyle: 'italic' } },
            { id: 45, type: 'button', content: 'Reserve a Table', style: { backgroundColor: '#f97316', color: '#fff', padding: '16px 40px', border: 'none', borderRadius: '4px', display: 'block', margin: '0 auto 80px auto', cursor: 'pointer', fontSize: '16px', fontWeight: '700', letterSpacing: '1px' } },
            { id: 46, type: 'button', content: 'Reserve a Table', style: { backgroundColor: '#f97316', color: '#fff', padding: '16px 40px', border: 'none', borderRadius: '4px', display: 'block', margin: '0 auto 80px auto', cursor: 'pointer', fontSize: '16px', fontWeight: '700', letterSpacing: '1px' } },
        ]
    },

    // ─────────────────── 6. SaaS Landing Page ───────────────────
    {
        id: 'saas-landing',
        name: 'SaaS Landing Page',
        category: 'landing',
        description: 'A high-converting landing page for software products with gradient accents.',
        tags: ['saas', 'tech', 'startup', 'landing', 'modern'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            accent: '#818cf8',
            preview: [
                { type: 'badge', color: '#818cf8', width: '80px', height: '16px', y: '15%' },
                { type: 'bar', color: '#ffffff', width: '70%', height: '12px', y: '30%' },
                { type: 'bar', color: 'rgba(129,140,248,0.5)', width: '55%', height: '7px', y: '45%' },
                { type: 'btn', color: '#818cf8', width: '110px', height: '26px', y: '62%' },
            ]
        },
        components: [
            { id: 50, type: 'text', content: '✦ Trusted by 10,000+ teams worldwide', style: { fontSize: '13px', color: '#818cf8', textAlign: 'center', padding: '60px 40px 16px 40px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', backgroundColor: '#0f172a', margin: '0' } },
            { id: 51, type: 'heading', content: 'Build faster.\nShip smarter.', style: { fontSize: '64px', fontWeight: '900', color: '#ffffff', textAlign: 'center', padding: '0 40px 24px 40px', margin: '0', backgroundColor: '#0f172a', lineHeight: '1.05', letterSpacing: '-2px' } },
            { id: 52, type: 'text', content: 'The all-in-one platform for modern teams. Automate workflows, collaborate in real-time, and ship products your users love.', style: { fontSize: '20px', color: '#94a3b8', textAlign: 'center', padding: '0 120px 48px 120px', lineHeight: '1.7', backgroundColor: '#0f172a', margin: '0' } },
            { id: 53, type: 'button', content: 'Start Free Trial →', style: { backgroundColor: '#818cf8', color: '#fff', padding: '18px 48px', border: 'none', borderRadius: '12px', display: 'block', margin: '0 auto 16px auto', cursor: 'pointer', fontSize: '18px', fontWeight: '700', boxShadow: '0 0 40px rgba(129,140,248,0.4)' } },
            { id: 54, type: 'text', content: 'No credit card required • Free 14-day trial • Cancel anytime', style: { fontSize: '13px', color: '#64748b', textAlign: 'center', padding: '0 40px 64px 40px', backgroundColor: '#0f172a', margin: '0' } },
            { id: 55, type: 'divider', content: '', style: { width: '100%', height: '1px', backgroundColor: '#1e293b', margin: '0' } },
            { id: 56, type: 'heading', content: 'Everything you need to grow', style: { fontSize: '42px', fontWeight: '800', color: '#ffffff', textAlign: 'center', padding: '60px 40px 20px 40px', margin: '0', backgroundColor: '#0f172a' } },
            { id: 57, type: 'text', content: '⚡ 10x Productivity  •  🔐 Enterprise Security  •  🌍 Global CDN  •  📊 Advanced Analytics', style: { fontSize: '16px', color: '#818cf8', textAlign: 'center', padding: '0 40px 60px 40px', fontWeight: '700', backgroundColor: '#0f172a', margin: '0', lineHeight: '2' } },
        ]
    },

    // ─────────────────── 7. Photography Studio ───────────────────
    {
        id: 'photography-studio',
        name: 'Photography Studio',
        category: 'portfolio',
        description: 'A full-bleed, image-forward layout for photographers.',
        tags: ['photography', 'visual', 'portfolio', 'dark', 'minimal'],
        thumbnail: {
            bg: 'linear-gradient(135deg, #000, #111)',
            accent: '#e5e7eb',
            preview: [
                { type: 'bar', color: '#ffffff', width: '35%', height: '12px', y: '15%' },
                { type: 'rect', color: '#1f2937', width: '90%', height: '45px', x: '5%', y: '32%' },
                { type: 'bar', color: 'rgba(229,231,235,0.4)', width: '45%', height: '7px', y: '85%' },
            ]
        },
        components: [
            { id: 60, type: 'heading', content: 'LENS & LIGHT', style: { fontSize: '14px', fontWeight: '800', color: '#ffffff', textAlign: 'center', padding: '40px 40px 8px 40px', backgroundColor: '#000', margin: '0', letterSpacing: '6px' } },
            { id: 61, type: 'text', content: 'Fine Art Photography', style: { fontSize: '14px', color: '#6b7280', textAlign: 'center', padding: '0 40px 40px 40px', backgroundColor: '#000', margin: '0', letterSpacing: '4px', textTransform: 'uppercase' } },
            { id: 62, type: 'image', content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80', style: { width: '100%', height: '500px', objectFit: 'cover', display: 'block', margin: '0' } },
            { id: 63, type: 'heading', content: '"Capturing moments that last forever"', style: { fontSize: '32px', fontWeight: '300', color: '#ffffff', textAlign: 'center', padding: '60px 80px 24px 80px', backgroundColor: '#000', margin: '0', fontStyle: 'italic', lineHeight: '1.4' } },
            { id: 64, type: 'button', content: 'View Portfolio', style: { backgroundColor: 'transparent', color: '#ffffff', padding: '14px 40px', border: '1px solid #ffffff', borderRadius: '0', display: 'block', margin: '0 auto 48px auto', cursor: 'pointer', fontSize: '13px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase' } },
            { id: 65, type: 'image', content: 'https://images.unsplash.com/photo-1490750967868-88df5691cc0e?auto=format&fit=crop&w=1200&q=80', style: { width: '100%', height: '400px', objectFit: 'cover', display: 'block', margin: '0' } },
        ]
    },

    // ─────────────────── 8. Digital Resume ───────────────────
    {
        id: 'digital-resume',
        name: 'Digital Resume',
        category: 'portfolio',
        description: 'A professional and clean resume layout to impress recruiters.',
        tags: ['resume', 'cv', 'professional', 'clean', 'minimal'],
        thumbnail: {
            bg: '#f8fafc',
            accent: '#6366f1',
            preview: [
                { type: 'circle', color: '#6366f1', size: '30px', x: '50%', y: '12%' },
                { type: 'bar', color: '#1e293b', width: '45%', height: '10px', y: '30%' },
                { type: 'bar', color: '#6366f1', width: '55%', height: '7px', y: '43%' },
                { type: 'bar', color: '#94a3b8', width: '70%', height: '5px', y: '55%' },
                { type: 'bar', color: '#94a3b8', width: '60%', height: '5px', y: '64%' },
                { type: 'btn', color: '#1e293b', width: '100px', height: '22px', y: '80%' },
            ]
        },
        components: [
            { id: 70, type: 'heading', content: 'Jordan Smith', style: { fontSize: '52px', fontWeight: '900', color: '#1e293b', textAlign: 'center', padding: '60px 40px 8px 40px', margin: '0', letterSpacing: '-2px' } },
            { id: 71, type: 'text', content: 'Senior Full Stack Developer & UI/UX Enthusiast', style: { fontSize: '18px', color: '#6366f1', textAlign: 'center', fontWeight: '600', letterSpacing: '1px', padding: '0 40px 8px 40px', margin: '0' } },
            { id: 72, type: 'text', content: '📍 San Francisco  •  📧 jordan@email.com  •  🌐 jordondev.com', style: { fontSize: '14px', color: '#64748b', textAlign: 'center', padding: '0 40px 40px 40px', margin: '0' } },
            { id: 73, type: 'divider', content: '', style: { width: '60px', height: '3px', backgroundColor: '#6366f1', margin: '0 auto 40px auto', borderRadius: '2px' } },
            { id: 74, type: 'text', content: 'Passionate about crafting scalable web apps and creating stunning user experiences. 8 years of experience across the full stack — from pixel-perfect UI to distributed cloud systems.', style: { fontSize: '17px', lineHeight: '1.8', color: '#475569', textAlign: 'center', padding: '0 80px 48px 80px', margin: '0' } },
            { id: 75, type: 'heading', content: 'Experience', style: { fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '0 40px 8px 40px', borderLeft: '4px solid #6366f1', paddingLeft: '16px' } },
            { id: 76, type: 'text', content: 'Senior Engineer @ Stripe (2021 – Present)\nBuilt payment infrastructure processing $500M+ annually.', style: { fontSize: '16px', color: '#334155', padding: '8px 40px 8px 60px', margin: '0', lineHeight: '1.7' } },
            { id: 77, type: 'text', content: 'Frontend Lead @ Figma (2018 – 2021)\nLed redesign of core editor increasing user retention by 40%.', style: { fontSize: '16px', color: '#334155', padding: '8px 40px 32px 60px', margin: '0', lineHeight: '1.7' } },
            { id: 78, type: 'button', content: 'Download CV', style: { backgroundColor: '#1e293b', color: '#fff', padding: '14px 40px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'block', margin: '0 auto 60px auto', fontSize: '16px', fontWeight: '700' } },
        ]
    },

    // ─────────────────── 9. Startup Blog ───────────────────
    {
        id: 'startup-blog',
        name: 'Startup Blog',
        category: 'blog',
        description: 'A modern editorial blog layout with a bold typographic style.',
        tags: ['blog', 'editorial', 'startup', 'writing', 'modern'],
        thumbnail: {
            bg: '#ffffff',
            accent: '#ef4444',
            preview: [
                { type: 'bar', color: '#000000', width: '100%', height: '5px', y: '0%' },
                { type: 'bar', color: '#ef4444', width: '30%', height: '8px', y: '15%' },
                { type: 'bar', color: '#111827', width: '70%', height: '12px', y: '28%' },
                { type: 'bar', color: '#6b7280', width: '80%', height: '6px', y: '44%' },
                { type: 'bar', color: '#6b7280', width: '60%', height: '6px', y: '54%' },
                { type: 'bar', color: '#ef4444', width: '25%', height: '8px', y: '70%' },
            ]
        },
        components: [
            { id: 80, type: 'divider', content: '', style: { width: '100%', height: '5px', backgroundColor: '#000', margin: '0 0 0 0' } },
            { id: 81, type: 'heading', content: 'The Pivot', style: { fontSize: '14px', fontWeight: '900', color: '#000', textAlign: 'left', padding: '16px 60px', margin: '0', letterSpacing: '4px', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' } },
            { id: 82, type: 'text', content: 'STARTUP  •  TECHNOLOGY  •  CULTURE', style: { fontSize: '11px', color: '#ef4444', textAlign: 'center', padding: '24px 60px 8px 60px', margin: '0', fontWeight: '800', letterSpacing: '3px' } },
            { id: 83, type: 'heading', content: 'Why the Best Founders Embrace Constraints', style: { fontSize: '52px', fontWeight: '900', color: '#111827', textAlign: 'center', padding: '8px 60px 24px 60px', margin: '0', lineHeight: '1.1', letterSpacing: '-2px' } },
            { id: 84, type: 'text', content: 'The most transformative companies aren\'t built in comfort. They\'re forged under pressure, shaped by limits, and driven by founders who see every wall as a door waiting to be opened.', style: { fontSize: '20px', color: '#4b5563', textAlign: 'center', padding: '0 100px 32px 100px', lineHeight: '1.7', margin: '0', fontStyle: 'italic' } },
            { id: 85, type: 'text', content: 'BY MAYA CHEN  •  MARCH 3, 2026  •  8 MIN READ', style: { fontSize: '11px', color: '#9ca3af', textAlign: 'center', padding: '0 40px 48px 40px', margin: '0', fontWeight: '700', letterSpacing: '2px' } },
            { id: 86, type: 'image', content: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80', style: { width: '100%', height: '400px', objectFit: 'cover', display: 'block', margin: '0 0 60px 0' } },
        ]
    },
];

// ─────────────────── PREBUILT SECTIONS ───────────────────
export const PREBUILT_SECTIONS = [
    {
        id: 'section-hero',
        name: 'Hero Section',
        icon: 'fas fa-star',
        components: [
            { type: 'heading', content: 'Transform Your Business', style: { fontSize: '48px', fontWeight: '800', textAlign: 'center', padding: '60px 40px 10px 40px', color: '#111827', margin: '0' } },
            { type: 'text', content: 'Build beautiful websites in minutes with our intuitive drag-and-drop builder.', style: { fontSize: '20px', textAlign: 'center', padding: '10px 40px 30px 40px', color: '#4b5563', lineHeight: '1.6' } },
            { type: 'button', content: 'Start Building', style: { backgroundColor: '#6366f1', color: '#ffffff', padding: '15px 40px', border: 'none', borderRadius: '30px', display: 'block', margin: '0 auto 60px auto', cursor: 'pointer', fontSize: '18px', fontWeight: '600' } },
        ]
    },
    {
        id: 'section-features',
        name: 'Features Grid',
        icon: 'fas fa-list',
        components: [
            { type: 'heading', content: 'Our Features', style: { fontSize: '32px', fontWeight: 'bold', textAlign: 'center', padding: '40px 0 20px 0', color: '#1e293b' } },
            { type: 'text', content: '⚡ Fast Performance  •  🔍 SEO Optimized  •  📱 Fully Responsive', style: { fontSize: '18px', textAlign: 'center', padding: '0 40px 40px 40px', color: '#6366f1', fontWeight: '600' } },
        ]
    },
    {
        id: 'section-pricing',
        name: 'Pricing Table',
        icon: 'fas fa-tags',
        components: [
            { type: 'heading', content: 'Simple Pricing', style: { fontSize: '36px', fontWeight: '800', textAlign: 'center', padding: '60px 0 10px 0', color: '#1e293b' } },
            { type: 'text', content: 'Choose the plan that fits your needs.', style: { fontSize: '18px', textAlign: 'center', color: '#64748b', marginBottom: '32px' } },
            { type: 'button', content: '🚀  Pro Plan — $29/mo', style: { backgroundColor: '#6366f1', color: '#fff', padding: '20px 60px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', display: 'block', margin: '0 auto 60px auto', cursor: 'pointer', border: 'none' } },
        ]
    },
    {
        id: 'section-testimonials',
        name: 'Testimonials',
        icon: 'fas fa-quote-left',
        components: [
            { type: 'heading', content: 'What Our Clients Say', style: { fontSize: '32px', fontWeight: 'bold', textAlign: 'center', padding: '60px 0 30px 0', color: '#1e293b' } },
            { type: 'text', content: '"This builder changed my life. I launched my startup in 2 days!"', style: { fontSize: '22px', fontStyle: 'italic', textAlign: 'center', color: '#1e293b', padding: '0 100px 16px 100px', lineHeight: '1.6' } },
            { type: 'text', content: '— Sarah Jenkins, CEO', style: { fontSize: '14px', fontWeight: '700', textAlign: 'center', color: '#6366f1', paddingBottom: '60px' } },
        ]
    },
    {
        id: 'section-footer',
        name: 'Modern Footer',
        icon: 'fas fa-window-minimize',
        components: [
            { type: 'divider', content: '', style: { width: '100%', height: '1px', backgroundColor: '#e2e8f0', margin: '0' } },
            { type: 'text', content: '© 2026 WebStudio. All rights reserved.', style: { textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '14px' } },
        ]
    },
    {
        id: 'section-cta',
        name: 'Call to Action',
        icon: 'fas fa-bullhorn',
        components: [
            { type: 'heading', content: 'Ready to Get Started?', style: { fontSize: '42px', fontWeight: '900', textAlign: 'center', padding: '80px 40px 16px 40px', color: '#ffffff', backgroundColor: '#6366f1', margin: '0' } },
            { type: 'text', content: 'Join thousands of creators who build with us every day.', style: { fontSize: '18px', textAlign: 'center', color: 'rgba(255,255,255,0.8)', padding: '0 80px 32px 80px', backgroundColor: '#6366f1', margin: '0' } },
            { type: 'button', content: 'Get Started Free', style: { backgroundColor: '#ffffff', color: '#6366f1', padding: '16px 48px', border: 'none', borderRadius: '30px', display: 'block', margin: '0 auto 80px auto', cursor: 'pointer', fontSize: '18px', fontWeight: '800' } },
            { type: 'button', content: 'Get Started Free', style: { backgroundColor: '#ffffff', color: '#6366f1', padding: '16px 48px', border: 'none', borderRadius: '30px', display: 'block', margin: '0 auto 80px auto', cursor: 'pointer', fontSize: '18px', fontWeight: '800' } },
        ]
    },
];
