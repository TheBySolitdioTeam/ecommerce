import mongoose, { Schema } from 'mongoose'

import userSubDoc from './subdocs/userSubDoc.mjs'
const productSubDoc = new Schema({
    product_id: {
        type: mongoose.Types.ObjectId, 
        required: [true, 'Please enter the product id']
    },
    product_qty: {
        type: Number,
        required: [true, 'Please provide a product quantity!']
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
    user: userSubDoc,
    products: [mongoose.Types.ObjectId],
    payment: mongoose.Mixed,
    address: {
        type: String,
        required: [true, 'Please provide an address']
    }

})


export default mongoose.model('Orders', orderSchema)