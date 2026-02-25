const CACHE_NAME = 'puzzle-game-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap'
  // আপনি চাইলে এখানে আপনার গিটহাবের ছবিগুলোর লিংকও দিতে পারেন
];

// ইনস্টল করার সময় ফাইলগুলো ক্যাশ (Cache) করে রাখবে (অফলাইনে চলার জন্য)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// ইন্টারনেট না থাকলে ক্যাশ করা ফাইলগুলো থেকে গেম চালাবে
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // যদি ক্যাশে ফাইল পাওয়া যায়, তবে সেটা রিটার্ন করবে
        if (response) {
          return response;
        }
        // না পেলে ইন্টারনেট থেকে লোড করবে
        return fetch(event.request);
      })
  );
});
