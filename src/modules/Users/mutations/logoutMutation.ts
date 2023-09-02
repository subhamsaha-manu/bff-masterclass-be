import { MutationResolvers } from '~generated/graphql/types'

export const logoutMutation: MutationResolvers['logout'] = (parent, args, context) => {
  return context.dataSources.userApi.logout()
}
