import mongoose,{ Schema } from 'mongoose'


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter ']
    },
    parent_id: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    image: {
        type: String
    }
})


export default mongoose.model('Category', categorySchema)