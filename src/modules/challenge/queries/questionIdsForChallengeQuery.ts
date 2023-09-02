import { QueryResolvers } from '~generated/graphql/types'

export const questionIdsForChallengeQuery: QueryResolvers['questionIdsForChallenge'] = (parent, args, context) => {
  return context.dataSources.challengeAPI.getQuestionIds(args.challengeId)
}
