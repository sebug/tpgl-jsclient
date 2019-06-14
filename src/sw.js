self.addEventListener('install', function (event) {
    event.waitUntil(
	caches.open('v3').then(function (cache) {
	    return cache.addAll([
		'/',
		'/main.js'
	    ]);
	}));
});

// TODO: Actually serve from cache. But for this, we want it to be a
// bit more stable

