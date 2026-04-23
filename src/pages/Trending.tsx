import { SEO } from '../components/SEO';
import { StoryCard } from '../components/StoryCard';
import { useFirebase } from '../components/FirebaseProvider';
import { AdSense } from '../components/AdSense';

export function Trending() {
  const { stories, loading } = useFirebase();
  const trendingStories = [...stories].sort((a, b) => b.views - a.views);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh]">
      <SEO 
        title="Trending Stories" 
        description="Read the most popular and trending stories for kids."
      />
      <h1 className="text-4xl font-bold mb-8">Trending Stories</h1>
      
      <AdSense slot="trending-top" className="mb-8" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      <AdSense slot="trending-bottom" className="mt-12" />
    </div>
  );
}
