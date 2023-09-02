import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

enum ChallengeType {
  Sent = 'SENT',
  Received = 'RECEIVED',
  OneVOne = 'ONE-V-ONE'
}

enum ChallengeStatus {
  Started = 'STARTED',
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
  Pending = 'PENDING'
}

export type Challenge = {
  uuid: string
  userUuid: string
  questionIds: Array<string>
  title: string
  type: ChallengeType
  status: ChallengeStatus
}

const challengeSchema = new Schema<Challenge>({
  uuid: { type: String, required: true },
  userUuid: { type: String, required: true },
  questionIds: { type: [String], required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true }
})

export default mongoose.model<Challenge>('Challenge', challengeSchema)
