import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface ITopic {
  uuid: string
  name: string
  type: string
}

export type MainTopic = ITopic & {
  description: string
}

const mainTopicSchema = new Schema<MainTopic>({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true }
})

export default mongoose.model<MainTopic>('MainTopic', mainTopicSchema)
