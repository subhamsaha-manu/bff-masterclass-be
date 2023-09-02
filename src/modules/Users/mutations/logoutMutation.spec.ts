import td from 'testdouble'

import { GqlContext, testLogout } from '~generated/graphql/helpers/logoutMutationSpecWrapper'

test('logout', async () => {
  const context = td.object<GqlContext>()
  // td.when(context.usersRepository.findOne()).thenResolve()

  // const result = await testLogout( context);
})
