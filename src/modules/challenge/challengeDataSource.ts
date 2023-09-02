import { MongoDataSource } from 'apollo-datasource-mongodb'
import { client } from '~app/database/connect'
import { Challenge } from '~app/models/challenge.model'
import { ChallengeStatus, ChallengeType, SendChallengeInput, StartOneVOneChallengeInput } from '~generated/graphql/types'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../../../winston.config'
import { setChallengeData } from '~app/util/sendEvent'

export class ChallengeAPI extends MongoDataSource<Challenge> {
  async getChallenges() {
    const userUuid = this.context.userUuid

    return await this.collection.find({ userUuid }).toArray()
  }

  async addChallenge(inputArgs: SendChallengeInput) {
    const { name, email, questionIds } = inputArgs
    const senderUserUuid = this.context.userUuid

    try {
      const toUserUuid = await client
        .db('quiz-db')
        .collection('users')
        .findOne({ name, email })
        .then((data) => {
          if (data) {
            return data.uuid
          }
        })

      if (!toUserUuid) {
        return false
      }

      const insertDocumentForSenderUser = {
        uuid: uuidv4(),
        userUuid: senderUserUuid,
        questionIds,
        title: 'Challenge-1',
        type: ChallengeType.Sent,
        status: ChallengeStatus.Pending
      }

      const insertDocumentForReceiverUser = {
        uuid: uuidv4(),
        userUuid: toUserUuid,
        questionIds,
        title: 'Challenge-1',
        type: ChallengeType.Received,
        status: ChallengeStatus.Pending
      }

      await this.collection.insertMany([insertDocumentForSenderUser, insertDocumentForReceiverUser])
    } catch (err) {
      logger.info(`Ran into an error,ChallengeAPI.addChallenge`)
      return false
    }
    return true
  }

  async getQuestionIds(challengeId: string) {
    return await this.collection.findOne({ uuid: challengeId }).then((result) => {
      return result?.questionIds ?? []
    })
  }

  async updateChallenge(challengeId: string, status: ChallengeStatus) {
    const userUuid = this.context.userUuid
    try {
      await this.collection.updateOne({ uuid: challengeId, userUuid }, { $set: { status } })
    } catch (err) {
      logger.info(`Ran into an error,ChallengeAPI.updateChallenge`)
      return false
    }
    return true
  }

  async startOneVOneChallenge(args: StartOneVOneChallengeInput) {
    const senderUserUuid = this.context.userUuid
    const { toUserUuid } = args

    const newChallengeUUID = uuidv4()
    try {
      const questionIds = await client
        .db('quiz-db')
        .collection('questions')
        .find({})
        .toArray()
        .then((data) => {
          return data.map((data) => data.uuid)
        })

      const challengeCount = await this.collection.find({}).toArray()

      const insertDocForUserOne = {
        uuid: newChallengeUUID,
        userUuid: senderUserUuid,
        questionIds,
        title: `Challenge-${challengeCount.length + 1}`,
        type: ChallengeType.OneVOne,
        status: ChallengeStatus.Pending
      }

      const insertDocForUserTwo = {
        uuid: newChallengeUUID,
        userUuid: toUserUuid,
        questionIds,
        title: `Challenge-${challengeCount.length + 2}`,
        type: ChallengeType.OneVOne,
        status: ChallengeStatus.Pending
      }

      await this.collection.insertMany([insertDocForUserOne, insertDocForUserTwo]).then(() => {
        setChallengeData({
          senderUserUuid,
          toUserUuid,
          challengeId: newChallengeUUID
        })
      })
    } catch (err) {
      logger.info(`Ran into an error,ChallengeAPI.startOneVOneChallenge`)
      return null
    }
    return newChallengeUUID
  }

  async isChallengeActive(challengeId: string) {
    const userUuid = this.context.userUuid
    const challenge = await this.collection.findOne({ uuid: challengeId, userUuid })
    if (challenge) {
      return [ChallengeStatus.Started, ChallengeStatus.Pending].includes(challenge.status)
    }
    return false
  }

  async isChallengeAccepted(challengeId: string, challengedUserUuid: string) {
    const challenge = await this.collection.findOne({ uuid: challengeId, userUuid: challengedUserUuid })

    if (challenge) {
      return challenge.status
    }
    return ChallengeStatus.Pending
  }
}
