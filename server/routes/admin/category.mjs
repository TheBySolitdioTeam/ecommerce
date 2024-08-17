import express, { Router } from 'express'
import { checkSchema, validationResult, matchedData } from 'express-validator'
import Category from '../../models/categories.mjs'
// category validation schema
import categoryValidationSchema from '../../validationShemas/categoryValidation.mjs'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'

//gets your app's root path
const root = path.resolve()
const destinacion = path.join(root, '/public/categories/')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinacion)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})

const upload = multer({ storage })

// Uploading category fileds after multer
const categoryAfterImgUpload = async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(501).send(result.array())
  }

  const data = matchedData(req)
  data.image = req.body.image || null
  data.parent_id = req.body.parent_id || null
  console.log(`Data: ${JSON.stringify(data)},Body: ${JSON.stringify(req.body)}`)
  try {
    // Check for duplicates of name
    const duplicate = await Category.find({
      name: { $regex: new RegExp(`^${data.name}$`), $options: 'i' },
    })

    if (duplicate.length !== 0)
      return res.send({ error: 'This category already exists' })

    const category = new Category(data)

    await category.save()
    return res.status(201).send(category)
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

const router = Router()





// category CRUD Section

router.use(express.json())

// Create Category with image upload in multer
router.post(
  '/multer',
  upload.single('image'),
  (req, res, next) => {
    req.body.image = req.file.filename
    next()
  },
  checkSchema(categoryValidationSchema, ['body']),
  categoryAfterImgUpload
)

// Create category without an image
router.post(
  '/',
  checkSchema(categoryValidationSchema, ['body']),
  categoryAfterImgUpload
)

// Get all categories
router.get('/', async (req, res) => {
  try {
    const primeCategories = await Category.find()
    return res.send({ data: primeCategories })
  } catch (error) {
    return res.status(404).send({ error: error.msg })
  }
})
// Get all the parentless categories

router.get('/primary', async (req, res) => {
  try {
    const primeCategories = await Category.find({ parent_id: null })
    return res.send({ data: primeCategories })
  } catch (error) {
    return res.status(404).send({ error: error.msg })
  }
})

//Delete category endpoint
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    
  try {
    const file = await Category.findById(id)
    if (!file) res.send({ error: 'File not found' })
    await Category.findByIdAndDelete(id)
    file.image ? fs.unlinkSync(destinacion + file.image) : ''
    return res.send({msg: 'Category deleted!'})
        
    } catch (error) {
        return res.send({error: error.message})
    }
})



export default router
