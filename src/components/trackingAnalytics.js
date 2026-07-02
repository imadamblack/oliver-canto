export default function TrackingAnalytics() {
  if (!process.env.PIXEL && !process.env.G_ANALYTICS) return null;

  return (
    <>
      {/* ── Facebook Domain Verification ───────────────────────────── */}
      {process.env.FB_DOMAIN_VERIFICATION && (
        <meta
          name="facebook-domain-verification"
          content={process.env.FB_DOMAIN_VERIFICATION}
        />
      )}

      {/* ── Facebook Pixel ─────────────────────────────────────────── */}
      {process.env.PIXEL && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.PIXEL}');
              fbq('track', 'PageView');
            `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <img
                height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=${process.env.PIXEL}&ev=PageView&noscript=1"
              />
            `,
            }}
          />
        </>
      )}

      {/* ── Google Analytics ───────────────────────────────────────── */}
      {process.env.G_ANALYTICS && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.G_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.G_ANALYTICS}');
            `,
            }}
          />
        </>
      )}
    </>
  );
}
