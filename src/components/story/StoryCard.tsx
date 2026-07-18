import { useVoteStory } from '@/hooks/vote/useVoteStory';
import type { Story } from '@/types/api/storyTypes';
import EnvConstants from '@/utils/envConstants';
import { getUserPayload, isAuthenticated } from '@/utils/localStorageUtils';
import { useEffect, useRef, useState } from 'react';
import {
  LuBookmark,
  LuClock,
  LuEllipsisVertical,
  LuGlobe,
  LuHeart,
  LuMessageSquare,
  LuPencil,
  LuBell,
  LuEyeOff,
  LuSend,
  LuSmile,
  LuSparkles,
  LuThumbsUp,
  LuTrash2,
  LuUser,
} from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { UserAvatar } from '@/components/ui/UserAvatar';
import ShareButton from './shareButton';

interface StoryCardProps {
  story: Story;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onSummaryClick?: (summary: string | null) => void;
}

export const StoryCard = ({
  story,
  onEdit,
  onDelete,
  onSummaryClick,
}: StoryCardProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const { voteStory } = useVoteStory();

  const [localVotes, setLocalVotes] = useState(story?.votes || []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalVotes(story?.votes || []);
    }, 0);
    return () => clearTimeout(timer);
  }, [story?.votes]);

  let canManage = false;
  let currentUserId: number | null = null;
  let currentUserUsername: string | null = null;

  if (isAuthenticated()) {
    try {
      const currentUser = getUserPayload();
      currentUserId = currentUser?.id ?? null;
      currentUserUsername = currentUser?.username || currentUser?.name || null;
      const isOwner = currentUser?.id === story?.userId;
      const isAdmin = currentUser?.role === 'ADMIN';
      canManage = isOwner || isAdmin;
    } catch (error) {
      console.error('User payload error:', error);
      canManage = false;
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formattedDate = story?.created_at
    ? new Date(story.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  const upvotesCount = localVotes.filter((v) => v?.type === 'UPVOTE').length;
  const downvotesCount = localVotes.filter((v) => v?.type === 'DOWNVOTE').length;
  const totalReacts = upvotesCount + downvotesCount;

  const userVote = localVotes.find((v) => v?.userId === currentUserId);
  const isUpvoted = userVote?.type === 'UPVOTE';

  const handleVoteAction = async (clickedType: 'UPVOTE' | 'DOWNVOTE') => {
    if (!isAuthenticated()) {
      navigate('/signin');
      return;
    }
    if (!currentUserId || !story?.id) return;

    const previousVotesBackup = [...localVotes];
    let newVotes = [...localVotes];

    if (userVote) {
      if (userVote.type === clickedType) {
        newVotes = newVotes.filter((v) => v.userId !== currentUserId);
      } else {
        newVotes = newVotes.map((v) =>
          v.userId === currentUserId ? { ...v, type: clickedType } : v
        );
      }
    } else {
      newVotes.push({
        id: Date.now(),
        type: clickedType,
        userId: currentUserId,
        storyId: story.id,
      });
    }

    setLocalVotes(newVotes);
    const result = await voteStory({ storyId: story.id, type: clickedType });
    if (!result) {
      setLocalVotes(previousVotesBackup);
    }
  };

  const username = story?.user?.username || 'user';
  const authorName = story?.user?.name || 'Anonymous';

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all p-4 sm:p-5 relative space-y-4">
      {/* ─── POST HEADER ─── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to={`/profile/${username}`}
            className="shrink-0 hover:opacity-90 transition-opacity"
          >
            <UserAvatar
              userId={story?.userId ?? story?.user?.id}
              username={story?.user?.username || story?.user?.name || authorName}
              className="w-10 h-10 text-sm"
            />
          </Link>

          <div className="min-w-0">
            <Link
              to={`/profile/${username}`}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors truncate block"
            >
              {authorName}
            </Link>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-0.5">
              <LuClock className="w-3 h-3" />
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <LuGlobe className="w-3 h-3" />
                Public
              </span>
            </div>
          </div>
        </div>

        {/* ─── DROPDOWN & SUMMARY ─── */}
        <div className="flex items-center gap-1.5" ref={menuRef}>
          {story?.summary && (
            <button
              onClick={() => onSummaryClick?.(story.summary)}
              className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded-full text-xs font-semibold transition"
              title="View AI Summary"
            >
              <LuSparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Summary</span>
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition"
            >
              <LuEllipsisVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-card border border-border rounded-xl shadow-xl py-1 z-30 animate-in fade-in zoom-in duration-150">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition"
                >
                  <LuBookmark className="w-4 h-4 text-primary" /> Save Post
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition"
                >
                  <LuBell className="w-4 h-4 text-primary" /> Turn On Notification
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition"
                >
                  <LuEyeOff className="w-4 h-4 text-primary" /> Hide
                </button>

                {canManage && (
                  <>
                    <div className="my-1 border-t border-border" />
                    <button
                      onClick={() => {
                        if (story?.id) onEdit?.(story.id);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted transition"
                    >
                      <LuPencil className="w-4 h-4 text-emerald-500" /> Edit Post
                    </button>
                    <button
                      onClick={() => {
                        if (story?.id) onDelete?.(story.id);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition"
                    >
                      <LuTrash2 className="w-4 h-4" /> Delete Post
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── POST CONTENT BODY ─── */}
      <div className="space-y-2">
        <Link
          to={`/story/${story?.id}`}
          className="block text-base sm:text-lg font-bold text-foreground hover:text-primary transition line-clamp-2 leading-snug"
        >
          {story?.title}
        </Link>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {story?.body}
        </p>
      </div>

      {/* ─── CATEGORIES & TAGS ─── */}
      {story?.categories && story.categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {story.categories.map((cat) => (
            <span
              key={cat.id}
              className="text-[10px] uppercase font-bold bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-md border border-border"
            >
              #{cat.name}
            </span>
          ))}
        </div>
      )}

      {/* ─── TOTAL REACTIONS STATS BAR ─── */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] border border-card">
              😆
            </span>
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] border border-card">
              <LuThumbsUp className="w-3 h-3 fill-current" />
            </span>
          </div>
          <span className="font-semibold text-foreground">
            {totalReacts > 0 ? `${totalReacts}+` : '0'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className="hover:underline hover:text-foreground"
          >
            {story?.comments?.length || 0} Comment
          </button>
          <span>122 Share</span>
        </div>
      </div>

      {/* ─── INTERACTIVE ACTIONS BAR ─── */}
      <div className="grid grid-cols-3 gap-1 pt-1 border-t border-border">
        <button
          onClick={() => handleVoteAction('UPVOTE')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            isUpvoted
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          <LuSmile className="w-4 h-4" />
          <span>{isUpvoted ? 'Haha' : 'React'}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition"
        >
          <LuMessageSquare className="w-4 h-4" />
          <span>Comment</span>
        </button>

        <div className="flex items-center justify-center">
          <ShareButton
            shareUrl={`${EnvConstants.FRONTEND_URL}/story/${story?.id}`}
          />
        </div>
      </div>

      {/* ─── COLLAPSIBLE COMMENTS SECTION ─── */}
      {showComments && (
        <div className="pt-3 border-t border-border space-y-3 animate-in fade-in duration-200">
          {/* Add Comment Input */}
          <div className="flex items-center gap-2">
            <UserAvatar
              userId={currentUserId}
              username={currentUserUsername}
              className="w-8 h-8 text-xs"
            />
            <div className="flex-1 relative">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-muted/40 border border-border rounded-full pl-3 pr-9 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => {
                  if (newCommentText.trim() && story?.id) {
                    navigate(`/story/${story.id}`);
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
              >
                <LuSend className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Comment Tree Preview */}
          {story?.comments && story.comments.length > 0 && (
            <div className="space-y-2 pt-1">
              <button
                onClick={() => navigate(`/story/${story.id}`)}
                className="text-xs text-primary font-medium hover:underline"
              >
                View all {story.comments.length} comments
              </button>

              {story.comments.slice(0, 2).map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start gap-2.5 bg-muted/30 p-2.5 rounded-xl border border-border/50 text-xs"
                >
                  <UserAvatar
                    userId={comment.userId || comment.user?.id}
                    username={comment.user?.username || comment.user?.name}
                    className="w-7 h-7 text-[10px]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground truncate">
                        {comment.user?.name || 'Anonymous User'}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        21m
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-0.5">
                      {comment.body}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground font-medium">
                      <button className="hover:text-primary">Like</button>
                      <button className="hover:text-primary">Reply</button>
                      <span className="flex items-center gap-1 text-primary">
                        <LuThumbsUp className="w-3 h-3" />
                        <LuHeart className="w-3 h-3 text-rose-500 fill-rose-500" />
                        198
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryCard;
