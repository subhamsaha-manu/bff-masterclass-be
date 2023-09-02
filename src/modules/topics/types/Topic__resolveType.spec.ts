import td from 'testdouble'
import { GqlContext, ParentType, testTopic__resolveType } from '~generated/graphql/helpers/Topic__resolveTypeSpecWrapper'

test('Topic__resolveType', async () => {
  const context = td.object<GqlContext>()
  // td.when(context.topicsRepository.findOne()).thenResolve()
  // const parent: ParentType = {}

  // const result = await testTopic__resolveType(parent,  context);
})
