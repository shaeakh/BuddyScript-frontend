import React from 'react';
import {
  LuBookOpen,
  LuChartBar,
  LuUserPlus,
  LuBookmark,
  LuUsers,
  LuGamepad2,
  LuSettings,
  LuSave,
  LuCalendar,
} from 'react-icons/lu';
import { Link } from 'react-router-dom';

interface SuggestedPerson {
  id: number;
  name: string;
  role: string;
  avatar: string;
  profileUrl: string;
}

interface EventItem {
  id: number;
  title: string;
  day: string;
  month: string;
  attendeesCount: number;
  image: string;
}

const SUGGESTED_PEOPLE: SuggestedPerson[] = [
  {
    id: 1,
    name: 'Steve Jobs',
    role: 'CEO of Apple',
    avatar: '/assets/images/people1.png',
    profileUrl: '/profile',
  },
  {
    id: 2,
    name: 'Ryan Roslansky',
    role: 'CEO of Linkedin',
    avatar: '/assets/images/people2.png',
    profileUrl: '/profile',
  },
  {
    id: 3,
    name: 'Dylan Field',
    role: 'CEO of Figma',
    avatar: '/assets/images/people3.png',
    profileUrl: '/profile',
  },
];

const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'No more terrorism no more cry',
    day: '10',
    month: 'Jul',
    attendeesCount: 17,
    image: '/assets/images/feed_event1.png',
  },
];

export const ExploreSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* ─── EXPLORE MENU ─── */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-foreground">Explore</h3>
        <ul className="space-y-1.5">
          <li>
            <a
              href="#0"
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition"
            >
              <div className="flex items-center gap-3">
                <LuBookOpen className="w-5 h-5 text-primary" />
                <span>Learning</span>
              </div>
              <span className="text-[11px] font-normal bg-[#0ACF83] text-white px-2 py-0.5 rounded-md">
                New
              </span>
            </a>
          </li>
          <li>
            <a
              href="#0"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition"
            >
              <LuChartBar className="w-5 h-5" />
              <span>Insights</span>
            </a>
          </li>
          <li>
            <Link
              to="/search"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition"
            >
              <LuUserPlus className="w-5 h-5" />
              <span>Find friends</span>
            </Link>
          </li>
          <li>
            <a
              href="#0"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition"
            >
              <LuBookmark className="w-5 h-5" />
              <span>Bookmarks</span>
            </a>
          </li>
          <li>
            <a
              href="#0"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition"
            >
              <LuUsers className="w-5 h-5" />
              <span>Group</span>
            </a>
          </li>
          <li>
            <a
              href="#0"
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition"
            >
              <div className="flex items-center gap-3">
                <LuGamepad2 className="w-5 h-5" />
                <span>Gaming</span>
              </div>
              <span className="text-[11px] font-normal bg-[#0ACF83] text-white px-2 py-0.5 rounded-md">
                New
              </span>
            </a>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition"
            >
              <LuSettings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <a
              href="#0"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition"
            >
              <LuSave className="w-5 h-5" />
              <span>Save post</span>
            </a>
          </li>
        </ul>
      </div>

      {/* ─── SUGGESTED PEOPLE WIDGET ─── */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">Suggested People</h3>
          <Link
            to="/search"
            className="text-xs font-semibold text-primary hover:underline"
          >
            See All
          </Link>
        </div>

        <div className="space-y-3">
          {SUGGESTED_PEOPLE.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-border"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate hover:text-primary transition">
                    {person.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {person.role}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="px-3 py-1 text-xs font-medium border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary rounded-lg transition shrink-0"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ─── EVENTS WIDGET ─── */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">Events</h3>
          <a
            href="#0"
            className="text-xs font-semibold text-primary hover:underline"
          >
            See all
          </a>
        </div>

        {UPCOMING_EVENTS.map((evt) => (
          <div
            key={evt.id}
            className="border border-border rounded-lg overflow-hidden space-y-3 p-3 bg-muted/20"
          >
            <div className="relative h-32 w-full rounded-md overflow-hidden">
              <img
                src={evt.image}
                alt={evt.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-[#0ACF83] text-white text-center rounded-lg px-2.5 py-1 shrink-0">
                <span className="block text-base font-bold text-white leading-tight">
                  {evt.day}
                </span>
                <span className="block text-[10px] font-semibold uppercase text-white">
                  {evt.month}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                {evt.title}
              </h4>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <LuCalendar className="w-3.5 h-3.5" />
                {evt.attendeesCount} People Going
              </span>
              <button
                type="button"
                className="px-3 py-1 bg-[#F3F9FF] border border-primary text-primary text-xs font-medium rounded-md hover:bg-primary hover:text-primary-foreground transition"
              >
                Going
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSidebar;
