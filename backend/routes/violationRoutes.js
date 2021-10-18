import express from 'express'
import {createViolation, deleteViolation, filterViolations,getCurrentPlugedNumberViolations, getViolation, payViolation, updateViolation} from '../controllers/violationController'
import { admin, protect } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/')
    .get(protect,getCurrentPlugedNumberViolations)
    .post(protect, admin, createViolation)
    

router.route('/violation/:id')
    .get(protect,getViolation)
    .put(protect,admin,updateViolation)
    .delete(protect,admin,deleteViolation)

router.route('/:id/pay')
    .get(protect, payViolation)

router.route('/filters/query')
    .get(protect,admin,filterViolations)

export default router