// Where a main-frame navigation to each URL should end up.
// `to: null` means stay on the requested page.
const SUBSCRIPTIONS = 'https://www.youtube.com/feed/subscriptions';

module.exports = [
  { name: 'Home feed goes to the Subscriptions feed', from: 'https://www.youtube.com/', to: SUBSCRIPTIONS },
  { name: 'Home feed with a query string goes to the Subscriptions feed', from: 'https://www.youtube.com/?si=abc&app=desktop', to: SUBSCRIPTIONS },
  { name: 'Short opens on the Watch page', from: 'https://www.youtube.com/shorts/aB3_x-9Zq0k', to: 'https://www.youtube.com/watch?v=aB3_x-9Zq0k' },
  { name: 'Short with query parameters opens on the Watch page', from: 'https://www.youtube.com/shorts/aB3_x-9Zq0k?si=XyZ&feature=share', to: 'https://www.youtube.com/watch?v=aB3_x-9Zq0k' },
  { name: 'Subscriptions feed stays', from: 'https://www.youtube.com/feed/subscriptions', to: null },
  { name: 'Watch page stays', from: 'https://www.youtube.com/watch?v=aB3_x-9Zq0k&t=42s', to: null },
  { name: 'Channel page stays', from: 'https://www.youtube.com/@somechannel', to: null },
  { name: 'Channel Shorts tab stays (hidden by the stylesheet, not redirected)', from: 'https://www.youtube.com/@somechannel/shorts', to: null },
  { name: 'Search results stay', from: 'https://www.youtube.com/results?search_query=shorts', to: null },
  { name: 'Mobile YouTube is out of scope', from: 'https://m.youtube.com/', to: null },
  { name: 'YouTube Music is out of scope', from: 'https://music.youtube.com/', to: null },
  { name: 'Shorts on mobile YouTube are out of scope', from: 'https://m.youtube.com/shorts/aB3_x-9Zq0k', to: null },
  { name: 'Upper-case Shorts path stays (paths are case-sensitive)', from: 'https://www.youtube.com/SHORTS/aB3_x-9Zq0k', to: null },
];
