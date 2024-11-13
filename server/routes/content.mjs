import express, { Router } from 'express'
import Content from '../models/content.mjs'
const router = Router()
router.use(express.json())

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const singleContent = await Content.findById(id)
    if (!singleContent) return res.send({ error: "Contenu n'existe pas" })
    return res.send(singleContent)
  } catch (error) {
    return { error: error.message }
  }
})

router.get('/', async (req, res) => {
  const { cursor, limit, type } = req.query
  const query = {}
  if (cursor) {
    query._id = { $gt: cursor }
  }
  if (type) {
    query.type = type
  }
  try {
    const allContents = await Content.find(query, null, {
      limit: Number(limit),
    })
    return res.send(allContents)
  } catch (error) {
    return res.send({ error: error.message })
  }
})

export default router