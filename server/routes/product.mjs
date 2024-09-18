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


// get all product from categories

router.get("/:categoryId", async (req, res) => {
    const { categoryId } = req.params
    //console.log(categoryId)
    const { cursor, limit } = req.query
    console.log(cursor)
    const query = {'category.category_id': categoryId}
    if (cursor) {
        query._id = {$gt: cursor}
    }
    try {
        const products = await Product.find(query).limit(Number(limit)) 
        //console.log(products)
        return res.send(products)
        
    } catch (error) {
        return res.send({error: error.message})
    }
})













export default router