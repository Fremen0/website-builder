/**
 * Returns the default style and content for a given element type.
 * Extracted from Editor.js addComponentToCanvas switch-case.
 */
const getElementDefaults = (type) => {
    switch (type) {
        case 'button':
            return {
                style: {
                    backgroundColor: '#6366f1',
                    color: '#ffffff',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    textAlign: 'center',
                    display: 'inline-block',
                    margin: '10px',
                    boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)',
                },
                content: 'Button',
            };

        case 'image':
            return {
                style: {
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '10px 0',
                },
                content: 'https://via.placeholder.com/400x200?text=Image',
            };

        case 'heading':
            return {
                style: {
                    color: '#1e293b',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    padding: '10px',
                    margin: '10px',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                    backgroundColor: 'transparent',
                },
                content: 'Heading',
            };

        case 'video':
            return {
                style: {
                    width: '100%',
                    height: '315px',
                    margin: '10px 0',
                    display: 'block',
                },
                content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            };

        case 'input':
            return {
                style: {
                    padding: '12px 16px',
                    margin: '10px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    width: '300px',
                    fontSize: '15px',
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    transition: 'border-color 0.2s',
                    outline: 'none',
                },
                content: 'Input Field',
            };

        case 'divider':
            return {
                style: {
                    width: '100%',
                    height: '1px',
                    backgroundColor: '#94a3b8',
                    margin: '20px 0',
                    border: 'none',
                    display: 'block',
                },
                content: '',
            };

        case 'section':
            return {
                style: {
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#f8fafc',
                    padding: '60px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #cbd5e1',
                    position: 'relative',
                },
                content: 'Full Width Section',
            };

        case 'div':
            return {
                style: {
                    width: '200px',
                    height: '200px',
                    backgroundColor: '#e2e8f0',
                    display: 'block',
                    borderRadius: '8px',
                    border: '1px dashed #94a3b8',
                    position: 'relative',
                },
                content: '',
            };

        case 'text':
            return {
                style: {
                    color: '#475569',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    padding: '10px',
                    margin: '10px',
                    textAlign: 'left',
                    fontFamily: 'Roboto, sans-serif',
                    width: 'auto',
                },
                content: 'This is a text paragraph. You can edit this directly.',
            };

        case 'form':
            return {
                style: { width: '350px', height: 'auto' },
                content: 'Contact Us',
            };

        case 'map':
            return {
                style: { width: '100%', height: '300px' },
                content: 'New York, NY',
            };

        case 'audio':
            return {
                style: { width: '300px', height: '60px' },
                content: '',
            };

        case 'iframe':
            return {
                style: { width: '100%', height: '250px' },
                content: '<p style="text-align: center; color: #94a3b8; padding: 20px;">Embed Code Here</p>',
            };

        case 'slider':
            return {
                style: {
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '12px',
                },
                content: 'Slider Component',
            };

        case 'icon':
            return {
                style: {
                    width: '50px',
                    height: '50px',
                    color: '#6366f1',
                    fontSize: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                content: 'fas fa-star',
            };

        case 'navbar':
            return {
                style: {
                    width: '100%',
                    height: '60px',
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 20px',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                },
                content: 'Navbar',
            };

        case 'grid':
            return {
                style: {
                    width: '100%',
                    height: '300px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    border: '1px dashed #cbd5e1',
                },
                content: 'Grid Section',
            };

        default:
            return {
                style: {
                    color: '#1e293b',
                    fontSize: '16px',
                    padding: '10px',
                    margin: '10px',
                    backgroundColor: 'transparent',
                    lineHeight: '1.5',
                    fontFamily: 'Arial, sans-serif',
                    textAlign: 'center',
                },
                content: 'Edit this text',
            };
    }
};

export default getElementDefaults;
