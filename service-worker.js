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
      self.skipWaiting();
    });
  
  
    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    });
  
  
  })();