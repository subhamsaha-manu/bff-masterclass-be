import express from 'express'
import { client } from '~app/database/connect'
import { buildRequestContext, graphqlRoute } from '~app/core/routes/graphql-route'
import cors from 'cors'
import { schema } from '~generated/graphql/schema'
import { ApolloServer } from 'apollo-server-express'
import { dataSources } from '~app/dataSources'
import { logger } from './winston.config'

const app = express()
const router = express.Router()
const PORT = process.env.PORT || 4000

const getConfig = () => {
  return process.env.DEV_ENV
    ? {
        path: process.env.DEV_ENV ? `.env.${process.env.DEV_ENV}` : '.env'
      }
    : {}
}

if (process.env.LOCAL_MACHINE === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const parsed = require('dotenv').config(getConfig())
  if (parsed.error) {
    // eslint-disable-next-line no-console
    logger.error('Either .env file is missing or there are issues in the configuration')
    // eslint-disable-next-line no-console
    logger.error(parsed.error)
  }
}

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: false
}

app.use(cors(corsOptions))
app.get('/', (req, res) => {
  logger.info('Here at / mapping')
  res.send('GET request to the homepage')
})

app.use('/', router)
app.use('/graphql', graphqlRoute)

const createApolloServer = async () => {
  const apolloServer = new ApolloServer({
    schema,
    dataSources: () => ({ ...dataSources(client) }),
    context: buildRequestContext,
    introspection: true,
    playground: true
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
}

createApolloServer()
client
  .connect()
  .then(() => {
    app.listen({ port: PORT }, () => {
      logger.info('NODE_ENV set to:', process.env.NODE_ENV)
      logger.info('Your Apollo Server is running on port ', PORT)
    })
  })
  .catch((err: Error) => {
    logger.error('Error while connecting to MongoDB', err)
  })
