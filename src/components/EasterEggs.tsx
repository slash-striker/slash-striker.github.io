import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Compass,
  KeyRound,
  Sparkles,
  Terminal,
  Trophy,
} from 'lucide-react';
import { LogoMark } from './LogoMark';
import { SITE_CONFIG } from '../data/siteConfig';

/*
 * Tiny cross-site easter egg layer:
 *  - Konami code unlocks the hidden terminal page (and a toast).
 *  - Components can fire `ss-easter-egg` with a detail key for a custom toast.
 *  - The browser console carries a one-time clue.
 */

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const MESSAGES: Record<string, string> = {
  logo: 'SIGNAL 05 // LOGO SEQUENCE ACCEPTED — hidden terminal unlocked',
  konami: 'KONAMI PROTOCOL ACCEPTED // the old ways still work',
  matrix: 'WAKE UP, SLASH // follow the signal to #/secret',
  terminal: 'SHELL HISTORIAN // seven commands in — curiosity confirmed',
  achievement: 'ACHIEVEMENT SIGNAL // the log remembers',
  'all-achievements': 'FULL CLEAR // every achievement unlocked this session',
  'mine-secret': 'DEEP SIGNAL FOUND // something is buried in Space Mine',
  footer: 'END OF TRANSMISSION // you clicked the fine print',
};

export const EasterEggHub: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number>();
  const sequenceRef = useRef<string[]>([]);

  const showToast = (text: string) => {
    setMessage(text);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setMessage(null), 4600);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      sequenceRef.current = [...sequenceRef.current, event.key].slice(-KONAMI.length);
      if (
        sequenceRef.current.length === KONAMI.length &&
        sequenceRef.current.every((key, index) => key === KONAMI[index])
      ) {
        sequenceRef.current = [];
        try {
          window.localStorage.setItem('ss-konami', '1');
        } catch {
          // Storage is optional; the toast still fires.
        }
        showToast(MESSAGES.konami);
        window.dispatchEvent(new CustomEvent('ss-easter-egg', { detail: 'konami' }));
      }
    };

    const onEgg = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail && MESSAGES[detail]) showToast(MESSAGES[detail]);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('ss-easter-egg', onEgg);

    // A tiny clue for anyone who opens the console.
    // eslint-disable-next-line no-console
    console.log(
      '%cSLASHSTR1KER // SIGNAL FOUND',
      'color:#00f5ff;background:#050610;padding:6px 12px;font-family:monospace;border:1px solid #ff2740;',
      '\nThe terminal is listening: try #/secret, or ↑ ↑ ↓ ↓ ← → ← → B A.'
    );

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('ss-easter-egg', onEgg);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="egg-toast" role="status" aria-live="polite">
      <span className="egg-toast__icon" aria-hidden="true">
        <Sparkles size={18} />
      </span>
      <div>
        <span className="egg-toast__label">EASTER EGG FOUND</span>
        <span className="egg-toast__text">{message}</span>
      </div>
    </div>
  );
};

const SECRET_COMMANDS = [
  { cmd: 'whoami', out: 'someone who found the hidden page.' },
  { cmd: 'ls .secret', out: 'signal.log  konami.txt  achievements.dat  slash.core' },
  { cmd: 'cat konami.txt', out: '↑ ↑ ↓ ↓ ← → ← → B A' },
  { cmd: 'sudo hire', out: 'permission granted. open the portfolio.' },
  { cmd: 'unlock --all', out: 'not yet. the mine is still waiting.' },
];

export const SecretView: React.FC = () => {
  return (
    <section className="section-shell secret-page">
      <div className="container">
        <div className="secret-card hud-panel">
          <span className="hud-corner-tl" aria-hidden="true" />
          <span className="hud-corner-br" aria-hidden="true" />

          <div className="secret-card__top">
            <div className="secret-card__mark" aria-hidden="true">
              <LogoMark />
            </div>
            <div>
              <span className="secret-card__eyebrow">HIDDEN SECTOR // 0x5L4SH</span>
              <h1 className="section-title secret-card__title">YOU FOUND THE TERMINAL.</h1>
              <p className="secret-card__lead">
                Not many people click the logo five times, type ancient cheat codes, or dig
                through hidden pages. Since you are here: welcome to the back room.
              </p>
            </div>
          </div>

          <div className="secret-grid">
            <div className="secret-terminal" aria-label="Secret terminal transcript">
              <div className="secret-terminal__bar">
                <Terminal size={14} aria-hidden="true" />
                <span>root@slash:/secret $</span>
              </div>
              {SECRET_COMMANDS.map((line) => (
                <div key={line.cmd} className="secret-terminal__line">
                  <p><span>slash ~ $</span> {line.cmd}</p>
                  <p className="is-output">{line.out}</p>
                </div>
              ))}
            </div>

            <div className="secret-list">
              <span className="secret-list__title">
                <Compass size={16} aria-hidden="true" />
                MORE SIGNALS TO CHASE
              </span>
              <ul>
                <li>
                  <span><KeyRound size={14} aria-hidden="true" /></span>
                  Click the logo mark five times in a row.
                </li>
                <li>
                  <span><Terminal size={14} aria-hidden="true" /></span>
                  Type <code>help</code> in the home-page bash terminal, then try commands that are
                  not on the list.
                </li>
                <li>
                  <span><Trophy size={14} aria-hidden="true" /></span>
                  Unlock every Space Mine achievement in one session.
                </li>
                <li>
                  <span><Sparkles size={14} aria-hidden="true" /></span>
                  Enter the Konami code anywhere on the site.
                </li>
              </ul>
              <p className="secret-list__note">
                Some secrets are still buried. The mine has one. The footer might have another.
              </p>
            </div>
          </div>

          <div className="secret-card__actions">
            <a href="#/" className="cyber-btn cyber-btn--primary">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>BACK TO THE COMMAND CENTER</span>
            </a>
            <a href="#/portfolio" className="cyber-btn cyber-btn--ghost">
              <Sparkles size={16} aria-hidden="true" />
              <span>OPEN THE PORTFOLIO</span>
            </a>
            <span className="secret-card__hint">
              {SITE_CONFIG.brand.slogan}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
