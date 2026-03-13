import React from 'react';
import './AboutPage.css';

const tech = [
    { name: 'React.js',   icon: 'fab fa-react'      },
    { name: 'Node.js',    icon: 'fab fa-node-js'     },
    { name: 'Express.js', icon: 'fas fa-server'      },
    { name: 'MongoDB',    icon: 'fas fa-database'    },
    { name: 'JavaScript', icon: 'fab fa-js-square'   },
    { name: 'CSS',        icon: 'fab fa-css3-alt'    },
    { name: 'React DnD',  icon: 'fas fa-hand-pointer'},
    { name: 'Git',        icon: 'fab fa-github'      },
];

const AboutPage = ({ onBack }) => (
    <div className="ab-page">

        {/* back */}
        <button className="ab-back" onClick={onBack}>
            <i className="fas fa-arrow-left" /> Back to Editor
        </button>

        <main className="ab-card">

            {/* ── Developer ── */}
            <section className="ab-section">
                <div className="ab-avatar">M</div>
                <h1 className="ab-name">Mohammed Ali</h1>
                <p className="ab-role">Full‑Stack Developer</p>

                <div className="ab-links">
                    <a href="https://github.com/Fremen0/website-builder.git"
                       target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github" /> GitHub
                    </a>
                    <a href="mailto:mohammedalirm0@gmail.com">
                        <i className="fas fa-envelope" /> mohammedalirm0@gmail.com
                    </a>
                </div>
            </section>

            <div className="ab-divider" />

            {/* ── Project ── */}
            <section className="ab-section">
                <h2 className="ab-label">About the Project</h2>
                <p className="ab-desc">
                    <strong>TWB — Template Website Builder</strong> is a drag-and-drop
                    website builder that lets you design responsive pages visually,
                    then export clean HTML & CSS. It combines the freeform positioning
                    freedom of Wix with the structured layout system of Webflow,
                    featuring a real-time canvas, layers navigator, pre-built templates,
                    and full undo/redo history.
                </p>
            </section>

            <div className="ab-divider" />

            {/* ── Tech stack ── */}
            <section className="ab-section">
                <h2 className="ab-label">Tech Stack</h2>
                <div className="ab-tech-grid">
                    {tech.map(t => (
                        <span key={t.name} className="ab-tech-chip">
                            <i className={t.icon} />
                            {t.name}
                        </span>
                    ))}
                </div>
            </section>

        </main>

        <p className="ab-footer">TWB © {new Date().getFullYear()}</p>
    </div>
);

export default AboutPage;
