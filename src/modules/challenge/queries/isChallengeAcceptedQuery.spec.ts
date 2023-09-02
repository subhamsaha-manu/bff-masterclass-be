import td from 'testdouble'
import {
  GqlContext,
  QueryIsChallengeAcceptedArgs,
  testIsChallengeAccepted
} from '~generated/graphql/helpers/isChallengeAcceptedQuerySpecWrapper'

test('isChallengeAccepted', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.challengeRepository.findOne()).thenResolve()

  // const variables: QueryIsChallengeAcceptedArgs = {}

  // const result = await testIsChallengeAccepted(variables, context);
})
