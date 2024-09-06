import express, { Router } from 'express'
import multer from 'multer'
import productSchema from '../../validationShemas/productValidationSchema.mjs'
import { checkSchema, validationResult, matchedData } from 'express-validator'
import Category from '../../models/categories.mjs'
import path from 'node:path'
import Product from '../../models/products/products.mjs'
import Furniture from '../../models/products/furniture.mjs'
import Clothing from '../../models/products/clothing.mjs'
import fs from 'node:fs'

// Setting the destination path for product photos
const root = path.resolve()
const destination = path.join(root, '/public/products/')


// Query all products collection
const allProductsQuery = async (type,query,limit) => {
  // Get all products with quantity greater than 0
  const discriminators = Product.discriminators
  discriminators['Product'] = Product
  const initialProducts = await Promise.all(
    Object.keys(discriminators)
      .filter((i) => i === type)
      .map((i) => discriminators[i].find(query).limit(Number(limit)))
  )
  //console.log(initialProducts)
  //console.log(initialProducts);
  const allProducts = initialProducts.reduce(
    (arr, el) => arr.concat(...el),

    []
  )
  return allProducts
}

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

    // Get category of the products
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


router.get("/", async (req, res) => {
  
  const { cursor, limit, type } = req.query
  //console.log('Product get hit');
  const query = { qty: { $gt: 0 } }
  if (cursor) {
    query._id = {$gt: cursor}
  }
  try {
   
    //console.log(initialProducts);
    const allProducts = await allProductsQuery(type,query, limit)
    //console.log(allProducts)
    /*const allProducts = await Product.find(
      query
    ).limit(Number(limit))*/
    
    return res.send(allProducts)
  } catch (error) {
    return res.send({error: error.message})
  }
})



router.get("/search", async (req, res) => {
  const { q } = req.query

  try {
    // Get all the discriminants items
    const searchResults = await Product.find({ name: { $regex: new RegExp(`${q}`, 'i') } })
    console.log(q)
    //console.log(searchResults)
    return res.send(searchResults)
  } catch (error) {
    return res.send({ error: error.message })
  }
})
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { type } = req.query

  console.log(id)

  let productType
  switch (type) {
    case 'furniture':
      productType = Furniture

      break
    case 'clothing':
      productType = Clothing
      break
    default:
      productType = Product
  }
  try {
    const product = await productType.findById(id)
    if (!product) return res.send({ error: `No product found with ID: ${id}` })
    return res.send(product)
  } catch (error) {
    return res.send({ error: error.message })
  }
})



router.put("/:id", upload.array('images', 4), checkSchema(productSchema, ["body"]), async (req, res) => {
  const { id } = req.params
  const results = validationResult(req)
  // Checking for errors
  if (!results.isEmpty()) return res.send({ error: results.array()[0].msg })

  // Getting all the fields
  const data = { ...req.body, ...matchedData(req) }

  // Get the product to be modified
  let productType
  switch (data.type) {
    case 'furniture':
      productType = Furniture

      break
    case 'clothing':
      productType= Clothing
      break
    default:
      productType = Product
  }
  try {
     const tobeUpdated = await productType.findById(id)
     if (!tobeUpdated)
       return res.send({ error: `No product found with ID: ${id}` })
  } catch (error) {
    return res.send({error: error.message})
  }
 
  // Compare categories and get the new one if necessary

  if (data.category !== tobeUpdated.category.category_id) {
    const categoryId = data.category
    try {
      const categoryObj = await Category.findById(categoryId)
      if (!categoryObj) return res.send({ error: 'No category found!' })

      // setting the category subdocument before creating new product
      data.category = { category_id: categoryObj._id, name: categoryObj.name }
    } catch (error) {
      return res.send({ error: error.message })
    }
  } else {
    data.category = tobeUpdated.category
  }

  // Update the images with the new image names
  // Getting the filenames from req.files and joining them with a semicolon
  data.images = req.files.map((item) => item.filename).join(';')

  // Delete previous images
  tobeUpdated.images.split(";").forEach(element => {
    fs.unlinkSync(destination + element)
  });
  // Update the data of the product
  try {
    const updatedProduct = productType.findByIdAndUpdate(id, data)
    return res.send({message: `Product ${updatedProduct._id} updated with success`})
    
  } catch (error) {
    return res.send({error: error.message})
  }

  
})

router.patch("/:id", async (req, res) => {
  const { id } = req.params
  const data = req.body
  // Get product to be updated
  let productType
  switch (data.type) {
    case 'furniture':
      productType = Furniture

      break
    case 'clothing':
      productType = Clothing
      break
    default:
      productType = Product
  }
  try {
    const tobeUpdated = await productType.findById(id)
    if (!tobeUpdated)
      return res.send({ error: `No product found with ID: ${id}` })
  } catch (error) {
    return res.send({ error: error.message })
  }

  // Compare categories and get the new one if necessary

  if (data.category !== tobeUpdated.category.category_id) {
    const categoryId = data.category
    try {
      const categoryObj = await Category.findById(categoryId)
      if (!categoryObj) return res.send({ error: 'No category found!' })

      // setting the category subdocument before creating new product
      data.category = { category_id: categoryObj._id, name: categoryObj.name }
    } catch (error) {
      return res.send({ error: error.message })
    }
  } else {
    data.category = tobeUpdated.category
  }

  // Update the data of the product
  try {
    const updatedProduct = productType.findByIdAndUpdate(id, data)
    return res.send({
      message: `Product ${updatedProduct._id} updated with success`,
    })
  } catch (error) {
    return res.send({ error: error.message })
  }
})
export default router