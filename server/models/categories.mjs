import mongoose,{ Schema } from 'mongoose'


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter ']
    },
    parent_id: {
        type: mongoose.Types.ObjectId,
        
    },
    image: {
        type: String
    }
})


export default mongoose.model('Category', categorySchema)