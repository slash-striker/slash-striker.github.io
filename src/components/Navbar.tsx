import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, LayoutGrid, Moon, Sun } from 'lucide-react';
import { NavItem, SITE_CONFIG } from '../data/siteConfig';
import { LogoMark } from './LogoMark';

interface NavbarProps {
  activeSection: string;
  scrollProgress: number;
}

type NavRecord = Record<string, NavItem>;

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  scrollProgress,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localTime, setLocalTime] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = document.documentElement.getAttribute('data-theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const logoClicksRef = useRef<{ count: number; last: number }>({
    count: 0,
    last: 0,
  });

  const navById = SITE_CONFIG.navigation.reduce<NavRecord>((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem('ss-theme', next);
    } catch {
      // Storage can be unavailable — the theme still applies live.
    }
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setLocalTime(formatted);
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    if (window.location.hash === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = href;
  };

  // Five quick taps on the mark opens the hidden terminal.
  const handleLogoClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const now = Date.now();
    const record = logoClicksRef.current;
    if (now - record.last > 2500) {
      record.count = 0;
    }
    record.count += 1;
    record.last = now;

    if (record.count >= 5) {
      record.count = 0;
      e.preventDefault();
      window.location.hash = '#/secret';
      window.dispatchEvent(new CustomEvent('ss-easter-egg', { detail: 'logo' }));
      return;
    }

    handleNavClick(e, href);
  };

  return (
    <header className={`cyber-nav ${scrolled ? 'cyber-nav--scrolled' : ''}`}>
      {/* Dynamic top scroll progress bar */}
      <div
        className="cyber-nav__progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <div className="container cyber-nav__inner">
        {/* Clickable Logo returning to homepage */}
        <a
          href="#/"
          onClick={(e) => handleLogoClick(e, '#/')}
          className="cyber-logo"
          aria-label="SlashStr1ker — Return to Homepage"
        >
          <span className="cyber-logo__emblem">
            <LogoMark />
          </span>
          <span className="cyber-logo__text-group">
            <span className="cyber-logo__brand">
              SLASH<span className="cyber-logo__accent">STR1KER</span>
            </span>
            <span className="cyber-logo__sub">COMMAND CENTER // OS</span>
          </span>
        </a>

        {/* Desktop Navigation: Home + one dropdown with every section */}
        <nav className="cyber-nav__links" aria-label="Primary Navigation">
          <a
            href="#/"
            onClick={(e) => handleNavClick(e, '#/')}
            className={`cyber-nav__link ${activeSection === 'home' ? 'is-active' : ''}`}
          >
            <span className="cyber-nav__link-code">01</span>
            <span>Home</span>
          </a>

          <div
            ref={dropdownRef}
            className={`cyber-nav__dropdown ${dropdownOpen ? 'is-open' : ''}`}
          >
            <button
              type="button"
              className={`cyber-nav__dropdown-trigger ${
                dropdownOpen ? 'is-open' : ''
              }`}
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              aria-controls="desktop-nav-dropdown"
            >
              <LayoutGrid size={14} aria-hidden="true" />
              <span>All Sectors</span>
              <ChevronDown size={14} className="cyber-nav__caret" aria-hidden="true" />
            </button>

            <div id="desktop-nav-dropdown" className="cyber-nav__dropdown-panel">
              <div className="cyber-nav__dropdown-head">
                <span>NAVIGATION DIRECTORY</span>
                <span className="cyber-nav__dropdown-status">
                  <span className="cyber-nav__dropdown-dot" aria-hidden="true" />
                  ALL SYSTEMS ONLINE
                </span>
              </div>

              <div className="cyber-nav__dropdown-grid">
                {SITE_CONFIG.navigationGroups.map((group) => (
                  <div key={group.id} className="cyber-nav__group">
                    <span className="cyber-nav__group-label">{group.label}</span>
                    <ul className="cyber-nav__group-list">
                      {group.items.map((id) => {
                        const item = navById[id];
                        if (!item) return null;
                        const isActive = activeSection === item.id;
                        return (
                          <li key={item.id}>
                            <a
                              href={item.href}
                              onClick={(e) => handleNavClick(e, item.href)}
                              className={`cyber-nav__dropdown-link ${
                                isActive ? 'is-active' : ''
                              }`}
                            >
                              <span className="cyber-nav__dropdown-code">
                                {item.code}
                              </span>
                              <span>{item.label}</span>
                              <span className="cyber-nav__dropdown-arrow" aria-hidden="true">
                                →
                              </span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="cyber-nav__dropdown-foot">
                <span>SHORTCUT // ESC TO CLOSE</span>
                <span>SLASHSTR1KER OS v2</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Right HUD Controls: Theme Toggle, Clock & Mobile Hamburger */}
        <div className="cyber-nav__meta">
          <button
            type="button"
            onClick={handleToggleTheme}
            className="cyber-theme-toggle"
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            title={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {theme === 'dark' ? (
              <Sun size={15} aria-hidden="true" />
            ) : (
              <Moon size={15} aria-hidden="true" />
            )}
          </button>

          <div
            className="cyber-clock"
            title="Visitor Local Time"
            aria-label={localTime ? `Local time ${localTime}` : 'Local clock'}
          >
            <span className="cyber-clock__dot" aria-hidden="true" />
            <span className="cyber-clock__label">LOC</span>
            <span className="cyber-clock__time">{localTime || '00:00:00'}</span>
          </div>

          <button
            type="button"
            className={`cyber-hamburger ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
          >
            <span className="cyber-hamburger__bar" />
            <span className="cyber-hamburger__bar" />
            <span className="cyber-hamburger__bar" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`cyber-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="cyber-mobile-drawer__nav" aria-label="Mobile Navigation">
          {SITE_CONFIG.navigation.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`cyber-mobile-drawer__link ${
                  isActive ? 'is-active' : ''
                }`}
              >
                <span className="cyber-mobile-drawer__code">[{item.code}]</span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
