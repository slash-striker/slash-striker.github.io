import React from 'react';
import {
  ArrowUpRight,
  Boxes,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  Pickaxe,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { RevealOnScroll } from './RevealOnScroll';

const BLOCK_ICON: Record<string, React.ReactNode> = {
  grass: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" fill="#6d9e3f" />
      <rect x="3" y="3" width="26" height="11" fill="#7fbe4c" />
      <rect x="3" y="11" width="26" height="4" fill="#57401f" />
      <rect x="7" y="16" width="5" height="5" fill="#7a5a34" />
      <rect x="18" y="20" width="6" height="4" fill="#8b673c" />
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" fill="#4fd6c8" />
      <rect x="3" y="3" width="26" height="4" fill="#9ef4ea" />
      <path d="M7 24L16 8L25 24Z" fill="#1f9c92" opacity="0.65" />
      <rect x="8" y="8" width="4" height="4" fill="#d6fffb" />
    </svg>
  ),
  redstone: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" fill="#8d1f1f" />
      <rect x="6" y="6" width="8" height="8" fill="#d94040" />
      <rect x="18" y="18" width="8" height="8" fill="#d94040" />
      <rect x="16" y="8" width="7" height="6" fill="#f26a6a" />
      <rect x="8" y="19" width="6" height="6" fill="#f26a6a" />
    </svg>
  ),
  gold: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" fill="#d6a928" />
      <rect x="3" y="3" width="26" height="4" fill="#ffe27a" />
      <rect x="8" y="9" width="7" height="7" fill="#b8891c" />
      <rect x="19" y="17" width="6" height="6" fill="#b8891c" />
    </svg>
  ),
};

export const MinecraftSection: React.FC = () => {
  const mc = SITE_CONFIG.minecraft;
  const [copied, setCopied] = React.useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(mc.server.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Nothing to copy yet if the address is still a placeholder.
    }
  };

  return (
    <section id="minecraft" className="section-shell mc-section">
      <div className="container">
        <RevealOnScroll>
          <div className="mc-hero">
            <div className="mc-hero__sky" aria-hidden="true">
              <span className="mc-cloud mc-cloud--a" />
              <span className="mc-cloud mc-cloud--b" />
              <span className="mc-cloud mc-cloud--c" />
            </div>
            <div className="mc-hero__ground" aria-hidden="true" />

            <div className="mc-hero__content">
              <div className="mc-badge">
                <span className="mc-badge__cube" aria-hidden="true" />
                <span>{mc.sectionTag}</span>
              </div>
              <h1 className="mc-title glitch-title" data-text={mc.heading}>
                {mc.heading}
              </h1>
              <p className="mc-tagline">{mc.tagline}</p>
              <p className="mc-desc">{mc.description}</p>

              <div className="mc-hero__actions">
                <a
                  href={mc.server.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mc-btn mc-btn--grass"
                >
                  <Pickaxe size={17} aria-hidden="true" />
                  <span>GET THE SERVER INFO</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a href="#/youtube" className="mc-btn mc-btn--stone">
                  <Boxes size={17} aria-hidden="true" />
                  <span>WATCH THE BUILDS</span>
                </a>
              </div>

              <div className="mc-hero__hint">
                <span className="mc-hero__hint-block" aria-hidden="true" />
                Tip: the hidden terminal understands <code>minecraft</code>.
              </div>
            </div>

            <div className="mc-hero__statue" aria-hidden="true">
              <div className="mc-pixel-tree">
                <span className="mc-pixel-tree__trunk" />
                <span className="mc-pixel-tree__leaves" />
              </div>
              <div className="mc-pixel-creeper">
                <span className="mc-pixel-creeper__face" />
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={90}>
          <div className="mc-server hud-panel">
            <span className="hud-corner-tl" aria-hidden="true" />
            <span className="hud-corner-br" aria-hidden="true" />
            <div className="mc-server__status">
              <span className="mc-server__dot" aria-hidden="true" />
              <span>{mc.server.status}</span>
            </div>
            <div className="mc-server__main">
              <span className="mc-server__label">{mc.server.label}</span>
              <span className="mc-server__address">{mc.server.address}</span>
              <button
                type="button"
                className="mc-server__copy"
                onClick={copyAddress}
                aria-label="Copy server address"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
            <div className="mc-server__meta">
              <span><Wifi size={14} aria-hidden="true" /> {mc.server.version}</span>
              <span>{mc.server.note}</span>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <div className="mc-section-head">
            <span className="section-eyebrow">
              <span className="section-eyebrow__dot" aria-hidden="true" />
              <span>GAME MODES // WORLD SELECT</span>
            </span>
            <h2 className="section-title">PICK A WORLD</h2>
          </div>
        </RevealOnScroll>

        <div className="mc-modes">
          {mc.modes.map((mode, index) => (
            <RevealOnScroll key={mode.id} delayMs={index * 80}>
              <article className="mc-mode">
                <div className="mc-mode__icon">{BLOCK_ICON[mode.block]}</div>
                <div>
                  <h3>{mode.title}</h3>
                  <p>{mode.desc}</p>
                </div>
                <span className="mc-mode__corner" aria-hidden="true" />
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delayMs={120}>
          <div className="mc-section-head">
            <span className="section-eyebrow">
              <span className="section-eyebrow__dot" aria-hidden="true" />
              <span>BUILD ARCHIVE // WORLD SAVES</span>
            </span>
            <h2 className="section-title">THINGS WE MADE</h2>
          </div>
        </RevealOnScroll>

        <div className="mc-builds">
          {mc.builds.map((build, index) => (
            <RevealOnScroll key={build.title} delayMs={index * 80}>
              <article className="mc-build">
                <div className="mc-build__poster" aria-hidden="true">
                  <div className="mc-build__pixels">
                    {Array.from({ length: 36 }, (_, cell) => (
                      <span
                        key={cell}
                        className={`mc-build__pixel ${
                          (cell * (index + 3) + index) % 5 === 0 ? 'is-lit' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span className="mc-build__type">{build.type}</span>
                </div>
                <div className="mc-build__body">
                  <h3>{build.title}</h3>
                  <p>{build.desc}</p>
                  <div className="mc-build__palette">
                    {build.palette.map((block) => (
                      <span key={block}>{block}</span>
                    ))}
                  </div>
                  <a
                    href={mc.server.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mc-build__link"
                  >
                    See it in the realm <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mc-lower">
          <RevealOnScroll delayMs={80}>
            <div className="mc-roadmap hud-panel">
              <span className="hud-corner-tl" aria-hidden="true" />
              <span className="hud-corner-br" aria-hidden="true" />
              <div className="mc-roadmap__head">
                <Sparkles size={16} aria-hidden="true" />
                <span>REALM ROADMAP // NEXT UPDATES</span>
              </div>
              <ol>
                {mc.roadmap.map((item, index) => (
                  <li key={item}>
                    <span className="mc-roadmap__step">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={130}>
            <div className="mc-cta">
              <span className="mc-cta__label">WHITELIST // OPEN SOON</span>
              <h2>BRING A PICKAXE.</h2>
              <p>
                The realm is getting its final touches. Join the Discord to claim a plot, vote on
                the first build theme, and be there when the gates open.
              </p>
              <a
                href={mc.server.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn mc-btn--grass"
              >
                <MessageSquare size={17} aria-hidden="true" />
                <span>JOIN THE BUILD CREW</span>
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
