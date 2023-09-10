import { MongoDataSource } from 'apollo-datasource-mongodb'
import { IActivity } from '~app/models/activity.model'
import { Activity } from '~generated/graphql/types'

export class ActivityAPI extends MongoDataSource<IActivity> {
  async getActivitiesForAClass(classId: string): Promise<Array<Activity>> {
    return await this.collection.find({ classId }).toArray()
  }
}
