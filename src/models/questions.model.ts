import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

type Choice = {
  uuid: string
  title: string
  isCorrect: boolean
}

export type Question = {
  uuid: string
  title: string
  choices: Array<Choice>
  weight: number
}

const choiceSchema = new Schema<Choice>({
  uuid: { type: String, required: true },
  title: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
})

const questionsSchema = new Schema<Question>({
  uuid: { type: String, required: true },
  title: { type: String, required: true },
  choices: { type: [choiceSchema], required: true },
  weight: { type: Number, required: true }
})

export default mongoose.model('Question', questionsSchema)
