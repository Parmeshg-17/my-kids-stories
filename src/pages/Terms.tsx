import { SEO } from '../components/SEO';

export function Terms() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl min-h-[60vh]">
      <SEO title="Terms of Service" description="Terms of Service for StoryTime" />
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        <h2>2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on StoryTime's website for personal, non-commercial transitory viewing only.</p>
        <h2>3. Disclaimer</h2>
        <p>The materials on StoryTime's website are provided on an 'as is' basis. StoryTime makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
      </div>
    </div>
  );
}
