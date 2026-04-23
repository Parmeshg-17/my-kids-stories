import { BookOpen, Eye, FolderTree, TrendingUp } from 'lucide-react';
import { useFirebase } from '../components/FirebaseProvider';

export function AdminDashboard() {
  const { stories, categories } = useFirebase();
  const totalViews = stories.reduce((acc, story) => acc + (story.views || 0), 0);
  const avgReadingTime = stories.length > 0 
    ? (stories.reduce((acc, story) => acc + (story.readingTime || 5), 0) / stories.length).toFixed(1)
    : '0';

  const stats = [
    { label: 'Total Stories', value: stories.length, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Categories', value: categories.length, icon: FolderTree, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Total Views', value: totalViews, icon: Eye, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Avg Reading Time', value: `${avgReadingTime} min`, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Recent Stories</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="pb-4 font-medium">Title</th>
                <th className="pb-4 font-medium">Language</th>
                <th className="pb-4 font-medium">Views</th>
                <th className="pb-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {stories.slice(0, 5).map(story => (
                <tr key={story.id} className="border-b last:border-0">
                  <td className="py-4 font-medium">{story.title}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-muted rounded-md text-sm">
                      {story.language === 'hi' ? 'Hindi' : 'English'}
                    </span>
                  </td>
                  <td className="py-4">{story.views || 0}</td>
                  <td className="py-4 text-muted-foreground">
                    {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
              {stories.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-muted-foreground">
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
