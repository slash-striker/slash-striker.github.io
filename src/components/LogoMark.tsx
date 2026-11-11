import React, { useId } from 'react';

interface LogoMarkProps {
  className?: string;
  /** Adds the blade glow, spark pulse and shine sweep. */
  animated?: boolean;
  title?: string;
}

/*
 * The SLASH signature tag: a tilted cut-corner seal with an ivory S, a
 * crimson blade slash, a cyan spark and a small SLASH signature line.
 * One mark for the navbar, hero, footer and favicon.
 */
export const LogoMark: React.FC<LogoMarkProps> = ({
  className = '',
  animated = false,
  title,
}) => {
  const uid = useId().replace(/:/g, '');
  const bladeId = `slash-blade-${uid}`;
  const sheenId = `slash-sheen-${uid}`;
  const clipId = `slash-tag-clip-${uid}`;
  const tagPath = 'M22 7 H98 L121 30 V94 L94 121 H30 L7 98 V30 Z';

  return (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      className={`slash-logo ${animated ? 'slash-logo--animated' : ''} ${className}`.trim()}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient
          id={bladeId}
          x1="92"
          y1="106"
          x2="118"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#C1122F" />
          <stop offset="55%" stopColor="#FF2740" />
          <stop offset="100%" stopColor="#FF5C8A" />
        </linearGradient>
        <linearGradient
          id={sheenId}
          x1="12"
          y1="4"
          x2="70"
          y2="116"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F6F2E7" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#F6F2E7" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={tagPath} />
        </clipPath>
      </defs>

      <g transform="rotate(-4 64 64)">
        {/* Cut-corner signature tag */}
        <path
          d={tagPath}
          fill="#08070D"
          stroke="#F3EFE3"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          d="M32 17 H91 L111 37 V88 L84 111 H36 L17 90 V36 Z"
          fill="none"
          stroke="#FF2740"
          strokeOpacity="0.4"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* Signature blade */}
        <path
          className="slash-logo__blade"
          d="M88 108 L101 108 L116 31 L110 26 Z"
          fill={`url(#${bladeId})`}
        />
        <path
          d="M98 103 L113 34"
          stroke="#F6F2E7"
          strokeOpacity="0.28"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Smooth S monogram */}
        <path
          className="slash-logo__s"
          d="M82 35 C70 23 41 27 41 45 C41 61 79 55 81 74 C83 94 53 101 32 86"
          stroke="#F6F2E7"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cyan spark */}
        <path
          className="slash-logo__spark"
          d="M25 13 L28 21 L36 24 L28 27 L25 35 L22 27 L14 24 L22 21 Z"
          fill="#46E6FF"
        />

        {animated && (
          <rect
            className="slash-logo__sheen"
            x="-32"
            y="-20"
            width="64"
            height="168"
            fill={`url(#${sheenId})`}
            clipPath={`url(#${clipId})`}
            opacity="0"
          />
        )}
      </g>
    </svg>
  );
};
