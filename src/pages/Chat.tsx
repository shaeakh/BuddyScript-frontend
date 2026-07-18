import React, { useState } from 'react';
import {
  LuArrowLeft,
  LuInfo,
  LuPhone,
  LuVideo,
} from 'react-icons/lu';
import ChatSidebar from '@/components/chat/ChatSidebar';
import type { ChatContact } from '@/components/chat/ChatSidebar';
import ChatMessageList from '@/components/chat/ChatMessageList';
import type { ChatMessage } from '@/components/chat/ChatMessageList';
import ChatInput from '@/components/chat/ChatInput';
import ChatInfoSidebar from '@/components/chat/ChatInfoSidebar';

const MOCK_CONTACTS: ChatContact[] = [
  {
    id: 1,
    name: 'Steve Jobs',
    role: 'CEO of Apple',
    avatar: '/assets/images/people1.png',
    online: true,
    unreadCount: 2,
    lastMessage: 'Sounds great! Let me know when it is ready for testing.',
    lastMessageTime: '10:42 AM',
  },
  {
    id: 2,
    name: 'Dylan Field',
    role: 'CEO of Figma',
    avatar: '/assets/images/people3.png',
    online: true,
    unreadCount: 0,
    lastMessage: 'The prototype looks amazing!',
    lastMessageTime: 'Yesterday',
  },
  {
    id: 3,
    name: 'Ryan Roslansky',
    role: 'CEO of Linkedin',
    avatar: '/assets/images/people2.png',
    online: false,
    unreadCount: 0,
    lastMessage: 'Let us connect on LinkedIn.',
    lastMessageTime: 'Jul 15',
  },
];

const INITIAL_MESSAGES: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      senderId: 1,
      text: 'Hey Dylan! Did you get a chance to review the new feed page design?',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      senderId: 0,
      text: 'Yes Steve! The dark mode theme switching looks really clean and smooth.',
      timestamp: '10:32 AM',
      status: 'read',
    },
    {
      id: 3,
      senderId: 1,
      text: 'Awesome! We should make sure the chat section matches the rest of BuddyScript.',
      timestamp: '10:35 AM',
    },
    {
      id: 4,
      senderId: 0,
      text: 'Working on the Chat UI right now! It has real-time feel, search, active states, and full responsive layout.',
      timestamp: '10:38 AM',
      status: 'read',
    },
    {
      id: 5,
      senderId: 1,
      text: 'Sounds great! Let me know when it is ready for testing.',
      timestamp: '10:42 AM',
    },
  ],
  2: [
    {
      id: 1,
      senderId: 2,
      text: 'Hey there! How is the frontend development coming along?',
      timestamp: 'Yesterday',
    },
    {
      id: 2,
      senderId: 0,
      text: 'Everything is built with modular components, Tailwind design tokens, and smooth light/dark theme toggle!',
      timestamp: 'Yesterday',
      status: 'read',
    },
    {
      id: 3,
      senderId: 2,
      text: 'The prototype looks amazing!',
      timestamp: 'Yesterday',
    },
  ],
  3: [
    {
      id: 1,
      senderId: 3,
      text: 'Hello! Thanks for reaching out.',
      timestamp: 'Jul 15',
    },
    {
      id: 2,
      senderId: 3,
      text: 'Let us connect on LinkedIn.',
      timestamp: 'Jul 15',
    },
  ],
};

export const Chat: React.FC = () => {
  const [contacts, setContacts] = useState<ChatContact[]>(MOCK_CONTACTS);
  const [activeContactId, setActiveContactId] = useState<number>(1);
  const [messagesMap, setMessagesMap] =
    useState<Record<number, ChatMessage[]>>(INITIAL_MESSAGES);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  const activeContact =
    contacts.find((c) => c.id === activeContactId) || contacts[0];
  const currentMessages = messagesMap[activeContactId] || [];

  const handleSelectContact = (id: number) => {
    setActiveContactId(id);
    setMobileView('chat');
    // Clear unread count when selected
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now(),
      senderId: 0, // Current user
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'sent',
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage],
    }));

    // Update last message in contact list
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContactId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: 'Just now',
              isSentByMe: true,
            }
          : c
      )
    );
  };

  return (
    <div className="max-w-[1240px] mx-auto px-2 sm:px-6 py-3 sm:py-6 h-[calc(100vh-80px)] min-h-[550px]">
      <div className="h-full grid grid-cols-1 lg:grid-cols-12 bg-card border border-border rounded-xl shadow-xs overflow-hidden">
        {/* ─── LEFT SIDEBAR (MESSAGES LIST) ─── */}
        <div
          className={`lg:col-span-4 h-full ${
            mobileView === 'chat' ? 'hidden lg:block' : 'block'
          }`}
        >
          <ChatSidebar
            contacts={contacts}
            activeContactId={activeContactId}
            onSelectContact={handleSelectContact}
          />
        </div>

        {/* ─── MAIN CHAT WINDOW ─── */}
        <div
          className={`lg:col-span-8 flex flex-col h-full ${
            mobileView === 'list' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Active Contact Header */}
          <div className="p-3 sm:p-4 bg-card border-b border-border flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {/* Back button for mobile */}
              <button
                type="button"
                onClick={() => setMobileView('list')}
                className="p-2 -ml-1 text-muted-foreground hover:text-foreground rounded-lg lg:hidden"
                title="Back to conversations"
              >
                <LuArrowLeft className="w-5 h-5" />
              </button>

              <div className="relative shrink-0">
                <img
                  src={activeContact.avatar}
                  alt={activeContact.name}
                  className="w-10 h-10 rounded-full object-cover border border-border"
                />
                {activeContact.online && (
                  <span
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#0ACF83] border-2 border-card rounded-full"
                    title="Online"
                  />
                )}
              </div>

              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">
                  {activeContact.name}
                </h3>
                <p className="text-[11px] text-muted-foreground truncate">
                  {activeContact.online ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <button
                type="button"
                className="p-2 hover:text-primary hover:bg-muted rounded-full transition"
                title="Voice Call"
              >
                <LuPhone className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 hover:text-primary hover:bg-muted rounded-full transition"
                title="Video Call"
              >
                <LuVideo className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowInfo(!showInfo)}
                className={`p-2 rounded-full transition ${
                  showInfo
                    ? 'text-primary bg-primary/10'
                    : 'hover:text-primary hover:bg-muted'
                }`}
                title="Contact Info"
              >
                <LuInfo className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed & Right Info Drawer Layout */}
          <div className="flex-1 flex overflow-hidden relative">
            <div className="flex-1 flex flex-col min-w-0">
              {/* Messages Feed */}
              <ChatMessageList
                messages={currentMessages}
                contact={activeContact}
              />

              {/* Chat Input */}
              <ChatInput onSendMessage={handleSendMessage} />
            </div>

            {/* Right Contact Info Drawer (desktop overlay or side panel) */}
            {showInfo && (
              <div className="hidden xl:block h-full">
                <ChatInfoSidebar
                  contact={activeContact}
                  onClose={() => setShowInfo(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
