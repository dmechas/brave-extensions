// Decides where a YouTube URL should go instead, or null to stay.
// Loaded as a plain content script (defines a global) and by Node tests.
function redirectTarget(href) {
  const url = new URL(href);
  if (url.origin !== 'https://www.youtube.com') return null;
  if (url.pathname === '/') return 'https://www.youtube.com/feed/subscriptions';
  const short = url.pathname.match(/^\/shorts\/([A-Za-z0-9_-]+)$/);
  if (short) return `https://www.youtube.com/watch?v=${short[1]}`;
  return null;
}

if (typeof module !== 'undefined') module.exports = { redirectTarget };
