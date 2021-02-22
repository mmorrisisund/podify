import cookie from 'cookie'
import jwt from 'jsonwebtoken'

/*
 * Generate a JWT with the user ID and email as the payload,
 * then serialize to a secure HTTP-only cookie.
 */
export function createJwtCookie (userId, email) {
  const secretKey =
    '-----BEGIN RSA PRIVATE KEY-----\n' +
    process.env.JWT_SECRET_KEY +
    '\n-----END RSA PRIVATE KEY-----'
  const token = jwt.sign({ userId, email }, secretKey, {
    algorithm: 'RS256',
    expiresIn: '100 days'
  })
  const jwtCookie = cookie.serialize('jwt', token, {
    secure: process.env.NETLIFY_DEF !== true,
    httpOnly: true,
    path: '/'
  })

  return jwtCookie
}
