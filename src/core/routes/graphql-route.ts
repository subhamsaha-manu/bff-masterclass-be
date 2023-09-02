import { Request } from 'express-serve-static-core'
import { getUserUuidFromJWTToken } from '~app/modules/Users/utils'
import express from 'express'

type RequestContext = {
  userUuid: string | null
}
export const graphqlRoute = express.Router()

type buildRequestContextType = ({ req }: { req: Request }) => RequestContext

export const buildRequestContext: buildRequestContextType = ({ req }) => {
  let userUuid = ''
  if (req.headers.authorization && req.headers.authorization.indexOf('null') < 0) {
    const accessToken = req.headers.authorization.split(' ')[1]
    try {
      userUuid = getUserUuidFromJWTToken(accessToken)
    } catch (error) {
      throw new Error(error.message)
    }
  }
  return {
    userUuid
  }
}
