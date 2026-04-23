import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FolderTree, Settings, LogOut } from 'lucide-react';
import { useFirebase } from '../components/FirebaseProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useEffect } from 'react';

export function AdminLayout() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useFirebase();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/stories" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors">
            <BookOpen className="w-5 h-5" />
            <span>Stories</span>
          </Link>
          <Link to="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors">
            <FolderTree className="w-5 h-5" />
            <span>Categories</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-destructive/10 text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
