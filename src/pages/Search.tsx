import { useState, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { StoryCard } from '../components/StoryCard';
import { Search as SearchIcon } from 'lucide-react';
import { useFirebase } from '../components/FirebaseProvider';
import { AdSense } from '../components/AdSense';

export function Search() {
  const { stories, categories, loading } = useFirebase();
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<'all' | 'en' | 'hi'>('all');
  const [category, setCategory] = useState<string>('all');

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesQuery = story.title.toLowerCase().includes(query.toLowerCase()) || 
                           story.metaDescription.toLowerCase().includes(query.toLowerCase());
      const matchesLanguage = language === 'all' || story.language === language;
      const matchesCategory = category === 'all' || story.categoryId === category;
      return matchesQuery && matchesLanguage && matchesCategory;
    });
  }, [stories, query, language, category]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh]">
      <SEO 
        title="Search Stories" 
        description="Search for your favorite kids stories by title, language, or category."
      />
      
      <div className="max-w-3xl mx-auto mb-12 space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8">Find a Story</h1>
        
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
          <input 
            type="text"
            placeholder="Search stories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-4 rounded-2xl border bg-card text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="px-4 py-2 rounded-xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Languages</option>
            <option value="en">English</option>
            <option value="hi">Hindi (हिंदी)</option>
          </select>

          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <AdSense slot="search-top" className="mb-8" />

      {filteredStories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No stories found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}

      <AdSense slot="search-bottom" className="mt-12" />
    </div>
  );
}
