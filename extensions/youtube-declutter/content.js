// YouTube changes pages inside the tab without a full load, so the
// declarative rules never see those navigations. Catch them here.
// location.replace swaps the current history entry, so Back doesn't bounce.
function redirectIfNeeded() {
  const target = redirectTarget(location.href);
  if (target) location.replace(target);
}

// Links to the Home feed (the YouTube logo, the Guide's Home entry) are
// caught before YouTube's router sees the click, so Home never loads.
// Clicking the Guide's Subscriptions link keeps the in-tab navigation fast;
// without one on the page, fall back to a full load.
function openSubscriptionsInstead(event) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest?.('a[href]');
  if (!link) return;
  const target = redirectTarget(link.href);
  if (target !== 'https://www.youtube.com/feed/subscriptions') return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const subscriptions = document.querySelector('a[href="/feed/subscriptions"]');
  if (subscriptions) subscriptions.click();
  else location.assign(target);
}

redirectIfNeeded();
document.addEventListener('click', openSubscriptionsInstead, true);
document.addEventListener('yt-navigate-finish', redirectIfNeeded);
window.addEventListener('popstate', redirectIfNeeded);
