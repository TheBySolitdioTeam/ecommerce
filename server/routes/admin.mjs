import express,{ Router } from "express";
import categoryRouter from './admin/category.mjs'


const router = Router()

const checkAdmin = (req, res, next) => {
    req.user && req.user.isAdmin ? next(): res.send({error: 'Your are not an admin'})
}

router.use(checkAdmin)
router.use('/category', categoryRouter)

export default router