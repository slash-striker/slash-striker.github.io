import React from 'react';
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Cpu,
  Globe,
  MessageSquare,
  Shield,
  Sparkles,
  Youtube,
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { LogoMark } from './LogoMark';

const WORDMARK_LETTERS = SITE_CONFIG.brand.upperName.split('');

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      {/* Cyberpunk City Skyline & Holographic Horizon */}
      <div className="hero-city-horizon" aria-hidden="true">
        <svg
          className="hero-city-svg"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="cityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1228" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#050610" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="cityStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#00F5FF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M0,220 L0,165 L45,165 L45,120 L85,120 L85,150 L120,150 L120,90 L165,90 L165,140 L210,140 L210,70 L250,70 L270,50 L290,70 L290,135 L340,135 L340,105 L395,105 L395,155 L440,155 L440,85 L495,85 L495,130 L550,130 L550,60 L585,40 L620,60 L620,145 L680,145 L680,95 L740,95 L740,140 L795,140 L795,75 L850,75 L850,125 L910,125 L910,55 L960,55 L960,135 L1020,135 L1020,95 L1080,95 L1080,145 L1140,145 L1140,80 L1195,80 L1195,130 L1255,130 L1255,100 L1315,100 L1315,150 L1375,150 L1375,115 L1440,115 L1440,220 Z"
            fill="url(#cityFill)"
            stroke="url(#cityStroke)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="container hero-grid">
        {/* Left Column: Main Command Center Copy & Actions */}
        <div className="hero-content">
          <div className="hero-hud-badge">
            <span className="hero-hud-badge__pulse" aria-hidden="true" />
            <span>MAIN COMMAND CENTER // SECTOR 01</span>
          </div>

          <p className="hero-preheading">{SITE_CONFIG.brand.heroMainHeading}</p>

          <h1 className="hero-wordmark" aria-label={SITE_CONFIG.brand.upperName}>
            <span className="hero-wordmark__ghost" aria-hidden="true">
              {SITE_CONFIG.brand.upperName}
            </span>
            <span className="hero-wordmark__letters" aria-hidden="true">
              {WORDMARK_LETTERS.map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className={`hero-wordmark__char ${letter === '1' ? 'is-digit' : ''}`}
                  style={{ '--char-index': index } as React.CSSProperties}
                >
                  {letter}
                </span>
              ))}
            </span>
            <span className="hero-wordmark__scan" aria-hidden="true" />
          </h1>

          <div className="hero-slogan">
            <span className="hero-slogan__kicker">
              <span className="hero-slogan__kicker-dot" aria-hidden="true" />
              {SITE_CONFIG.brand.sloganKicker}
            </span>
            <p className="hero-slogan__line" aria-hidden="true">
              <span className="hero-slogan__word hero-slogan__word--lets">LET&apos;S</span>
              <span className="hero-slogan__word hero-slogan__word--slash">
                SLASH
                <span className="hero-slogan__slash-trail" />
              </span>
              <span className="hero-slogan__word hero-slogan__word--top">TO THE TOP</span>
              <span className="hero-slogan__arrow">
                <ArrowUpRight size={20} />
              </span>
            </p>
          </div>

          <p className="hero-tagline">{SITE_CONFIG.brand.tagline}</p>

          <p className="hero-description">{SITE_CONFIG.brand.heroDescription}</p>

          {/* 3 Prominent CTA Buttons */}
          <div className="hero-cta-group">
            <a
              href={SITE_CONFIG.links.youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn cyber-btn--youtube"
            >
              <Youtube size={18} aria-hidden="true" />
              <span>EXPLORE MY CHANNEL</span>
            </a>

            <a
              href={SITE_CONFIG.links.slashStr1kerDiscord}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn cyber-btn--discord"
            >
              <MessageSquare size={18} aria-hidden="true" />
              <span>JOIN THE DISCORD</span>
            </a>

            <a href="#/bots" className="cyber-btn cyber-btn--primary">
              <Bot size={18} aria-hidden="true" />
              <span>DISCOVER MY BOTS</span>
            </a>
          </div>
        </div>

        {/* Right Column: The SLASH CORE identity mark */}
        <div className="hero-visual-column">
          <div className="slash-core-stage" aria-hidden="true">
            <div className="slash-core-stage__halo" />
            <div className="slash-core-stage__backslash" />
            <div className="slash-core-stage__frame" />
            <div className="slash-core-stage__mark">
              <LogoMark animated />
            </div>
            <div className="slash-core-stage__tag slash-core-stage__tag--top">
              <Sparkles size={12} />
              <span>S/ SIGNATURE // 01</span>
            </div>
            <div className="slash-core-stage__tag slash-core-stage__tag--bottom">
              <span>ORIGINAL MARK // LOCKED</span>
            </div>
            <div className="slash-core-stage__readout">
              <span>X 09.41</span>
              <span>Y 12.07</span>
              <span className="is-live">LIVE</span>
            </div>
            <div className="slash-core-stage__tick slash-core-stage__tick--a" />
            <div className="slash-core-stage__tick slash-core-stage__tick--b" />
            <div className="slash-core-stage__tick slash-core-stage__tick--c" />
          </div>
        </div>
      </div>

      {/* Featured Status Panel */}
      <div className="container">
        <div
          className="status-panel hud-panel"
          role="region"
          aria-label="Command Center Thematic Status Panel"
        >
          <span className="hud-corner-tl" aria-hidden="true" />
          <span className="hud-corner-br" aria-hidden="true" />

          <div className="status-panel__header">
            <span className="status-panel__title">
              <Sparkles size={14} aria-hidden="true" />
              <span>COMMAND DECK // OVERVIEW MODULES</span>
            </span>
            <span className="status-panel__note">
              INTERFACE THEME // DIGITAL STATION
            </span>
          </div>

          <div className="status-panel__grid">
            {SITE_CONFIG.heroStatusPanel.map((item, idx) => {
              const IconComponent =
                idx === 0
                  ? Sparkles
                  : idx === 1
                    ? Cpu
                    : idx === 2
                      ? Shield
                      : Globe;

              return (
                <div
                  key={item.id}
                  className={`status-card status-card--${item.accent}`}
                >
                  <div className="status-card__top">
                    <span className="status-card__category">{item.category}</span>
                    <span
                      className={`status-card__dot status-card__dot--${item.accent}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="status-card__body">
                    <IconComponent
                      size={18}
                      className="status-card__icon"
                      aria-hidden="true"
                    />
                    <span className="status-card__label">{item.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* A quiet hint for the curious — see the easter eggs. */}
      <button
        type="button"
        className="hero-secret-hint"
        onClick={() => {
          window.location.hash = '#/secret';
        }}
        aria-label="Open the hidden terminal"
        title="Do not press this."
      >
        <ChevronDown size={12} aria-hidden="true" />
        <span>SIGNAL 0x5L4SH</span>
      </button>
    </section>
  );
};
