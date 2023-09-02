import { QueryResolvers } from '~generated/graphql/types'

export const getAnotherLoggedInUserQuery: QueryResolvers['getAnotherLoggedInUser'] = (parent, args, context) => {
  return context.dataSources.userApi.anotherLoggedInUser()
}
