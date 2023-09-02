import { MongoDataSource } from 'apollo-datasource-mongodb'
import { SubTopic } from '~app/models/subTopics.model'

export class SubTopicAPI extends MongoDataSource<SubTopic> {
  async getSubtopics(topicId: string) {
    return await this.collection.find({ topicId }).toArray()
  }
}
