import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FriendContact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
  lastActive?: string;
}

const FRIEND_CONTACTS: FriendContact[] = [
  {
    id: 1,
    name: 'Steve Jobs',
    role: 'CEO of Apple',
    avatar: '/assets/images/people1.png',
    isOnline: false,
    lastActive: '5 minute ago',
  },
  {
    id: 2,
    name: 'Ryan Roslansky',
    role: 'CEO of Linkedin',
    avatar: '/assets/images/people2.png',
    isOnline: true,
  },
  {
    id: 3,
    name: 'Dylan Field',
    role: 'CEO of Figma',
    avatar: '/assets/images/people3.png',
    isOnline: true,
  },
  {
    id: 4,
    name: 'Steve Jobs',
    role: 'CEO of Apple',
    avatar: '/assets/images/people1.png',
    isOnline: false,
    lastActive: '5 minute ago',
  },
  {
    id: 5,
    name: 'Ryan Roslansky',
    role: 'CEO of Linkedin',
    avatar: '/assets/images/people2.png',
    isOnline: true,
  },
  {
    id: 6,
    name: 'Dylan Field',
    role: 'CEO of Figma',
    avatar: '/assets/images/people3.png',
    isOnline: true,
  },
  {
    id: 7,
    name: 'Dylan Field',
    role: 'CEO of Figma',
    avatar: '/assets/images/people3.png',
    isOnline: true,
  },
  {
    id: 8,
    name: 'Steve Jobs',
    role: 'CEO of Apple',
    avatar: '/assets/images/people1.png',
    isOnline: false,
    lastActive: '5 minute ago',
  },
];

export const RightSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFollowing, setIsFollowing] = useState(true);

  const filteredFriends = FRIEND_CONTACTS.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* ─── YOU MIGHT LIKE WIDGET (Matching feed.html) ─── */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        {/* Header Title & See All Link */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-semibold text-foreground">You Might Like</h4>
          <span className="text-xs font-medium">
            <a href="#0" className="text-primary hover:underline">
              See All
            </a>
          </span>
        </div>

        {/* Underline Divider */}
        <hr className="border-t border-border mb-6" />

        {/* User Card Info Box */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/profile" className="shrink-0">
            <img
              src="/assets/images/Avatar.png"
              alt="Radovan SkillArena"
              className="w-[50px] h-[50px] rounded-full object-cover border border-border"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link
              to="/profile"
              className="text-base font-medium text-foreground hover:text-primary transition-colors truncate block leading-tight"
            >
              Radovan SkillArena
            </Link>
            <p className="text-xs font-normal text-muted-foreground truncate mt-1">
              Founder & CEO at Trophy
            </p>
          </div>
        </div>

        {/* Action Button Group */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex-1 py-2 px-6 border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground text-sm font-medium rounded-md transition-colors text-center"
          >
            Ignore
          </button>
          <button
            type="button"
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 py-2 px-6 text-sm font-medium rounded-md transition-colors text-center ${
              isFollowing
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>

      {/* ─── YOUR FRIENDS WIDGET (Matching feed.html) ─── */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-semibold text-foreground">Your Friends</h4>
          <span className="text-xs font-medium">
            <Link to="/search" className="text-primary hover:underline">
              See All
            </Link>
          </span>
        </div>

        {/* Search Input Box */}
        <form className="relative mb-6" onSubmit={(e) => e.preventDefault()}>
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            fill="none"
            viewBox="0 0 17 17"
          >
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M16 16l-3-3" />
          </svg>
          <input
            className="w-full h-10 pl-11 pr-4 py-2 bg-muted/30 border border-border focus:border-primary rounded-full text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="input search text"
            aria-label="Search"
          />
        </form>

        {/* Friends Contact List */}
        <div className="space-y-2">
          {filteredFriends.map((friend, index) => (
            <div
              key={`${friend.id}-${index}`}
              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Link to="/profile" className="shrink-0">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                </Link>
                <div className="min-w-0">
                  <Link to="/profile">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {friend.name}
                    </h4>
                  </Link>
                  <p className="text-[11px] font-light text-muted-foreground truncate">
                    {friend.role}
                  </p>
                </div>
              </div>

              <div className="shrink-0 pl-2">
                {friend.isOnline ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14"
                    className="w-3.5 h-3.5"
                  >
                    <rect
                      width="12"
                      height="12"
                      x="1"
                      y="1"
                      fill="#0ACF83"
                      stroke="#fff"
                      strokeWidth="2"
                      rx="6"
                    />
                  </svg>
                ) : (
                  <span className="text-[11px] font-normal text-muted-foreground/70">
                    {friend.lastActive}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
