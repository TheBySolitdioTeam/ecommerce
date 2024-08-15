import express,{ Router } from "express";
import { checkSchema, validationResult, matchedData } from 'express-validator'
import Category from '../models/categories.mjs'
// category validation schema
import categoryValidationSchema from '../validationShemas/categoryValidation.mjs'


const router = Router()

const checkAdmin = (req, res, next) => {
    req.user && req.user.isAdmin ? next(): res.send({error: 'Your are not an admin'})
}

router.use(checkAdmin)


// category CRUD Section
router.use(express.json())
router.post('/category/create', checkSchema(categoryValidationSchema, ['body']), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.status(501).send(result.array())
    }

    const data = matchedData(req)
    const category = new Category(data)

    try {
        await category.save()
        res.status(201).send({msg: 'Category created with success!'})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
    
})

export default router