import { SEO } from '../components/SEO';

export function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl min-h-[60vh]">
      <SEO title="Disclaimer" description="Disclaimer for StoryTime" />
      <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>General Information</h2>
        <p>The information provided by StoryTime on our website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.</p>
        <h2>External Links</h2>
        <p>The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>
      </div>
    </div>
  );
}
