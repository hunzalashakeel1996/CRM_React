let cacheData = 'crm'

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/static/js/bundle.js",
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/index.html",
                "/",
                "/admin",
                // "/main.673536729cb721228d47.hot-update.js",
                // "/static/js/75.chunk.js",
                // "/static/js/bundle.js.map",
                // "/static/js/main.chunk.js.map",
                // "/static/js/75.chunk.js.map",
                // "/static/js/4.chunk.js",
                // "/static/js/7.chunk.js",
                // "/static/js/13.chunk.js",
                // "/static/js/14.chunk.js",
                // "/static/js/15.chunk.js",
                // "/static/js/25.chunk.js",
                // "/static/js/6.chunk.js",
                // "/static/js/16.chunk.js",
                // "/static/js/19.chunk.js",
                // "/static/js/27.chunk.js",
                // "/static/js/47.chunk.js",

            ])
        })
    )
})

this.addEventListener('fetch', (event) => {
    // event.waitUntil(
    //     this.registration.showNotification("Heelo from sw", {
    //         body: 'Hello from body'
    //     })
    // )

    // if internet not found then read cache and load website 
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((result) => {
                if (result)
                    return result
            })
        )
    }
})

this.addEventListener('sync', (event) => {
    event.waitUntil(
        setInterval(() => {
            this.registration.showNotification("Heelo from sw", {
                body: 'inside sync'
            })
        }, 1000)
    )
})