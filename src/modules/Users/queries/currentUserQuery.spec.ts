import td from 'testdouble'
import { GqlContext, testCurrentUser } from '~generated/graphql/helpers/currentUserQuerySpecWrapper'

test('currentUser', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.usersRepository.findOne()).thenResolve()

  // const result = await testCurrentUser( context);
})
