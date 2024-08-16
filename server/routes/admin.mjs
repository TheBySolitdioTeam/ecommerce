import express,{ Router } from "express";
import { checkSchema, validationResult, matchedData } from 'express-validator'
import Category from '../models/categories.mjs'
// category validation schema
import categoryValidationSchema from '../validationShemas/categoryValidation.mjs'
import multer from 'multer'
import path from 'node:path'


//gets your app's root path
const root = path.resolve()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(root, '/public/categories/'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        const extension = file.mimetype.split("/")[1]
        cb(null, file.fieldname + "-"+ uniqueSuffix + "."+ extension)
    }
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

const checkAdmin = (req, res, next) => {
    req.user && req.user.isAdmin ? next(): res.send({error: 'Your are not an admin'})
}

router.use(checkAdmin)


// category CRUD Section





router.use(express.json())

// Create Category with image upload in multer
router.post(
  '/multer/createCategory',
  upload.single('image'),
  (req, res, next) => {
    req.body.image = req.file.filename
    next()
  },
  checkSchema(categoryValidationSchema, ['body']),
  categoryAfterImgUpload
)

// Create category without an image
router.post('/category/create', checkSchema(categoryValidationSchema, ['body']), categoryAfterImgUpload)

// Get all categories
router.get('/category', async (req, res) => {
  try {
    const primeCategories = await Category.find()
    return res.send({ data: primeCategories })
  } catch (error) {
    return res.status(404).send({ error: error.msg })
  }
})
// Get all the parentless categories

router.get('/category/primary', async (req, res) => {

    try {
        const primeCategories = await Category.find({ parent_id: null })
        return res.send({data: primeCategories})
    } catch (error) {
        return res.status(404).send({error: error.msg})
    }
   
})



export default router