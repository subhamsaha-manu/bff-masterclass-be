import { MutationResolvers } from '~generated/graphql/types'

export const updateChallengeMutation: MutationResolvers['updateChallenge'] = (parent, args, context) => {
  return context.dataSources.challengeAPI.updateChallenge(args.challengeId, args.status)
}
