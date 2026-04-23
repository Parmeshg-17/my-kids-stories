import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebase } from '../components/FirebaseProvider';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export function AdminAddCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    theme: 'default',
    imageUrl: '',
    status: true
  });

  useEffect(() => {
    if (id) {
      const categoryToEdit = categories.find(c => c.id === id);
      if (categoryToEdit) {
        setFormData({
          name: categoryToEdit.name,
          slug: categoryToEdit.slug,
          theme: categoryToEdit.theme,
          imageUrl: categoryToEdit.imageUrl,
          status: categoryToEdit.status
        });
      }
    }
  }, [id, categories]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateDoc(doc(db, 'categories', id), formData);
        alert('Category updated successfully!');
      } else {
        await addDoc(collection(db, 'categories'), formData);
        alert('Category saved successfully!');
      }
      navigate('/admin/categories');
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/categories')}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">{id ? 'Edit Category' : 'Add New Category'}</h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{loading ? 'Saving...' : 'Save Category'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <section className="bg-card rounded-2xl border shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})}
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
            <label className="block text-sm font-medium mb-2">Theme</label>
            <select 
              value={formData.theme}
              onChange={(e) => setFormData({...formData, theme: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="default">Default</option>
              <option value="kids">Kids</option>
              <option value="horror">Horror</option>
              <option value="moral">Moral</option>
              <option value="royal">Royal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input 
              type="text" 
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg border" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="status"
              checked={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.checked})}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="status" className="text-sm font-medium">Active</label>
          </div>
        </section>
      </form>
    </div>
  );
}
