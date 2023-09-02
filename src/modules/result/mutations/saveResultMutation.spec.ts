import td from 'testdouble'

import { GqlContext, MutationSaveResultArgs, testSaveResult } from '~generated/graphql/helpers/saveResultMutationSpecWrapper'

test('saveResult', async () => {
  const context = td.object<GqlContext>()
  // td.when(context.scoreRepository.findOne()).thenResolve()
  // const variables: MutationSaveResultArgs = {}

  // const result = await testSaveResult(variables, context);
})
