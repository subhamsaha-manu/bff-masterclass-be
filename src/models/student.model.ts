import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

interface StudentActivity {
  uuid: string
  isCompleted: boolean
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
      uuid: { type: String, required: true },
      isCompleted: { type: Boolean, required: true }
    }
  ]
})

export default mongoose.model<IStudent>('Student', studentSchema)
