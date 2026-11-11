import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const CHANNEL_VIDEOS_URL = 'https://www.youtube.com/@SlashStr1ker/videos';
const CHANNEL_ABOUT_URL = 'https://www.youtube.com/@SlashStr1ker/about';
const REQUEST_HEADERS = {
  'User-Agent': USER_AGENT,
  'Accept-Language': 'en-US,en;q=0.9',
};

type ChannelStats = {
  subscribersText: string;
  viewsText: string;
  videosText: string;
  subscriberCount: number | null;
  viewCount: number | null;
  videoCount: number | null;
};

type ChannelInfo = {
  channelDescription: string;
  joinedText: string;
  channelStats: ChannelStats;
};

type CounterFallback = {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
};

function parseInitialData(html: string): any | null {
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function findKey(obj: unknown, key: string): Record<string, any> | null {
  if (!obj || typeof obj !== 'object') return null;
  const record = obj as Record<string, any>;
  if (Object.prototype.hasOwnProperty.call(record, key)) return record;
  for (const value of Object.values(record)) {
    const found = findKey(value, key);
    if (found) return found;
  }
  return null;
}

function parseCount(text: unknown): number | null {
  if (typeof text !== 'string') return null;
  const match = text.replace(/,/g, '').match(/(\d+(?:\.\d+)?)\s*([KMB])?/i);
  if (!match) return null;
  const base = Number(match[1]);
  if (!Number.isFinite(base)) return null;
  const suffix = (match[2] || '').toUpperCase();
  const multiplier =
    suffix === 'K'
      ? 1_000
      : suffix === 'M'
        ? 1_000_000
        : suffix === 'B'
          ? 1_000_000_000
          : 1;
  return Math.round(base * multiplier);
}

function extractChannelInfo(data: unknown): ChannelInfo {
  const about = findKey(data, 'aboutChannelViewModel')?.aboutChannelViewModel as
    | Record<string, any>
    | undefined;
  const meta = findKey(data, 'channelMetadataRenderer')
    ?.channelMetadataRenderer as Record<string, any> | undefined;
  const header = findKey(data, 'pageHeaderViewModel')?.pageHeaderViewModel as
    | Record<string, any>
    | undefined;
  const rows = (header?.metadata?.contentMetadataViewModel?.metadataRows ??
    []) as any[];
  const parts = rows
    .flatMap((row) =>
      (row?.metadataParts ?? []).map((part: any) => part?.text?.content)
    )
    .filter((value: unknown): value is string => typeof value === 'string');

  const subscriberText =
    (typeof about?.subscriberCountText === 'string' &&
      about.subscriberCountText) ||
    parts.find((text) => /subscriber/i.test(text)) ||
    '';
  const videosText =
    (typeof about?.videoCountText === 'string' && about.videoCountText) ||
    parts.find((text) => /\bvideo/i.test(text)) ||
    '';
  const viewsText =
    typeof about?.viewCountText === 'string' ? about.viewCountText : '';
  const description =
    (typeof about?.description === 'string' && about.description) ||
    (typeof meta?.description === 'string' && meta.description) ||
    '';
  const joinedText =
    typeof about?.joinedDateText?.content === 'string'
      ? about.joinedDateText.content
      : '';

  return {
    channelDescription: description,
    joinedText,
    channelStats: {
      subscribersText: subscriberText,
      viewsText,
      videosText,
      subscriberCount: parseCount(subscriberText),
      viewCount: parseCount(viewsText),
      videoCount: parseCount(videosText),
    },
  };
}

function extractLockupVideos(data: unknown) {
  const found: Array<{
    videoId: string;
    title: string;
    duration: string;
    views: string;
    publishedAgo: string;
    url: string;
    embedUrl: string;
    thumbnail: string;
  }> = [];
  const seen = new Set<string>();

  function walk(obj: unknown) {
    if (!obj || typeof obj !== 'object') return;
    const record = obj as Record<string, any>;
    if (
      record.lockupViewModel &&
      typeof record.lockupViewModel.contentId === 'string'
    ) {
      const l = record.lockupViewModel;
      const videoId: string = l.contentId;
      if (videoId.length === 11 && !seen.has(videoId)) {
        const title: string =
          l.metadata?.lockupMetadataViewModel?.title?.content || '';
        const rows: any[] =
          l.metadata?.lockupMetadataViewModel?.metadata
            ?.contentMetadataViewModel?.metadataRows || [];
        const metaParts = rows
          .flatMap((r) =>
            (r.metadataParts || []).map((p: any) => p.text?.content)
          )
          .filter(Boolean);
        const duration: string =
          l.contentImage?.thumbnailViewModel?.overlays?.[0]
            ?.thumbnailBottomOverlayViewModel?.badges?.[0]
            ?.thumbnailBadgeViewModel?.text || '';

        if (title) {
          seen.add(videoId);
          found.push({
            videoId,
            title,
            duration,
            views: metaParts[0] ? `${metaParts[0]} views` : '',
            publishedAgo: metaParts[1] || '',
            url: `https://www.youtube.com/watch?v=${videoId}`,
            embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hq720.jpg`,
          });
        }
      }
    }
    for (const key of Object.keys(record)) {
      walk(record[key]);
    }
  }

  walk(data);
  return found;
}

async function fetchPage(url: string): Promise<string | null> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetch(url, { headers: REQUEST_HEADERS });
      if (res.ok) return await res.text();
    } catch {
      // Retry once below.
    }
    if (attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 350));
    }
  }
  return null;
}

async function fetchCountFallback(): Promise<CounterFallback | null> {
  try {
    const res = await fetch(
      'https://api.socialcounts.org/youtube-live-subscriber-count/UCNkuaq6HNa8UW4usOvPZtvw',
      { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) return null;
    const payload = await res.json();
    const counters = payload?.counters?.api ?? payload?.counters?.estimation;
    if (!counters) return null;
    const subscriberCount = Number(counters.subscriberCount);
    const viewCount = Number(counters.viewCount);
    const videoCount = Number(counters.videoCount);
    if (![subscriberCount, viewCount, videoCount].every(Number.isFinite)) {
      return null;
    }
    return { subscriberCount, viewCount, videoCount };
  } catch {
    return null;
  }
}

function youtubeLatestDevPlugin(): Plugin {
  return {
    name: 'slashstr1ker-youtube-latest-api',
    configureServer(server) {
      server.middlewares.use('/api/youtube-latest', async (_req, res) => {
        try {
          const [videosHtml, aboutHtml] = await Promise.all([
            fetchPage(CHANNEL_VIDEOS_URL),
            fetchPage(CHANNEL_ABOUT_URL),
          ]);
          const videosData = videosHtml ? parseInitialData(videosHtml) : null;
          const aboutData = aboutHtml ? parseInitialData(aboutHtml) : null;

          if (!videosData && !aboutData) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false, error: 'Parse error' }));
            return;
          }

          const videos = videosData
            ? extractLockupVideos(videosData).slice(0, 6)
            : [];
          const info = aboutData ? extractChannelInfo(aboutData) : null;
          const needsFallback =
            !info ||
            info.channelStats.subscriberCount == null ||
            info.channelStats.viewCount == null ||
            info.channelStats.videoCount == null;
          const counterFallback = needsFallback
            ? await fetchCountFallback()
            : null;
          const channelStats: ChannelStats | null = info?.channelStats
            ? {
                ...info.channelStats,
                subscriberCount:
                  info.channelStats.subscriberCount ??
                  counterFallback?.subscriberCount ??
                  null,
                viewCount:
                  info.channelStats.viewCount ??
                  counterFallback?.viewCount ??
                  null,
                videoCount:
                  info.channelStats.videoCount ??
                  counterFallback?.videoCount ??
                  null,
              }
            : counterFallback
              ? {
                  subscribersText: '',
                  viewsText: '',
                  videosText: '',
                  ...counterFallback,
                }
              : null;

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: true,
              channelHandle: '@SlashStr1ker',
              channelId: 'UCNkuaq6HNa8UW4usOvPZtvw',
              fetchedAt: new Date().toISOString(),
              latestVideo: videos[0] || null,
              recentVideos: videos,
              channelDescription: info?.channelDescription || '',
              joinedText: info?.joinedText || '',
              channelStats,
            })
          );
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: false,
              error: err instanceof Error ? err.message : 'Unknown error',
            })
          );
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), youtubeLatestDevPlugin()],
  build: {
    // Support older mobile browsers (older iOS Safari / Android WebView):
    // the default target assumes Safari 16+, which can leave old iPhones
    // with a blank page because the bundle fails to parse.
    target: 'es2018',
    cssTarget: 'chrome61',
  },
});
