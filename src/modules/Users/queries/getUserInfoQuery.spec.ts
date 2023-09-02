import td from 'testdouble'
import { GqlContext, QueryGetUserInfoArgs, testGetUserInfo } from '~generated/graphql/helpers/getUserInfoQuerySpecWrapper'

test('getUserInfo', async () => {
  const context = td.object<GqlContext>()

  // td.when(context.usersRepository.findOne()).thenResolve()

  // const variables: QueryGetUserInfoArgs = {}

  // const result = await testGetUserInfo(variables, context);
})
