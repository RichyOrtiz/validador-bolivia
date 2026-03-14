const CACHE_NAME = 'validador-richy-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './data.js',
    './img/fondo-translucido.jpg',
    './img/logo.png', // Logo Farid
    './img/logo_ingenieros.png', // Logo Ingenieros
    './img/billete-10.jpg',
    './img/billete-20.jpg',
    './img/billete-50.jpg',
    './img/beep.mp3',
    './img/alerta.mp3'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});