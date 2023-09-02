import mongoose, { Schema } from 'mongoose'

export type Result = {
  uuid: string
  challengeId: string
  userUuid: string
  score: number
  remainingTime: number
}

const resultSchema = new Schema<Result>({
  uuid: { type: String, required: true },
  challengeId: { type: String, required: true },
  userUuid: { type: String, required: true },
  score: { type: Number, required: true },
  remainingTime: { type: Number, required: true }
})

export default mongoose.model<Result>('Result', resultSchema)
