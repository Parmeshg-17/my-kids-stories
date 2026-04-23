import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { StoryPage } from './pages/StoryPage';
import { Categories } from './pages/Categories';
import { CategoryPage } from './pages/CategoryPage';
import { Bookmarks } from './pages/Bookmarks';
import { Search } from './pages/Search';
import { Trending } from './pages/Trending';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Disclaimer } from './pages/Disclaimer';
import { FirebaseProvider } from './components/FirebaseProvider';

// Admin Imports
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminStories } from './admin/AdminStories';
import { AdminAddStory } from './admin/AdminAddStory';
import { AdminCategories } from './admin/AdminCategories';
import { AdminAddCategory } from './admin/AdminAddCategory';
import { AdminSettings } from './admin/AdminSettings';
import { AdminLogin } from './admin/AdminLogin';

export default function App() {
  return (
    <HelmetProvider>
      <FirebaseProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="story/:slug" element={<StoryPage />} />
              <Route path="categories" element={<Categories />} />
              <Route path="category/:slug" element={<CategoryPage />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="search" element={<Search />} />
              <Route path="trending" element={<Trending />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="disclaimer" element={<Disclaimer />} />
              {/* Fallback 404 */}
              <Route path="*" element={
                <div className="min-h-[60vh] flex flex-col items-center justify-center">
                  <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                  <a href="/" className="text-primary hover:underline">Return Home</a>
                </div>
              } />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="stories" element={<AdminStories />} />
              <Route path="stories/add" element={<AdminAddStory />} />
              <Route path="stories/edit/:id" element={<AdminAddStory />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="categories/add" element={<AdminAddCategory />} />
              <Route path="categories/edit/:id" element={<AdminAddCategory />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FirebaseProvider>
    </HelmetProvider>
  );
}
