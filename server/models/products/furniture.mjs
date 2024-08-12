import { Schema } from 'mongoose'
import Product from './products.mjs'

const Furniture = Product.discriminator(
  'Product',
  new Schema({
    color: String,
    fabric: String,
    width: String,
    length: String,
  })
)

export default Furniture