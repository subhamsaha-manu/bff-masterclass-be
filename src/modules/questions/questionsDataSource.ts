import { MongoDataSource } from 'apollo-datasource-mongodb'
import { Question } from '~app/models/questions.model'

export class QuestionAPI extends MongoDataSource<Question> {
  async getQuestions(subtopicId: string) {
    return await this.collection.find({ subtopicId }).toArray()
  }

  async getQuestion(questionId: string) {
    return (await this.collection.findOne({ uuid: questionId }).then((result) => result)) ?? ({} as Question)
  }
}
