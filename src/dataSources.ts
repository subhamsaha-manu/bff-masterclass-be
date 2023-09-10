import { UserAPI } from '~app/modules/Users/usersDataSource'
import { MongoClient } from 'mongodb'

export const dataSources = (client: MongoClient) => ({
  userApi: new UserAPI(client.db('bff-masterclass-db').collection('users'))
})
