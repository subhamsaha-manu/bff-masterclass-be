import { QueryResolvers } from '~generated/graphql/types'

export const subtopicsQuery: QueryResolvers['subtopics'] = (parent, args, context) => {
  return context.dataSources.subTopicsAPI.getSubtopics(args.topicId)
}
