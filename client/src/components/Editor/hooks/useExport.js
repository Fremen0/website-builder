import { useCallback } from 'react';
import axios from 'axios';

/**
 * useExport — handles export (HTML, JSON) and save-as-template logic.
 *
 * @param {Array}    pages         - all pages
 * @param {string}   activePageId  - id of the active page
 * @param {Array}    components    - components of the active page
 * @param {string}   tempTemplateName
 * @param {Function} setShowSaveModal
 */
const useExport = ({ pages, activePageId, components, tempTemplateName, setShowSaveModal }) => {

    const toCss = (style) => {
        if (!style) return '';
        return Object.entries(style)
            .map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${v}`)
            .join('; ');
    };

    const handleExportHTML = useCallback(() => {
        const page = pages.find(p => p.id === activePageId);
        if (!page) return;

        let stylesBlock = '';
        let tabletStylesBlock = '';
        let mobileStylesBlock = '';

        const generateComponentHTML = (comp, idx) => {
            const id = `el-${idx}`;

            const exportStyle = { ...comp.style };
            if (!exportStyle.position) {
                exportStyle.position =
                    (comp.style?.left !== undefined && comp.style?.top !== undefined)
                        ? 'absolute'
                        : 'relative';
            }

            stylesBlock += `#${id} { ${toCss(exportStyle)} }\n`;
            if (comp.states?.hover)  stylesBlock += `#${id}:hover { ${toCss(comp.states.hover)} }\n`;
            if (comp.states?.active) stylesBlock += `#${id}:active { ${toCss(comp.states.active)} }\n`;
            if (comp.responsiveStyles?.tablet) tabletStylesBlock += `#${id} { ${toCss(comp.responsiveStyles.tablet)} }\n`;
            if (comp.responsiveStyles?.mobile) mobileStylesBlock += `#${id} { ${toCss(comp.responsiveStyles.mobile)} }\n`;

            const content = comp.content || '';
            const tag = comp.type === 'heading' ? 'h2'
                : comp.type === 'text' ? 'p'
                : comp.type === 'button' ? 'button'
                : 'div';

            let elementHTML = '';
            if (comp.type === 'image') {
                elementHTML = `<img id="${id}" src="${content}" alt="User content" />`;
            } else if (comp.type === 'video') {
                elementHTML = `<div id="${id}"><iframe src="${content.replace('watch?v=', 'embed/')}" style="width:100%;height:100%" frameborder="0" allowfullscreen></iframe></div>`;
            } else if (comp.type === 'divider') {
                elementHTML = `<hr id="${id}" />`;
            } else if (comp.type === 'input') {
                elementHTML = `<input id="${id}" type="text" placeholder="${content}" />`;
            } else {
                elementHTML = `<${tag} id="${id}">${content}</${tag}>`;
            }

            if (comp.link) {
                return `<a href="${comp.link}" style="text-decoration:none">${elementHTML}</a>`;
            }
            return elementHTML;
        };

        const pageStyle = page.style || {};
        const bgStyleStr = Object.entries(pageStyle)
            .filter(([k]) => ['backgroundImage', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat', 'background'].includes(k))
            .map(([k, v]) => {
                if (k === 'backgroundImage' && v) return `background-image: url('${v}')`;
                return `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${v}`;
            })
            .join('; ');

        const componentsHTML = page.components.map(generateComponentHTML).join('\n        ');

        const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Montserrat:wght@400;700&family=Playfair+Display:wght@700&family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body { margin: 0; padding: 0; font-family: 'Roboto', sans-serif; overflow-x: hidden; }
        .canvas { 
            position: relative; 
            width: 100%; 
            min-height: 100vh; 
            ${bgStyleStr} 
        }
        * { box-sizing: border-box; }
        
        /* Base Component Styles */
        ${stylesBlock}
        
        /* Tablet Breakpoint (768px) */
        @media (max-width: 768px) {
            ${tabletStylesBlock}
        }
        
        /* Mobile Breakpoint (480px) */
        @media (max-width: 480px) {
            ${mobileStylesBlock}
        }
    </style>
</head>
<body>
    <div class="canvas">
        ${componentsHTML}
    </div>
</body>
</html>`;

        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${page.name.toLowerCase()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [pages, activePageId]);

    const handleExportJSON = useCallback(() => {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(pages, null, 2));
        const a = document.createElement('a');
        a.setAttribute('href', dataStr);
        a.setAttribute('download', 'project.json');
        document.body.appendChild(a);
        a.click();
        a.remove();
    }, [pages]);

    const handleSaveAsTemplate = useCallback(() => {
        if (components.length === 0) {
            alert('Canvas is empty. Add some components before saving as a template.');
            return;
        }
        setShowSaveModal(true);
    }, [components, setShowSaveModal]);

    const confirmSaveTemplate = useCallback(async () => {
        if (!tempTemplateName.trim()) {
            alert('Please enter a template name.');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/templates', {
                name: tempTemplateName,
                components,
            });
            setShowSaveModal(false);
            alert(`Template "${tempTemplateName}" saved successfully!`);
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'An unknown error occurred.';
            console.error('Error saving template:', error);
            alert(`Failed to save template: ${errorMsg}`);
        }
    }, [tempTemplateName, components, setShowSaveModal]);

    return {
        handleExportHTML,
        handleExportJSON,
        handleSaveAsTemplate,
        confirmSaveTemplate,
    };
};

export default useExport;
