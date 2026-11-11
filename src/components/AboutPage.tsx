import React from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  Gamepad2,
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { RevealOnScroll } from './RevealOnScroll';
import { LogoMark } from './LogoMark';

export const AboutPage: React.FC = () => {
  const about = SITE_CONFIG.aboutPage;

  return (
    <section id="about" className="section-shell about-page">
      <div className="container">
        <RevealOnScroll>
          <div className="about-page__hero hud-panel">
            <span className="hud-corner-tl" aria-hidden="true" />
            <span className="hud-corner-br" aria-hidden="true" />
            <div className="about-page__identity">
              <div className="about-page__avatar" aria-hidden="true">
                <LogoMark />
              </div>
              <div>
                <div className="section-eyebrow">
                  <span className="section-eyebrow__dot" aria-hidden="true" />
                  <span>{about.sectionTag}</span>
                </div>
                <h1 className="section-title glitch-title" data-text={about.heading}>
                  {about.heading}
                </h1>
                <p className="about-page__handle">{about.handle}</p>
                <p className="about-page__role">{about.role}</p>
              </div>
            </div>

            <p className="about-page__intro">{about.intro}</p>

            <div className="about-page__actions">
              <a
                href="#/portfolio"
                className="cyber-btn cyber-btn--primary"
              >
                <BookOpen size={17} aria-hidden="true" />
                <span>OPEN THE PORTFOLIO</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                href="#/contact"
                className="cyber-btn cyber-btn--ghost"
              >
                <Compass size={17} aria-hidden="true" />
                <span>GET IN TOUCH</span>
              </a>
            </div>
          </div>
        </RevealOnScroll>

        <div className="about-page__grid">
          <RevealOnScroll delayMs={80}>
            <article className="about-page__panel hud-panel about-page__panel--bio">
              <span className="hud-corner-tl" aria-hidden="true" />
              <span className="hud-corner-br" aria-hidden="true" />
              <div className="about-page__panel-head">
                <Terminal size={16} aria-hidden="true" />
                <span>BIOGRAPHY // THE SHORT VERSION</span>
              </div>
              {about.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="about-page__paragraph">
                  {paragraph}
                </p>
              ))}
              <blockquote className="about-page__quote">“{about.quote}”</blockquote>
            </article>
          </RevealOnScroll>

          <RevealOnScroll delayMs={130}>
            <article className="about-page__panel hud-panel">
              <span className="hud-corner-tl" aria-hidden="true" />
              <span className="hud-corner-br" aria-hidden="true" />
              <div className="about-page__panel-head">
                <Sparkles size={16} aria-hidden="true" />
                <span>QUICK FACTS // IDENTITY MATRIX</span>
              </div>
              <dl className="about-facts">
                {about.quickFacts.map((fact) => (
                  <div key={fact.label} className="about-facts__row">
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delayMs={120}>
          <div className="about-page__section-head">
            <span className="section-eyebrow">
              <span className="section-eyebrow__dot" aria-hidden="true" />
              <span>ORIGIN LOG // TIMELINE</span>
            </span>
            <h2 className="section-title">THE PATH HERE</h2>
          </div>
        </RevealOnScroll>

        <div className="about-timeline">
          {about.timeline.map((entry, index) => (
            <RevealOnScroll key={entry.year} delayMs={index * 90}>
              <article className="about-timeline__item hud-panel">
                <span className="hud-corner-tl" aria-hidden="true" />
                <span className="hud-corner-br" aria-hidden="true" />
                <span className="about-timeline__year">{entry.year}</span>
                <h3 className="about-timeline__title">{entry.title}</h3>
                <p className="about-timeline__detail">{entry.detail}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <div className="about-page__grid about-page__grid--balanced">
          <RevealOnScroll delayMs={80}>
            <article className="about-page__panel hud-panel">
              <span className="hud-corner-tl" aria-hidden="true" />
              <span className="hud-corner-br" aria-hidden="true" />
              <div className="about-page__panel-head">
                <Gamepad2 size={16} aria-hidden="true" />
                <span>INTERESTS // WHAT PULLS ME IN</span>
              </div>
              <ul className="about-interest-list">
                {about.interests.map((interest) => (
                  <li key={interest.title}>
                    <span className="about-interest-list__dot" aria-hidden="true" />
                    <div>
                      <strong>{interest.title}</strong>
                      <span>{interest.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </RevealOnScroll>

          <RevealOnScroll delayMs={130}>
            <article className="about-page__panel hud-panel">
              <span className="hud-corner-tl" aria-hidden="true" />
              <span className="hud-corner-br" aria-hidden="true" />
              <div className="about-page__panel-head">
                <Wrench size={16} aria-hidden="true" />
                <span>THE RIG // SETUP & STATUS</span>
              </div>
              <ul className="about-setup-list">
                {about.setup.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="about-page__subhead">CURRENTLY LOCKED IN</div>
              <ul className="about-current-list">
                {about.currently.map((item) => (
                  <li key={item}>
                    <span className="about-current-list__plus" aria-hidden="true">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delayMs={160}>
          <div className="about-page__cta">
            <p>Want the professional version — projects, skills, experience, and how to hire me?</p>
            <a href="#/portfolio" className="cyber-btn cyber-btn--primary">
              <BookOpen size={17} aria-hidden="true" />
              <span>VIEW MY PORTFOLIO</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
