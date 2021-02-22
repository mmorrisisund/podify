import { MongoClient } from 'mongodb'

const dbName = 'podify'

export function createClient () {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  client.usersCollection = function () {
    return this.db(dbName).collections('users')
  }

  return client
}
