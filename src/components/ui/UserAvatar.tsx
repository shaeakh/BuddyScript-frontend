import React from 'react';

const CHART_BG_CLASSES: Record<number, string> = {
  1: 'bg-chart-1',
  2: 'bg-chart-2',
  3: 'bg-chart-3',
  4: 'bg-chart-4',
  5: 'bg-chart-5',
};

interface UserAvatarProps {
  userId?: number | string | null;
  username?: string | null;
  className?: string;
  style?: React.CSSProperties;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  userId,
  username,
  className = 'w-8 h-8 text-xs',
  style,
}) => {
  const idNum =
    typeof userId === 'number'
      ? userId
      : parseInt(String(userId || 5), 10) || 5;
  const chartIndex = (Math.abs(idNum) % 5) + 1;
  const initials = (username || 'Anonymous')
    .trim()
    .slice(0, 2)
    .toUpperCase();
  const bgClass = CHART_BG_CLASSES[chartIndex] || 'bg-chart-1';

  return (
    <div
      className={`rounded-full text-white font-bold flex items-center justify-center shrink-0 border border-border ${bgClass} ${className}`}
      style={{ backgroundColor: `var(--chart-${chartIndex})`, ...style }}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
