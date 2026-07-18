import React from 'react';
import { LuImage, LuVideo, LuCalendar, LuFileText, LuSend } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { getUserPayload } from '@/utils/localStorageUtils';
import { UserAvatar } from '@/components/ui/UserAvatar';

interface CreatePostBoxProps {
  userAvatar?: string;
  onPostClick?: () => void;
}

export const CreatePostBox: React.FC<CreatePostBoxProps> = ({
  onPostClick,
}) => {
  const navigate = useNavigate();

  const userPayload = getUserPayload();
  const userId = userPayload?.id;
  const username = userPayload?.username || userPayload?.name;

  const handleCreateClick = () => {
    if (onPostClick) {
      onPostClick();
    } else {
      navigate('/story/create');
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
      <div className="flex items-start gap-3">
        <UserAvatar
          userId={userId}
          username={username}
          className="w-10 h-10 text-xs"
        />
        <div className="flex-1 relative">
          <textarea
            onClick={handleCreateClick}
            readOnly
            rows={2}
            placeholder="Write something ..."
            className="w-full bg-muted/40 border border-border rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border">
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleCreateClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
          >
            <LuImage className="w-4 h-4 text-emerald-500" />
            <span>Photo</span>
          </button>
          <button
            type="button"
            onClick={handleCreateClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
          >
            <LuVideo className="w-4 h-4 text-rose-500" />
            <span>Video</span>
          </button>
          <button
            type="button"
            onClick={handleCreateClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
          >
            <LuCalendar className="w-4 h-4 text-amber-500" />
            <span>Event</span>
          </button>
          <button
            type="button"
            onClick={handleCreateClick}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
          >
            <LuFileText className="w-4 h-4 text-indigo-500" />
            <span>Article</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition shadow-sm"
        >
          <LuSend className="w-3.5 h-3.5" />
          <span>Post</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePostBox;
