import { ActivityResolvers, Student } from '~generated/graphql/types'

export const ActivityCompletionPercentage: ActivityResolvers['completionPercentage'] = async (parent, args, context) => {
  const students: Array<Student> = await context.dataSources.studentApi.getStudents()

  const numberOfStudentCompletedActivity = students.reduce((acc, student) => {
    const activity = student.activities.find((activity) => activity.uuid === parent.uuid)
    if (activity && activity.isCompleted) {
      return acc + 1
    }
    return acc
  }, 0)

  return Number((numberOfStudentCompletedActivity / students.length) * 100)
}
