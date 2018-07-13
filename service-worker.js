(function() {
    'use strict';
  
    self.addEventListener('install', function(event) {
      console.log('Service worker installing...');
      self.skipWaiting();
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Service worker activating...');
    });
  
  
    self.addEventListener('fetch', function(event) {
      console.log('fetching seems to be working...');
    });
  
  })();

  //service-worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}
