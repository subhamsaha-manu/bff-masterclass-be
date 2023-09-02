import td from 'testdouble'
import { GqlContext, QueryIsChallengeActiveArgs, testIsChallengeActive } from '~generated/graphql/helpers/isChallengeActiveQuerySpecWrapper'

test('isChallengeActive', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.challengeRepository.findOne()).thenResolve()

  // const variables: QueryIsChallengeActiveArgs = {}

  // const result = await testIsChallengeActive(variables, context);
})
