import bcrypt from 'bcryptjs'
import { createClient } from '../utils/db-helpers'
import { createJwtCookie } from '../utils/jwt-helper'

export async function handler (event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'hello' })
  }
  /*   const dbClient = createClient()
  let errorStatusCode = 500

  try {
    await dbClient.connect()
    const users = dbClient.usersCollection()

    const { email, password } = JSON.parse(event.body)

    const existingUser = users.findOne({ email })
    if (existingUser) {
      errorStatusCode = 409
      throw new Error(`A user already exists with email: ${email}`)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const { insertedId } = await users.insertOne({
      email,
      password: passwordHash
    })

    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': createJwtCookie(insertedId, email),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: insertedId, email })
    }
  } catch (err) {
    return {
      statusCode: errorStatusCode,
      body: JSON.stringify({ msg: err.message })
    }
  } finally {
    dbClient.close()
  } */
}
