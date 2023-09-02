import td from 'testdouble'

import { GqlContext, MutationSendChallengeArgs, testSendChallenge } from '~generated/graphql/helpers/sendChallengeMutationSpecWrapper'

test('sendChallenge', async () => {
  const context = td.object<GqlContext>()
  // td.when(context.challengeRepository.findOne()).thenResolve()
  // const variables: MutationSendChallengeArgs = {}

  // const result = await testSendChallenge(variables, context);
})
