import { Router } from 'express'

import Category from '../models/categories.mjs'


const router = Router()


// get all the categories

router.get("/", async (req, res) => {
    try {
        const allCategories = await Category.find()
        return res.send(allCategories)
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