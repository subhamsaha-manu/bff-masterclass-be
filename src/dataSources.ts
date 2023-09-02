import { UserAPI } from '~app/modules/Users/usersDataSource'
import { MongoClient } from 'mongodb'
import { MainTopicAPI } from './modules/topics/mainTopicsDataSource'
import { SubTopicAPI } from '~app/modules/topics/subTopicsDataSource'
import { QuestionAPI } from '~app/modules/questions/questionsDataSource'
import { ChallengeAPI } from '~app/modules/challenge/challengeDataSource'
import { ResultAPI } from '~app/modules/result/resultDataSource'

export const dataSources = (client: MongoClient) => ({
  userApi: new UserAPI(client.db('quiz-db').collection('users')),
  mainTopicsAPI: new MainTopicAPI(client.db('quiz-db').collection('main-topics')),
  subTopicsAPI: new SubTopicAPI(client.db('quiz-db').collection('sub-topics')),
  questionsAPI: new QuestionAPI(client.db('quiz-db').collection('questions')),
  challengeAPI: new ChallengeAPI(client.db('quiz-db').collection('challenges')),
  resultAPI: new ResultAPI(client.db('quiz-db').collection('results'))
})
