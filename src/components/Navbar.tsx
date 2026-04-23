import { Link } from 'react-router-dom';
import { Moon, Sun, BookOpen, Search, Menu, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import { cn } from '../lib/utils';

export function Navbar() {
  const { theme, toggleTheme } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">StoryTime</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">Categories</Link>
          <Link to="/trending" className="text-sm font-medium hover:text-primary transition-colors">Trending</Link>
          <Link to="/bookmarks" className="text-sm font-medium hover:text-primary transition-colors">Bookmarks</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/search" className="p-2 hover:bg-muted rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <button onClick={toggleTheme} className="p-2 hover:bg-muted rounded-full transition-colors">
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button 
            className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background flex flex-col gap-4">
          <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-primary transition-colors">Categories</Link>
          <Link to="/trending" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-primary transition-colors">Trending</Link>
          <Link to="/bookmarks" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-primary transition-colors">Bookmarks</Link>
        </div>
      )}
    </nav>
  );
}
