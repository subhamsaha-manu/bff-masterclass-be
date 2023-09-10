import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface IUser {
  uuid: string
  name: string
  email: string
  password: string
}

const userSchema = new Schema<IUser>({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

// 3. Create a Model.
export default mongoose.model<IUser>('User', userSchema)
