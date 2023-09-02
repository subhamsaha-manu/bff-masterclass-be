import td from 'testdouble'

import { GqlContext, MutationUpdateUserArgs, testUpdateUser } from '~generated/graphql/helpers/updateUserMutationSpecWrapper'

test('updateUser', async () => {
  const context = td.object<GqlContext>()
  // td.when(context.usersRepository.findOne()).thenResolve()
  // const variables: MutationUpdateUserArgs = {}

  // const result = await testUpdateUser(variables, context);
})
