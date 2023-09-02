import td from 'testdouble'
import { GqlContext, testChallenges } from '~generated/graphql/helpers/challengesQuerySpecWrapper'

test('challenges', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.challengeRepository.findOne()).thenResolve()

  // const result = await testChallenges( context);
})
