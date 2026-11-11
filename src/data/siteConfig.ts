export interface NavItem {
  id: string;
  label: string;
  href: string;
  code: string;
}

export interface StatusItem {
  id: string;
  label: string;
  category: string;
  accent: 'cyan' | 'blue' | 'purple' | 'magenta';
  isThemeStatus?: boolean;
}

export interface AboutFeatureCard {
  id: string;
  title: string;
  code: string;
  description: string;
  accent: 'cyan' | 'blue' | 'purple';
  iconKey: 'gaming' | 'development' | 'community';
}

export interface BotCommandItem {
  name: string;
  desc: string;
  usage?: string;
}

export interface BotCommandCategory {
  id: string;
  name: string;
  shortLabel: string;
  accentHex: string;
  commands: BotCommandItem[];
}

export interface BotSystemCard {
  id: string;
  name: string;
  statusBadge: string;
  systemLabels: [string, string, string];
  description: string;
  editableNote: string;
  inviteUrl: string;
  buttonText: string;
  featurePlaceholders: {
    slot: string;
    title: string;
    detail: string;
  }[];
  commandCategories: BotCommandCategory[];
}

export interface CommunityCard {
  id: 'slashstr1ker' | 'netquel' | 'softbear';
  code: string;
  sectorTag: string;
  name: string;
  subtitleTag: string;
  description: string;
  inviteUrl: string;
  buttonText: string;
  theme: {
    primary: string;
    secondary: string;
    glow: string;
    badgeBg: string;
    emblemType: 'command-crest' | 'nexus-core' | 'studio-forge';
  };
}

export interface CreditEntry {
  id: string;
  code: string;
  name: string;
  alias: string;
  role: string;
  description: string;
  accent: 'cyan' | 'blue' | 'purple';
  iconKey: 'github' | 'testing';
}

export interface YouTubeVideoItem {
  videoId: string;
  title: string;
  duration: string;
  views: string;
  publishedAgo: string;
  url: string;
  embedUrl: string;
  thumbnail: string;
}

export interface YouTubeShortItem {
  videoId: string;
  title: string;
  views: string;
  url: string;
  thumbnail: string;
}

export interface YouTubePlaylistItem {
  playlistId: string;
  title: string;
  description: string;
  url: string;
  accent: 'cyan' | 'blue' | 'purple' | 'magenta';
}

export interface YouTubePostItem {
  postId: string;
  text: string;
  publishedAgo: string;
  likes: string;
  url: string;
  hasImage?: boolean;
}

