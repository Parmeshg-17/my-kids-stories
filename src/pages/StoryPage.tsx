import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Clock, Eye, Share2, Type } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { useAppStore } from '../store/useAppStore';
import { useFirebase } from '../components/FirebaseProvider';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config';
import { AdSense } from '../components/AdSense';

export function StoryPage() {
  const { slug } = useParams();
  const { stories, loading } = useFirebase();
  const story = stories.find(s => s.slug === slug);
  const [fontSize, setFontSize] = useState(18);
  const { updateProgress, continueReading } = useAppStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!story) return;
    
    // Set initial progress from store
    const savedProgress = continueReading[story.id] || 0;
    setProgress(savedProgress);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const currentProgress = Math.min(100, Math.max(0, (scrolled / documentHeight) * 100));
      setProgress(currentProgress);
      updateProgress(story.id, currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [story, updateProgress, continueReading]);

  useEffect(() => {
    if (story && !loading) {
      // Increment views
      const storyRef = doc(db, 'stories', story.id);
      updateDoc(storyRef, {
        views: increment(1)
      }).catch(console.error);
    }
  }, [story?.id, loading]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!story) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Story Not Found</h1>
        <Link to="/" className="text-primary hover:underline">Return Home</Link>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: story.metaDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className={cn("min-h-screen pb-20", `theme-${story.theme}`)}>
      <SEO 
        title={story.metaTitle}
        description={story.metaDescription}
        keywords={story.keywords}
        image={story.bannerUrl}
        type="article"
      />

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-muted z-40">
        <div 
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Banner */}
      <div className="w-full h-[40vh] md:h-[60vh] relative">
        <img 
          src={story.bannerUrl} 
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10 max-w-4xl">
        <div className="bg-card text-card-foreground rounded-3xl p-6 md:p-12 shadow-xl border">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 text-sm font-semibold bg-primary/10 text-primary rounded-full">
              {story.language === 'hi' ? 'हिंदी' : 'English'}
            </span>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>{story.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Eye className="w-4 h-4" />
              <span>{story.views} views</span>
            </div>
          </div>

          <h1 className={cn(
            "text-3xl md:text-5xl font-bold mb-8",
            story.language === 'hi' && "hindi-text"
          )}>
            {story.title}
          </h1>

          {/* Controls */}
          <div className="flex items-center justify-between py-4 border-y mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setFontSize(f => Math.max(14, f - 2))}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Decrease font size"
              >
                <Type className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium">{fontSize}px</span>
              <button 
                onClick={() => setFontSize(f => Math.min(28, f + 2))}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Increase font size"
              >
                <Type className="w-6 h-6" />
              </button>
            </div>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

          <AdSense slot="story-top" className="mb-8" />

          {/* Content */}
          <div 
            className={cn(
              "prose prose-lg dark:prose-invert max-w-none",
              story.language === 'hi' && "hindi-text leading-loose"
            )}
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          <AdSense slot="story-bottom" className="mt-12" />
        </div>
      </div>
    </div>
  );
}
