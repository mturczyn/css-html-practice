// RespondWith must be called synchronously, but it accepts Promise resolving to Response object.
self.addEventListener('fetch', (event) => {
    console.log('destination', event.request.destination)
    event.respondWith(
        (async () => {
            try {
                return await fetch(event.request)
            } catch (error) {
                console.log(error)
                return await caches.match('offline-main-page.html')
            }
        })()
    )
})

caches.open('pwa-practice-offline-fallbacks').then(async (cache) => {
    cache.add('offline-main-page.html')
})
