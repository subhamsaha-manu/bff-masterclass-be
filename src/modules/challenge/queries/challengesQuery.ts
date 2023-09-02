import { QueryResolvers } from '~generated/graphql/types'

export const challengesQuery: QueryResolvers['challenges'] = (parent, args, context) => {
  return context.dataSources.challengeAPI.getChallenges()
}
