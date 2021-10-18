import express from 'express'
import { createViolationType, deleteViolationType, getViolationTypes, updateViolationType } from '../controllers/violationTypeController'
import { admin, protect } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/')
    .post(protect,admin,createViolationType)
    .get(protect,admin,getViolationTypes)
router.route('/:id')    
    .put(protect,admin,updateViolationType)
    .delete(protect,admin,deleteViolationType)


export default router