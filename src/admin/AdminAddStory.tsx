import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebase } from '../components/FirebaseProvider';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export function AdminAddStory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories, stories } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categoryId: '',
    language: 'en',
    bannerUrl: '',
    thumbnailUrl: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    readingTime: 5
  });

  useEffect(() => {
    if (id) {
      const storyToEdit = stories.find(s => s.id === id);
      if (storyToEdit) {
        setFormData({
          title: storyToEdit.title,
          slug: storyToEdit.slug,
          categoryId: storyToEdit.categoryId,
          language: storyToEdit.language,
          bannerUrl: storyToEdit.bannerUrl,
          thumbnailUrl: storyToEdit.thumbnailUrl,
          content: storyToEdit.content,
          metaTitle: storyToEdit.metaTitle,
          metaDescription: storyToEdit.metaDescription,
          keywords: storyToEdit.keywords,
          readingTime: storyToEdit.readingTime
        });
      }
    }
  }, [id, stories]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const category = categories.find(c => c.id === formData.categoryId);
      if (id) {
        await updateDoc(doc(db, 'stories', id), {
          ...formData,
          theme: category?.theme || 'default',
        });
        alert('Story updated successfully!');
      } else {
        await addDoc(collection(db, 'stories'), {
          ...formData,
          theme: category?.theme || 'default',
          views: 0,
          createdAt: Date.now()
        });
        alert('Story saved successfully!');
      }
      navigate('/admin/stories');
    } catch (error) {
      console.error('Error saving story:', error);
      alert('Failed to save story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/stories')}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">{id ? 'Edit Story' : 'Add New Story'}</h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{loading ? 'Saving...' : 'Save Story'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <section className="bg-card rounded-2xl border shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug (SEO URL)</label>
              <input 
                type="text" 
                required
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content (HTML)</label>
              <textarea 
                required
                rows={15}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                placeholder="<p>Once upon a time...</p>"
              />
            </div>
          </section>

          {/* SEO */}
          <section className="bg-card rounded-2xl border shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">SEO Settings</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Meta Title</label>
              <input 
                type="text" 
                value={formData.metaTitle}
                onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <textarea 
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Keywords (comma separated)</label>
              <input 
                type="text" 
                value={formData.keywords}
                onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Organization */}
          <section className="bg-card rounded-2xl border shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">Organization</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select 
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select 
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reading Time (minutes)</label>
              <input 
                type="number" 
                min="1"
                value={formData.readingTime}
                onChange={(e) => setFormData({...formData, readingTime: parseInt(e.target.value)})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </section>

          {/* Media */}
          <section className="bg-card rounded-2xl border shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">Media</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Banner Image URL (1200x600)</label>
              <input 
                type="text" 
                required
                value={formData.bannerUrl}
                onChange={(e) => setFormData({...formData, bannerUrl: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formData.bannerUrl && (
                <img src={formData.bannerUrl} alt="Banner Preview" className="mt-2 w-full h-32 object-cover rounded-lg border" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Thumbnail URL (600x400)</label>
              <input 
                type="text" 
                required
                value={formData.thumbnailUrl}
                onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formData.thumbnailUrl && (
                <img src={formData.thumbnailUrl} alt="Thumbnail Preview" className="mt-2 w-full h-32 object-cover rounded-lg border" />
              )}
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}
