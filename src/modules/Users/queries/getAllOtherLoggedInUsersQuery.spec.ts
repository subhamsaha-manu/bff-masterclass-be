import td from 'testdouble'
import { GqlContext, testGetAllOtherLoggedInUsers } from '~generated/graphql/helpers/getAllOtherLoggedInUsersQuerySpecWrapper'

test('getAllOtherLoggedInUsers', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.usersRepository.findOne()).thenResolve()

  // const result = await testGetAllOtherLoggedInUsers( context);
})
