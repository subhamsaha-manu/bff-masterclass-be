import td from 'testdouble'
import { GqlContext, QueryQuestionsArgs, testQuestions } from '~generated/graphql/helpers/questionsQuerySpecWrapper'

test('questions', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.questionsRepository.findOne()).thenResolve()

  // const variables: QueryQuestionsArgs = {}

  // const result = await testQuestions(variables, context);
})
