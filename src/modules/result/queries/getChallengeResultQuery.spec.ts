import td from 'testdouble'
import {
  GqlContext,
  QueryGetChallengeResultArgs,
  testGetChallengeResult
} from '~generated/graphql/helpers/getChallengeResultQuerySpecWrapper'

test('getChallengeResult', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.resultRepository.findOne()).thenResolve()

  // const variables: QueryGetChallengeResultArgs = {}

  // const result = await testGetChallengeResult(variables, context);
})
