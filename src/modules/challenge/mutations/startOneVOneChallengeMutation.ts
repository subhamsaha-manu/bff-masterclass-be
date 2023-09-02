import { MutationResolvers } from '~generated/graphql/types'

export const startOneVOneChallengeMutation: MutationResolvers['startOneVOneChallenge'] = (parent, args, context) => {
  return context.dataSources.challengeAPI.startOneVOneChallenge(args.input)
}
