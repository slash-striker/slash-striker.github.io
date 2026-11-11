import React, { useId } from 'react';

interface LogoMarkProps {
  className?: string;
  /** Adds the slow rotating arc + shine sweep behind the mark. */
  animated?: boolean;
  title?: string;
}

/*
 * The SLASH CORE mark: an angular "S" cut by a diagonal slash inside a
 * faceted shield. One component so the navbar, hero, footer and favicon can
 * all share the same identity.
 */
export const LogoMark: React.FC<LogoMarkProps> = ({
  className = '',
  animated = false,
  title,
}) => {
  const uid = useId().replace(/:/g, '');
  const gradId = `slash-grad-${uid}`;
  const slashId = `slash-stroke-${uid}`;

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={`slash-logo ${animated ? 'slash-logo--animated' : ''} ${className}`.trim()}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={gradId} x1="18" y1="16" x2="104" y2="108" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5F7FF" />
          <stop offset="24%" stopColor="#00F5FF" />
          <stop offset="56%" stopColor="#397BFF" />
          <stop offset="82%" stopColor="#FF3CAC" />
          <stop offset="100%" stopColor="#FF2740" />
        </linearGradient>
        <linearGradient id={slashId} x1="26" y1="98" x2="98" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF2740" />
          <stop offset="52%" stopColor="#FF3CAC" />
          <stop offset="100%" stopColor="#00F5FF" />
        </linearGradient>
        <linearGradient id={`${gradId}-shine`} x1="20" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5F7FF" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#F5F7FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {animated && (
        <g className="slash-logo__orbit" opacity="0.55">
          <circle cx="60" cy="60" r="55" stroke="#00F5FF" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 9" />
          <circle cx="60" cy="60" r="48" stroke="#FF3CAC" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="18 70" strokeLinecap="round" />
        </g>
      )}

      {/* Faceted shield */}
      <path
        d="M60 4 L106 29 V80 L60 116 L14 80 V29 Z"
        fill="rgba(5, 9, 22, 0.82)"
        stroke={`url(#${gradId})`}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M60 15 L96 35 V75 L60 103 L24 75 V35 Z"
        stroke="#00F5FF"
        strokeOpacity="0.28"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M34 30 H46 M74 90 H86"
        stroke="#FF3CAC"
        strokeOpacity="0.65"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Angular S */}
      <path
        d="M82 32 H44 L72 56 H38 L66 80 H30"
        stroke={`url(#${gradId})`}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="slash-logo__s"
      />

      {/* Signature slash */}
      <path
        d="M23 97 L97 23"
        stroke={`url(#${slashId})`}
        strokeWidth="5"
        strokeLinecap="round"
        className="slash-logo__blade"
      />
      <path d="M29 93 L92 30" stroke="#F5F7FF" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" />

      {animated && (
        <path
          className="slash-logo__shine"
          d="M60 4 L106 29 V80 L60 116 Z"
          fill={`url(#${gradId}-shine)`}
          opacity="0"
        />
      )}
    </svg>
  );
};
