import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Instagram, Youtube } from 'lucide-react';
import { useFirebase } from './FirebaseProvider';

export function Footer() {
  const { settings } = useFirebase();
  const socialLinks = settings?.socialLinks || { facebook: { enabled: false, url: '' }, instagram: { enabled: false, url: '' }, youtube: { enabled: false, url: '' } };
  const siteName = settings?.siteName || 'StoryTime';

  return (
    <footer className="border-t bg-muted/30 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-xl inline-flex">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-bold text-2xl">{siteName}</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              A magical place for kids to read, learn, and explore wonderful stories in English and Hindi.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">All Categories</Link></li>
              <li><Link to="/trending" className="text-muted-foreground hover:text-primary transition-colors">Trending Stories</Link></li>
              <li><Link to="/bookmarks" className="text-muted-foreground hover:text-primary transition-colors">My Bookmarks</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            {socialLinks.facebook?.enabled && (
              <a href={socialLinks.facebook.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {socialLinks.instagram?.enabled && (
              <a href={socialLinks.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {socialLinks.youtube?.enabled && (
              <a href={socialLinks.youtube.url} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
