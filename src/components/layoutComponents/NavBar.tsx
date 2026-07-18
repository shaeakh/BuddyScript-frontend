import SearchBar from '@/components/search/SearchBar';
import { useSignOut } from '@/hooks/auth/useSignOut';
import { getUserPayload } from '@/utils/localStorageUtils';
import { useState, useRef, useEffect } from 'react';
import {
  LuBell,
  LuChevronDown,
  LuCircleHelp,
  LuHouse,
  LuLogOut,
  LuMessageSquare,
  LuSearch,
  LuSettings,
  LuUser,
  LuUsers,
  LuLoaderCircle,
} from 'react-icons/lu';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  const [username] = useState(() => {
    try {
      const payload = getUserPayload();
      return payload?.username || 'Dylan Field';
    } catch {
      return 'Dylan Field';
    }
  });

  const { handleSignOut, loading: isLoggingOut } = useSignOut();

  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifyTab, setNotifyTab] = useState<'all' | 'unread'>('all');

  const notifyRef = useRef<HTMLLIElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifyRef.current &&
        !notifyRef.current.contains(event.target as Node)
      ) {
        setIsNotifyOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* ─── DESKTOP HEADER NAVBAR ─── */}
      <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-xs">
        <div className="w-full max-w-[1240px] mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* 1. Left Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/home" className="flex items-center gap-2">
              <img
                src="/assets/images/logo.svg"
                alt="BuddyScript Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* 2. Middle Search Bar (Centered) */}
          <div className="flex-1 max-w-md mx-auto hidden md:block">
            <SearchBar
              placeholder="input search text"
              className="w-full bg-muted/40 border border-border rounded-full py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* 3. Right Navigation Icons & Profile */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <ul className="flex items-center gap-1 sm:gap-2">
              {/* Home Link */}
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `relative p-2 rounded-lg text-foreground hover:bg-muted transition flex items-center justify-center ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`
                  }
                  title="Home"
                >
                  <LuHouse className="w-5 h-5" />
                </NavLink>
              </li>

              {/* Friend Requests Link */}
              <li>
                <NavLink
                  to="/search"
                  className={({ isActive }) =>
                    `relative p-2 rounded-lg text-foreground hover:bg-muted transition flex items-center justify-center ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`
                  }
                  title="Friends"
                >
                  <LuUsers className="w-5 h-5" />
                </NavLink>
              </li>

              {/* Notification Bell Dropdown */}
              <li className="relative" ref={notifyRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsNotifyOpen(!isNotifyOpen);
                    setIsProfileOpen(false);
                  }}
                  className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition flex items-center justify-center"
                  title="Notifications"
                >
                  <LuBell className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-card">
                    6
                  </span>
                </button>

                {/* Notifications Dropdown Drawer */}
                {isNotifyOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-2xl p-4 z-50 space-y-3 animate-in fade-in zoom-in duration-150">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <h4 className="text-base font-bold text-foreground">
                        Notifications
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setNotifyTab('all')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                            notifyTab === 'all'
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          All
                        </button>
                        <button
                          type="button"
                          onClick={() => setNotifyTab('unread')}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                            notifyTab === 'unread'
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          Unread
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition cursor-pointer">
                        <img
                          src="/assets/images/friend-req.png"
                          alt="Steve Jobs"
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-border"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-foreground leading-snug">
                            <span className="font-bold">Steve Jobs</span> posted a
                            link in your timeline.
                          </p>
                          <span className="text-[10px] text-primary font-medium">
                            42 minutes ago
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition cursor-pointer">
                        <img
                          src="/assets/images/profile-1.png"
                          alt="Group Admin"
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-border"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-foreground leading-snug">
                            An admin changed the name of group{' '}
                            <span className="font-bold">Freelancer USA</span>
                          </p>
                          <span className="text-[10px] text-primary font-medium">
                            42 minutes ago
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* Chat Icon */}
              <li>
                <Link
                  to="/chat"
                  className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition flex items-center justify-center"
                  title="Chat"
                >
                  <LuMessageSquare className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-card">
                    2
                  </span>
                </Link>
              </li>
            </ul>

            <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

            {/* User Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifyOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition"
              >
                <img
                  src="/assets/images/profile.png"
                  alt="Dylan Field"
                  className="w-8 h-8 rounded-full object-cover border border-border"
                />
                <span className="text-xs font-semibold text-foreground hidden lg:inline-block">
                  {username || 'Dylan Field'}
                </span>
                <LuChevronDown className="w-4 h-4 text-muted-foreground hidden sm:inline-block" />
              </button>

              {/* Profile Dropdown Drawer */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in zoom-in duration-150">
                  <div className="flex items-center gap-3 p-2 border-b border-border mb-1">
                    <img
                      src="/assets/images/profile.png"
                      alt={username}
                      className="w-9 h-9 rounded-full object-cover border border-border"
                    />
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs font-bold text-foreground truncate">
                        {username || 'Dylan Field'}
                      </h5>
                      <Link
                        to={`/profile/${username}`}
                        onClick={() => setIsProfileOpen(false)}
                        className="text-[11px] font-medium text-primary hover:underline"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>

                  <Link
                    to="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted rounded-lg transition"
                  >
                    <LuSettings className="w-4 h-4 text-primary" />
                    <span>Settings</span>
                  </Link>

                  <a
                    href="#0"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted rounded-lg transition"
                  >
                    <LuCircleHelp className="w-4 h-4 text-primary" />
                    <span>Help & Support</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleSignOut();
                    }}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-lg transition disabled:opacity-50"
                  >
                    {isLoggingOut ? (
                      <LuLoaderCircle className="w-4 h-4 animate-spin" />
                    ) : (
                      <LuLogOut className="w-4 h-4" />
                    )}
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE BOTTOM NAVIGATION BAR ─── */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-14 bg-card border-t border-border md:hidden">
        <div className="grid h-full grid-cols-4 items-center justify-items-center">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `p-2 text-muted-foreground hover:text-foreground ${
                isActive ? 'text-primary font-bold' : ''
              }`
            }
          >
            <LuHouse className="w-6 h-6" />
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `p-2 text-muted-foreground hover:text-foreground ${
                isActive ? 'text-primary font-bold' : ''
              }`
            }
          >
            <LuSearch className="w-6 h-6" />
          </NavLink>

          <NavLink
            to={`/profile/${username}`}
            className={({ isActive }) =>
              `p-2 text-muted-foreground hover:text-foreground ${
                isActive ? 'text-primary font-bold' : ''
              }`
            }
          >
            <LuUser className="w-6 h-6" />
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `p-2 text-muted-foreground hover:text-foreground ${
                isActive ? 'text-primary font-bold' : ''
              }`
            }
          >
            <LuSettings className="w-6 h-6" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavBar;
