import express from 'express'
import {
    createVehicle,
    crossVehicle,
    getCurrentVehicle,
    getVehicles,
    loginVehicle
} from '../controllers/vehicleController.js'

import {admin, protect} from '../middleware/authMiddleware.js'

const vehicleRouter = express.Router()

vehicleRouter.route('/signup')
    .post(createVehicle)

    vehicleRouter.route('/login')
    .post(loginVehicle)

    vehicleRouter.route('/')
    .get(protect,admin,getVehicles)

    vehicleRouter.route('/currentVehicle')
    .get(protect,getCurrentVehicle,)

    vehicleRouter.route('/:id/cross')
    .get(protect,admin,crossVehicle)


export default vehicleRouter