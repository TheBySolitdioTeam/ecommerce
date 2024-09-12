import express, { Router } from 'express'
import Sales from '../../models/sales.mjs'
import path from 'node:path'
import multer from 'multer'
import { checkSchema, validationResult, matchedData } from 'express-validator'
import salesSchema from '../../validationShemas/salesValidationSchema.mjs'
import salesValidationSchema from '../../validationShemas/salesValidationSchema.mjs'

const root = path.resolve()
const destination = path.join(root, "/public/sales/")


// Initialize multer diskStorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destination)
    },
    filename: function (req, file, cb) {
         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
         const extension = file.mimetype.split('/')[1]
         cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
})
const upload = multer({storage})

const router = Router()




// Create a Sale with image  Endpoint

router.post('/', upload.single('image'), checkSchema(salesValidationSchema, ['body']), async (req, res) => {
    // Get the errors
    const results = validationResult(req)
    if (!results.isEmpty()) return res.send({ error: results.array()[0].msg })
    
    // Get the body content
    const data = matchedData(req)
    // set the image field
    data.image = req.file.filename

    try {
        const newSales = new Sales(data)
        await newSales.save()
        res.send({msg: 'Sales created with success!'})
        
    } catch (error) {
        return res.send({error: error.message})
    }

})

// Create a Sale without an image
router.post(
  '/imageless', upload.none('image'),
  checkSchema(salesValidationSchema, ['body']),
  async (req, res) => {
    console.log('Inside Imageless')
     console.log('reqBody: ' + JSON.stringify(req.body))
    // Get the errors
    const results = validationResult(req)
    if (!results.isEmpty()) return res.send({ error: results.array()[0].msg })

    // Get the body content
    const data = matchedData(req)
    console.log(data)
   
    // set the image field
    data.image ='default.webp'

    try {
      const newSales = new Sales(data)
      await newSales.save()
      return res.send({ msg: 'Sales created with success!' })
    } catch (error) {
      return res.send({ error: error.message })
    }
  }
)

// Get all SALES
router.get("/", async (req, res) => {
  try {
    const allSales = await Sales.find({
      expires: { $gt: new Date(Date.now()).toISOString() },
    })
    return res.send(allSales)
  } catch (error) {
    return res.send({error: error.message})
  }
})
// Get sales Infnity scroll
router.get("/infinity", async (req, res) => {
  const { cursor, limit } = req.query
  const query = {}
  if (cursor) {
    query._id = {$gt: cursor}
  }
  try {
    const nextItems = await Sales.find(query).limit(Number(limit))
    return res.send(nextItems)
    
  } catch (error) {
    return res.send({error: error.message})
  }
})
export default router

