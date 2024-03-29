console.log('Service worker executed.')

self.addEventListener('install', (event) => {
    console.log('Service worker installed')

    const files = ['offline.html'] // you can add more resources here
    event.waitUntil(
        self.caches
            .open('pwa-practice-offline-fallbacks')
            .then((cache) => cache.addAll(files))
    )
})

self.addEventListener('activate', (event) => {
    console.log('Service worker activated.')
})

function produceCssResponse(forCache) {
    // We can multiple handlers for this event,
    // but execution chain will be terminated once
    // event.respondWith method is called.
    const options = {
        status: 200,
        headers: {
            'Content-type': 'text/css',
        },
    }

    let styles =
        '#from-not-existing-styles { color: purple; font-weight: bolder; background: pink }'

    if (forCache) {
        styles +=
            ' #from-not-existing-styles-header::before { content: "SERVED FROM CACHE!"}'
    }

    const cssResponse = new Response(styles, options)

    return cssResponse
}

async function addNonExistingCssToCache(request) {
    console.log('>>> Setting cache for non-existing response.')
    cache = await caches.open('pwa-practice-assets')
    // We need to create separate object, as response object used
    // to produce return value (as HTTP response for the request)
    // the object MUST NOT be used in other places, such as in cache.
    await cache.put(request, produceCssResponse(true))
    console.log('>>> Added cache for ' + request.url)
}

async function produceNonExistingCss(request) {
    let cachedResponse = await caches.match(request)
    if (cachedResponse) {
        console.log('>>> Cache found for ' + request.url)
        return cachedResponse
    }
    await addNonExistingCssToCache(request)
    // We can also create simple, plain text responses.
    // const simpleResponse = new Response('Body of the HTTP response')
    return produceCssResponse(false)
}

async function produceResponseWithCustomCssAndCache(request) {
    console.log(`URL requested: ${request.url}`)

    if (request.url.endsWith('not-existing.css')) {
        return await produceNonExistingCss(request)
    }

    return await fetch(request)
}

async function tryServeAndFallbackToOffline() {
    const cache = await caches.open('pwa-practice-offline-fallbacks')
    return (await cache.match('offline.html')) || Response.error()
}

async function respondWith(event) {
    try {
        return await produceResponseWithCustomCssAndCache(event.request)
    } catch (error) {
        console.log('>>>', 'ERROR: ', error)
        if (event.request.destination === 'document') {
            console.log('>>>', 'destination is ', event.request.destination)
            return await tryServeAndFallbackToOffline(event.request)
        }
    }

    return Response.error()
}

// RespondWith must be called synchronously, but it accepts Promise resolving to Response object.
self.addEventListener('fetch', (event) => {
    console.log('destination', event.request.destination)
    event.respondWith(respondWith(event))
})

caches.open('pwa-practice-assets').then(async (cache) => {
    const keys = await cache.keys()
    console.log(keys)
    cache.add('pwa.css')
})
