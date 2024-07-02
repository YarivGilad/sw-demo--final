/* // 1 - Basic verification the service worker is running
console.log("Service Worker is running");  
console.log({self});  */


/* // 2 - service worker events
import {colors} from "./js/color-logger.js";

self.addEventListener("install", (event) => { 
    // service worker is installed 
    colors.log("⚡️ SW install event ⚡️", colors.yellow);
    
    // By default, although installed, the service worker will not become activated 
    // until the current service worker is gone and all tabs using it are closed or reloaded 
    // (i.e. the service worker is in the waiting phase).

    // The skipWaiting() method of the ServiceWorkerGlobalScope interface 
    // forces the waiting service worker to become the active service worker.
    
    // self.skipWaiting(); // skip the waiting phase
     
    // the .waitUntil() method tells the browser that the event is not finished until the promise passed to .waitUntil() is resolved.
    event.waitUntil(self.skipWaiting());// Forces the waiting service worker to become the active service worker
    
    // // a good place to cache assets
    // event.waitUntil(addResourcesToCache());
});
self.addEventListener("activate", (event) => { 
    // service worker is activated
    colors.log("⚡️ SW activate event ⚡️", colors.green);
    // a good place to clean up old caches
    // self.clients.claim();
    event.waitUntil(self.clients.claim());// Takes control of all the clients under its scope
});
self.addEventListener("fetch", (event) => { 
    // service worker intercepted an HTTP request
    colors.log("⚡️ SW fetch event ⚡️", colors.magenta, event.request.url); 
    // console.log("intercepts an HTTP request", event.request); 
    // a good place to decide if to serve from cache or network
    // or save / retrieve data from indexedDB
    // or generate a response from scratch 
});
self.addEventListener("message", (event) => { 
    // message from web page
    colors.log("⚡️ SW message event ⚡️", colors.orange, event.data); 
    // communicate with the web page here...
});

self.addEventListener("push", (event) => {
    // push notification
    colors.log("⚡️ SW push event ⚡️", colors.cyan, event.data.text());
    // console.log(event);
});
self.addEventListener("sync", (event) => {
    // background sync
    colors.log("⚡️ SW sync event ⚡️", colors.purple, event.tag);
});  */


// 3 - cache assets
const version = "v3";
const CACHE_NAME = `static-cache-${version}`;

const CACHE_ASSETS = [
    'index.html',
    'about.html',
    'favicon.ico',
    'styles/main.css', 
    'styles/_reset.css', 
    'styles/_base.css', 
    'styles/_typography.css', 
    'js/main.js',
    'js/color-logger.js',
    'images/browsers-adoption.png',
   //'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9945bcf4-aec7-4edb-afe6-867c7c17541e/da4n3yi-0de959fb-4147-40cf-b075-8be67f955ebc.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi85OTQ1YmNmNC1hZWM3LTRlZGItYWZlNi04NjdjN2MxNzU0MWUvZGE0bjN5aS0wZGU5NTlmYi00MTQ3LTQwY2YtYjA3NS04YmU2N2Y5NTVlYmMuanBnIn1dXX0.2T_OXZFGBW2sqbdNd__qVprbl14ZPvA2Q9hCJ_yNfEY'
];
// DO NOT CACHE THE SERVICE WORKER FILE
// It is automatically cached by the browser

// Call install event
self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
    event.waitUntil(addResourcesToCache());
    // event.waitUntil(precache());
});
async function addResourcesToCache() {
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(CACHE_ASSETS); // addAll === fetch + put in cache
    } catch (error) {
        console.error('Error caching', err);
    }
};

// function precache() {
//     return caches.open(CACHE_NAME)
//             .then( cache => cache.addAll(CACHE_ASSETS)) // addAll === fetch + put in cache
//             .catch( err => console.error('Error caching', err));
// }


// Call activate event
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');
    // Remove old caches
    event.waitUntil(removeOldCaches());
});
async function removeOldCaches() {
    try {
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(cache => cache !== CACHE_NAME);
        await Promise.all(oldCaches.map(cache => caches.delete(cache)));
    } catch (error) {
        console.error('Error removing old cache', err);
    }
};


// Call fetch event
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching');
    // Network first approach
    //event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    
    // Cache first approach
    event.respondWith(fetchFromCache(event.request));
});

async function fetchFromCache(request) {
    try {
        const cacheResponse = await caches.match(request);
        return cacheResponse || fetch(request);
    } catch (error) {
        console.error('Error fetching from cache', err);
    }
} 