import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { StoryCard } from '../components/StoryCard';
import { useFirebase } from '../components/FirebaseProvider';
import { AdSense } from '../components/AdSense';

export function CategoryPage() {
  const { slug } = useParams();
  const { categories, stories: allStories, loading } = useFirebase();
  const category = categories.find(c => c.slug === slug);
  const stories = allStories.filter(s => s.categoryId === category?.id);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
        <Link to="/categories" className="text-primary hover:underline">View All Categories</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${category.name} Stories`} 
        description={`Read the best ${category.name.toLowerCase()} stories for kids.`}
        image={category.imageUrl}
      />
      
      {/* Category Header */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center mb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src={category.imageUrl} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg md:text-xl opacity-90">{stories.length} stories available</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <AdSense slot="category-top" className="mb-8" />

        {stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No stories in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}

        <AdSense slot="category-bottom" className="mt-12" />
      </div>
    </div>
  );
}
