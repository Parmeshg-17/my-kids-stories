import { SEO } from '../components/SEO';
import { CategoryCard } from '../components/CategoryCard';
import { useFirebase } from '../components/FirebaseProvider';
import { AdSense } from '../components/AdSense';

export function Categories() {
  const { categories, loading } = useFirebase();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SEO 
        title="All Categories" 
        description="Browse our collection of kids story categories including bedtime stories, moral tales, and more."
      />
      <h1 className="text-4xl font-bold mb-8">All Categories</h1>
      
      <AdSense slot="categories-top" className="mb-8" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      <AdSense slot="categories-bottom" className="mt-12" />
    </div>
  );
}
