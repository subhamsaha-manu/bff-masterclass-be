import { createDefaultTestData } from '~app/mocks/createDefaultTestData'
import { ActivityStatus, Student, StudentActivity } from '~generated/graphql/types'

const studentActivity = createDefaultTestData<StudentActivity>(() => ({
  uuid: 'activityId-1',
  status: ActivityStatus.Completed
}))
export const aStudent = createDefaultTestData<Student>(() => ({
  uuid: 'studentId-1',
  name: 'S01',
  activities: [studentActivity(), studentActivity({ uuid: 'activityId-2', status: ActivityStatus.Completed })],
  __typename: 'Student'
}))
