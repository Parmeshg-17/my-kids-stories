import { SEO } from '../components/SEO';

export function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl min-h-[60vh]">
      <SEO title="Privacy Policy" description="Privacy Policy for StoryTime" />
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us when you use our services.</p>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services.</p>
        <h2>3. Information Sharing</h2>
        <p>We do not share your personal information with third parties except as described in this privacy policy.</p>
        <h2>4. Security</h2>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access.</p>
      </div>
    </div>
  );
}
