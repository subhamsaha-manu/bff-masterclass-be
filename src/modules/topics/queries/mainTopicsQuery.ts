import { QueryResolvers } from '~generated/graphql/types'

export const mainTopicsQuery: QueryResolvers['mainTopics'] = (parent, args, context) => {
  return context.dataSources.mainTopicsAPI.getMainTopics()
}
