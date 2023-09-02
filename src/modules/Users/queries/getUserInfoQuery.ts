import { QueryResolvers } from '~generated/graphql/types'

export const getUserInfoQuery: QueryResolvers['getUserInfo'] = (parent, args, context) => {
  return context.dataSources.userApi.getUserInfo(args.userId)
}
