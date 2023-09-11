import { MongoDataSource } from 'apollo-datasource-mongodb'
import { Student } from '~generated/graphql/types'
import { IStudent } from '~app/models/student.model'

export class StudentAPI extends MongoDataSource<IStudent> {
  async getStudents(): Promise<Array<Student>> {
    return await this.collection.find({}).toArray()
  }
}
