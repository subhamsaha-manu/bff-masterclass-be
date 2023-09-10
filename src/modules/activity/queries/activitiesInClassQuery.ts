import { QueryResolvers } from '~generated/graphql/types'

export const activitiesInClassQuery: QueryResolvers['activitiesInClass'] = (parent, args, context) => {
  return context.dataSources.activityApi.getActivitiesForAClass(args.classId)
}
