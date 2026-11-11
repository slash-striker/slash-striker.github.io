const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const CHANNEL_VIDEOS_URL = 'https://www.youtube.com/@SlashStr1ker/videos';
const CHANNEL_ABOUT_URL = 'https://www.youtube.com/@SlashStr1ker/about';

function parseInitialData(html) {
  const match = html.match(/var ytInitialData = (\{.*?\});<\/script>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function findKey(obj, key) {
  if (!obj || typeof obj !== 'object') return null;
  if (Object.prototype.hasOwnProperty.call(obj, key)) return obj;
  for (const value of Object.values(obj)) {
    const found = findKey(value, key);
    if (found) return found;
  }
  return null;
}

function parseCount(text) {
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

function extractChannelInfo(data) {
  const about =
    findKey(data, 'aboutChannelViewModel')?.aboutChannelViewModel || {};
  const meta =
    findKey(data, 'channelMetadataRenderer')?.channelMetadataRenderer || {};
  const header =
    findKey(data, 'pageHeaderViewModel')?.pageHeaderViewModel || {};
  const rows =
    header.metadata?.contentMetadataViewModel?.metadataRows || [];
  const parts = rows
    .flatMap((row) =>
      (row.metadataParts || []).map((part) => part?.text?.content)
    )
    .filter((value) => typeof value === 'string');

  const subscriberText =
    (typeof about.subscriberCountText === 'string' &&
      about.subscriberCountText) ||
    parts.find((text) => /subscriber/i.test(text)) ||
    '';
  const videosText =
    (typeof about.videoCountText === 'string' && about.videoCountText) ||
    parts.find((text) => /\bvideo/i.test(text)) ||
    '';
  const viewsText =
    typeof about.viewCountText === 'string' ? about.viewCountText : '';
  const description =
    (typeof about.description === 'string' && about.description) ||
    (typeof meta.description === 'string' && meta.description) ||
    '';
  const joinedText =
    typeof about.joinedDateText?.content === 'string'
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

function extractLockupVideos(data) {
  const found = [];
  const seen = new Set();

  function walk(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (obj.lockupViewModel && typeof obj.lockupViewModel.contentId === 'string') {
      const l = obj.lockupViewModel;
      const videoId = l.contentId;
      if (videoId.length === 11 && !seen.has(videoId)) {
        const title =
          l.metadata?.lockupMetadataViewModel?.title?.content || '';
        const rows =
          l.metadata?.lockupMetadataViewModel?.metadata
            ?.contentMetadataViewModel?.metadataRows || [];
        const metaParts = rows
          .flatMap((r) => (r.metadataParts || []).map((p) => p.text?.content))
          .filter(Boolean);
        const duration =
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
    for (const key of Object.keys(obj)) {
      walk(obj[key]);
    }
  }

  walk(data);
  return found;
}

async function fetchPage(url) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });
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

async function fetchCountFallback() {
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

export default async () => {
  try {
    const [videosHtml, aboutHtml] = await Promise.all([
      fetchPage(CHANNEL_VIDEOS_URL),
      fetchPage(CHANNEL_ABOUT_URL),
    ]);
    const videosData = videosHtml ? parseInitialData(videosHtml) : null;
    const aboutData = aboutHtml ? parseInitialData(aboutHtml) : null;

    if (!videosData && !aboutData) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Unable to parse channel payload' }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const videos = videosData ? extractLockupVideos(videosData).slice(0, 6) : [];
    const info = aboutData ? extractChannelInfo(aboutData) : null;
    const needsFallback =
      !info ||
      info.channelStats.subscriberCount == null ||
      info.channelStats.viewCount == null ||
      info.channelStats.videoCount == null;
    const counterFallback = needsFallback ? await fetchCountFallback() : null;
    const channelStats = info?.channelStats
      ? {
          ...info.channelStats,
          subscriberCount:
            info.channelStats.subscriberCount ??
            counterFallback?.subscriberCount ??
            null,
          viewCount:
            info.channelStats.viewCount ?? counterFallback?.viewCount ?? null,
          videoCount:
            info.channelStats.videoCount ?? counterFallback?.videoCount ?? null,
        }
      : counterFallback
        ? {
            subscribersText: '',
            viewsText: '',
            videosText: '',
            ...counterFallback,
          }
        : null;

    return new Response(
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
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=120, s-maxage=300',
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
