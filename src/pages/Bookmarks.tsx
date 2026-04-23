import { SEO } from '../components/SEO';
import { StoryCard } from '../components/StoryCard';
import { useAppStore } from '../store/useAppStore';
import { Link } from 'react-router-dom';
import { useFirebase } from '../components/FirebaseProvider';
import { AdSense } from '../components/AdSense';

export function Bookmarks() {
  const { bookmarks } = useAppStore();
  const { stories, loading } = useFirebase();
  const bookmarkedStories = stories.filter(s => bookmarks.includes(s.id));

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh]">
      <SEO 
        title="My Bookmarks" 
        description="Your saved stories for reading later."
      />
      <h1 className="text-4xl font-bold mb-8">My Bookmarks</h1>
      
      <AdSense slot="bookmarks-top" className="mb-8" />
      
      {bookmarkedStories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">You haven't bookmarked any stories yet.</p>
          <Link to="/" className="text-primary font-medium hover:underline">
            Discover Stories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}

      <AdSense slot="bookmarks-bottom" className="mt-12" />
    </div>
  );
}
