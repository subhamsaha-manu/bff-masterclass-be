import { MutationResolvers } from '~generated/graphql/types'

export const lockUnlockActivityMutation: MutationResolvers['lockUnlockActivity'] = (parent, args, context) => {
  const { studentId, activityId, status } = args.lockUnlockActivityInput

  return context.dataSources.studentApi.lockUnlockActivity(studentId, activityId, status)
}
