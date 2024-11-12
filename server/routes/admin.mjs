import express,{ Router } from "express";
import categoryRouter from './admin/category.mjs'
import productRouter from './admin/product.mjs'
import salesRouter from './admin/sales.mjs'
import contentRouter from './admin/content.mjs'


const router = Router()

const checkAdmin = (req, res, next) => {
    req.user && req.user.isAdmin ? next(): res.send({error: 'Your are not an admin'})
}

router.use(checkAdmin)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/sales', salesRouter)
router.use('/content', contentRouter)

export default router