import td from 'testdouble'

import {
  GqlContext,
  MutationStartOneVOneChallengeArgs,
  testStartOneVOneChallenge
} from '~generated/graphql/helpers/startOneVOneChallengeMutationSpecWrapper'

test('startOneVOneChallenge', async () => {
  const context = td.object<GqlContext>()
  // td.when(context.challengeRepository.findOne()).thenResolve()
  // const variables: MutationStartOneVOneChallengeArgs = {}

  // const result = await testStartOneVOneChallenge(variables, context);
})
