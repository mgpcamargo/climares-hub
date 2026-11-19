import React, { useState } from 'react';
import { AXIS_MAP } from '../data/axes';
import { Researcher } from '../types';

interface ResearcherAvatarProps {
  researcher: Researcher;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showAxisRing?: boolean;
}

const SIZE_CLASSES = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-[10px]',
  md: 'w-11 h-11 text-xs',
  lg: 'w-14 h-14 text-sm',
  xl: 'w-20 h-20 text-base',
};

export const ResearcherAvatar: React.FC<ResearcherAvatarProps> = ({
  researcher,
  size = 'md',
  className = '',
  showAxisRing = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const axis = AXIS_MAP[researcher.primaryAxis];
  const initials = researcher.name
    .split(' ')
    .filter((p) => p.length > 2 || p === researcher.name.split(' ')[0])
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();

  const ringStyle = showAxisRing
    ? {
        boxShadow: `0 0 0 2px ${axis.color}`,
      }
    : undefined;

  if (researcher.photoUrl && !imgError) {
    return (
      <div
        className={`relative rounded-full overflow-hidden shrink-0 bg-slate-800 ${SIZE_CLASSES[size]} ${className}`}
        style={ringStyle}
      >
        <img
          src={researcher.photoUrl}
          alt={researcher.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
    );
  }

  // Stylized Portrait Silhouette + Initials fallback when photo isn't uploaded yet
  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center select-none ${SIZE_CLASSES[size]} ${className}`}
      style={{
        ...ringStyle,
        background: `radial-gradient(circle at 35% 25%, ${axis.color}55 0%, #16222f 80%)`,
      }}
      title={researcher.name}
    >
      {/* Subtle human portrait silhouette SVG */}
      <svg
        viewBox="0 0 40 40"
        className="absolute inset-0 w-full h-full opacity-35 text-slate-200"
        fill="currentColor"
      >
        <circle cx="20" cy="14" r="7" />
        <path d="M7 37c0-7.2 5.8-13 13-13s13 5.8 13 13H7z" />
      </svg>
      <span className="relative z-10 font-display font-bold text-white drop-shadow-xs tracking-tight">
        {initials}
      </span>
    </div>
  );
};
