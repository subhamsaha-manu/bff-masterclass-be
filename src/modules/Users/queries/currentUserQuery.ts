import { QueryResolvers } from '~generated/graphql/types'

export const currentUserQuery: QueryResolvers['currentUser'] = (_, __, context) => {
  return context.dataSources.userApi.getCurrentUser()
}
