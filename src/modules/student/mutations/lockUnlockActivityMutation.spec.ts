import td from 'testdouble'

import {
  GqlContext,
  MutationLockUnlockActivityArgs,
  testLockUnlockActivity
} from '~generated/graphql/helpers/lockUnlockActivityMutationSpecWrapper'

test('lockUnlockActivity', async () => {
  const context = td.object<GqlContext>()
  // td.when(context.studentRepository.findOne()).thenResolve()
  // const variables: MutationLockUnlockActivityArgs = {}

  // const result = await testLockUnlockActivity(variables, context);
})
