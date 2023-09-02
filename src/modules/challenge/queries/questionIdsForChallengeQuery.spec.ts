import td from 'testdouble'
import {
  GqlContext,
  QueryQuestionIdsForChallengeArgs,
  testQuestionIdsForChallenge
} from '~generated/graphql/helpers/questionIdsForChallengeQuerySpecWrapper'

test('questionIdsForChallenge', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.challengeRepository.findOne()).thenResolve()

  // const variables: QueryQuestionIdsForChallengeArgs = {}

  // const result = await testQuestionIdsForChallenge(variables, context);
})
