import { QueryResolvers } from '~generated/graphql/types'

export const isChallengeAcceptedQuery: QueryResolvers['isChallengeAccepted'] = (parent, args, context) => {
  return context.dataSources.challengeAPI.isChallengeAccepted(args.challengeId, args.challengedUserUuid)
}
