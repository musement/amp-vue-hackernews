const path = require('path')
const fs = require('fs')

/**
 * Find all files inside a dir, recursively.
 * @function getAmpMustacheTemplates
 * @param  {string} dir Dir path string.
 * @return {string[]} Array of objects [{id: filename, content: file content}]
 */
const getAmpMustacheTemplates = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file)
    const isDirectory = fs.statSync(name).isDirectory()
    return isDirectory
      ? [...files, ...getAmpMustacheTemplates(name)]
      : [...files, ...[{ id: file, content: fs.readFileSync(name, 'utf-8') }]]
  }, [])

export default function ampMustacheTemplates() {
  const ampMustacheTemplates = getAmpMustacheTemplates(
    path.resolve(__dirname, '../components/amp-mustache-templates')
  ).reduce((files, file) => {
    return [
      ...files,
      `<script data-safe type="text/plain" template="amp-mustache" id="${file.id}">${
      file.content
      }</script>`
    ]
  }, [])

  this.nuxt.hook('render:route', (url, page, context) => {
    const pattern = /amp-mustache/
    // apply ampMustacheTemplates only when components are using them
    if (pattern.test(page.html)) {
      page.html = page.html.replace('</head>', ampMustacheTemplates.join('') + '</head>')      
    }
  })
}