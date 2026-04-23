import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useFirebase } from '../components/FirebaseProvider';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

export function AdminSettings() {
  const { settings: firebaseSettings } = useFirebase();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firebaseSettings) {
      // Ensure adsense object exists even on older records
      setSettings({
        ...firebaseSettings,
        adsense: firebaseSettings.adsense || {
          clientId: '',
          defaultSlot: ''
        }
      });
    } else {
      setSettings({
        siteName: 'StoryTime',
        siteDescription: 'A magical place for kids to read, learn, and explore wonderful stories in English and Hindi.',
        heroImageUrl: '',
        socialLinks: {
          facebook: { url: '', enabled: false },
          twitter: { url: '', enabled: false },
          instagram: { url: '', enabled: false },
          youtube: { url: '', enabled: false }
        },
        adsense: {
          clientId: '',
          defaultSlot: ''
        }
      });
    }
  }, [firebaseSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (settings.id) {
        await setDoc(doc(db, 'settings', settings.id), settings);
      } else {
        await addDoc(collection(db, 'settings'), settings);
      }
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  if (!settings) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{loading ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* General Settings */}
        <section className="bg-card rounded-2xl border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <input 
                type="text" 
                value={settings.siteName || ''}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Site Description</label>
              <textarea 
                value={settings.siteDescription || ''}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Home Hero Image URL (1200x500)</label>
              <input 
                type="text" 
                value={settings.heroImageUrl || ''}
                onChange={(e) => setSettings({...settings, heroImageUrl: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {settings.heroImageUrl && (
              <img src={settings.heroImageUrl} alt="Hero Preview" className="w-full h-48 object-cover rounded-xl border" />
            )}
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-card rounded-2xl border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Social Media Links</h2>
          <div className="space-y-4">
            {Object.entries(settings.socialLinks).map(([platform, data]: [string, any]) => (
              <div key={platform} className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-32 capitalize font-medium">{platform}</div>
                <input 
                  type="text" 
                  value={data.url}
                  onChange={(e) => setSettings({
                    ...settings, 
                    socialLinks: {
                      ...settings.socialLinks,
                      [platform]: { ...data, url: e.target.value }
                    }
                  })}
                  placeholder={`https://${platform}.com/...`}
                  className="flex-1 px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={data.enabled}
                    onChange={(e) => setSettings({
                      ...settings, 
                      socialLinks: {
                        ...settings.socialLinks,
                        [platform]: { ...data, enabled: e.target.checked }
                      }
                    })}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Enabled</span>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* AdSense */}
        <section className="bg-card rounded-2xl border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Google AdSense Integration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Publisher ID (Client ID)</label>
              <input 
                type="text" 
                value={settings.adsense?.clientId || ''}
                onChange={(e) => setSettings({
                  ...settings, 
                  adsense: {
                    ...settings.adsense,
                    clientId: e.target.value
                  }
                })}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              />
              <p className="text-xs text-muted-foreground mt-1">Found in your AdSense account script tag as data-ad-client.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Default Ad Slot ID</label>
              <input 
                type="text" 
                value={settings.adsense?.defaultSlot || ''}
                onChange={(e) => setSettings({
                  ...settings, 
                  adsense: {
                    ...settings.adsense,
                    defaultSlot: e.target.value
                  }
                })}
                className="w-full px-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                placeholder="XXXXXXXXXX"
              />
              <p className="text-xs text-muted-foreground mt-1">The data-ad-slot value for your AdSense unit.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
