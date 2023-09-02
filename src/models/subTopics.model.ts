import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { ITopic } from './mainTopics.model'

enum DifficultyLevel {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD'
}

export type SubTopic = ITopic & {
  topicId: string
  difficulty: DifficultyLevel
  description: string
}

const subTopicSchema = new Schema<SubTopic>({
  uuid: { type: String, required: true },
  type: { type: String, required: true },
  topicId: { type: String, required: true },
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  description: { type: String, required: true }
})

export default mongoose.model<SubTopic>('SubTopic', subTopicSchema)
