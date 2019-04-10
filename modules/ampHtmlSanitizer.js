/* eslint-disable no-console */
import amphtmlValidator from 'amphtml-validator'

export default function ampHtmlSanitizer() {
  const modifyHtml = (html) => {
    // Add amp-custom tag to added CSS
    html = html.replace(/<style data-vue-ssr/g, '<style amp-custom data-vue-ssr')
    // Remove every script tag from generated HTML, except for those containing "data-safe" attribute
    html = html.replace(/<script(?=\s|>)(?!(?:[^>=]|=(['"])(?:(?!\1).)*\1)*?\sdata-safe)[^>]*>.*?<\/script>/gi, '')

    return html
  }

  const ampHtmlValidator = (html) => {
    amphtmlValidator
      .getInstance()
      .then((validator) => {
        const result = validator.validateString(html)
        for (const error of result.errors) {
          const msgError = `Code: ${error.code} - line: ${error.line} - col: ${
            error.col
          } - message: ${error.message}`
          // log here
        ;(error.severity === 'ERROR' ? console.error : console.warn)(msgError)
        }
      })
      .catch(console.error)
  }

  // This hook is called before generatic static html files for SPA mode
  this.nuxt.hook('generate:page', (page) => {
    page.html = modifyHtml(page.html)
  })

  this.nuxt.hook('render:route', (url, page, { req, res }) => {
    page.html = modifyHtml(page.html)
    // outputs AMP html validator report in console
    ampHtmlValidator(page.html)
  })
}
