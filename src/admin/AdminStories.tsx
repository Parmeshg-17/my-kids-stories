import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../components/FirebaseProvider';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export function AdminStories() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { stories } = useFirebase();

  const filteredStories = stories.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await deleteDoc(doc(db, 'stories', id));
      } catch (error) {
        console.error('Error deleting story:', error);
        alert('Failed to delete story');
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Manage Stories</h1>
        <button 
          onClick={() => navigate('/admin/stories/add')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Story</span>
        </button>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text"
              placeholder="Search stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50">
              <tr className="text-muted-foreground">
                <th className="p-4 font-medium">Story</th>
                <th className="p-4 font-medium">Language</th>
                <th className="p-4 font-medium">Theme</th>
                <th className="p-4 font-medium">Views</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStories.map(story => (
                <tr key={story.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={story.thumbnailUrl} alt={story.title} className="w-16 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="font-medium line-clamp-1">{story.title}</p>
                        <p className="text-sm text-muted-foreground">{story.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-muted rounded-md text-sm">
                      {story.language === 'hi' ? 'Hindi' : 'English'}
                    </span>
                  </td>
                  <td className="p-4 capitalize">{story.theme}</td>
                  <td className="p-4">{story.views}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/admin/stories/edit/${story.id}`)}
                        className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(story.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStories.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No stories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
