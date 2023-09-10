import { createDefaultTestData } from '~app/mocks/createDefaultTestData'
import { Activity } from '~generated/graphql/types'

export const anActivity = createDefaultTestData<Activity>(() => ({
  uuid: 'activityId-1',
  name: 'Activity Name',
  description: 'Activity Description',
  completionPercentage: 100,
  classId: 'classId',
  __typename: 'Activity'
}))
