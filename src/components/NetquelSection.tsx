import React from 'react';
import {
  ArrowUpRight,
  Disc3,
  ExternalLink,
  MessageSquare,
  Orbit,
  Play,
  Radio,
  Rocket,
  Trophy,
  Youtube,
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { RevealOnScroll } from './RevealOnScroll';

const NETQUEL_ACCENT = '#a855f7';

export const NetquelSection: React.FC = () => {
  const netquel = SITE_CONFIG.netquel;
  const guideVideos = SITE_CONFIG.youtube.fallbackVideos.filter((video) =>
    (netquel.videoIds as readonly string[]).includes(video.videoId)
  );

  return (
    <section id="netquel" className="section-shell netquel-section">
      <div className="container">
        <RevealOnScroll>
          <div className="netquel-hero">
            <div className="netquel-hero__grid" aria-hidden="true" />
            <div className="netquel-hero__orbit" aria-hidden="true">
              <span className="netquel-hero__planet" />
              <span className="netquel-hero__ring netquel-hero__ring--a" />
              <span className="netquel-hero__ring netquel-hero__ring--b" />
              <span className="netquel-hero__ship">
                <Rocket size={22} />
              </span>
            </div>

            <div className="netquel-hero__content">
              <div className="netquel-hero__badge">
                <Radio size={13} aria-hidden="true" />
                <span>{netquel.sectionTag}</span>
              </div>
              <h1 className="netquel-hero__title glitch-title" data-text={netquel.heading}>
                {netquel.heading}
              </h1>
              <p className="netquel-hero__tagline">{netquel.tagline}</p>
              <p className="netquel-hero__desc">{netquel.description}</p>

              <div className="netquel-hero__actions">
                <a
                  href={netquel.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn cyber-btn--primary netquel-btn"
                >
                  <Play size={17} aria-hidden="true" />
                  <span>PLAY NETQUEL</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href={netquel.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn cyber-btn--discord"
                >
                  <MessageSquare size={17} aria-hidden="true" />
                  <span>JOIN THE NEXUS</span>
                </a>
                <a
                  href={netquel.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn cyber-btn--youtube"
                >
                  <Youtube size={17} aria-hidden="true" />
                  <span>WATCH THE RUNS</span>
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={90}>
          <div className="netquel-stats hud-panel">
            <span className="hud-corner-tl" aria-hidden="true" />
            <span className="hud-corner-br" aria-hidden="true" />
            {netquel.highlights.map((item) => (
              <div key={item.label} className="netquel-stat">
                <span className="netquel-stat__label">{item.label}</span>
                <span className="netquel-stat__value">{item.value}</span>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <div className="netquel-section-head">
            <span className="section-eyebrow">
              <span className="section-eyebrow__dot" aria-hidden="true" />
              <span>SECTOR MAP // GAME MODES</span>
            </span>
            <h2 className="section-title">WHERE THE CHAOS HAPPENS</h2>
          </div>
        </RevealOnScroll>

        <div className="netquel-modes">
          {netquel.modes.map((mode, index) => (
            <RevealOnScroll key={mode.id} delayMs={index * 80}>
              <article className="netquel-mode hud-panel">
                <span className="hud-corner-tl" aria-hidden="true" />
                <span className="hud-corner-br" aria-hidden="true" />
                <div className="netquel-mode__top">
                  <span className="netquel-mode__code">{mode.code}</span>
                  <Orbit size={18} aria-hidden="true" />
                </div>
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <div className="netquel-lower">
          <RevealOnScroll delayMs={80}>
            <div className="netquel-console hud-panel">
              <span className="hud-corner-tl" aria-hidden="true" />
              <span className="hud-corner-br" aria-hidden="true" />
              <div className="netquel-console__bar">
                <Disc3 size={14} aria-hidden="true" />
                <span>NEXUS CONSOLE // slashstr1ker_</span>
                <span className="netquel-console__live">
                  <span aria-hidden="true" /> CONNECTED
                </span>
              </div>
              <div className="netquel-console__body">
                {netquel.consoleLines.map((line, index) => (
                  <p
                    key={line}
                    className={index === netquel.consoleLines.length - 1 ? 'is-warn' : ''}
                  >
                    {line}
                  </p>
                ))}
                <p className="netquel-console__cursor">▌</p>
              </div>
              <div className="netquel-console__score">
                <Trophy size={16} aria-hidden="true" />
                <div>
                  <span>NEXUS STATUS</span>
                  <strong>Resident · Duel-ready · Always down for a run</strong>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={140}>
            <div className="netquel-videos">
              <div className="netquel-videos__head">
                <span className="netquel-videos__title">NEXUS FIELD RECORDINGS</span>
                <a href="#/youtube" className="netquel-videos__more">
                  All videos <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
              {guideVideos.map((video) => (
                <a
                  key={video.videoId}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="netquel-video"
                >
                  <img src={video.thumbnail} alt="" loading="lazy" />
                  <div>
                    <span className="netquel-video__label">NETQUEL // FIELD LOG</span>
                    <h3>{video.title}</h3>
                    <span className="netquel-video__meta">
                      {video.views} · {video.publishedAgo}
                    </span>
                  </div>
                  <span className="netquel-video__play" aria-hidden="true">
                    <Play size={15} />
                  </span>
                </a>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delayMs={160}>
          <div
            className="netquel-cta hud-panel"
            style={{ borderColor: NETQUEL_ACCENT }}
          >
            <span className="hud-corner-tl" aria-hidden="true" />
            <span className="hud-corner-br" aria-hidden="true" />
            <div>
              <span className="netquel-cta__label">SQUAD UP</span>
              <h2>THE NEXUS IS BETTER WITH A CREW.</h2>
              <p>
                Duels, clan runs, custom lobbies, and the occasional spectacular failure. Join
                the Netquel Nexus and bring your best ship.
              </p>
            </div>
            <a
              href={netquel.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn netquel-btn netquel-btn--violet"
            >
              <MessageSquare size={17} aria-hidden="true" />
              <span>ENTER NETQUEL NEXUS</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
