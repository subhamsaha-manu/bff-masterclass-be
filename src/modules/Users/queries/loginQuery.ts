import { QueryResolvers } from '~generated/graphql/types'

export const loginQuery: QueryResolvers['login'] = (_, args, context) => {
  return context.dataSources.userApi.loginUser(args.input.email, args.input.password)
}
