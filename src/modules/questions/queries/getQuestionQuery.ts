import { QueryResolvers } from '~generated/graphql/types'

export const getQuestionQuery: QueryResolvers['getQuestion'] = (parent, args, context) => {
  return context.dataSources.questionsAPI.getQuestion(args.questionId)
}
