import td from 'testdouble'
import { GqlContext, testMainTopics } from '~generated/graphql/helpers/mainTopicsQuerySpecWrapper'

test('mainTopics', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.topicsRepository.findOne()).thenResolve()

  // const result = await testMainTopics( context);
})
