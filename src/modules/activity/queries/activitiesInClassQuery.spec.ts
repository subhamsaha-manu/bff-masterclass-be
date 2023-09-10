import td from 'testdouble'
import { GqlContext, QueryActivitiesInClassArgs, testActivitiesInClass } from '~generated/graphql/helpers/activitiesInClassQuerySpecWrapper'
import { anActivity } from '~app/modules/activity/mocks/anActivity'

test('activitiesInClass', async () => {
  const context = td.object<GqlContext>()

  const activities = [anActivity()]

  td.when(context.dataSources.activityApi.getActivitiesForAClass('classId')).thenResolve(activities)

  const variables: QueryActivitiesInClassArgs = {
    classId: 'classId'
  }

  const result = await testActivitiesInClass(variables, context)

  expect(result).toEqual(activities)
})
