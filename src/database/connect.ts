import { MongoClient } from 'mongodb'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

export const client = new MongoClient(`${MONGODB_URI}`)
