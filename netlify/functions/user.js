const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')
const { createClient } = require('../utils/db-helpers')
const { publicKey } = require('./publickey')

exports.handler = async function (event) {
  const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)

  if (!cookies?.jwt) {
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: 'Unauthorized access' })
    }
  }

  const dbClient = createClient()
  await dbClient.connect()
  try {
    const payload = jwt.verify(cookies.jwt, publicKey, {})
    const users = await dbClient.usersCollection()
    const user = await users.findOne(
      { _id: ObjectId(payload.userId) },
      { projection: { _id: 0, password: 0 } }
    )

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ msg: 'User not found' })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ...user })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message })
    }
  } finally {
    dbClient.close()
  }
}
