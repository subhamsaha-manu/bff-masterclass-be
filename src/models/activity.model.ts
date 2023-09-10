import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface IActivity {
  uuid: string
  name: string
  description: string
  completionPercentage: number
  classId: string
}

const activitySchema = new Schema<IActivity>({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  completionPercentage: { type: Number, required: true },
  classId: { type: String, required: true }
})

export default mongoose.model<IActivity>('Activity', activitySchema)
