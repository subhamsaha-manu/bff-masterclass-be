import { MutationResolvers } from '~generated/graphql/types'

export const saveResultMutation: MutationResolvers['saveResult'] = (parent, args, context) => {
  return context.dataSources.resultAPI.saveResult(args.saveResultInput)
}
