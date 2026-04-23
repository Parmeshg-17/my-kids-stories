import { Link } from 'react-router-dom';
import { Clock, Eye, Bookmark } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { Story } from '../types';

interface StoryCardProps {
  story: Story;
  featured?: boolean;
}

export function StoryCard({ story, featured = false }: StoryCardProps) {
  const { bookmarks, addBookmark, removeBookmark } = useAppStore();
  const isBookmarked = bookmarks.includes(story.id);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isBookmarked) {
      removeBookmark(story.id);
    } else {
      addBookmark(story.id);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all",
        featured ? "md:col-span-2 md:flex" : "flex flex-col"
      )}
    >
      <Link to={`/story/${story.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read {story.title}</span>
      </Link>
      
      <div className={cn(
        "relative overflow-hidden bg-muted",
        featured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-[3/2]"
      )}>
        <img 
          src={story.thumbnailUrl} 
          alt={story.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow-sm">
            {story.language === 'hi' ? 'हिंदी' : 'English'}
          </span>
        </div>
        <button 
          onClick={toggleBookmark}
          className="absolute top-4 right-4 z-20 p-2 bg-background/80 backdrop-blur rounded-full hover:bg-background transition-colors shadow-sm"
        >
          <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-primary text-primary")} />
        </button>
      </div>

      <div className={cn(
        "p-5 flex flex-col flex-1",
        featured && "md:w-1/2 md:justify-center md:p-8"
      )}>
        <h3 className={cn(
          "font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2",
          featured ? "text-2xl md:text-3xl" : "text-lg",
          story.language === 'hi' && "hindi-text"
        )}>
          {story.title}
        </h3>
        
        <p className={cn(
          "text-muted-foreground mb-4 line-clamp-2",
          story.language === 'hi' && "hindi-text"
        )}>
          {story.metaDescription}
        </p>

        <div className="mt-auto flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{story.readingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{story.views}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
