import { Schema } from 'mongoose'

const options = {discriminatoryKey: 'type'}
const productSchema = new Schema({
    name: String,
    price: mongoose.Types.Decimal128,
    description: String,
    qty: Number,
    images: String,
    type: String,
    additional_info: String
}, options)

 const Product = mongoose.model('Product', productSchema)



export default Product