(function() {
    'use strict';
    let cacheName = 'rw-cache-v1'
    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open(cacheName).then(function(cache) {
          return cache.addAll(
            [
              './js/dbhelper.js',
              './index.html',
              './restaurant.html',
              './js/main.js',
              './js/restaurant_info.js',
              './css/styles.css',
              './img/1.jpg',
              './img/2.jpg',
              './img/3.jpg',
              './img/4.jpg',
              './img/5.jpg',
              './img/6.jpg',
              './img/7.jpg',
              './img/8.jpg',
              './img/9.jpg',
              './img/10.jpg',
            ]
          );
        }).then(function(){console.log('cache complete')})
      );
      self.skipWaiting();
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Service worker activating...');
    });
  
  
    self.addEventListener('fetch', function(event) {
/* Just like with the install event, event.waitUntil blocks activate on a promise.
     Activation will fail unless the promise is fulfilled.
  */
 console.log('WORKER: activate event in progress.');

 event.waitUntil(
   caches
     /* This method returns a promise which will resolve to an array of available
        cache keys.
     */
     .keys()
     .then(function (keys) {
       // We return a promise that settles when all outdated caches are deleted.
       return Promise.all(
         keys
           .filter(function (key) {
             // Filter by keys that don't start with the latest version prefix.
             return !key.startsWith(cacheName);
           })
           .map(function (key) {
             /* Return a promise that's fulfilled
                when each outdated cache is deleted.
             */
             return caches.delete(key);
           })
       );
     })
     .then(function() {
       console.log('WORKER: activate completed.');
     })
 );
    });
  
  
  })();