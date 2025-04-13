import { Router } from 'express'

import Category from '../models/categories.mjs'


const router = Router()


// get all the categories

router.get("/", async (req, res) => {
    try {
      const allCategories = await Category.find()
      const data = allCategories.map(item => {
        item.image = "http://localhost:5500/" + item.image
        return item
      })
      /*console.log(data);*/
        return res.send(data)
    } catch (error) {
        return res.send({error: error.message})
    }
})

// get the last 6
router.get('/last6', async (req, res) => {
  try {
    const allCategories = await Category.find({},null, {limit:6,sort:{_id:-1}})
    return res.send(allCategories)
  } catch (error) {
    return res.send({ error: error.message })
  }
})

export default router