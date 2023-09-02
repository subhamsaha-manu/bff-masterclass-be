import td from 'testdouble'
import { GqlContext, testGetAnotherLoggedInUser } from '~generated/graphql/helpers/getAnotherLoggedInUserQuerySpecWrapper'

test('getAnotherLoggedInUser', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.usersRepository.findOne()).thenResolve()

  // const result = await testGetAnotherLoggedInUser( context);
})
