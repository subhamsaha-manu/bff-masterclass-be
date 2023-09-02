import { MutationResolvers } from '~generated/graphql/types'

export const updateUserMutation: MutationResolvers['updateUser'] = (_, args, context) => {
  return context.dataSources.userApi.updateUser(args.input)
}
