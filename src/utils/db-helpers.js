const { MongoClient } = require('mongodb')

const dbName = 'podify'

exports.createClient = function () {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  client.usersCollection = async function () {
    return await this.db(dbName).collection('users')
  }

  return client
}
