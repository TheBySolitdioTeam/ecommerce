import { Schema } from mongoose


const userSubDoc = new Schema({
    user_id: {
        type: mongoose.ObjectId,
        required: [true, 'Please provide a user id!']
    },
    fullName: {
        type: String,
        required: [true, 'The user\'s fullname is missing!']
    },
    picture: {
        type: String
    }
})

const reviewSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title for your review!']
    },
    stars: Number,
    body: {
         type: String, rquired: [true, 'Please enter a review body']
     },
    // Using the Extended reference pattern to have access to needed field in user
    user: userSubDoc,
    product_id: {
        type: mongoose.ObjectId,
        required: [true, 'Please provide a product_id']
    },
   
}, { timestamps: true })

mongoose.model('Reviews', reviewSchema)