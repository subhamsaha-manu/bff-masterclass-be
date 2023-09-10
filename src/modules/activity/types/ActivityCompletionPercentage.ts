import { ActivityResolvers } from '~generated/graphql/types'

export const ActivityCompletionPercentage: ActivityResolvers['completionPercentage'] = (parent, args, context) => {
  return Number('100')
}
