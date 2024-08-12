import { Schema } from 'mongoose'
import Product from './products.mjs'

const Clothing = Product.discriminator(
  'Clothing',
  new Schema(
    {
      size: String,
      color: String,
    },
    options
  )
)

export default Clothing
