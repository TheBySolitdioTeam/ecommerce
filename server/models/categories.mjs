import { Schema } from 'mongoose'


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter ']
    },
    parent_id: {
        type: mongoose.ObjectId,
        default: null
    },
    image: {
        type: String,
        required: function () {
            this.parent_id !== null ? [true, 'Please provide an image!']: false
        }
    }
})


export default mongoose.model('Category', categorySchema)