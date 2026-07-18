import React from 'react';
import { LuBell, LuImage, LuSearch, LuUser, LuX } from 'react-icons/lu';
import type { ChatContact } from './ChatSidebar';

interface ChatInfoSidebarProps {
  contact: ChatContact;
  onClose: () => void;
}

export const ChatInfoSidebar: React.FC<ChatInfoSidebarProps> = ({
  contact,
  onClose,
}) => {
  return (
    <div className="w-80 h-full bg-card border-l border-border flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">Contact Info</h3>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition"
          title="Close Info"
        >
          <LuX className="w-4 h-4" />
        </button>
      </div>

      {/* User Profile Card */}
      <div className="p-6 text-center border-b border-border space-y-3">
        <div className="relative inline-block">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-border mx-auto"
          />
          {contact.online && (
            <span
              className="absolute bottom-1 right-1 w-4 h-4 bg-[#0ACF83] border-2 border-card rounded-full"
              title="Online"
            />
          )}
        </div>

        <div>
          <h4 className="text-base font-bold text-foreground">
            {contact.name}
          </h4>
          <p className="text-xs text-muted-foreground">{contact.role}</p>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary transition"
            title="Search in Chat"
          >
            <LuSearch className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary transition"
            title="Mute Notifications"
          >
            <LuBell className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary transition"
            title="View Profile"
          >
            <LuUser className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Shared Media Section */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <LuImage className="w-4 h-4 text-primary" />
            <span>Shared Media</span>
          </h5>
          <span className="text-[11px] text-primary hover:underline cursor-pointer">
            View All
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <img
            src="/assets/images/photos1.png"
            alt="Shared 1"
            className="w-full h-20 rounded-lg object-cover border border-border"
          />
          <img
            src="/assets/images/photos2.png"
            alt="Shared 2"
            className="w-full h-20 rounded-lg object-cover border border-border"
          />
          <img
            src="/assets/images/photos3.png"
            alt="Shared 3"
            className="w-full h-20 rounded-lg object-cover border border-border"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInfoSidebar;
