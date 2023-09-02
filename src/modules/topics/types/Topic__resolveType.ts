import { TopicResolvers, TopicType } from '~generated/graphql/types'

// eslint-disable-next-line camelcase
export const Topic__resolveType: TopicResolvers['__resolveType'] = (parent, context) => {
  if (parent.type === TopicType.MainTopic) return 'MainTopic'
  return 'Subtopic'
}
