import React from 'react';
import { LuPlus, LuChevronRight } from 'react-icons/lu';

interface StoryItem {
  id: number;
  name: string;
  image: string;
  avatar: string;
  hasUnseen?: boolean;
}

const DEMO_STORIES: StoryItem[] = [
  {
    id: 1,
    name: 'Ryan Roslansky',
    image: '/assets/images/card_ppl2.png',
    avatar: '/assets/images/mini_pic.png',
    hasUnseen: true,
  },
  {
    id: 2,
    name: 'Steve Jobs',
    image: '/assets/images/card_ppl3.png',
    avatar: '/assets/images/people1.png',
    hasUnseen: true,
  },
  {
    id: 3,
    name: 'Dylan Field',
    image: '/assets/images/card_ppl4.png',
    avatar: '/assets/images/people3.png',
    hasUnseen: false,
  },
];

export const StoriesCarousel: React.FC = () => {
  return (
    <div className="relative">
      {/* ─── DESKTOP VIEW ─── */}
      <div className="hidden sm:block relative bg-card border border-border rounded-xl p-4 shadow-sm">
        <button
          type="button"
          aria-label="Next story"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition"
        >
          <LuChevronRight className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-4 gap-3">
          {/* Create Story Tile */}
          <div className="relative h-44 rounded-xl overflow-hidden group cursor-pointer border border-border">
            <img
              src="/assets/images/card_ppl1.png"
              alt="Your Story"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2.5 items-center text-center">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center -mt-4 mb-1 border-2 border-card shadow">
                <LuPlus className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white">Your Story</span>
            </div>
          </div>

          {/* Friend Story Tiles */}
          {DEMO_STORIES.map((story) => (
            <div
              key={story.id}
              className="relative h-44 rounded-xl overflow-hidden group cursor-pointer border border-border"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-2.5 left-2.5">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className={`w-8 h-8 rounded-full object-cover border-2 ${
                    story.hasUnseen ? 'border-primary' : 'border-card'
                  }`}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-xs font-semibold text-white truncate">
                  {story.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MOBILE VIEW (Horizontal Scrollable) ─── */}
      <div className="block sm:hidden bg-card border border-border rounded-xl p-3 shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3">
          {/* Add Story Bubble */}
          <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-dashed border-primary p-0.5">
              <img
                src="/assets/images/mobile_story_img.png"
                alt="Your Story"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center border border-card">
                <LuPlus className="w-3 h-3" />
              </div>
            </div>
            <span className="text-[11px] font-medium text-foreground">Your Story</span>
          </div>

          {/* Friend Story Bubbles */}
          {DEMO_STORIES.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center gap-1 shrink-0 cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-full p-0.5 border-2 ${
                  story.hasUnseen ? 'border-primary' : 'border-border'
                }`}
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-[11px] font-medium text-foreground truncate max-w-[60px]">
                {story.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoriesCarousel;
