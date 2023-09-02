import { MutationResolvers } from '~generated/graphql/types'

export const sendChallengeMutation: MutationResolvers['sendChallenge'] = (parent, args, context) => {
  return context.dataSources.challengeAPI.addChallenge(args.input)
}
