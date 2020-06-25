const CACHE_NAME = "scola-service-v1";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/main-navbar.html",
    "/mobile-navbar.html",
    "/index.html",
    "/images/logo-white.svg",
    "/images/favicon/apple-touch-icon-57x57.png",
    "/images/favicon/apple-touch-icon-114x114.png",
    "/images/favicon/apple-touch-icon-72x72.png",
    "/images/favicon/apple-touch-icon-144x144.png",
    "/images/favicon/apple-touch-icon-60x60.png",
    "/images/favicon/apple-touch-icon-120x120.png",
    "/images/favicon/apple-touch-icon-76x76.png",
    "/images/favicon/apple-touch-icon-152x152.png",
    "/images/favicon/favicon-196x196.png",
    "/images/favicon/favicon-96x96.png",
    "/images/favicon/favicon-32x32.png",
    "/images/favicon/favicon-16x16.png",
    "/images/favicon/favicon-128.png",
    "/images/image-intro.webp",
    "/images/background-illustration.png",
    "/images/background-2.png",
    "/images/image-1.webp",
    "/images/image-2.webp",
    "/images/logo-partner.jpg",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/galery.html",
    "/css/materialize.min.css",
    "/css/my-style.css",
    "/js/library/materialize.min.js",
    "/js/library/jquery.min.js",
    "/js/app/app.js"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            var fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(
                function (response) {
                    if (!response || response.status !== 200) {
                        return response;
                    }
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                }
            );
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});