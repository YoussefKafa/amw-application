import asyncHandler from 'express-async-handler'
import Vehicle from '../models/vehicleModel'
import generateToken from '../utils/generateToken'

// @desc   Create new Vehicles/Driver Account
// @route  POST /api/vehicles/signup
// @access Public
// Tested ✅ 

const createVehicle = asyncHandler(async (req, res) => {

    const {
        plugedNumber,
        driver,
        category,
        productionDate,
        registrationDate
    } = req.body

    try {
        var vehicleExists = await Vehicle.findOne({ plugedNumber: plugedNumber })
    
    if (vehicleExists) {
        res.status(400)
        throw new Error('Pluged Number is already belong to another account!')
    }
    
    const vehicle = new Vehicle({
        plugedNumber,
        driver,
        category,
        productionDate,
        registrationDate
    })
    const newVehicle = await vehicle.save()

    res.status(201).json({
        _id: newVehicle._id,
        driver: newVehicle.driver,
        plugedNumber: newVehicle.plugedNumber,
        category: newVehicle.category,
        productionDate: newVehicle.productionDate,
        registrationDate: newVehicle.RegistrationDate,
        isCrossOut: newVehicle.isCrossOut,
        isAdmin:newVehicle.isAdmin,
        token:generateToken(newVehicle._id,newVehicle.plugedNumber)
    })
    } catch (error) {
        res.status(404)
        throw new Error('Error!')
    }
    
})

// @desc   Driver Login
// @route  POST /api/vehicles/login
// @access Public
// Tested ✅ 

const loginVehicle = asyncHandler(async (req, res) => {

    const {
        plugedNumber,
        driver,
    } = req.body

    

    const veh = await Vehicle.findOne({ plugedNumber: plugedNumber })
    
    if (veh && veh.driver === driver) {
        res.json({
            _id: veh._id,
            driver: veh.driver,
            plugedNumber: veh.plugedNumber,
            category: veh.category,
            productionDate: veh.productionDate,
            registrationDate: veh.RegistrationDate,
            isCrossOut: veh.isCrossOut,
            isAdmin:veh.isAdmin,
            token:generateToken(veh._id,veh.plugedNumber)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Informations!')
    }
})

// @desc   Get Current Vehicle
// @route  GET /api/vehicles/currentVehicle
// @access Priavte
// Tested ✅ 
const getCurrentVehicle = asyncHandler(async (req, res) => {
    const { id } = req.vehicle;
    const vehicle = await Vehicle.findById(id)
    res.status(200).json(vehicle)
})

// @desc   Get All Vehicles
// @route  GET /api/vehicles
// @access Priavte/Admin
// Tested ✅ 
const getVehicles = asyncHandler(async (req, res) => {
    const vehiclesList = await Vehicle.find({})
    res.status(200).json(vehiclesList)
})

// @desc   Cross a Vehicles
// @route  GET /api/vehicles/:id/cross
// @access Priavte/Admin
// Tested ✅ 

const crossVehicle = asyncHandler(async (req, res) => {
    try {
        const veh = await Vehicle.findById(req.params.id)
        if (veh) {
        veh.isCrossOut ? veh.isCrossOut = false : veh.isCrossOut = true
        await veh.save()
        res.json({ message:'Success!'})
    } else {
        res.status(404)
        throw new Error('Vehicle not found!')
    }
    } catch (error) {
        res.status(404)
        throw new Error('Error!')
    }
    
})



export {
    createVehicle,
    loginVehicle,
    getVehicles,
    crossVehicle,
    getCurrentVehicle
}