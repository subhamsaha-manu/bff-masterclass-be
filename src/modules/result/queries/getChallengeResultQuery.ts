import { QueryResolvers } from '~generated/graphql/types'

export const getChallengeResultQuery: QueryResolvers['getChallengeResult'] = (parent, args, context) => {
  return context.dataSources.resultAPI.getChallengeResult(args.challengeId)
}
