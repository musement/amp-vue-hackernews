// force https for pwa compliance
export default function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'http' && process.env.NODE_ENV === 'production') {
    const secureURL = 'https://' + req.get('host') + req.originalUrl
    res.redirect(secureURL, 301)
  }
  next()
}
