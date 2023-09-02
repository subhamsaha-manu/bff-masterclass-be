import { Result } from '~app/models/result.model'
import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ChallengeStatus, OutcomeType, SaveResultInput } from '~generated/graphql/types'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../../../winston.config'
import { client } from '~app/database/connect'

export class ResultAPI extends MongoDataSource<Result> {
  async saveResult(args: SaveResultInput) {
    const { challengeId, totalScore, totalRemainingTime } = args
    const userUuid = this.context.userUuid

    try {
      const insertDocument = {
        uuid: uuidv4(),
        challengeId,
        userUuid,
        score: totalScore,
        remainingTime: totalRemainingTime
      }

      await this.collection.insertOne(insertDocument)
    } catch (err) {
      logger.info(`Ran into an error,ResultAPI.saveResult`)
      return false
    }
    return true
  }

  async getChallengeResult(challengeId: string) {
    const loggedInUserUuid = await this.context.userUuid

    const challengesForId = await client.db('quiz-db').collection('challenges').find({ uuid: challengeId }).toArray()

    const isEitherChallengeCancelled = challengesForId.some((challenge) => challenge.status === ChallengeStatus.Cancelled)

    if (isEitherChallengeCancelled) {
      const result = await this.collection.findOne({ challengeId, userUuid: loggedInUserUuid })
      if (result) {
        return {
          score: result.score,
          outcome: OutcomeType.Win,
          basedOnTime: false
        }
      } else {
        return null
      }
    }

    const results = await this.collection.find({ challengeId }).toArray()

    if (results.length === 2) {
      const resultOne = results[0]
      const resultTwo = results[1]

      if (resultOne && resultTwo) {
        if (resultOne.score > resultTwo.score) {
          if (resultOne.userUuid === loggedInUserUuid) {
            console.info('Logged in user has won - 1')
            await this.updateUserScoreAndStar(loggedInUserUuid, true)
            return {
              score: resultOne.score,
              outcome: OutcomeType.Win,
              basedOnTime: false
            }
          } else if (resultTwo.userUuid === loggedInUserUuid) {
            console.info('Logged in user has lost - 1')
            await this.updateUserScoreAndStar(loggedInUserUuid, false)
            return {
              score: resultTwo.score,
              outcome: OutcomeType.Lost,
              basedOnTime: false
            }
          }
        } else if (resultTwo.score > resultOne.score) {
          if (resultTwo.userUuid === loggedInUserUuid) {
            console.info('Logged in user has has won - 2')
            await this.updateUserScoreAndStar(loggedInUserUuid, true)
            return {
              score: resultTwo.score,
              outcome: OutcomeType.Win,
              basedOnTime: false
            }
          } else if (resultOne.userUuid === loggedInUserUuid) {
            await this.updateUserScoreAndStar(loggedInUserUuid, false)
            console.info('Logged in user has lost - 2')
            return {
              score: resultOne.score,
              outcome: OutcomeType.Lost,
              basedOnTime: false
            }
          }
        } else {
          if (resultOne.remainingTime < resultTwo.remainingTime) {
            if (resultOne.userUuid === loggedInUserUuid) {
              console.info('Logged in user has won - 3')
              await this.updateUserScoreAndStar(loggedInUserUuid, true)
              return {
                score: resultOne.score,
                outcome: OutcomeType.Win,
                basedOnTime: true
              }
            } else if (resultTwo.userUuid === loggedInUserUuid) {
              console.info('Logged in user has lost - 3')
              await this.updateUserScoreAndStar(loggedInUserUuid, false)
              return {
                score: resultTwo.score,
                outcome: OutcomeType.Lost,
                basedOnTime: true
              }
            }
          } else if (resultTwo.remainingTime < resultOne.remainingTime) {
            if (resultTwo.userUuid === loggedInUserUuid) {
              console.info('Logged in user has has won - 4')
              await this.updateUserScoreAndStar(loggedInUserUuid, true)
              return {
                score: resultTwo.score,
                outcome: OutcomeType.Win,
                basedOnTime: true
              }
            } else if (resultOne.userUuid === loggedInUserUuid) {
              console.info('Logged in user has lost - 4')
              await this.updateUserScoreAndStar(loggedInUserUuid, false)
              return {
                score: resultOne.score,
                outcome: OutcomeType.Lost,
                basedOnTime: true
              }
            }
          } else {
            console.info('Draw')
            return {
              score: resultOne.score,
              outcome: OutcomeType.Draw,
              basedOnTime: false
            }
          }
        }
      }
    }
    return null
  }

  updateUserScoreAndStar = async (userUuid: string, isWinner: boolean) => {
    const user = await client.db('quiz-db').collection('users').findOne()
    let updatedScore = 0
    let updatedStars = 0
    if (user) {
      const currentScore = user.score
      const currentStars = user.stars

      if (isWinner) {
        updatedScore = currentScore + 10
        updatedStars = currentStars + 1
      } else {
        updatedScore = currentScore - 10
        updatedStars = currentStars - 1
      }

      try {
        await client
          .db('quiz-db')
          .collection('users')
          .updateOne(
            { uuid: userUuid },
            {
              $set: {
                score: updatedScore,
                stars: updatedStars
              }
            }
          )
      } catch (err) {
        logger.info(`Ran into an error,ResultAPI.updateUserScoreAndStar`)
      }
    }
  }
}
