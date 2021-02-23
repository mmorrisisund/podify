const bcrypt = require('bcryptjs')
const { createClient } = require('../utils/db-helpers')
const { createJwtCookie } = require('../utils/jwt-helper')

exports.handler = async function (event) {
  let errorStatusCode = 500
  const dbClient = createClient()

  try {
    await dbClient.connect()
    const users = await dbClient.usersCollection()

    const { email, password } = JSON.parse(event.body)

    const user = await users.findOne({ email })
    if (!user) {
      errorStatusCode = 401
      throw new Error('Invalid password or email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      errorStatusCode = 401
      throw new Error('Invalid password or email')
    }

    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': createJwtCookie(user._id, email),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user._id, email, username: user.username })
    }
  } catch (error) {
    return {
      statusCode: errorStatusCode,
      body: JSON.stringify({ msg: error.message })
    }
  } finally {
    dbClient.close()
  }
}
