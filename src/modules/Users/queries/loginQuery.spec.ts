import td from 'testdouble'
import { GqlContext, QueryLoginArgs, testLogin } from '~generated/graphql/helpers/loginQuerySpecWrapper'

test('login', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.usersRepository.findOne()).thenResolve()

  // const variables: QueryLoginArgs = {}

  // const result = await testLogin(variables, context);
})
