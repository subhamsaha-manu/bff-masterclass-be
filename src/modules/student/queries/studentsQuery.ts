import { QueryResolvers } from '~generated/graphql/types'

export const studentsQuery: QueryResolvers['students'] = (parent, args, context) => {
  return context.dataSources.studentApi.getStudents()
}
