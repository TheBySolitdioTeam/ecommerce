import mongoose,{ Schema } from "mongoose"
export default new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please provide a user id!'],
  },
  fullName: {
    type: String,
    required: [true, "The user's fullname is missing!"],
  },
  picture: {
    type: String,
  },
})
