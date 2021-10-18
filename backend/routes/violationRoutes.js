import express from 'express'
import {createViolation, deleteViolation, filterViolations,getCurrentPlugedNumberViolations, getViolation, payViolation, updateViolation} from '../controllers/violationController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const violationRouter = express.Router()

violationRouter.route('/')
    .get(protect,getCurrentPlugedNumberViolations)
    .post(protect, admin, createViolation)
    

    violationRouter.route('/violation/:id')
    .get(protect,getViolation)
    .put(protect,admin,updateViolation)
    .delete(protect,admin,deleteViolation)

    violationRouter.route('/:id/pay')
    .get(protect, payViolation)

    violationRouter.route('/filters/query')
    .get(protect,admin,filterViolations)

export default violationRouter