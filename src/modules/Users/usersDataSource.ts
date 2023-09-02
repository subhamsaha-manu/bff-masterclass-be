import { MongoDataSource } from 'apollo-datasource-mongodb'
import { IUser } from '~app/models/user.model'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { APP_SECRET, UpdateUserInput, UserInput } from './utils'
import { v4 as uuidv4 } from 'uuid'
import { isEmpty, isNil, random } from 'lodash'
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

  async signupUser(args: UserInput) {
    const { name, email, password, mobileNumber } = args
    const encryptedPassword = await bcrypt.hash(password, 10)
    logger.info(`UserAPI.signupUser: name: ${name} email: ${email}`)
    const users = await this.collection.find({ email }).toArray()

    console.info('users:', users)

    if (!isEmpty(users)) {
      return null
    }
    let token = ''
    let code = 200
    let message = 'User signup success'
    const userUuid = uuidv4()
    try {
      const insertDocument = {
        uuid: userUuid,
        name,
        email,
        password: encryptedPassword,
        mobileNumber: mobileNumber ?? undefined,
        friends: [],
        isLoggedIn: true,
        stars: 0,
        score: 0
      }
      await this.collection
        .insertOne(insertDocument)
        .then(() => {
          token = jwt.sign({ userUuid: userUuid }, APP_SECRET)
        })
        .catch((err) => {
          logger.info(`Document insert error,UserAPI.signupUser, name:${name} email:${email} ${err}`)
          code = 500
          message = err.message
        })
    } catch (err) {
      logger.info(`Ran into an error,UserAPI.signupUser, name:${name} email:${email} ${err}`)
      code = 500
      message = err.message
    }
    logger.info(`Signup successful for ${email}`)
    return {
      token,
      uuid: userUuid,
      code,
      message
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

  async updateUser(args: UpdateUserInput) {
    const userUuid = this.context.userUuid

    if (!isNil(userUuid)) {
      const updatedUser = await this.collection.findOneAndUpdate(
        { uuid: userUuid },
        { $set: { mobileNumber: args.mobileNumber } },
        { returnDocument: 'after' }
      )
      return updatedUser.value
    }
    return null
  }

  async anotherLoggedInUser() {
    const userUuid = this.context.userUuid

    if (!isNil(userUuid)) {
      const usersList = await this.collection.find({ uuid: { $not: { $eq: userUuid } }, isLoggedIn: true }).toArray()

      if (isEmpty(usersList)) {
        return null
      }

      if (usersList.length === 1) {
        return usersList[0]
      }

      const randomNumber = random(0, usersList.length - 1, false)

      return usersList[randomNumber]
    }
    return null
  }

  async getAllOtherLoggedInUsers() {
    const userUuid = this.context.userUuid

    if (!isNil(userUuid)) {
      const usersList = await this.collection.find({ uuid: { $not: { $eq: userUuid } }, isLoggedIn: true }).toArray()

      if (isEmpty(usersList)) {
        return []
      }

      return usersList
    }
    return []
  }

  async logout() {
    const userUuid = this.context.userUuid

    try {
      await this.collection.updateOne({ uuid: userUuid }, { $set: { isLoggedIn: false } })
    } catch (err) {
      logger.info(`Ran into an error,UserAPI.logout`)
      return false
    }
    return true
  }

  async getUserInfo(userUuid: string) {
    return await this.collection.findOne({ uuid: userUuid })
  }
}
