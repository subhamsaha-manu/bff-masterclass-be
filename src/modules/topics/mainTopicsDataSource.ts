import { MongoDataSource } from 'apollo-datasource-mongodb'
import { MainTopic } from '~app/models/mainTopics.model'

export class MainTopicAPI extends MongoDataSource<MainTopic> {
  async getMainTopics() {
    return await this.collection.find().toArray()
  }
}
