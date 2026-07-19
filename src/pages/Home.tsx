import { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useNavigate, useSearchParams } from 'react-router-dom';

import DeleteStoryDialog from '@/components/story/DeleteStoryDialog';
import StoryCard from '@/components/story/StoryCard';
import ExploreSidebar from '@/components/feed/ExploreSidebar';
import StoriesCarousel from '@/components/feed/StoriesCarousel';
import CreatePostBox from '@/components/feed/CreatePostBox';
import RightSidebar from '@/components/feed/RightSidebar';

import { useDeleteStory } from '@/hooks/story/useDeleteStory';
import { useFetchStories } from '@/hooks/story/useFetchStories';
import useToast from '@/hooks/component/useToast';
import ThemeToggle from '@/components/layoutComponents/ThemeToggle';

const ITEMS_PER_PAGE = 6;

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { showSuccess } = useToast();

  const {
    stories = [],
    loading,
    totalStories,
    refresh,
  } = useFetchStories(currentPage, ITEMS_PER_PAGE);

  const [storyToDelete, setStoryToDelete] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { deleteStory, isDeleting } = useDeleteStory(() => {
    setIsDeleteOpen(false);
    showSuccess('Story deleted successfully');

    if (stories.length === 1 && currentPage > 1) {
      setSearchParams({ page: String(currentPage - 1) });
    } else {
      refresh();
    }
  });

  const totalPages = Math.ceil(totalStories / ITEMS_PER_PAGE);

  const handleEdit = (id: number) => navigate(`/story/edit/${id}`);

  const handleDeleteClick = (id: number) => {
    setStoryToDelete(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (storyToDelete) {
      deleteStory(storyToDelete);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ page: String(pageNumber) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ─── LEFT SIDEBAR (EXPLORE, SUGGESTIONS, EVENTS) ─── */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20">
            <ExploreSidebar />
          </div>
        </aside>

        {/* ─── MIDDLE FEED COLUMN (STORIES, PUBLISHER, FEED CARDS) ─── */}
        <main className="lg:col-span-6 space-y-6">
          {/* Stories Highlights Row */}
          <StoriesCarousel />

          {/* Create Post Publisher Box */}
          <CreatePostBox onPostClick={() => navigate('/story/create')} />

          {/* Main Feed Content List */}
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-56 w-full bg-card border border-border animate-pulse rounded-xl"
                  />
                ))}
              </div>
            ) : stories?.length > 0 ? (
              <div className="space-y-4">
                {stories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl border border-dashed border-border p-6">
                <p className="text-muted-foreground text-sm font-medium">
                  No posts found in your feed yet.
                </p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border pt-4 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <LuChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={loading}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                        currentPage === page
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border text-foreground hover:bg-muted'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <span className="sm:hidden text-xs font-medium text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <LuChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>

        {/* ─── RIGHT SIDEBAR (RECOMMENDATIONS, FRIENDS) ─── */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20">
            <RightSidebar />
          </div>
        </aside>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteStoryDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />

      {/* Theme Toggle Button */}
      <ThemeToggle />
    </div>
  );
};

export default Home;
