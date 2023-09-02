import td from 'testdouble'

import { GqlContext, MutationSignupArgs, testSignup } from '~generated/graphql/helpers/signupMutationSpecWrapper'

test('signup', async () => {
  const context = td.object<GqlContext>()
  // td.when(context.usersRepository.findOne()).thenResolve()
  // const variables: MutationSignupArgs = {}

  // const result = await testSignup(variables, context);
})
