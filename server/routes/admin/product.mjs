import express, { Router } from 'express'
import multer from 'multer'
import productSchema from '../../validationShemas/productValidationSchema.mjs'
import { checkSchema, validationResult, matchedData } from 'express-validator'
import Category from '../../models/categories.mjs'
import path from 'node:path'
import Product from '../../models/products/products.mjs'
import Furniture from '../../models/products/furniture.mjs'
import Clothing from '../../models/products/clothing.mjs'

// Setting the destination path for product photos
const root = path.resolve()
const destination = path.join(root, '/public/products/')

// Initializing multer diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})
const upload = multer({ storage })

const router = Router()

// The post route for creating products

router.post('/', upload.array('images', 4), checkSchema(productSchema, ["body"]), async (req, res) => {
    // Get the validation results and check whether or not there is an error
    const results = validationResult(req)

    if (!results.isEmpty()) return res.send({error: results.array()[0].msg})
    
    // Retrieve the validated data 
  const data ={...req.body,  ...matchedData(req)}
 // console.log(data)

    // Get category of he products
    const categoryId = data.category
    try {
      const categoryObj = await Category.findById(categoryId)
      if (!categoryObj) return res.send({ error: 'No category found!' })

      // setting the category subdocument before creating new product
      data.category = { category_id: categoryObj._id, name: categoryObj.name }
      // Getting the filenames from req.files and joining them with a semicolon
      data.images = req.files.map((item) => item.filename).join(';')

      // Create new product based on the type
      
      switch (data.type){ 
        case 'furniture':
          const newFurniture = new Furniture(data)
          await newFurniture.save()
          return res.status(201).send({ msg: 'Furniture Created!' })
          break;
        case 'clothing':
          const newClothing = new Clothing(data)
          await newClothing.save()
          return res.status(201).send({ msg: 'Clothing Created!' })
          break;
        default:
          const newProduct = new Product(data)
          await newProduct.save()
          return res.status(201).send({ msg: 'Product Created!' })
      }

    } catch (error) {
        return res.send({error: error.message})
    }
   
})





export default router