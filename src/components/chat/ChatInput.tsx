import React, { useState } from 'react';
import { LuImage, LuPaperclip, LuSend, LuSmile } from 'react-icons/lu';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 sm:p-4 bg-card border-t border-border flex items-center gap-2"
    >
      <div className="flex items-center gap-1 text-muted-foreground shrink-0">
        <button
          type="button"
          className="p-2 hover:text-primary hover:bg-muted rounded-full transition"
          title="Attach File"
        >
          <LuPaperclip className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="p-2 hover:text-primary hover:bg-muted rounded-full transition hidden sm:block"
          title="Add Image"
        >
          <LuImage className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message..."
          className="w-full py-2.5 pl-4 pr-10 bg-muted/40 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground rounded-full border border-border focus:border-primary focus:outline-none transition"
        />
        <button
          type="button"
          className="absolute right-3 text-muted-foreground hover:text-primary transition"
          title="Emoji"
        >
          <LuSmile className="w-5 h-5" />
        </button>
      </div>

      <button
        type="submit"
        disabled={!text.trim()}
        className="p-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0"
        title="Send Message"
      >
        <LuSend className="w-4 h-4" />
      </button>
    </form>
  );
};

export default ChatInput;
