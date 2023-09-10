import { MongoDataSource } from 'apollo-datasource-mongodb'
import { IUser } from '~app/models/user.model'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './utils'
import { isNil } from 'lodash'
import { logger } from '../../../winston.config'

export class UserAPI extends MongoDataSource<IUser> {
  async loginUser(email: string, password: string) {
    logger.info(`UserAPI.loginUser: email: ${email}`)
    const user = await this.collection.findOne({ email })

    if (!user) {
      logger.info(`No user found for ${email}`)
      return {
        token: '',
        uuid: '',
        code: 500,
        message: 'User not found',
        name: undefined
      }
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      logger.info(`The password is not valid for ${email}`)
      return {
        token: '',
        uuid: '',
        code: 500,
        message: 'Invalid password',
        name: undefined
      }
    }

    const token = jwt.sign({ userUuid: user.uuid }, APP_SECRET)
    logger.info(`Login successful for ${email}`)

    await this.collection.updateOne({ uuid: user.uuid }, { $set: { isLoggedIn: true } })
    return {
      token,
      uuid: user.uuid,
      code: 200,
      message: 'Login successful',
      name: user.name
    }
  }

  async getCurrentUser() {
    const userUuid = this.context.userUuid

    if (!isNil(userUuid)) {
      const user = await this.collection.findOne({ uuid: userUuid })
      if (isNil(user)) {
        logger.info(`No user found for ${userUuid}`)
        return null
      }
      logger.info(`Current logged in user uuid ${userUuid}`)
      return user
    }
    return null
  }
}
