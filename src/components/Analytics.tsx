// Google Analytics 4. The ID is read at build time, so a build without it ships no tracking at
// all: nothing loads in development, and nothing loaded before the ID was set on the server.
//
// Rendered as plain <script> tags inside the root layout's <head>, not via next/script.
// next/script puts `afterInteractive` at the end of <body> and splits `beforeInteractive`, leaving
// the inline gtag('config') call in the body. Search Console's Google Analytics ownership check
// only looks inside <head>, so both halves of the snippet have to be there.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`,
        }}
      />
    </>
  );
}
