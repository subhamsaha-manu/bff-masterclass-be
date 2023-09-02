import td from 'testdouble'
import { GqlContext, QuerySubtopicsArgs, testSubtopics } from '~generated/graphql/helpers/subtopicsQuerySpecWrapper'

test('subtopics', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.topicsRepository.findOne()).thenResolve()

  // const variables: QuerySubtopicsArgs = {}

  // const result = await testSubtopics(variables, context);
})
