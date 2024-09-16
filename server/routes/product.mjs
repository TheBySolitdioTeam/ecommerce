import express, { Router } from 'express'
import Product from '../models/products/products.mjs'
import Clothing from '../models/products/clothing.mjs'
import Furniture from '../models/products/furniture.mjs'

const router = Router()


const pickType = (type) => {
    switch (type) {
        case 'clothing':
            return Clothing
            break;
        case 'furniture':
            return Furniture
            break
        default:
            return Product
            break;
    }
}

router.get("/", async (req, res) => {
    const { cursor, limit, type } = req.query
    const query = {}
    if (cursor) {
        query._id = {$gt: cursor}
    }

    try {
        const items = await pickType(type).find(query).limit(Number(limit))
        return res.send(items)
        
    } catch (error) {
        return res.send({error: error.message})
    }
})












export default router