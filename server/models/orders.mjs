import mongoose, { Schema } from 'mongoose'


const productSubDoc = new Schema({
    product_id: {
        type: mongoose.ObjectId, 
        required: [true, 'Please enter the product id']
    },
    product_qty: {
        type: Number,
        required: [true, 'Please provide a product quantity!']
    }
})

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

const orderSchema = new Schema({
    products: [productSubDoc],
    total: {
        type: mongoose.Decimal128,
        required: [true, 'Please provide a total price for the order!']
    },
    status: {
        type: String,
        default: 'Received'
    },
    user: userSubDoc

})