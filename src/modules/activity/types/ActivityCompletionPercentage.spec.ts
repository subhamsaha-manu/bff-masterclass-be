import td from 'testdouble'
import {
  GqlContext,
  ParentType,
  testActivityCompletionPercentage
} from '~generated/graphql/helpers/ActivityCompletionPercentageSpecWrapper'

test('ActivityCompletionPercentage', async () => {
  const context = td.object<GqlContext>()
  // td.when(context.activityRepository.findOne()).thenResolve()
  // const parent: ParentType = {}

  // const result = await testActivityCompletionPercentage(parent,  context);
})
