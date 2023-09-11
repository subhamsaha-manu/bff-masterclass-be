import td from 'testdouble'
import {
  GqlContext,
  ParentType,
  testActivityCompletionPercentage
} from '~generated/graphql/helpers/ActivityCompletionPercentageSpecWrapper'
import { aStudent } from '~app/modules/student/mocks/aStudent'
import { anActivity } from '~app/modules/activity/mocks/anActivity'

describe('ActivityCompletionPercentage', () => {
  test('should show 100% completion when both students have completed an activity', async () => {
    const context = td.object<GqlContext>()

    const studentOne = aStudent()
    const studentTwo = aStudent({ uuid: 'studentId-2', activities: [aStudent().activities[0]] })

    td.when(context.dataSources.studentApi.getStudents()).thenResolve([studentOne, studentTwo])

    const parent: ParentType = {
      ...anActivity(),
      uuid: 'activityId-1'
    }

    const result = await testActivityCompletionPercentage(parent, context)

    expect(result).toEqual(100)
  })

  test('should show 50% completion when one student has completed an activity', async () => {
    const context = td.object<GqlContext>()

    const studentOne = aStudent()
    const studentTwo = aStudent({ uuid: 'studentId-2', activities: [aStudent().activities[0]] })

    td.when(context.dataSources.studentApi.getStudents()).thenResolve([studentOne, studentTwo])

    const parent: ParentType = {
      ...anActivity(),
      uuid: 'activityId-2'
    }

    const result = await testActivityCompletionPercentage(parent, context)

    expect(result).toEqual(50)
  })
})
