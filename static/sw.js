importScripts('https://cdn.ampproject.org/sw/amp-sw.js')
// for other caching modules and options see https://github.com/ampproject/amp-sw
AMP_SW.init({
    documentCachingOptions: {
        allowList: [/\/$/, /top/, /new/, /ask/, /job/]
    },
    assetCachingOptions: [{
        regexp: /\.(png|jpg|svg)/,
        cachingStrategy: 'CACHE_FIRST'
    }],
    offlinePageOptions: {
        url: '/offline',
        assets: []
    }
});