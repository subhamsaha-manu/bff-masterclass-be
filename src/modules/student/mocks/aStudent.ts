import { createDefaultTestData } from '~app/mocks/createDefaultTestData'
import { Student, StudentActivity } from '~generated/graphql/types'

const studentActivity = createDefaultTestData<StudentActivity>(() => ({
  uuid: 'activityId-1',
  isCompleted: true
}))
export const aStudent = createDefaultTestData<Student>(() => ({
  uuid: 'studentId-1',
  name: 'S01',
  activities: [studentActivity(), studentActivity({ uuid: 'activityId-2', isCompleted: true })],
  __typename: 'Student'
}))
