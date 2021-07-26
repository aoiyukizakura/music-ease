//缓存空间名称
const CACHE_VERSION = 'sw_v' + 1;
//需缓存的文件
// const CACHE_FILES = ['/', '/index.html'];
// fetch缓存文件
const FETCH_CACHE_FILES = ['js', 'css', 'jpg'];

const hasSaving = function (url) {
  for (var file of FETCH_CACHE_FILES) {
    if (new URL(url).pathname.endsWith(file)) return true;
  }
  return false;
};

self.addEventListener('install', function (event) {
  // event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(CACHE_FILES).then(_ => self.skipWaiting())));
});
//监听激活事件
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      const promises = keys.map(function (key, i) {
        if (key !== CACHE_VERSION) {
          return caches.delete(keys[i]);
        }
      });
      return Promise.all(promises);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return (
        resp ||
        fetch(event.request).then(response => {
          const url = event.request.url;
          if (!hasSaving(url)) return response;
          return caches.open(CACHE_VERSION).then(cache => {
            cache
              .put(event.request, response.clone())
              .then(res => console.log('res :>> ', res))
              .catch(err => console.log('err :>> ', err));
            return response;
          });
        })
      );
    })
  );
});
self.addEventListener('message', event => {
  console.log('receive message' + event.data);
  var url = event.data;
  console.log('update root file ' + url);
  event.waitUntil(
    caches.open(CACHE_VERSION).then(async cache => {
      const res = await fetch(url);
      cache.put(url, res);
    })
  );
});
