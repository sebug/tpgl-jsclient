self.addEventListener('install', function (event) {
    event.waitUntil(
	caches.open('v3').then(function (cache) {
	    return cache.addAll([
		'/',
		'/main.js'
	    ]);
	}));
});
