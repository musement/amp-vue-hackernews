/**
 * Injects required AMP Boilerplate code https://www.ampproject.org/docs/fundamentals/spec/amp-boilerplate
 */
export default function ampBoilerplate() {
  const addAmpBoilerplate = (html) => {
    const boilerplate = '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>'
    return html.replace('</head>', `${boilerplate}</head>`)
  }

  // This hook is called before generatic static html files for SPA mode
  this.nuxt.hook('generate:page', (page) => {
    page.html = addAmpBoilerplate(page.html)
  })

  this.nuxt.hook('render:route', (url, page, { req, res }) => {
    page.html = addAmpBoilerplate(page.html)
  })

}
