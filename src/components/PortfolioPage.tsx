import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Check,
  Copy,
  GraduationCap,
  MapPin,
  MessageSquare,
  Sparkles,
  Target,
  Youtube,
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { LogoMark } from './LogoMark';

const PORTFOLIO_NAV = [
  { id: 'portfolio-home', label: 'Home' },
  { id: 'portfolio-about', label: 'About' },
  { id: 'portfolio-work', label: 'Work' },
  { id: 'portfolio-skills', label: 'Skills' },
  { id: 'portfolio-experience', label: 'Experience' },
  { id: 'portfolio-contact', label: 'Contact' },
];

export const PortfolioPage: React.FC = () => {
  const portfolio = SITE_CONFIG.portfolio;
  const [copied, setCopied] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyDiscord = async () => {
    const handle = SITE_CONFIG.contact.discordUsername;
    try {
      await navigator.clipboard.writeText(handle);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = handle;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2600);
  };

  return (
    <div className="portfolio-page">
      <div className="container portfolio-container">
        {/* Hero */}
        <section id="portfolio-home" className="portfolio-hero">
          <div className="portfolio-hero__copy">
            <span className="portfolio-availability">
              <span className="portfolio-availability__dot" aria-hidden="true" />
              {portfolio.availability}
            </span>
            <h1 className="portfolio-hero__name">{portfolio.name}</h1>
            <p className="portfolio-hero__title">{portfolio.title}</p>
            <p className="portfolio-hero__subtitle">{portfolio.subtitle}</p>
            <p className="portfolio-hero__intro">{portfolio.intro}</p>

            <div className="portfolio-hero__actions">
              <button
                type="button"
                className="portfolio-btn portfolio-btn--solid"
                onClick={() => scrollTo('portfolio-contact')}
              >
                <span>Let’s work together</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="portfolio-btn portfolio-btn--ghost"
                onClick={() => scrollTo('portfolio-work')}
              >
                <span>View selected work</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="portfolio-hero__meta">
              <span><MapPin size={14} aria-hidden="true" /> {portfolio.location}</span>
              <span><MessageSquare size={14} aria-hidden="true" /> {portfolio.responseTime}</span>
            </div>
          </div>

          <aside className="portfolio-hero__card" aria-label="Profile card">
            <div className="portfolio-hero__card-top">
              <span className="portfolio-hero__initials">SS</span>
              <LogoMark className="portfolio-hero__mark" />
            </div>
            <dl className="portfolio-hero__stats">
              {portfolio.highlights.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="portfolio-hero__card-foot">
              <span className="portfolio-pulse" aria-hidden="true" />
              Available for select projects
            </div>
          </aside>
        </section>

        {/* In-page navigation */}
        <nav className="portfolio-nav" aria-label="Portfolio sections">
          {PORTFOLIO_NAV.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={index === 0 ? 'is-active' : ''}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* About */}
        <section id="portfolio-about" className="portfolio-section">
          <div className="portfolio-section__head">
            <span className="portfolio-kicker">ABOUT ME</span>
            <h2 className="portfolio-section__title">A builder with a creator’s eye.</h2>
          </div>

          <div className="portfolio-about">
            <div className="portfolio-about__story">
              {portfolio.about.map((paragraph) => (
                <p key={paragraph.slice(0, 22)}>{paragraph}</p>
              ))}
              <p className="portfolio-about__background">
                <strong>Background.</strong> {portfolio.background}
              </p>
            </div>

            <aside className="portfolio-aside">
              <div className="portfolio-aside__block">
                <span className="portfolio-aside__label">Interests</span>
                <ul>
                  {portfolio.interests.map((interest) => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </div>
              <div className="portfolio-aside__block">
                <span className="portfolio-aside__label">Career goals</span>
                <ul>
                  {portfolio.careerGoals.map((goal) => (
                    <li key={goal.title}>
                      <strong>{goal.title}.</strong> {goal.detail}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <div className="portfolio-traits">
            {portfolio.personality.map((trait) => (
              <article key={trait.title} className="portfolio-trait">
                <Sparkles size={16} aria-hidden="true" />
                <h3>{trait.title}</h3>
                <p>{trait.detail}</p>
              </article>
            ))}
          </div>

          <div className="portfolio-approach">
            <span className="portfolio-kicker">CREATIVE APPROACH</span>
            <p>{portfolio.creativeApproach}</p>
          </div>
        </section>

        {/* Work */}
        <section id="portfolio-work" className="portfolio-section">
          <div className="portfolio-section__head">
            <span className="portfolio-kicker">SELECTED WORK</span>
            <h2 className="portfolio-section__title">Projects I’ve built and shipped.</h2>
          </div>

          <div className="portfolio-projects">
            {portfolio.projects.map((project, index) => (
              <article key={project.id} className="portfolio-project">
                <div className="portfolio-project__top">
                  <span className="portfolio-project__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="portfolio-project__year">{project.year}</span>
                </div>
                <span className="portfolio-project__category">{project.category}</span>
                <h3 className="portfolio-project__title">{project.title}</h3>
                <p className="portfolio-project__desc">{project.description}</p>
                <p className="portfolio-project__role">
                  <strong>Role:</strong> {project.role}
                </p>
                <div className="portfolio-project__tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {'link' in project && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-project__link"
                  >
                    {project.linkLabel}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="portfolio-skills" className="portfolio-section">
          <div className="portfolio-section__head">
            <span className="portfolio-kicker">SKILLS & TOOLS</span>
            <h2 className="portfolio-section__title">The toolbox I reach for.</h2>
          </div>

          <div className="portfolio-skills">
            {portfolio.skills.map((group) => (
              <article key={group.category} className="portfolio-skill-group">
                <h3>{group.category}</h3>
                <div className="portfolio-skill-group__chips">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Experience & education */}
        <section id="portfolio-experience" className="portfolio-section">
          <div className="portfolio-section__head">
            <span className="portfolio-kicker">EXPERIENCE & EDUCATION</span>
            <h2 className="portfolio-section__title">Where I’ve learned and what I’ve done.</h2>
          </div>

          <div className="portfolio-experience-grid">
            <div>
              <h3 className="portfolio-column-title">
                <Briefcase size={16} aria-hidden="true" /> Experience
              </h3>
              <div className="portfolio-timeline">
                {portfolio.experience.map((item) => (
                  <article key={`${item.period}-${item.role}`} className="portfolio-timeline__item">
                    <span className="portfolio-timeline__period">{item.period}</span>
                    <h4>{item.role}</h4>
                    <p className="portfolio-timeline__org">
                      {item.org} · {item.location}
                    </p>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h3 className="portfolio-column-title">
                <GraduationCap size={16} aria-hidden="true" /> Education
              </h3>
              <div className="portfolio-timeline">
                {portfolio.education.map((item) => (
                  <article key={`${item.period}-${item.institution}`} className="portfolio-timeline__item">
                    <span className="portfolio-timeline__period">{item.period}</span>
                    <h4>{item.program}</h4>
                    <p className="portfolio-timeline__org">{item.institution}</p>
                    <p className="portfolio-timeline__detail">{item.detail}</p>
                  </article>
                ))}
              </div>

              <div className="portfolio-goals">
                <h3 className="portfolio-column-title">
                  <Target size={16} aria-hidden="true" /> What I’m aiming for
                </h3>
                <ul>
                  {portfolio.careerGoals.map((goal) => (
                    <li key={goal.title}>{goal.title}</li>
                  ))}
                </ul>
              </div>

              <div className="portfolio-resume">
                <Award size={18} aria-hidden="true" />
                <p>{portfolio.resumeNote}</p>
                <button
                  type="button"
                  className="portfolio-btn portfolio-btn--ghost portfolio-btn--small"
                  onClick={() => scrollTo('portfolio-contact')}
                >
                  Request résumé <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="portfolio-contact" className="portfolio-section portfolio-contact">
          <div className="portfolio-contact__panel">
            <span className="portfolio-kicker portfolio-kicker--light">CONTACT</span>
            <h2 className="portfolio-contact__title">{portfolio.contact.heading}</h2>
            <p className="portfolio-contact__blurb">{portfolio.contact.blurb}</p>

            <div className="portfolio-contact__actions">
              <button
                type="button"
                className="portfolio-btn portfolio-btn--light"
                onClick={copyDiscord}
              >
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                {copied ? 'Discord handle copied' : `Copy Discord: ${SITE_CONFIG.contact.discordUsername}`}
              </button>
              <a
                href={SITE_CONFIG.links.slashStr1kerDiscord}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-btn portfolio-btn--outline-light"
              >
                <MessageSquare size={16} aria-hidden="true" />
                Join the Discord
              </a>
              <a
                href={SITE_CONFIG.links.youtubeChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-btn portfolio-btn--outline-light"
              >
                <Youtube size={16} aria-hidden="true" />
                YouTube
              </a>
            </div>

            <p className="portfolio-contact__note">
              {SITE_CONFIG.contact.ideasPrompt}
            </p>
          </div>

          <div className="portfolio-footer">
            <span>© {new Date().getFullYear()} {portfolio.name}</span>
            <button type="button" onClick={() => scrollTo('portfolio-home')}>
              Back to top ↑
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
