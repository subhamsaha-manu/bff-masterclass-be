import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

enum ActivityStatus {
  Completed = 'COMPLETED',
  Locked = 'LOCKED',
  Unlocked = 'UNLOCKED'
}

export interface StudentActivity {
  uuid: string
  status: ActivityStatus
}

export interface IStudent {
  uuid: string
  name: string
  activities: StudentActivity[]
}

const studentSchema = new Schema<IStudent>({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  activities: [
    {
      uuid: { type: String, required: true, enum: ['COMPLETED', 'LOCKED', 'UNLOCKED'] },
      status: { type: String, required: true }
    }
  ]
})

export default mongoose.model<IStudent>('Student', studentSchema)
