import React, { useState } from 'react';
import { LuSearch, LuPlus, LuCheckCheck } from 'react-icons/lu';

export interface ChatContact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  isSentByMe?: boolean;
}

interface ChatSidebarProps {
  contacts: ChatContact[];
  activeContactId: number;
  onSelectContact: (contactId: number) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  contacts,
  activeContactId,
  onSelectContact,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-card border-r border-border rounded-xl lg:rounded-r-none overflow-hidden">
      {/* Sticky Sidebar Header & Search */}
      <div className="p-4 border-b border-border space-y-3 shrink-0 bg-card sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Messages</h2>
          <button
            type="button"
            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition"
            title="New Chat"
          >
            <LuPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 bg-muted/50 text-xs text-foreground placeholder:text-muted-foreground rounded-lg border border-transparent focus:border-primary focus:bg-card focus:outline-none transition"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => {
            const isActive = contact.id === activeContactId;

            return (
              <button
                key={contact.id}
                type="button"
                onClick={() => onSelectContact(contact.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition text-left relative ${
                  isActive
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-muted/50 border border-transparent'
                }`}
              >
                {/* Avatar with Status Indicator */}
                <div className="relative shrink-0">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-11 h-11 rounded-full object-cover border border-border"
                  />
                  {contact.online && (
                    <span
                      className="absolute bottom-0 right-0 w-3 h-3 bg-[#0ACF83] border-2 border-card rounded-full"
                      title="Online"
                    />
                  )}
                </div>

                {/* Name & Last Message Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`text-xs font-semibold truncate ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {contact.name}
                    </h4>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-1">
                      {contact.lastMessageTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground truncate leading-tight flex items-center gap-1">
                      {contact.isSentByMe && (
                        <LuCheckCheck className="w-3.5 h-3.5 text-primary inline shrink-0" />
                      )}
                      <span className="truncate">{contact.lastMessage}</span>
                    </p>

                    {contact.unreadCount > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center py-8 text-xs text-muted-foreground">
            No messages found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