export const SITE_CONFIG = {
  brand: {
    name: 'SlashStr1ker',
    upperName: 'SLASHSTR1KER',
    domain: 'https://slash-striker.github.io/',
    tagline: 'Gaming Beyond Limits. Bots Beyond Imagination.',
    slogan: "LET'S SLASH TO THE TOP",
    sloganKicker: 'NO CEILING // NO LIMIT // ONE DIRECTION',
    heroMainHeading: 'WELCOME TO THE DIGITAL FRONTIER',
    heroDescription:
      'Explore my gaming universe, discover powerful Discord bots, join the community, and venture into the next generation of digital experiences.',
    scrollPrompt: 'SCROLL TO EXPLORE',
  },

  links: {
    youtubeChannel: 'https://www.youtube.com/@SlashStr1ker?sub_confirmation=1',
    slashStr1kerDiscord: 'https://discord.gg/48CMZz5SwD',
    netquelNexusDiscord: 'https://discord.gg/nNuCFerYwR',
    softbearGamesDiscord: 'https://discord.gg/MrxkJtX6FF',
    featuredBotInvite:
      'https://discord.com/oauth2/authorize?client_id=1505829367631183963',
  },

  navigation: [
    { id: 'home', label: 'Home', href: '#/', code: '01' },
    { id: 'about', label: 'About Me', href: '#/about', code: '02' },
    { id: 'portfolio', label: 'Portfolio', href: '#/portfolio', code: '03' },
    { id: 'youtube', label: 'YouTube', href: '#/youtube', code: '04' },
    { id: 'netquel', label: 'Netquel', href: '#/netquel', code: '05' },
    { id: 'minecraft', label: 'Minecraft', href: '#/minecraft', code: '06' },
    { id: 'bots', label: 'Discord Bots', href: '#/bots', code: '07' },
    { id: 'communities', label: 'Communities', href: '#/communities', code: '08' },
    { id: 'game', label: 'Space Mine', href: '#/game', code: '09' },
    { id: 'contact', label: 'Contact', href: '#/contact', code: '10' },
    { id: 'credits', label: 'Credits', href: '#/credits', code: '11' },
  ] satisfies NavItem[],

  navigationGroups: [
    {
      id: 'main',
      label: 'MAIN DECK',
      items: ['home', 'about', 'portfolio'],
    },
    {
      id: 'content',
      label: 'CONTENT SECTORS',
      items: ['youtube', 'netquel', 'minecraft', 'communities'],
    },
    {
      id: 'studio',
      label: 'STUDIO & COMMS',
      items: ['bots', 'game', 'contact', 'credits'],
    },
  ],

  heroStatusPanel: [
    {
      id: 'gaming',
      label: 'Gaming & Content Creation',
      category: 'SECTOR // MEDIA',
      accent: 'cyan',
    },
    {
      id: 'bots',
      label: 'Discord Bot Development',
      category: 'SECTOR // AI LAB',
      accent: 'blue',
    },
    {
      id: 'communities',
      label: 'Gaming Communities',
      category: 'SECTOR // NETWORK',
      accent: 'purple',
    },
    {
      id: 'universe',
      label: 'Digital Universe: Online',
      category: 'THEME // INTERFACE',
      accent: 'magenta',
      isThemeStatus: true,
    },
  ] satisfies StatusItem[],

  about: {
    heading: 'BEHIND THE SCREEN',
    sectionTag: 'IDENTITY MATRIX // 02',
    description:
      'Welcome to the world of SlashStr1ker — a place where gaming, technology, creativity, and community collide. From YouTube content to Discord bots and gaming communities, this is the central hub for everything I create and share.',
    cards: [
      {
        id: 'gaming',
        title: 'GAMING',
        code: 'MOD-01 // FRONTIER',
        description:
          'Discover gaming content, adventures, experiments, and new experiences across the digital frontier.',
        accent: 'cyan',
        iconKey: 'gaming',
      },
      {
        id: 'development',
        title: 'DEVELOPMENT',
        code: 'MOD-02 // ARCHITECTURE',
        description:
          'Explore Discord bots and digital projects designed to bring useful tools and engaging experiences to online communities.',
        accent: 'blue',
        iconKey: 'development',
      },
      {
        id: 'community',
        title: 'COMMUNITY',
        code: 'MOD-03 // NEXUS',
        description:
          'Connect with other gamers, discover new communities, and become part of the SlashStr1ker universe.',
        accent: 'purple',
        iconKey: 'community',
      },
    ] satisfies AboutFeatureCard[],
  },

  youtube: {
    sectionTag: 'DEEP SPACE BROADCAST // 03',
    channelName: 'SlashStr1ker',
    channelHandle: '@SlashStr1ker',
    channelId: 'UCNkuaq6HNa8UW4usOvPZtvw',
    heading: 'LATEST FROM THE CHANNEL',
    subheading: 'Subscribe for new videos, streams, and digital adventures.',
    description:
      'Gaming, digital adventures, and more. Subscribe to SlashStr1ker and join the journey as the universe continues to expand.',
    primaryButtonText: 'SUBSCRIBE TO SLASHSTR1KER',
    secondaryButtonText: 'JOIN THE DISCORD COMMUNITY',
    channelUrl: 'https://www.youtube.com/@SlashStr1ker?sub_confirmation=1',
    discordUrl: 'https://discord.gg/48CMZz5SwD',
    highlights: [
      {
        label: 'SIGNAL ORIGIN',
        value: 'SlashStr1ker Official Channel',
      },
      {
        label: 'BROADCAST FOCUS',
        value: 'Netquel & Digital Adventures',
      },
      {
        label: 'AUTO-FEED',
        value: 'Latest Upload Synced',
      },
    ],
    fallbackVideos: [
      {
        videoId: 'snswEwR9A8E',
        title:
          'Netquel.com | Nut Dragon VS Fan | SGCS Summer Masters 2026 [Netquel Division] |',
        duration: '13:21',
        views: '39 views',
        publishedAgo: '4d ago',
        url: 'https://www.youtube.com/watch?v=snswEwR9A8E',
        embedUrl: 'https://www.youtube-nocookie.com/embed/snswEwR9A8E',
        thumbnail: 'https://i.ytimg.com/vi/snswEwR9A8E/hq720.jpg',
      },
      {
        videoId: 'XpZs-9pWVjE',
        title:
          'Netquel.com | Paladin VS SkyShade | SGCS Summer Masters 2026 [Netquel Division] |',
        duration: '15:26',
        views: '67 views',
        publishedAgo: '2w ago',
        url: 'https://www.youtube.com/watch?v=XpZs-9pWVjE',
        embedUrl: 'https://www.youtube-nocookie.com/embed/XpZs-9pWVjE',
        thumbnail: 'https://i.ytimg.com/vi/XpZs-9pWVjE/hq720.jpg',
      },
      {
        videoId: 'SQp6FyxfCNQ',
        title:
          'Netquel.com | Custom Building Video | Guess what im building ;) | SlashStr1ker',
        duration: '23:14',
        views: '52 views',
        publishedAgo: '3w ago',
        url: 'https://www.youtube.com/watch?v=SQp6FyxfCNQ',
        embedUrl: 'https://www.youtube-nocookie.com/embed/SQp6FyxfCNQ',
        thumbnail: 'https://i.ytimg.com/vi/SQp6FyxfCNQ/hq720.jpg',
      },
      {
        videoId: 'V3Q9tx20lhQ',
        title: 'Netquel.com | Reliving old memories | SLASH',
        duration: '42:40',
        views: '86 views',
        publishedAgo: '3w ago',
        url: 'https://www.youtube.com/watch?v=V3Q9tx20lhQ',
        embedUrl: 'https://www.youtube-nocookie.com/embed/V3Q9tx20lhQ',
        thumbnail: 'https://i.ytimg.com/vi/V3Q9tx20lhQ/hq720.jpg',
      },
      {
        videoId: 'WUpAjEMnU4Y',
        title: 'Netquel.com | Anyone miss the older Netquel? | SlashStr1ker',
        duration: '19:23',
        views: '100 views',
        publishedAgo: '4w ago',
        url: 'https://www.youtube.com/watch?v=WUpAjEMnU4Y',
        embedUrl: 'https://www.youtube-nocookie.com/embed/WUpAjEMnU4Y',
        thumbnail: 'https://i.ytimg.com/vi/WUpAjEMnU4Y/hq720.jpg',
      },
      {
        videoId: '2TWL9SnYT4M',
        title:
          'Netquel.com | FORGE | Just trying the Forge Game Mode | SlashStr1ker',
        duration: '23:37',
        views: '131 views',
        publishedAgo: '1mo ago',
        url: 'https://www.youtube.com/watch?v=2TWL9SnYT4M',
        embedUrl: 'https://www.youtube-nocookie.com/embed/2TWL9SnYT4M',
        thumbnail: 'https://i.ytimg.com/vi/2TWL9SnYT4M/hq720.jpg',
      },
      {
        videoId: '5RGZa9rl3Jk',
        title:
          'Netquel.com | No way Netquel got an update | Tutorial Part 1 (Main-hub/Party Servers) |SlashStr1ker|',
        duration: '11:20',
        views: '267 views',
        publishedAgo: '1mo ago',
        url: 'https://www.youtube.com/watch?v=5RGZa9rl3Jk',
        embedUrl: 'https://www.youtube-nocookie.com/embed/5RGZa9rl3Jk',
        thumbnail: 'https://i.ytimg.com/vi/5RGZa9rl3Jk/hq720.jpg',
      },
      {
        videoId: 'LX7Q3X5iKZw',
        title:
          'Netquel.com | NETQUEL GOT AN UPDATE | Tutorial Part 1 (Main-hub + Party Servers) |SlashStr1ker|',
        duration: '12:05',
        views: '225 views',
        publishedAgo: '1mo ago',
        url: 'https://www.youtube.com/watch?v=LX7Q3X5iKZw',
        embedUrl: 'https://www.youtube-nocookie.com/embed/LX7Q3X5iKZw',
        thumbnail: 'https://i.ytimg.com/vi/LX7Q3X5iKZw/hq720.jpg',
      },
    ] satisfies YouTubeVideoItem[],
    shorts: [
      {
        videoId: 'vnjVKHL_RXk',
        title:
          'Netquel.com | Nut Dragon VS Fan (Bonus) | SGCS Summer Masters 2026 [Netquel Division] | #netquel',
        views: '36 views',
        url: 'https://www.youtube.com/shorts/vnjVKHL_RXk',
        thumbnail: 'https://i.ytimg.com/vi/vnjVKHL_RXk/hq720.jpg',
      },
      {
        videoId: 'YZdWUjYyoaY',
        title:
          'Netquel.com| Nut Dragon VS Fan | SGCS Summer Masters 2026 [Netquel Division]|#netquel #space #gaming',
        views: '28 views',
        url: 'https://www.youtube.com/shorts/YZdWUjYyoaY',
        thumbnail: 'https://i.ytimg.com/vi/YZdWUjYyoaY/hq720.jpg',
      },
      {
        videoId: 'x_6YPTxEhhs',
        title:
          'Netquel.com | PALADIN VS SKYSHADE | SGCS Summer Masters 2026 [Netquel Division] | #netquel #space',
        views: '51 views',
        url: 'https://www.youtube.com/shorts/x_6YPTxEhhs',
        thumbnail: 'https://i.ytimg.com/vi/x_6YPTxEhhs/hq720.jpg',
      },
      {
        videoId: 'E-yCVBt3xCg',
        title:
          'Netquel.com | NUT_DRAGON VS THEFAKEONE |SGCS Summer Masters 2026 [Netquel Division]| #netquel',
        views: '251 views',
        url: 'https://www.youtube.com/shorts/E-yCVBt3xCg',
        thumbnail: 'https://i.ytimg.com/vi/E-yCVBt3xCg/hq720.jpg',
      },
      {
        videoId: 'CT1Y8yRBEaE',
        title:
          'Netquel.com | Jokerman_FS VS FAN (Highlights) |SGCS Summer Masters 2026 [Netquel Division] |',
        views: '172 views',
        url: 'https://www.youtube.com/shorts/CT1Y8yRBEaE',
        thumbnail: 'https://i.ytimg.com/vi/CT1Y8yRBEaE/hq720.jpg',
      },
      {
        videoId: 'WOdPrB8JKYk',
        title:
          'Netquel.com | Doing the Falcon Challenge (Part 2) |Slashstr1ker| #gaming #onlinegames #spacegame',
        views: '203 views',
        url: 'https://www.youtube.com/shorts/WOdPrB8JKYk',
        thumbnail: 'https://i.ytimg.com/vi/WOdPrB8JKYk/hq720.jpg',
      },
      {
        videoId: 'fK-tXK2RMek',
        title:
          'Netquel.com | Doing the Falcon Challenge (Part 1) |Slashstr1ker| #gaming #spacegame #onlinegames',
        views: '271 views',
        url: 'https://www.youtube.com/shorts/fK-tXK2RMek',
        thumbnail: 'https://i.ytimg.com/vi/fK-tXK2RMek/hq720.jpg',
      },
      {
        videoId: 'ObKeJJkXxQc',
        title:
          'Netquel.com: Getting a highscore of 99k. (Highlights Part 2) |SLASH| #space #games #gaming #gamer',
        views: '1.6K views',
        url: 'https://www.youtube.com/shorts/ObKeJJkXxQc',
        thumbnail: 'https://i.ytimg.com/vi/ObKeJJkXxQc/hq720.jpg',
      },
    ] satisfies YouTubeShortItem[],
    playlists: [
      {
        playlistId: 'PLKOCvNuOfSSs',
        title: 'Custom Builds',
        description: 'Ship builds, creative experiments, and custom Netquel constructions.',
        url: 'https://www.youtube.com/playlist?list=PLKOCvNuOfSSs',
        accent: 'cyan',
      },
      {
        playlistId: 'PLZpGuwpXLSKA',
        title: 'Netquel Tutorials',
        description: 'Main hub, party servers, and everything you need to get started.',
        url: 'https://www.youtube.com/playlist?list=PLZpGuwpXLSKA',
        accent: 'blue',
      },
      {
        playlistId: 'PLYpGkVOCvSbw',
        title: 'SGCS Summer Masters 2026',
        description: 'The full Netquel Division match archive and highlights.',
        url: 'https://www.youtube.com/playlist?list=PLYpGkVOCvSbw',
        accent: 'magenta',
      },
      {
        playlistId: 'PLRS75_QFH4qo',
        title: 'Netquel (DRAVID)',
        description: 'DRAVID-led Netquel runs, duels, and chaotic highlight reels.',
        url: 'https://www.youtube.com/playlist?list=PLRS75_QFH4qo',
        accent: 'purple',
      },
      {
        playlistId: 'PLUwPStJDxFGtXSpmiq10sbxXGboV7Y1eD',
        title: 'Netquel.com Shorts',
        description: 'Fast, vertical cuts from the Netquel universe.',
        url: 'https://www.youtube.com/playlist?list=PLUwPStJDxFGtXSpmiq10sbxXGboV7Y1eD',
        accent: 'magenta',
      },
      {
        playlistId: 'PLUwPStJDxFGutDHmQ8-KRpDGOdenFyV7m',
        title: 'All Netquel',
        description: 'Every Netquel upload in one long-form archive.',
        url: 'https://www.youtube.com/playlist?list=PLUwPStJDxFGutDHmQ8-KRpDGOdenFyV7m',
        accent: 'blue',
      },
      {
        playlistId: 'PLUwPStJDxFGsYSt0fT1ctl0PoJXEOMSTH',
        title: 'Netquel Team SLASH runs',
        description: 'Squad runs and team chaos with the SLASH crew.',
        url: 'https://www.youtube.com/playlist?list=PLUwPStJDxFGsYSt0fT1ctl0PoJXEOMSTH',
        accent: 'cyan',
      },
    ] satisfies YouTubePlaylistItem[],
    posts: [
      {
        postId: 'UgkxtdDEO0UK_y4_bMVrCsmfUOLXWk34L5tB',
        text: 'Hopefully a Minecraft vid soon 👀',
        publishedAgo: '3 days ago',
        likes: '1',
        url: 'https://www.youtube.com/post/UgkxtdDEO0UK_y4_bMVrCsmfUOLXWk34L5tB',
        hasImage: true,
      },
      {
        postId: 'UgkxtU1lSWtg3oh6DI5wZyZ5WIiduDVvKNH0',
        text: 'Might be kinda late, but checkout the new update in Netquel! Added clans, improved hyperspace reliability, and more.',
        publishedAgo: '8 days ago',
        likes: '2',
        url: 'https://www.youtube.com/post/UgkxtU1lSWtg3oh6DI5wZyZ5WIiduDVvKNH0',
      },
      {
        postId: 'UgkxgCtD1Sqn27Xg42elMYLshuyGygVq85dL',
        text: 'YOOOOO!!!!!!!!!!!!!! 50 subs! Thanks guys for subbing me. Also, my Discord server is free to join ;)',
        publishedAgo: '3 weeks ago',
        likes: '3',
        url: 'https://www.youtube.com/post/UgkxgCtD1Sqn27Xg42elMYLshuyGygVq85dL',
      },
      {
        postId: 'Ugkxc15NOiDhHGDwW6KxXt6FCuxr-x39ttlp',
        text: 'Hey all, my YouTube Server on Discord is ready for people to join ;) It took a long time, so I did not want to keep postponing it.',
        publishedAgo: '1 month ago',
        likes: '3',
        url: 'https://www.youtube.com/post/Ugkxc15NOiDhHGDwW6KxXt6FCuxr-x39ttlp',
        hasImage: true,
      },
    ] satisfies YouTubePostItem[],
    tabs: [
      { id: 'videos', label: 'Videos', url: 'https://www.youtube.com/@SlashStr1ker/videos' },
      { id: 'shorts', label: 'Shorts', url: 'https://www.youtube.com/@SlashStr1ker/shorts' },
      { id: 'playlists', label: 'Playlists', url: 'https://www.youtube.com/@SlashStr1ker/playlists' },
      { id: 'posts', label: 'Posts', url: 'https://www.youtube.com/@SlashStr1ker/posts' },
    ],
  },

  botLab: {
    sectionTag: 'CYBERNETIC SYSTEMS // 04',
    heading: 'THE BOT LAB',
    subtitle:
      'Intelligent tools. Automated systems. Next-level Discord experiences.',
    featuredBot: {
      id: 'slashstr1ker-bot',
      name: 'SlashStr1ker Bot',
      statusBadge: 'DISCORD BOT',
      systemLabels: ['BOT SYSTEM', 'INVITATION PORTAL', 'DIGITAL ASSISTANT'],
      description:
        'A full-scale cyberpunk economy, deep-space mining, neural casino, Dragon Hatchery, and Netquel highscore system built for Discord communities.',
      editableNote:
        'Interactive Neural Command Terminal — browse real slash commands extracted directly from the bot codebase or click any command to copy it.',
      inviteUrl:
        'https://discord.com/oauth2/authorize?client_id=1505829367631183963',
      buttonText: 'ADD TO DISCORD',
      featurePlaceholders: [
        {
          slot: 'SYSTEM 01 // ECONOMY & HEISTS',
          title: 'Neural Economy, Vaults & Co-Op Crime',
          detail:
            'Full wallet, bank, and mining-bank system with /work, /daily streaks, /crime co-op crew heists, /bounty pools, /fish tournaments, and P2P /trade.',
        },
        {
          slot: 'SYSTEM 02 // DEEP-SPACE MINING & GALAXY',
          title: 'Drills, Drone Fleets, Ores & Galaxy Rebirth',
          detail:
            'Mine rare ores and dragon eggs with /mine, manage up to 7 drones and 5 crew in /mining, sell on dynamic markets, and jump galaxies via /galaxy.',
        },
        {
          slot: 'SYSTEM 03 // CASINO & PARTY MINIGAMES',
          title: 'Blackjack, Roulette & Multiplayer Game Night',
          detail:
            'Play /blackjack, /roulette, /scratchcard, 8 solo minigames (/5dice, /mastermind, /lightsout, /highlow), and party games (/mafia, /spy, /bomb).',
        },
        {
          slot: 'SYSTEM 04 // DRAGON HATCHERY & NETQUEL HS',
          title: 'Profiles, Dragon Racing & Netquel Highscores',
          detail:
            'Incubate and race dragons inside /profile, climb XP and streak leaderboards, and inspect official Netquel player dossiers with /hs.',
        },
      ],
      commandCategories: [
        {
          id: 'economy',
          name: '⚡ ECONOMY SYSTEMS',
          shortLabel: '⚡ Economy',
          accentHex: '#00F5FF',
          commands: [
            {
              name: '/main-hub',
              desc: 'Your Dragon Code command center: balances, drill setup, drone fleet, crew, stockpile value, and active contracts',
            },
            {
              name: '/work',
              desc: 'Complete career assignments for credits',
            },
            {
              name: '/daily',
              desc: 'Claim your daily cosmic reward and build your streak multiplier',
            },
            {
              name: '/crime',
              desc: 'Solo breaches or escalating co-op heists with crew roles (hacker / driver / muscle)',
            },
            {
              name: '/rob',
              desc: "Rob a player's wallet or start a bank heist",
            },
            {
              name: '/fish',
              desc: 'Neural Ocean Fishing System — cast to fish, sell, shop, view your log, or check the live tournament board',
            },
            {
              name: '/bank',
              desc: 'Vault access: deposit, withdraw, or check your balances',
            },
            {
              name: '/balance',
              desc: 'Check your wallet, bank, and financial identity',
            },
            {
              name: '/transfer',
              desc: 'Transfer credits between mining bank, wallet, or another user',
            },
            {
              name: '/trade',
              desc: 'Trade items and credits with another player — both sides must confirm',
            },
            {
              name: '/bounty',
              desc: "Put a price on someone's head; whoever robs them collects the pool",
            },
            {
              name: '/invest',
              desc: 'Contrarian market PvP — bet long or short on an ore in 5-minute rounds',
            },
            {
              name: '/beg',
              desc: 'Beg on the streets for spare coins',
            },
            {
              name: '/remind',
              desc: 'Set, list, or cancel a private DM reminder (e.g. /remind 2h claim the contract)',
            },
          ],
        },
        {
          id: 'career',
          name: '💼 MINING & GALAXY',
          shortLabel: '⛏️ Mining & Galaxy',
          accentHex: '#397BFF',
          commands: [
            {
              name: '/mine',
              desc: 'Complete a mining run for ore, XP, mining-bank credits, and rare dragon egg drops',
            },
            {
              name: '/mining',
              desc: 'Mining hub: drill & location upgrades, drones, refine, boosts, crew, contracts, property, and stats',
            },
            {
              name: '/mining-inventory',
              desc: 'View your stored ores, refined materials, artifacts, drones, and crew',
            },
            {
              name: '/sell',
              desc: 'Sell your mined ores, refined materials, and artifacts at dynamic market prices',
            },
            {
              name: '/galaxy',
              desc: 'Galaxy travel & rebirth — view the star chart, unlock galaxies, jump sectors, or rebirth for +25% permanent yield',
            },
            {
              name: '/job',
              desc: 'Browse clearance career pathways or apply for promotion',
            },
          ],
        },
        {
          id: 'casino',
          name: '🎰 CASINO & GAMES',
          shortLabel: '🎰 Casino & Games',
          accentHex: '#FF3CAC',
          commands: [
            {
              name: '/uno-play',
              desc: 'Start a multiplayer UNO table — draw, stack, and play your way to zero cards',
            },
            {
              name: '/blackjack',
              desc: 'Play interactive virtual blackjack against the dealer',
            },
            {
              name: '/roulette',
              desc: 'Spin the American roulette wheel — bet on colors, areas, or exact numbers (0–36)',
            },
            {
              name: '/games',
              desc: 'All minigames in one hub: 5dice, hangman, highlow, lightsout, mastermind, matchpairs, rps, or tictactoe',
            },
            {
              name: '/scratchcard',
              desc: 'Buy and scratch hidden holographic reward cards for prizes',
            },
            {
              name: '/guess-number',
              desc: 'Free-to-play number challenge — exact hit wins 500,000 coins',
            },
            {
              name: '/activities',
              desc: 'QOTD + multiplayer party games: bomb, math, mafia, and spy',
            },
            {
              name: '/mafia',
              desc: 'Mafia: Neon Protocol — social deduction party game with friends (5–10 players)',
            },
            {
              name: '/spy',
              desc: 'Spy Hunters — interrogate your friends and uncover the undercover agent (4–8 players)',
            },
            {
              name: '/bomb',
              desc: 'Arm a time bomb and defuse it with friends for entry-fee stakes',
            },
            {
              name: '/math',
              desc: 'Open a rapid-fire Math Duel — first correct answer takes the pot',
            },
            {
              name: '/5dice',
              desc: 'Play a Yahtzee-style five-dice scoring game',
            },
            {
              name: '/highlow',
              desc: 'Play the multi-round High/Low card guessing game',
            },
            {
              name: '/mastermind',
              desc: 'Crack the secret cipher code in Mastermind',
            },
            {
              name: '/lightsout',
              desc: 'Solve the interactive Lights Out puzzle grid',
            },
            {
              name: '/matchpairs',
              desc: 'Match hidden signal pairs on a 5×4 memory grid',
            },
            {
              name: '/hangman',
              desc: 'Play interactive Hangman word deduction',
            },
            {
              name: '/rps',
              desc: 'Play Rock Paper Scissors',
            },
            {
              name: '/tictactoe',
              desc: 'Play Tic-Tac-Toe against the bot or a friend',
            },
            {
              name: '/casino',
              desc: 'View virtual casino rules and your personal wagering summary',
            },
            {
              name: '/game-night',
              desc: 'The Game Night hub — overview of every party game on the station',
            },
          ],
        },
        {
          id: 'profile',
          name: '👤 PROFILE, DRAGONS & NETQUEL',
          shortLabel: '🐉 Profile & Netquel',
          accentHex: '#A855F7',
          commands: [
            {
              name: '/profile',
              desc: 'Your full profile AND the Dragon Hatchery: pets, eggs, feeding, quests, badges, titles, and dragon racing',
            },
            {
              name: '/hs',
              desc: 'View official Netquel highscores — inspect a player dossier or the global leaderboard',
            },
            {
              name: '/rank',
              desc: 'View your custom level and XP rank card',
            },
            {
              name: '/level-leaderboard',
              desc: 'View the top XP users across the server',
            },
            {
              name: '/ec-leaderboard',
              desc: 'View the richest users in the neural economy',
            },
            {
              name: '/daily-leaderboard',
              desc: 'View the top daily streak leaders in the streak matrix',
            },
            {
              name: '/prestige',
              desc: 'Reset after reaching required streak for permanent prestige bonuses',
            },
            {
              name: '/ec-stats',
              desc: 'Economy, blackjack, and casino statistics in one dashboard',
            },
            {
              name: '/ec-cooldowns',
              desc: 'Open the live command cooldown dashboard with refresh controls',
            },
            {
              name: '/credits-audit',
              desc: 'Inspect your recent coin transactions',
            },
          ],
        },
        {
          id: 'shop',
          name: '🛒 NEURAL SHOP & MARKET',
          shortLabel: '🛒 Shop & Market',
          accentHex: '#00F5FF',
          commands: [
            {
              name: '/shop',
              desc: 'Browse or buy items from the Neural Shop with autocomplete',
            },
            {
              name: '/inventory',
              desc: 'View your shop item and equipment inventory',
            },
            {
              name: '/open-box',
              desc: 'Open mystery boxes (supports mode:auto toggle)',
            },
            {
              name: '/item-give',
              desc: 'Give items or stored fish to another user',
            },
            {
              name: '/market',
              desc: 'View live dynamic ore prices and active market events',
            },
            {
              name: '/lottery',
              desc: 'Join the weekly Neural Lottery or check jackpot odds',
            },
          ],
        },
        {
          id: 'utility',
          name: '🌐 SOCIAL, TIME & COUNTING',
          shortLabel: '🌐 Social & Utility',
          accentHex: '#397BFF',
          commands: [
            {
              name: '/commands-list',
              desc: 'Open the interactive Neural Command Terminal inside Discord',
            },
            {
              name: '/ui-style',
              desc: 'Toggle between high-tech cyberpunk and standard command embed styling',
            },
            {
              name: '/birthday',
              desc: 'Check a registered birthday or set your own',
            },
            {
              name: '/set-sleep',
              desc: 'Set your local timezone and sleep schedule',
            },
            {
              name: '/see-users-time',
              desc: "View another user's local timezone and sleep schedule",
            },
            {
              name: '/time-at',
              desc: 'Convert a timestamp between user timezones',
            },
            {
              name: '/toggle-ping',
              desc: 'Toggle notification roles and game-night pings',
            },
            {
              name: '/game-pings',
              desc: 'Ping the Game Ping role to rally players for game night',
            },
            {
              name: '/nextcount',
              desc: 'Privately check the next required number in the counting grid',
            },
            {
              name: '/count-leaderboard',
              desc: 'View the counting channel leaderboard',
            },
            {
              name: '/ping',
              desc: 'Display live bot and Discord API latency',
            },
          ],
        },
        {
          id: 'admin',
          name: '🔧 STAFF & ADMIN CONTROLS',
          shortLabel: '🔧 Admin & Staff',
          accentHex: '#FF3CAC',
          commands: [
            {
              name: '/dragon-admin',
              desc: '[ADMIN] Manage dragons, tournaments, market rounds, flash deals, capsules, seasonal gifts, racing, and bounties',
            },
            {
              name: '/giveaway',
              desc: '[ADMIN] Launch an interactive credit giveaway with staff reroll controls',
            },
            {
              name: '/hs-admin',
              desc: '[ADMIN] Record and sync official Netquel highscores',
            },
            {
              name: '/admin',
              desc: '[ADMIN] Manage bot economy, item grants, and mining state',
            },
            {
              name: '/casino-admin',
              desc: '[ADMIN] Configure virtual casino table controls',
            },
            {
              name: '/credits-give',
              desc: 'Give credits to a user',
            },
            {
              name: '/edit',
              desc: "[ADMIN] Edit a user's economy, inventory, daily streak, or XP",
            },
            {
              name: '/reset',
              desc: "[ADMIN] Reset a user's economy, stats, wallet, inventory, or XP",
            },
            {
              name: '/verify',
              desc: '[STAFF] Deploy the interactive member verification terminal',
            },
            {
              name: '/staff',
              desc: '[STAFF] Broadcast an encrypted staff signal',
            },
          ],
        },
      ],
    } satisfies BotSystemCard,
    additionalBots: [
      {
        id: 'netquel-companion',
        name: 'Netquel Companion',
        statusBadge: 'COMMUNITY BOT',
        systemLabels: ['BOT SYSTEM', 'NEXUS LINK', 'NETQUEL ASSISTANT'],
        description:
          'A Netquel-focused companion unit for the Nexus — player dossiers, highscore lookups, match history, party finder, and live update pings in one clean slash-command interface.',
        editableNote:
          'Support unit command directory — click any command to copy it.',
        inviteUrl: 'https://discord.gg/nNuCFerYwR',
        buttonText: 'JOIN NETQUEL NEXUS',
        featurePlaceholders: [
          {
            slot: 'SYSTEM 01 // NEXUS IDENTITY',
            title: 'Player Dossiers & Highscores',
            detail:
              'Pull a player card with Netquel highscores, favourite ships, clan tags, and recent match history without leaving Discord.',
          },
          {
            slot: 'SYSTEM 02 // MATCH INTEL',
            title: 'Match History & Rival Tracking',
            detail:
              'Review recent duels, compare runs with friends, and keep a running rivalry board for the Nexus.',
          },
          {
            slot: 'SYSTEM 03 // SQUAD FINDER',
            title: 'Party Finder & Event Pings',
            detail:
              'Open a party, fill the last slot, and ping the right role when a Netquel night or tournament is starting.',
          },
          {
            slot: 'SYSTEM 04 // SIGNAL FEED',
            title: 'Update Watch & Community Feed',
            detail:
              'Track Netquel patch notes, clan news, and community highlights with a single subscription command.',
          },
        ],
        commandCategories: [
          {
            id: 'netquel',
            name: '🛰️ NETQUEL LINK',
            shortLabel: '🛰️ Netquel',
            accentHex: '#A855F7',
            commands: [
              {
                name: '/netquel',
                desc: 'Open the Netquel Nexus hub: patch notes, event countdown, and quick links',
              },
              {
                name: '/dossier',
                desc: 'Inspect a player dossier with highscores, clan, and recent matches',
              },
              {
                name: '/match-history',
                desc: 'Review your recent duels, wins, and streak history',
              },
              {
                name: '/rival',
                desc: 'Track a friendly rivalry and compare your best runs',
              },
              {
                name: '/clan',
                desc: 'View clan rosters, tags, and activity across the Nexus',
              },
            ],
          },
          {
            id: 'nexus',
            name: '🎮 NEXUS SOCIAL',
            shortLabel: '🎮 Nexus Social',
            accentHex: '#FF3CAC',
            commands: [
              {
                name: '/party-find',
                desc: 'Open or join a Netquel party with the right role and region',
              },
              {
                name: '/scrim',
                desc: 'Challenge another crew to a friendly scrim',
              },
              {
                name: '/event-ping',
                desc: 'Ping the event role for a Netquel night or tournament',
              },
              {
                name: '/update-watch',
                desc: 'Subscribe to Netquel patch notes and community news',
              },
              {
                name: '/highlight',
                desc: 'Submit a clip for the community highlight reel',
              },
            ],
          },
        ],
      },
      {
        id: 'craftlink',
        name: 'CraftLink',
        statusBadge: 'COMMUNITY BOT',
        systemLabels: ['BOT SYSTEM', 'BLOCK LINK', 'WORLD ASSISTANT'],
        description:
          'A Minecraft-side utility unit for the community — live server status, player lookup, build showcases, event coordination, and modpack notes.',
        editableNote:
          'Support unit command directory — click any command to copy it.',
        inviteUrl: 'https://discord.gg/48CMZz5SwD',
        buttonText: 'JOIN THE DISCORD',
        featurePlaceholders: [
          {
            slot: 'SYSTEM 01 // WORLD STATUS',
            title: 'Server Status & Player Lookup',
            detail:
              'Check whether the realm is online, who is playing, and where everyone is building before you launch the game.',
          },
          {
            slot: 'SYSTEM 02 // BUILD LIBRARY',
            title: 'Build Showcase & Palette Notes',
            detail:
              'Submit screenshots, browse community builds, and save block palettes for the next project.',
          },
          {
            slot: 'SYSTEM 03 // MODPACK INTEL',
            title: 'Mods, Seeds & Version Sync',
            detail:
              'Keep the server mod list, seed, and Java version in one searchable channel.',
          },
          {
            slot: 'SYSTEM 04 // EVENT CONTROL',
            title: 'Build Nights & Mini-Game Queues',
            detail:
              'Schedule build nights, open a mini-game queue, and ping players when the world is ready.',
          },
        ],
        commandCategories: [
          {
            id: 'world',
            name: '🟩 WORLD STATUS',
            shortLabel: '🟩 World',
            accentHex: '#7BE05A',
            commands: [
              {
                name: '/server',
                desc: 'Show the current server address, version, and online status',
              },
              {
                name: '/status',
                desc: 'Live player count, uptime, and current world border',
              },
              {
                name: '/player',
                desc: 'Look up a player: playtime, builds, and last seen',
              },
              {
                name: '/seed',
                desc: 'Reveal the current world seed and spawn coordinates',
              },
              {
                name: '/mods',
                desc: 'List the installed mods and required client version',
              },
            ],
          },
          {
            id: 'builds',
            name: '🧱 BUILDS & EVENTS',
            shortLabel: '🧱 Builds',
            accentHex: '#C58B4A',
            commands: [
              {
                name: '/build',
                desc: 'Submit a build screenshot with coordinates and palette',
              },
              {
                name: '/gallery',
                desc: 'Browse the community build gallery',
              },
              {
                name: '/build-night',
                desc: 'Schedule or join a themed build night',
              },
              {
                name: '/queue',
                desc: 'Open the mini-game queue for the next round',
              },
              {
                name: '/whitelist',
                desc: 'Request whitelist access for the community realm',
              },
            ],
          },
        ],
      },
    ] as BotSystemCard[],
    comingSoonTitle: 'MORE SYSTEMS COMING SOON',
    comingSoonDescription:
      'Additional expansion bays are online and reserved for future Discord bots and automated tools in the SlashStr1ker ecosystem.',
  },

  communities: {
    sectionTag: 'ALLIANCE DIRECTORY // 05',
    heading: 'FIND YOUR SQUAD',
    subtitle: 'Three official communities. Find the one that fits you.',
    servers: [
      {
        id: 'slashstr1ker',
        code: 'GATEWAY 01 // COMMAND HUB',
        sectorTag: 'OFFICIAL CREATOR SERVER',
        name: 'SlashStr1ker Discord',
        subtitleTag: 'Primary Flagship Community',
        description:
          'The official community hub for the SlashStr1ker YouTube channel. Connect with the community and stay involved in the latest activities.',
        inviteUrl: 'https://discord.gg/48CMZz5SwD',
        buttonText: 'JOIN MY COMMUNITY',
        theme: {
          primary: '#FF2740',
          secondary: '#FF3CAC',
          glow: 'rgba(255, 39, 64, 0.38)',
          badgeBg: 'rgba(255, 39, 64, 0.14)',
          emblemType: 'command-crest',
        },
      },
      {
        id: 'netquel',
        code: 'GATEWAY 02 // QUANTUM REALM',
        sectorTag: 'NETQUEL UNIVERSE',
        name: 'Netquel Nexus',
        subtitleTag: 'Dimensional Network Hub',
        description:
          'Enter the Netquel Nexus community and connect with others in the Netquel universe.',
        inviteUrl: 'https://discord.gg/nNuCFerYwR',
        buttonText: 'ENTER NETQUEL NEXUS',
        theme: {
          primary: '#A855F7',
          secondary: '#FF3CAC',
          glow: 'rgba(168, 85, 247, 0.38)',
          badgeBg: 'rgba(168, 85, 247, 0.14)',
          emblemType: 'nexus-core',
        },
      },
      {
        id: 'softbear',
        code: 'GATEWAY 03 // STUDIO FORGE',
        sectorTag: 'OFFICIAL GAME CREATOR',
        name: 'Softbear Games (Official Game Creator)',
        subtitleTag: 'Creators of Netquel',
        description:
          'Visit the official Softbear Games community, associated with the creators of Netquel.',
        inviteUrl: 'https://discord.gg/MrxkJtX6FF',
        buttonText: 'JOIN SOFTBEAR GAMES',
        theme: {
          primary: '#397BFF',
          secondary: '#00F5FF',
          glow: 'rgba(57, 123, 255, 0.38)',
          badgeBg: 'rgba(57, 123, 255, 0.14)',
          emblemType: 'studio-forge',
        },
      },
    ] satisfies CommunityCard[],
  },

  contact: {
    sectionTag: 'DIRECT COMMS // 06',
    heading: 'ESTABLISH CONNECTION',
    subtitle:
      'Have a question, want to connect, or want to talk about my projects?',
    promptText: 'Need to reach me? Find me on Discord.',
    ideasPrompt:
      'Have any cool ideas that you want to share? Tell me more about them!',
    ideasSubtext:
      'Collabs, bots, videos, builds, websites, or a wild concept that needs a co-pilot — my inbox is open.',
    platform: 'Discord',
    discordUsername: 'slashstr1ker_',
    copySuccessText: 'USERNAME COPIED.',
    communityUrl: 'https://discord.gg/48CMZz5SwD',
    youtubeUrl: 'https://www.youtube.com/@SlashStr1ker?sub_confirmation=1',
  },

  credits: {
    sectionTag: 'CREDIT ROLL // 07',
    heading: 'SPECIAL THANKS',
    subtitle:
      'Thank you to the people who helped build this site and community.',
    entries: [
      {
        id: 'dragonfire',
        code: 'CREDIT 01 // GITHUB OPS',
        name: 'DragonFire',
        alias: 'DragonFire332',
        role: 'GITHUB REPOS & PAGES',
        description:
          'For helping me get to GitHub repos and GitHub Pages — getting this website built and launched online.',
        accent: 'cyan',
        iconKey: 'github',
      },
      {
        id: 'relied',
        code: 'CREDIT 02 // QA & FEEDBACK',
        name: 'Relied',
        alias: '',
        role: 'WEBSITE TESTING & FEEDBACK',
        description:
          'For helping test this website and giving good inputs on what to change.',
        accent: 'purple',
        iconKey: 'testing',
      },
    ] satisfies CreditEntry[],
  },

  aboutPage: {
    sectionTag: 'IDENTITY FILE // 02',
    heading: 'ABOUT ME',
    handle: 'SLASH // SLASHSTR1KER',
    role: 'Content creator, Discord bot developer & community builder',
    location: 'Earth // Online',
    intro:
      'I am a creator who lives at the intersection of games, code, and community. I build the tools I wish existed, film the adventures that come out of them, and bring people together around both.',
    bio: [
      'My story starts the same way a lot of good ones do: with a game, a late night, and a question that would not leave me alone. Netquel pulled me into online gaming, Discord pulled me into communities, and the gaps between the two pulled me into development.',
      'These days I spend most of my time building the SlashStr1ker Bot — a deep, game-like Discord platform with economies, mining systems, casinos, dragons, and more slash commands than any sane person needs. When I am not shipping commands, I am recording Netquel runs, testing wild ideas with friends, or helping communities get their own systems off the ground.',
      'I care about the small details: a clean embed, a fast response, an interaction that makes someone laugh. The goal is never just to build something that works — it is to build something people want to come back to.',
    ],
    quickFacts: [
      { label: 'HANDLE', value: 'SlashStr1ker' },
      { label: 'ROLE', value: 'Creator & Developer' },
      { label: 'MAIN GAME', value: 'Netquel' },
      { label: 'MAIN STACK', value: 'TypeScript · React · Node.js' },
      { label: 'TIMEZONE', value: 'Ask me — I am probably awake' },
      { label: 'STATUS', value: 'Building something new' },
    ],
    timeline: [
      {
        year: 'THE START',
        title: 'First contact with the internet',
        detail:
          'Games, forums, and the realisation that a community can feel like a second home.',
      },
      {
        year: 'THE PIVOT',
        title: 'From player to builder',
        detail:
          'Started tinkering with Discord bots, first for friends and then for entire servers.',
      },
      {
        year: 'THE CHANNEL',
        title: 'SlashStr1ker goes live',
        detail:
          'Netquel gameplay, tutorials, and community moments started finding an audience on YouTube.',
      },
      {
        year: 'NOW',
        title: 'The bot lab',
        detail:
          'A growing ecosystem of bots, a community hub, and a website that keeps expanding.',
      },
    ],
    interests: [
      {
        title: 'Game design',
        detail: 'Economies, progression loops, and the tiny rewards that make a game sticky.',
      },
      {
        title: 'Community systems',
        detail: 'Bots, roles, events, and the invisible design that keeps a server alive.',
      },
      {
        title: 'Web experiences',
        detail: 'Interfaces with personality — not just pretty, but genuinely fun to use.',
      },
      {
        title: 'Content creation',
        detail: 'Turning gameplay into stories, tutorials, and highlight reels.',
      },
    ],
    setup: [
      'Editor: VS Code with a borderline-unhealthy number of extensions',
      'Stack: TypeScript, React, Node.js, Discord.js, Python',
      'Audio: a microphone that has survived more Discord calls than it should',
      'Fuel: whatever keeps the build server running at 2 AM',
    ],
    currently: [
      'Expanding the SlashStr1ker Bot command roster',
      'Building new Netquel content and tutorials',
      'Exploring Minecraft builds and community tools',
      'Open to collabs, commissions, and interesting problems',
    ],
    quote:
      'Build the thing you want to exist. Then invite everyone in.',
  },

  portfolio: {
    name: 'SlashStr1ker',
    title: 'Software Developer & Digital Creator',
    subtitle:
      'I build tools, communities, and experiences that make the internet more fun.',
    availability: 'Open to opportunities',
    location: 'Remote · Worldwide',
    responseTime: 'Usually replies within 24–48 hours',
    intro:
      'I am a developer and creator focused on community platforms, interactive web experiences, and Discord systems. I take ideas from a sketch in a voice call to a polished product people actually use — and I care about every layer in between.',
    about: [
      'My background sits between software engineering and content creation. I have spent years building Discord bots for real communities, designing progression systems with economies and minigames, and turning the results into videos and tutorials.',
      'That combination is my edge: I understand both the person using the product and the code underneath it. I write maintainable TypeScript, design interfaces that explain themselves, and test with real users instead of guessing.',
      'Right now I am looking for opportunities where I can build community-facing products, developer tools, or interactive experiences with a team that cares about craft.',
    ],
    highlights: [
      { label: 'FOCUS', value: 'Community platforms & interactive products' },
      { label: 'STACK', value: 'TypeScript · React · Node.js · Python' },
      { label: 'BASED', value: 'Remote / Worldwide' },
    ],
    background:
      'Self-taught developer with a content-creation background. I learned by shipping: bots for friends, then for servers, then for a growing community. Every system on this site started as a problem I wanted to solve for real people.',
    interests: [
      'Game systems and progression design',
      'Developer tooling and automation',
      'Community architecture and moderation UX',
      'Video production and storytelling',
      'Minecraft redstone and creative builds',
    ],
    personality: [
      {
        title: 'Curious by default',
        detail:
          'I read the docs, reverse-engineer the API, and ask the question everyone else skipped.',
      },
      {
        title: 'Detail-obsessed',
        detail:
          'Loading states, empty states, edge cases, and the last 5% that makes a product feel finished.',
      },
      {
        title: 'Community-first',
        detail:
          'I build for real users and iterate with their feedback instead of designing in isolation.',
      },
      {
        title: 'Calm under pressure',
        detail:
          'Live events, broken deployments, and 2 AM bug hunts have taught me to debug before panicking.',
      },
    ],
    creativeApproach:
      'My approach is simple: understand the feeling first, then build backwards to the feature. A bot command should feel like a game move. A portfolio should feel like a conversation. I prototype quickly, cut what does not earn its place, and polish the parts people touch most.',
    education: [
      {
        period: '[Add dates]',
        institution: '[Your School / University]',
        program: '[Your programme or field of study]',
        detail:
          'Add your coursework, projects, and achievements here. The layout is ready — the details are yours.',
      },
      {
        period: 'ONGOING',
        institution: 'Self-directed learning',
        program: 'Software engineering, game systems & community design',
        detail:
          'Documentation, open-source projects, and a long trail of shipped Discord bots.',
      },
    ],
    careerGoals: [
      {
        title: 'Build products people return to',
        detail:
          'Join or lead a team building community-facing products where design and engineering both matter.',
      },
      {
        title: 'Grow as a full-stack engineer',
        detail:
          'Deepen my backend and infrastructure skills while keeping a strong product and UI instinct.',
      },
      {
        title: 'Turn the ecosystem into something bigger',
        detail:
          'Evolve the SlashStr1ker tools and community into a sustainable studio-style operation.',
      },
    ],
    projects: [
      {
        id: 'slashstr1ker-bot',
        title: 'SlashStr1ker Bot',
        category: 'Discord Platform · Product Engineering',
        year: '2024 — Present',
        role: 'Solo developer & product designer',
        description:
          'A large-scale Discord bot with a full economy, deep-space mining, casino minigames, dragon collecting, party games, and a 100+ command directory.',
        tags: ['TypeScript', 'Node.js', 'Discord.js', 'Game Design'],
        link: 'https://discord.com/oauth2/authorize?client_id=1505829367631183963',
        linkLabel: 'Add to Discord',
      },
      {
        id: 'slashstr1ker-site',
        title: 'SlashStr1ker Website',
        category: 'Web Experience · Frontend',
        year: '2025 — Present',
        role: 'Designer & developer',
        description:
          'A fast, accessible, cyberpunk-inspired hub for the channel, bots, communities, game, and portfolio — built with React, TypeScript, and Vite.',
        tags: ['React', 'TypeScript', 'Vite', 'CSS Architecture'],
        link: 'https://github.com/slash-striker/slash-striker.github.io',
        linkLabel: 'View source',
      },
      {
        id: 'netquel-companion',
        title: 'Netquel Companion',
        category: 'Community Tooling · Bot',
        year: '2026',
        role: 'Developer',
        description:
          'A companion bot for the Netquel Nexus: player dossiers, highscore lookups, match history, party finder, and update pings.',
        tags: ['Node.js', 'Discord API', 'Community UX'],
      },
      {
        id: 'craftlink',
        title: 'CraftLink',
        category: 'Community Tooling · Minecraft',
        year: '2026',
        role: 'Developer',
        description:
          'A Minecraft-side utility bot for server status, player lookup, build showcases, modpack notes, and community build nights.',
        tags: ['TypeScript', 'Minecraft', 'Automation'],
      },
    ],
    skills: [
      {
        category: 'Languages',
        items: ['TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS / SCSS'],
      },
      {
        category: 'Frontend',
        items: ['React', 'Vite', 'Responsive design', 'Accessibility', 'CSS architecture'],
      },
      {
        category: 'Backend & Bots',
        items: ['Node.js', 'Discord.js', 'REST APIs', 'SQLite / JSON persistence', 'Automation'],
      },
      {
        category: 'Tools & Workflow',
        items: ['Git / GitHub', 'GitHub Actions', 'Figma', 'VS Code', 'Linux basics'],
      },
      {
        category: 'Creative',
        items: ['Game systems design', 'Video editing', 'Technical writing', 'Community building'],
      },
    ],
    experience: [
      {
        period: '[Add dates]',
        role: '[Role title]',
        org: '[Company / Organisation]',
        location: 'Remote',
        bullets: [
          'Add what you owned, what you shipped, and the result it produced.',
          'Use numbers where you can — users, uptime, response time, revenue, or time saved.',
        ],
      },
      {
        period: '2024 — Present',
        role: 'Founder, developer & creator',
        org: 'SlashStr1ker',
        location: 'Independent',
        bullets: [
          'Designed and shipped a 100+ command Discord platform used by multiple communities.',
          'Built and maintain a React/TypeScript website serving as the ecosystem hub.',
          'Produce Netquel content, tutorials, and community events across YouTube and Discord.',
        ],
      },
    ],
    resumeNote:
      'A full résumé is available on request. Feel free to reach out and I will send the latest copy.',
    contact: {
      heading: 'Let’s build something worth using.',
      blurb:
        'Hiring, collaborating, or just have a problem that needs a builder? Tell me what you are working on — I read everything.',
    },
  },

  netquel: {
    sectionTag: 'QUANTUM REALM // 05',
    heading: 'NETQUEL NEXUS',
    tagline: 'The universe that started it all.',
    description:
      'Netquel is a fast, chaotic space game about ships, duels, clans, and improbable victories. This is my home base in that universe — the guides, the runs, the rivalries, and the community that grew around it.',
    playUrl: 'https://netquel.com',
    discordUrl: 'https://discord.gg/nNuCFerYwR',
    channelUrl: 'https://www.youtube.com/@SlashStr1ker?sub_confirmation=1',
    highlights: [
      { label: 'HOME MODE', value: 'Main Hub & Party Servers' },
      { label: 'SIGNATURE SHIP', value: 'Whatever survives the first minute' },
      { label: 'COMMUNITY', value: 'Netquel Nexus' },
      { label: 'BEST RUN', value: 'Chasing a higher score' },
    ],
    modes: [
      {
        id: 'main-hub',
        code: 'SECTOR 01',
        title: 'Main Hub',
        description:
          'The social heart of Netquel — meet players, trade stories, and launch into the next run.',
      },
      {
        id: 'party-servers',
        code: 'SECTOR 02',
        title: 'Party Servers',
        description:
          'Private chaos with friends. Custom rules, custom maps, and absolutely no chill.',
      },
      {
        id: 'forge',
        code: 'SECTOR 03',
        title: 'Forge Mode',
        description:
          'Build, experiment, and test ideas inside the mode that turns players into designers.',
      },
      {
        id: 'clans',
        code: 'SECTOR 04',
        title: 'Clans & Duels',
        description:
          'Team up, pick rivalries, and settle it in the arena. The Nexus remembers every match.',
      },
    ],
    videoIds: ['WUpAjEMnU4Y', '5RGZa9rl3Jk', '2TWL9SnYT4M'],
    consoleLines: [
      '> netquel --connect slashstr1ker_',
      '> identity verified: NEXUS RESIDENT',
      '> loading favourite ship… done',
      '> queuing a duel against the next challenger',
      '> warning: extreme fun detected',
    ],
  },

  minecraft: {
    sectionTag: 'BLOCK WORLD // 06',
    heading: 'CRAFT MODE',
    tagline: 'Blocks, builds, and bad ideas at 3 AM.',
    description:
      'Minecraft is where the builder brain started. This is the block-side of the SlashStr1ker universe: survival worlds, custom builds, redstone experiments, and community build nights.',
    server: {
      label: 'COMMUNITY REALM',
      address: 'IP DROPS SOON',
      status: 'WHITELIST // INBOUND',
      version: 'Java Edition',
      note:
        'The realm is being prepared. Join the Discord to get the address and whitelist as soon as the gates open.',
      discordUrl: 'https://discord.gg/48CMZz5SwD',
    },
    modes: [
      {
        id: 'survival',
        title: 'Survival',
        desc: 'Long-term worlds, shared bases, and the great “do not touch my diamonds” treaty.',
        block: 'grass',
      },
      {
        id: 'creative',
        title: 'Creative',
        desc: 'Big builds, floating islands, and whatever the idea board demands next.',
        block: 'diamond',
      },
      {
        id: 'redstone',
        title: 'Redstone Lab',
        desc: 'Contraptions, farms, and machines that definitely will not lag the server.',
        block: 'redstone',
      },
      {
        id: 'events',
        title: 'Build Nights',
        desc: 'Themed community builds, mini-games, and a scoreboard nobody takes seriously.',
        block: 'gold',
      },
    ],
    builds: [
      {
        title: 'The Slash Tower',
        type: 'Creative · Mega Build',
        palette: ['Deepslate', 'Cyan concrete', 'Sea lanterns', 'Glass'],
        desc: 'A neon command tower with a slash-shaped crown, built to be the spawn-point landmark.',
      },
      {
        title: 'Netquel Docks',
        type: 'Survival · Community Base',
        palette: ['Spruce', 'Copper', 'Prismarine', 'Lanterns'],
        desc: 'A shared harbour where every player gets a berth, a chest, and a terrible story.',
      },
      {
        title: 'Redstone Arcade',
        type: 'Redstone · Mini-Games',
        palette: ['Stone bricks', 'Redstone lamps', 'Observers', 'Buttons'],
        desc: 'A working arcade of tiny redstone games — one lever away from beautiful chaos.',
      },
      {
        title: 'The Floating Forge',
        type: 'Creative · Sky Build',
        palette: ['Blackstone', 'Magma', 'Basalt', 'Lava'],
        desc: 'A skyborne forge above the clouds, equal parts cathedral and hazard zone.',
      },
    ],
    roadmap: [
      'Finish the community spawn hub',
      'Open whitelist applications in Discord',
      'Launch the first themed build night',
      'Document the modpack and server rules',
    ],
  },

  footer: {
    tagline: 'Gaming Beyond Limits. Bots Beyond Imagination.',
    endTransmission: 'END OF TRANSMISSION — SEE YOU IN THE NEXT UNIVERSE.',
  },
} as const;
