import mongoose, { Schema } from 'mongoose'


const contentSchema = new Schema({
    name: { 
        type: String,
        required: true,
        unique: true
     },
    images: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    details: {
        type: String
    }
})

const Content = mongoose.model('Content', contentSchema)

export default Content