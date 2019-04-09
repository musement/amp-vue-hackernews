import { join } from 'path'

export default function (moduleOptions) {
  this.addServerMiddleware((req, res, next) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    const absPath = fullUrl.split('?')[0]

    req.appConfig = {
      fullUrl,
      absPath
      // add other application wide props injected from server below...
    }

    next()
  })

  this.addPlugin({
    src: join(__dirname, '../plugins/plugin.server.js'),
    mode: 'server'
  })
}
