import { MutationResolvers } from '~generated/graphql/types'

export const signupMutation: MutationResolvers['signup'] = (_, args, context) => {
  return context.dataSources.userApi.signupUser(args.input)
}
