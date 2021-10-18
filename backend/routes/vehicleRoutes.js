import express from 'express'
import {
    createVehicle,
    crossVehicle,
    getCurrentVehicle,
    getVehicles,
    loginVehicle
} from '../controllers/vehicleController.js'

import {admin, protect} from '../middleware/authMiddleware'

const router = express.Router()

router.route('/signup')
    .post(createVehicle)

router.route('/login')
    .post(loginVehicle)

router.route('/')
    .get(protect,admin,getVehicles)

router.route('/currentVehicle')
    .get(protect,getCurrentVehicle,)

router.route('/:id/cross')
    .get(protect,admin,crossVehicle)


export default vehicleRouter