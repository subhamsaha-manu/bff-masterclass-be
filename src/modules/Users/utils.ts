import jwt from 'jsonwebtoken'

export const APP_SECRET = 'BFF_MASTERCLASS'

const getTokenPayload = (token: string) => {
  try {
    return jwt.verify(token, APP_SECRET)
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getUserUuidFromJWT = (accessToken: string) => {
  try {
    // eslint-disable-next-line
    // @ts-ignore
    const { userUuid } = getTokenPayload(accessToken)
    return userUuid
  } catch (err) {
    throw new Error(err.message)
  }
}
