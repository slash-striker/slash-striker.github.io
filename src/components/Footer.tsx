import React, { useRef } from 'react';
import { ArrowUp, Bot, ExternalLink, MessageSquare, Youtube } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { LogoMark } from './LogoMark';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const secretClicksRef = useRef({ count: 0, last: 0 });

  const handleCopyrightClick = () => {
    const now = Date.now();
    const record = secretClicksRef.current;
    if (now - record.last > 2200) record.count = 0;
    record.count += 1;
    record.last = now;
    if (record.count >= 3) {
      record.count = 0;
      window.location.hash = '#/secret';
      window.dispatchEvent(new CustomEvent('ss-easter-egg', { detail: 'footer' }));
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (window.location.hash === href) {
        handleBackToTop();
        return;
      }
      window.location.hash = href;
    }
  };

  return (
    <footer className="cyber-footer">
      <div className="container">
        <div className="cyber-footer__top">
          {/* Brand Column */}
          <div className="cyber-footer__brand">
            <a
              href="#/"
              onClick={(e) => handleNavClick(e, '#/')}
              className="cyber-logo"
            >
              <span className="cyber-logo__emblem">
                <LogoMark />
              </span>
              <span className="cyber-logo__text-group">
                <span className="cyber-logo__brand">
                  SLASH<span className="cyber-logo__accent">STR1KER</span>
                </span>
                <span className="cyber-logo__sub">SLASH CORE // ACTIVE</span>
              </span>
            </a>

            <p className="cyber-footer__tagline">
              {SITE_CONFIG.footer.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="cyber-footer__nav" aria-label="Footer Navigation">
            <span className="cyber-footer__heading">NAVIGATION</span>
            <ul className="cyber-footer__list">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="cyber-footer__link"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Direct External Portals */}
          <div className="cyber-footer__portals">
            <span className="cyber-footer__heading">DIRECT PORTALS</span>
            <ul className="cyber-footer__list">
              <li>
                <a
                  href={SITE_CONFIG.links.youtubeChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-footer__link cyber-footer__link--external"
                >
                  <Youtube size={15} aria-hidden="true" />
                  <span>YouTube Channel</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.links.slashStr1kerDiscord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-footer__link cyber-footer__link--external"
                >
                  <MessageSquare size={15} aria-hidden="true" />
                  <span>Discord Community</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.links.featuredBotInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-footer__link cyber-footer__link--external"
                >
                  <Bot size={15} aria-hidden="true" />
                  <span>Bot Invitation Portal</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Back to Top Control with Neon Ring Animation */}
          <div className="cyber-footer__top-action">
            <button
              type="button"
              onClick={handleBackToTop}
              className="back-to-top"
            >
              <span className="back-to-top-orb" aria-hidden="true">
                <span className="back-to-top-orb__ring" />
                <ArrowUp size={20} />
              </span>
              <span className="back-to-top__caption">SCROLL TO TOP</span>
            </button>
          </div>
        </div>

        {/* Bottom Transmission Banner */}
        <div className="cyber-footer__bottom">
          <p className="cyber-footer__transmission">
            {SITE_CONFIG.footer.endTransmission}
          </p>
          <p
            className="cyber-footer__copyright"
            onClick={handleCopyrightClick}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleCopyrightClick();
              }
            }}
            role="button"
            tabIndex={0}
            title="End of transmission"
          >
            &copy; {currentYear} {SITE_CONFIG.brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
