import React, { useEffect, useState } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { CustomCursor } from './components/CustomCursor';
import { FloatingShip } from './components/FloatingShip';
import { BootLoader, RouteLoadingBar } from './components/LoadingBars';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { YouTubeSection } from './components/YouTubeSection';
import { BotLabSection } from './components/BotLabSection';
import { CommunitiesSection } from './components/CommunitiesSection';
import { ContactSection } from './components/ContactSection';
import { CreditsSection } from './components/CreditsSection';
import { SpaceMineGame } from './components/SpaceMineGame';
import { Footer } from './components/Footer';
import { NotFoundView } from './components/NotFoundView';
import { AboutPage } from './components/AboutPage';
import { PortfolioPage } from './components/PortfolioPage';
import { NetquelSection } from './components/NetquelSection';
import { MinecraftSection } from './components/MinecraftSection';
import { BashTerminal } from './components/BashTerminal';
import { EasterEggHub, SecretView } from './components/EasterEggs';

/*
 * Hash-based router (#/youtube, #/bots, ...). Hash routes work on any static
 * host — GitHub Pages sends unknown real paths straight to the static
 * 404.html, so pathname-based routes would never reach the SPA. Legacy bare
 * anchors from the old one-pager (#about, #credits, ...) resolve to their
 * new pages so old links keep working.
 */
const ROUTE_PATHS = [
  '/',
  '/about',
  '/portfolio',
  '/youtube',
  '/netquel',
  '/minecraft',
  '/bots',
  '/communities',
  '/game',
  '/contact',
  '/credits',
  '/secret',
] as const;

const LEGACY_ANCHORS: Record<string, string> = {
  '': '/',
  home: '/',
  about: '/about',
  portfolio: '/portfolio',
  'index.html': '/',
  youtube: '/youtube',
  netquel: '/netquel',
  minecraft: '/minecraft',
  bots: '/bots',
  communities: '/communities',
  game: '/game',
  contact: '/contact',
  credits: '/credits',
  secret: '/secret',
};

const SKIP_LINK_HASH = '#main-content';

const resolveRoute = (hash: string): string | null => {
  if (hash === SKIP_LINK_HASH) return '/';
  const raw = hash.replace(/^#/, '');
  if (raw.startsWith('/')) {
    const path = `/${raw.replace(/^\/+/, '')}`;
    const normalized =
      path.length > 1 ? path.replace(/\/$/, '') : path;
    return (ROUTE_PATHS as readonly string[]).includes(normalized)
      ? normalized
      : null;
  }
  return Object.prototype.hasOwnProperty.call(LEGACY_ANCHORS, raw)
    ? LEGACY_ANCHORS[raw]
    : null;
};

export const App: React.FC = () => {
  const [route, setRoute] = useState<string | null>(() =>
    resolveRoute(window.location.hash)
  );
  const [pathname, setPathname] = useState<string>(() => window.location.pathname);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const isValidPath =
    pathname === '/' || pathname === '/index.html' || pathname === '';

  const showNotFound = !isValidPath || route === null;

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === SKIP_LINK_HASH) return;
      setRoute(resolveRoute(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress =
        totalScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScroll))
        : 0;
      setScrollProgress(currentProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [route]);

  const handleReturnHome = () => {
    window.history.pushState(null, '', '/');
    setPathname('/');
    if (window.location.hash !== '#/' && window.location.hash !== '') {
      window.location.hash = '#/';
    } else {
      setRoute('/');
      window.scrollTo({ top: 0 });
    }
  };

  const navId = route === '/' || route === null ? 'home' : route.slice(1);

  const renderRouteContent = () => {
    switch (route) {
      case '/':
        return (
          <>
            <HeroSection />

            <div className="section-divider" aria-hidden="true">
              <span className="section-divider__line" />
              <span className="section-divider__tag">SYS.TRANSITION // 01-02</span>
              <span className="section-divider__line" />
            </div>

            <AboutSection />

            <div className="section-shell terminal-shell">
              <div className="container">
                <div className="section-header">
                  <div className="section-eyebrow">
                    <span className="section-eyebrow__dot" aria-hidden="true" />
                    <span>TERMINAL ACCESS // 03</span>
                  </div>
                  <h2
                    className="section-title glitch-title"
                    data-text="OPEN A SHELL"
                  >
                    OPEN A SHELL
                  </h2>
                  <p className="section-subtitle">
                    A pretend bash terminal. Ask it who I am, snoop around the
                    filesystem, or try something that is not on the list.
                  </p>
                </div>
                <BashTerminal />
              </div>
            </div>
          </>
        );
      case '/about':
        return <AboutPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/youtube':
        return <YouTubeSection />;
      case '/netquel':
        return <NetquelSection />;
      case '/minecraft':
        return <MinecraftSection />;
      case '/bots':
        return <BotLabSection />;
      case '/communities':
        return <CommunitiesSection />;
      case '/game':
        return <SpaceMineGame />;
      case '/contact':
        return <ContactSection />;
      case '/credits':
        return <CreditsSection />;
      case '/secret':
        return <SecretView />;
      default:
        return null;
    }
  };

  return (
    <div className="app-root">
      <BootLoader />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <CosmicBackground />
      <CustomCursor />
      <FloatingShip />
      <RouteLoadingBar key={route ?? 'none'} />

      <Navbar activeSection={navId} scrollProgress={scrollProgress} />

      {showNotFound ? (
        <NotFoundView onReturnHome={handleReturnHome} />
      ) : (
        <main
          id="main-content"
          className={
            route === '/'
              ? undefined
              : route === '/portfolio'
                ? 'page-view page-view--portfolio'
                : 'page-view'
          }
        >
          {renderRouteContent()}
        </main>
      )}

      <EasterEggHub />
      <Footer />
    </div>
  );
};
