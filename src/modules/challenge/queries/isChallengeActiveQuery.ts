import { QueryResolvers } from '~generated/graphql/types'

export const isChallengeActiveQuery: QueryResolvers['isChallengeActive'] = (parent, args, context) => {
  return context.dataSources.challengeAPI.isChallengeActive(args.challengeId)
}
