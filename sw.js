var CACHE_NAME = 'juerghunziker.ch-cache-v1';
var urlsToCache = [
    './',
    './index.html',
    './404.html',
    './assets/css/styles.css',
    './assets/js/scripts.min.js',
    './assets/js/fontawesome/fontawesome.min.js',
    './assets/js/fontawesome/packs/custom.min.js',
    './assets/images/twitter-bird-sprite.png',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.2.1.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js',
    'https://secure.gravatar.com/avatar/41c42656cf67fce9e98e1053b3c0c889?s=420'
];
var OFFLINE_URL = '404.html';

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    // We only want to call event.respondWith() if this is a navigation request
    // for an HTML page.
    // request.mode of 'navigate' is unfortunately not supported in Chrome
    // versions older than 49, so we need to include a less precise fallback,
    // which checks for a GET request with an Accept: text/html header.
    if (event.request.mode === 'navigate' ||
        (event.request.method === 'GET' &&
        event.request.headers.get('accept').includes('text/html'))) {
        console.log('Handling fetch event for', event.request.url);
        event.respondWith(
            fetch(event.request).catch(function(error) {
                // The catch is only triggered if fetch() throws an exception, which will most likely
                // happen due to the server being unreachable.
                // If fetch() returns a valid HTTP response with an response code in the 4xx or 5xx
                // range, the catch() will NOT be called. If you need custom handling for 4xx or 5xx
                // errors, see https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/fallback-response
                return caches.match(event.request).then(function(response) {
                    if (response) {
                        console.log('Found ', event.request.url, ' in cache');
                        return response;
                    } else {
                        console.log('Fetch failed; returning offline page instead.', error);
                        return caches.match(OFFLINE_URL);
                    }
                })
            })
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(function() {
                return caches.match(event.request);
            })
        );
    }
});
