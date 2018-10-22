//ASIGNAR NOMBRE Y VERSION DE LA CACHE
const CACHE_NAME = 'v1_cache_couder_pwa';

//FICHEROS A CACHEAR EN LA APLICACION para poder mostrar sin conexion
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'
];

//EVENTO INSTALL
//instalacion del service worker, almacenar en cache los recusos estatricos de la app

self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache =>{
                  return cache.addAll(urlsToCache)
                              .then(()=>{
                                  self.skipWaiting();
                              })
              })
              .catch(err=>{
                console.log('No se ah registrado el cache', err);
            })
    );
});

//EVENTO ACTIVATE
//QUE LA APLICACION FUNCIONE SIN CONEXION
self.addEventListener('activate', e=>{
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
              .then(cacheNames =>{
                  return Promise.all(
                        cacheNames.map(cacheName =>{


                            if(cacheWhiteList.indexOf(cacheName) === -1){
                                //Borrar elementos que no se neceistan
                                return caches.delete(cacheName);
                            }
                        })
                  );
              })
                .then(() =>{
                    //activa cache en dispositivo
                    self.clients.claim();
                })
    );
});

//EVENTO FETCH PARA CONSEGUIR LA INFORMACION DE LA APLICACION
self.addEventListener('fetch',e =>{
    e.respondWith(
        caches.match(e.request)
                .then(res =>{
                    if(res){
                        //devuelvo datos desde cache
                        return res;
                    }
                    return fetch(e.request);
                })
    );
});