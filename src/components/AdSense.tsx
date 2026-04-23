import React, { useEffect } from 'react';
import { useFirebase } from './FirebaseProvider';

interface AdSenseProps {
  client?: string;
  slot?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export function AdSense({ 
  client, 
  slot, 
  format = 'auto', 
  responsive = true,
  className = ''
}: AdSenseProps) {
  const { settings } = useFirebase();
  const adsenseClient = client || settings?.adsense?.clientId;
  const adsenseSlot = slot || settings?.adsense?.defaultSlot;

  useEffect(() => {
    if (!adsenseClient || !adsenseSlot) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adsenseClient, adsenseSlot]);

  if (!adsenseClient || !adsenseSlot) {
    return null; // Do not render anything if AdSense is not configured
  }

  return (
    <div className={`w-full overflow-hidden flex justify-center items-center bg-muted/30 rounded-xl border border-dashed border-muted-foreground/30 min-h-[100px] ${className}`}>
      {/* Placeholder for development */}
      <div className="text-muted-foreground text-sm flex flex-col items-center justify-center p-4">
        <span className="font-semibold">Advertisement</span>
        <span className="text-xs opacity-70">AdSense Slot: {adsenseSlot}</span>
      </div>
      
      {/* Actual AdSense Code (Hidden in dev, active in prod if configured) */}
      <ins className="adsbygoogle hidden"
           style={{ display: 'block' }}
           data-ad-client={adsenseClient}
           data-ad-slot={adsenseSlot}
           data-ad-format={format}
           data-full-width-responsive={responsive ? "true" : "false"}></ins>
    </div>
  );
}
