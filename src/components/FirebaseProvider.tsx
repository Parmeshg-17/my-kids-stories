import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { Category, Story } from '../types';

interface FirebaseContextType {
  user: User | null;
  isAdmin: boolean;
  categories: Category[];
  stories: Story[];
  settings: any;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  isAdmin: false,
  categories: [],
  stories: [],
  settings: null,
  loading: true,
});

export const useFirebase = () => useContext(FirebaseContext);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if admin
        const tokenResult = await currentUser.getIdTokenResult();
        setIsAdmin(!!tokenResult.claims.admin || currentUser.email === 'parmeshgaud9594@gmail.com');
      } else {
        setIsAdmin(false);
      }
    });

    // Listen to public data
    const unsubscribeCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
      setCategories(cats);
    }, (error) => console.error("Categories error:", error));

    const unsubscribeStories = onSnapshot(query(collection(db, 'stories'), orderBy('createdAt', 'desc')), (snapshot) => {
      const st = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Story));
      setStories(st);
      setLoading(false);
    }, (error) => {
      console.error("Stories error:", error);
      setLoading(false);
    });

    const unsubscribeSettings = onSnapshot(collection(db, 'settings'), (snapshot) => {
      if (!snapshot.empty) {
        setSettings({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      }
    }, (error) => console.error("Settings error:", error));

    return () => {
      unsubscribeAuth();
      unsubscribeCategories();
      unsubscribeStories();
      unsubscribeSettings();
    };
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, isAdmin, categories, stories, settings, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
}
