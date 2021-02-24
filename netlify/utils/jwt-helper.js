const cookie = require('cookie')
const jwt = require('jsonwebtoken')

/*
 * Generate a JWT with the user ID and email as the payload,
 * then serialize to a secure HTTP-only cookie.
 */
exports.createJwtCookie = function (userId, email) {
  const secretKey =
    '-----BEGIN RSA PRIVATE KEY-----\n' +
    process.env.JWT_SECRET_KEY +
    '\n-----END RSA PRIVATE KEY-----'
  const token = jwt.sign({ userId, email }, secretKey, {
    algorithm: 'RS256',
    expiresIn: '100 days'
  })

  const jwtCookie = cookie.serialize('jwt', token, {
    secure: false, // process.env.NETLIFY_DEF !== true,
    httpOnly: true,
    path: '/'
  })

  return jwtCookie
}

exports.clearCookie = function () {
  return 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}
