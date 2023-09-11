import { UserAPI } from '~app/modules/Users/usersDataSource'
import { MongoClient } from 'mongodb'
import { ActivityAPI } from '~app/modules/activity/activityDataSource'
import { StudentAPI } from '~app/modules/student/studentDataSource'

export const dataSources = (client: MongoClient) => ({
  userApi: new UserAPI(client.db('bff-masterclass-db').collection('users')),
  activityApi: new ActivityAPI(client.db('bff-masterclass-db').collection('activities')),
  studentApi: new StudentAPI(client.db('bff-masterclass-db').collection('students'))
})
