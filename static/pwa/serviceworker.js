console.log('Service worker executed.')

self.addEventListener('install', (event) => {
    console.log('Service worker installed')
})

self.addEventListener('activate', (event) => {
    console.log('Service worker activated.')
})

self.addEventListener('fetch', (event) => {
    const requestUrl = event.request.url
    console.log(`URL requested: ${requestUrl}`)

    if (!requestUrl.endsWith('not-existing.css')) {
        fetch(requestUrl)
        return
    }

    // We can multiple handlers for this event,
    // but execution chain will be terminated once
    // event.respondWith method is called.
    const options = {
        status: 200,
        headers: {
            'Content-type': 'text/css',
        },
    }
    const htmlResponse = new Response(
        '#from-not-existing-styles { color: purple; font-weight: bolder; background: pink }',
        options
    )
    // We can also create simple, plain text responses.
    // const simpleResponse = new Response('Body of the HTTP response')

    event.respondWith(htmlResponse)
})

caches.open('pwa-practice-assets').then(async (cache) => {
    const keys = await cache.keys()
    console.log(keys)
    cache.add('pwa.css')
})
