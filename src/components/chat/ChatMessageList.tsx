import React, { useEffect, useRef } from 'react';
import { LuCheckCheck } from 'react-icons/lu';
import type { ChatContact } from './ChatSidebar';

export interface ChatMessage {
  id: number;
  senderId: number; // 0 = current user (Dylan Field), contact.id = recipient
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatMessageListProps {
  messages: ChatMessage[];
  contact: ChatContact;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  contact,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of message container without scrolling the browser window
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, contact.id]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-muted/20"
    >
      {/* Date Divider */}
      <div className="flex items-center justify-center my-2">
        <span className="text-[11px] font-semibold text-muted-foreground bg-card px-3 py-1 rounded-full border border-border">
          Today
        </span>
      </div>

      {messages.map((msg) => {
        const isMe = msg.senderId === 0;

        return (
          <div
            key={msg.id}
            className={`flex items-end gap-2.5 ${
              isMe ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* Recipient Avatar (only for received messages) */}
            {!isMe && (
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-8 h-8 rounded-full object-cover shrink-0 border border-border"
              />
            )}

            {/* Bubble Container */}
            <div className={`max-w-[75%] sm:max-w-[65%] space-y-1`}>
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isMe
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card text-foreground border border-border rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
              </div>

              {/* Timestamp & Status */}
              <div
                className={`flex items-center gap-1 text-[10px] text-muted-foreground ${
                  isMe ? 'justify-end' : 'justify-start'
                }`}
              >
                <span>{msg.timestamp}</span>
                {isMe && (
                  <LuCheckCheck className="w-3.5 h-3.5 text-primary inline" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessageList;
