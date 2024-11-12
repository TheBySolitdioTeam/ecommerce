import express, { Router } from 'express'
import multer from 'multer'
import Content from '../../models/content.mjs'
import path from 'node:path'
import fs from 'node:fs'


// Setting the destination path for product photos
const root = path.resolve()
const destination = path.join(root, '/public/')

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

// create content 
router.post("/", upload.array('images', 6), async (req, res) => {
    const dataFields = req.body
    const images = req.files.map(item => item.filename)

    // Insert new Object into the databse
    try {
        const newContent = new Content({ ...dataFields, images })
        await newContent.save()
        return res.send({msg: `Nouveau ${newContent.type} cree!`})
    } catch (error) {
        return res.send({error: error.message})
    }
})
// update the content
router.put("/:id", upload.array('images', 6), async (req, res) => {
    const { id } = req.params
    const dataFields = req.body
    const images = req.files.map((item) => item.filename)
    // get the content to be updated
    const oldContent = await Content.findById(id)
    if (!oldContent) return res.send({ error: 'Contenu n\'existe pas' }) 
    // delete old images
    oldContent.images.forEach(el => { fs.unlinkSync(destination + el) }) 
    
    // ınsert new object
     try {
       const newContent ={ ...dataFields, images }
       await Content.findByIdAndUpdate(id, newContent)
       return res.send({ msg: `${newContent.type} mis a jour!`})
     } catch (error) {
       return res.send({ error: error.message })
     }
})
router.use(express.json())
router.patch("/:id", async (req, res) => {
    const { id } = req.params
    const dataFields = req.body
    // get the content to be updated
    const oldContent = await Content.findById(id)
    if (!oldContent) return res.send({ error: "Contenu n'existe pas" })
    
    // ınsert new object
    try {
        const newContent = { ...oldContent, ...dataFields }
        console.log(newContent)
      await Content.findByIdAndUpdate(id, newContent)
      return res.send({ msg: `${newContent.type} mis a jour!` })
    } catch (error) {
      return res.send({ error: error.message })
    }
})
router.get("/:id", async (req, res) => {
    const { id } = req.params 
    try {
        const singleContent = await Content.findById(id)
        if (!singleContent) return res.send({ error: 'Content not found!' })
        return res.send(singleContent)
        
    } catch (error) {
        return {error: error.message}
    }
})

router.get("/", async (req, res) => {
   const { cursor, limit, type } = req.query
   const query = { }
   if (cursor) {
     query._id = { $gt: cursor }
   }
    if (type) {
      query.type =  type
    }
   try {
    const allContents = await Content.find(query, null, {limit: Number(limit)})
     return res.send(allContents)
   } catch (error) {
     return res.send({ error: error.message })
   }
})

export default router