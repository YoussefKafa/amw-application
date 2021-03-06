import express from 'express'
import { createViolationType, deleteViolationType, getViolationTypes, updateViolationType } from '../controllers/violationTypeController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const violationTypeRouter = express.Router()

violationTypeRouter.route('/')
    .post(protect,admin,createViolationType)
    .get(protect,admin,getViolationTypes)
    violationTypeRouter.route('/:id')    
    .put(protect,admin,updateViolationType)
    .delete(protect,admin,deleteViolationType)


export default violationTypeRouter