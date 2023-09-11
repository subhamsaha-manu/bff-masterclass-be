import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ActivityStatus, Student } from '~generated/graphql/types'
import { IStudent } from '~app/models/student.model'

export class StudentAPI extends MongoDataSource<IStudent> {
  async getStudents(): Promise<Array<Student>> {
    const students = await this.collection.find({}).toArray()

    return students.map((student) => ({
      ...student,
      activities: student.activities.map((activity) => ({
        ...activity,
        status: (activity.status as unknown) as ActivityStatus
      }))
    }))
  }

  async lockUnlockActivity(studentId: string, activityId: string, status: ActivityStatus): Promise<boolean> {
    try {
      const student = await this.collection.findOne({ uuid: studentId })

      if (!student) {
        return false
      }

      const updatedActivities = student.activities.map((activity) => {
        if (activity.uuid === activityId) {
          // Update the status of the existing activity
          return {
            ...activity,
            status: status
          }
        }
        return activity
      })

      // If the activity with activityId doesn't exist, add a new one
      if (!student.activities.some((activity) => activity.uuid === activityId)) {
        updatedActivities.push({
          uuid: activityId,
          status: status
        })
      }

      await this.collection.updateOne({ uuid: studentId }, { $set: { activities: updatedActivities } })

      return true
    } catch (error) {
      // Handle any potential errors here
      console.error(error)
      return false
    }
  }
}
