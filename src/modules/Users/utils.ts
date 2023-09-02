import jwt from 'jsonwebtoken'

export const APP_SECRET = 'BIRTHDAY_REMINDER'

const getTokenPayload = (token: string) => {
  try {
    return jwt.verify(token, APP_SECRET)
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getUserUuidFromJWTToken = (accessToken: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { userUuid } = getTokenPayload(accessToken)
    return userUuid
  } catch (err) {
    throw new Error(err.message)
  }
}
export type UserInput = {
  name: string
  email: string
  password: string
  mobileNumber?: string | undefined | null
}

export type UpdateUserInput = {
  mobileNumber: string
}
