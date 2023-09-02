import td from 'testdouble'
import { GqlContext, QueryGetQuestionArgs, testGetQuestion } from '~generated/graphql/helpers/getQuestionQuerySpecWrapper'

test('getQuestion', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.questionsRepository.findOne()).thenResolve()

  // const variables: QueryGetQuestionArgs = {}

  // const result = await testGetQuestion(variables, context);
})
