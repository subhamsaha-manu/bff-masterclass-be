import { QueryResolvers } from '~generated/graphql/types'

export const questionsQuery: QueryResolvers['questions'] = (parent, args, context) => {
  return context.dataSources.questionsAPI.getQuestions(args.subtopicId)
}
