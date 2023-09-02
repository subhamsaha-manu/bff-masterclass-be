import { QueryResolvers } from '~generated/graphql/types'

export const getAllOtherLoggedInUsersQuery: QueryResolvers['getAllOtherLoggedInUsers'] = (parent, args, context) => {
  return context.dataSources.userApi.getAllOtherLoggedInUsers()
}
