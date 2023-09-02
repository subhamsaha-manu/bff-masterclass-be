import td from 'testdouble'

import { GqlContext, MutationUpdateChallengeArgs, testUpdateChallenge } from '~generated/graphql/helpers/updateChallengeMutationSpecWrapper'

test('updateChallenge', async () => {
  const context = td.object<GqlContext>()
  // td.when(context.challengeRepository.findOne()).thenResolve()
  // const variables: MutationUpdateChallengeArgs = {}

  // const result = await testUpdateChallenge(variables, context);
})
