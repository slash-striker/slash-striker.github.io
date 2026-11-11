import React, { useEffect, useState } from 'react';
import {
  Clock,
  Eye,
  ExternalLink,
  Heart,
  MessageSquare,
  Play,
  RefreshCw,
  Youtube,
} from 'lucide-react';
import {
  SITE_CONFIG,
  YouTubeVideoItem,
} from '../data/siteConfig';
import { RevealOnScroll } from './RevealOnScroll';

type TabId = 'videos' | 'shorts' | 'playlists' | 'posts';

const TABS: { id: TabId; label: string }[] = [
  { id: 'videos', label: 'Videos' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'playlists', label: 'Playlists' },
  { id: 'posts', label: 'Posts' },
];

export const YouTubeSection: React.FC = () => {
  const youtube = SITE_CONFIG.youtube;
  const [recentVideos, setRecentVideos] = useState<YouTubeVideoItem[]>(() => [
    ...youtube.fallbackVideos,
  ]);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem>(
    () => youtube.fallbackVideos[0]
  );
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'live' | 'cached'>(
    'syncing'
  );
  const [tab, setTab] = useState<TabId>('videos');

  const fetchLatestVideos = async () => {
    setSyncStatus('syncing');
    try {
      const res = await fetch('/api/youtube-latest');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();
      if (
        payload?.ok &&
        Array.isArray(payload.recentVideos) &&
        payload.recentVideos.length > 0
      ) {
        setRecentVideos(payload.recentVideos);
        setActiveVideo(payload.recentVideos[0]);
        setSyncStatus('live');
        return;
      }
      setSyncStatus('cached');
    } catch {
      setSyncStatus('cached');
    }
  };

  useEffect(() => {
    fetchLatestVideos();
    // The channel feed is fetched once per mount; refresh is manual.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openVideo = (video: YouTubeVideoItem) => {
    window.open(video.url, '_blank', 'noopener,noreferrer');
  };

  const activeTabUrl =
    youtube.tabs.find((item) => item.id === tab)?.url ?? youtube.channelUrl;

  return (
    <section id="youtube" className="section-shell youtube-section">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header">
            <div className="section-eyebrow">
              <span className="section-eyebrow__dot" aria-hidden="true" />
              <span>{youtube.sectionTag}</span>
            </div>
            <h2
              className="section-title glitch-title"
              data-text={youtube.heading}
            >
              {youtube.heading}
            </h2>
            <p className="section-subtitle">{youtube.subheading}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={80}>
          <div className="ytx-channel hud-panel">
            <span className="hud-corner-tl" aria-hidden="true" />
            <span className="hud-corner-br" aria-hidden="true" />
            <div className="ytx-channel__banner" aria-hidden="true" />

            <div className="ytx-channel__row">
              <img
                src="/slashy.jpg"
                alt="SlashStr1ker channel avatar"
                className="ytx-channel__avatar"
              />
              <div className="ytx-channel__identity">
                <div className="ytx-channel__name-row">
                  <h3>{youtube.channelName}</h3>
                  <span className="ytx-channel__verified" title="Official channel">
                    ✓
                  </span>
                </div>
                <span className="ytx-channel__handle">
                  {youtube.channelHandle} · {recentVideos.length} uploads tracked
                </span>
                <p className="ytx-channel__desc">{youtube.description}</p>
                <div className="ytx-channel__meta">
                  <span>Netquel</span>
                  <span>Gaming</span>
                  <span>Space chaos</span>
                  <span className={`ytx-sync ytx-sync--${syncStatus}`}>
                    <span aria-hidden="true" />
                    {syncStatus === 'live'
                      ? 'AUTO-FEED LIVE'
                      : syncStatus === 'syncing'
                        ? 'SCANNING CHANNEL'
                        : 'CACHED TRANSMISSION'}
                  </span>
                </div>
              </div>

              <div className="ytx-channel__actions">
                <a
                  href={youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn cyber-btn--youtube"
                >
                  <Youtube size={17} aria-hidden="true" />
                  <span>SUBSCRIBE</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href={youtube.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn cyber-btn--discord"
                >
                  <MessageSquare size={17} aria-hidden="true" />
                  <span>DISCORD</span>
                </a>
                <button
                  type="button"
                  onClick={fetchLatestVideos}
                  className="ytx-refresh"
                  aria-label="Refresh latest YouTube uploads"
                  title="Refresh latest uploads"
                >
                  <RefreshCw
                    size={15}
                    className={syncStatus === 'syncing' ? 'is-spinning' : ''}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="ytx-tabs" role="tablist" aria-label="YouTube content">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={`ytx-tab ${tab === item.id ? 'is-active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              <span>{item.label}</span>
              <span className="ytx-tab__count">
                {item.id === 'videos'
                  ? recentVideos.length
                  : item.id === 'shorts'
                    ? youtube.shorts.length
                    : item.id === 'playlists'
                      ? youtube.playlists.length
                      : youtube.posts.length}
              </span>
            </button>
          ))}
          <a
            href={activeTabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ytx-tabs__external"
          >
            View {tab} on YouTube <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>

        {tab === 'videos' && (
          <div className="ytx-videos" role="tabpanel" aria-label="Videos">
            <div className="ytx-feature">
              <button
                type="button"
                className="ytx-feature__frame"
                onClick={() => openVideo(activeVideo)}
                aria-label={`Watch ${activeVideo.title} on YouTube`}
              >
                <img src={activeVideo.thumbnail} alt="" loading="lazy" />
                <span className="ytx-feature__scrim" aria-hidden="true" />
                <span className="ytx-feature__play" aria-hidden="true">
                  <Play size={26} />
                </span>
                <span className="ytx-feature__duration">{activeVideo.duration}</span>
                <span className="ytx-feature__badge">LATEST TRANSMISSION</span>
              </button>

              <div className="ytx-feature__info">
                <h3>{activeVideo.title}</h3>
                <div className="ytx-feature__meta">
                  <span><Eye size={13} aria-hidden="true" /> {activeVideo.views}</span>
                  <span><Clock size={13} aria-hidden="true" /> {activeVideo.publishedAgo}</span>
                  <span>SlashStr1ker</span>
                </div>
                <p>
                  Full run, no cuts, all chaos. Watch it on YouTube and drop a comment with your
                  best Netquel moment.
                </p>
                <div className="ytx-feature__actions">
                  <button
                    type="button"
                    className="cyber-btn cyber-btn--youtube"
                    onClick={() => openVideo(activeVideo)}
                  >
                    <Play size={16} aria-hidden="true" />
                    <span>WATCH NOW</span>
                  </button>
                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-btn cyber-btn--ghost"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    <span>OPEN ON YOUTUBE</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="ytx-video-grid">
              {recentVideos.map((video) => (
                <button
                  key={video.videoId}
                  type="button"
                  className={`ytx-video ${activeVideo.videoId === video.videoId ? 'is-active' : ''}`}
                  onClick={() => setActiveVideo(video)}
                  onDoubleClick={() => openVideo(video)}
                  title={`Select ${video.title}`}
                >
                  <span className="ytx-video__thumb">
                    <img src={video.thumbnail} alt="" loading="lazy" />
                    <span className="ytx-video__duration">{video.duration}</span>
                    <span className="ytx-video__hover" aria-hidden="true">
                      <Play size={18} />
                    </span>
                  </span>
                  <span className="ytx-video__title">{video.title}</span>
                  <span className="ytx-video__meta">
                    {video.views} · {video.publishedAgo}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'shorts' && (
          <div className="ytx-shorts" role="tabpanel" aria-label="Shorts">
            {youtube.shorts.map((short) => (
              <a
                key={short.videoId}
                href={short.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ytx-short"
              >
                <img src={short.thumbnail} alt="" loading="lazy" />
                <span className="ytx-short__scrim" aria-hidden="true" />
                <span className="ytx-short__badge">SHORT</span>
                <span className="ytx-short__play" aria-hidden="true">
                  <Play size={20} />
                </span>
                <span className="ytx-short__body">
                  <span className="ytx-short__title">{short.title}</span>
                  <span className="ytx-short__views">{short.views}</span>
                </span>
              </a>
            ))}
          </div>
        )}

        {tab === 'playlists' && (
          <div className="ytx-playlists" role="tabpanel" aria-label="Playlists">
            {youtube.playlists.map((playlist) => (
              <a
                key={playlist.playlistId}
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`ytx-playlist ytx-playlist--${playlist.accent}`}
              >
                <div className="ytx-playlist__poster">
                  <span className="ytx-playlist__stack" aria-hidden="true" />
                  <span className="ytx-playlist__stack ytx-playlist__stack--two" aria-hidden="true" />
                  <Youtube size={30} aria-hidden="true" />
                  <span className="ytx-playlist__label">PLAYLIST</span>
                  <span className="ytx-playlist__hover" aria-hidden="true">
                    <Play size={20} />
                  </span>
                </div>
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
                <span className="ytx-playlist__link">
                  Open playlist <ExternalLink size={13} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        )}

        {tab === 'posts' && (
          <div className="ytx-posts" role="tabpanel" aria-label="Posts">
            {youtube.posts.map((post) => (
              <a
                key={post.postId}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ytx-post"
              >
                <div className="ytx-post__head">
                  <img src="/slashy.jpg" alt="" />
                  <div>
                    <strong>{youtube.channelName}</strong>
                    <span>{post.publishedAgo}</span>
                  </div>
                  <Youtube size={17} aria-hidden="true" />
                </div>
                <p className="ytx-post__text">{post.text}</p>
                {post.hasImage && (
                  <div className="ytx-post__media" aria-hidden="true">
                    <span className="ytx-post__media-grid" />
                    <span className="ytx-post__media-label">COMMUNITY POST // IMAGE</span>
                  </div>
                )}
                <div className="ytx-post__foot">
                  <span><Heart size={14} aria-hidden="true" /> {post.likes} likes</span>
                  <span>View post <ExternalLink size={12} aria-hidden="true" /></span>
                </div>
              </a>
            ))}
          </div>
        )}

        <RevealOnScroll delayMs={100}>
          <div className="ytx-footer">
            <span>
              FEED SOURCE // {youtube.channelHandle} · {youtube.channelId}
            </span>
            <div className="ytx-footer__actions">
              <a
                href={youtube.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn cyber-btn--youtube"
              >
                <Youtube size={16} aria-hidden="true" />
                <span>{youtube.primaryButtonText}</span>
              </a>
              <a
                href={youtube.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn cyber-btn--discord"
              >
                <MessageSquare size={16} aria-hidden="true" />
                <span>{youtube.secondaryButtonText}</span>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
