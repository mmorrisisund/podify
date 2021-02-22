// 1. Connect to the database and get a reference to the `users` collection
// 2. Get the email and password from the request body
// 3. Check to see if the user exists, if not return error (401 Unauthorized)
// 4. Compare the password, if it doesn't match return error (401 Unauthorized)
// 5. Create a JWT and serialize as a secure http-only cookie
// 6. Return the user id and a Set-Cookie header with the JWT cookie
const bcrypt = require('bcryptjs')
const { createClient } = require('../../src/utils/db-helpers')
const { createJwtCookie } = require('../../src/utils/jwt-helper')

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
      body: JSON.stringify({ userId: user._id })
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
