import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    email: String,
    fullName: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    picture: {
        type: String
    }
})
export default mongoose.model('User', userSchema)


