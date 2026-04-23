import { SEO } from '../components/SEO';
import { StoryCard } from '../components/StoryCard';
import { CategoryCard } from '../components/CategoryCard';
import { motion } from 'framer-motion';
import { useFirebase } from '../components/FirebaseProvider';
import { AdSense } from '../components/AdSense';

export function Home() {
  const { stories, categories, settings, loading } = useFirebase();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const featuredStory = stories[0];
  const recentStories = stories.slice(1, 4);
  const trendingStories = [...stories].sort((a, b) => b.views - a.views).slice(0, 3);
  const heroImage = settings?.heroImageUrl || 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=1200&h=500';

  return (
    <div className="min-h-screen">
      <SEO 
        title="Home" 
        description="Read the best kids stories, bedtime stories, and moral tales in English and Hindi."
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Magical Stories for Kids
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            Discover a world of imagination with our collection of bedtime stories, moral tales, and adventures.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        <AdSense slot="home-top" className="my-8" />

        {/* Featured Story */}
        {featuredStory && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Featured Story</h2>
            <StoryCard story={featuredStory} featured />
          </section>
        )}

        <AdSense slot="home-middle" className="my-8" />

        {/* Categories */}
        {categories.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Explore Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Stories */}
        {recentStories.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Recent Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>
        )}

        <AdSense slot="home-bottom" className="my-8" />

        {/* Trending Stories */}
        {trendingStories.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
