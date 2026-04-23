export interface Category {
  id: string;
  name: string;
  slug: string;
  theme: 'default' | 'kids' | 'horror' | 'moral' | 'royal';
  imageUrl: string;
  status: boolean;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  language: 'en' | 'hi';
  theme: 'default' | 'kids' | 'horror' | 'moral' | 'royal';
  bannerUrl: string;
  thumbnailUrl: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  readingTime: number;
  views: number;
  createdAt: number;
}
