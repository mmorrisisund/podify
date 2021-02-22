const { clearCookie } = require('../../src/utils/jwt-helper')

exports.handler = async function () {
  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': clearCookie(),
      'Content-Type': 'application.json'
    },
    body: JSON.stringify({ msg: 'Logged out successfully' })
  }
}
