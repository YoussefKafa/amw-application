import asyncHandler from 'express-async-handler'
import Vehicle from '../models/vehicleModel'
import Violation from '../models/violationModel'

// @desc   Create new Violation
// @route  POST /api/violations
// @access Private/Admin
// Tested ✅ 

const createViolation = asyncHandler(async (req, res) => {

    const {
        violationType,
        plugedNumber,
        date,
        location,
    } = req.body

    try {
        var vehicleExists = await Vehicle.findOne({ plugedNumber:plugedNumber })

        if (vehicleExists) {
            const violation = new Violation({
                violationType,
                plugedNumber,
                date,
                location,
            })
            const newViolation = await violation.save()
            res.status(201).json(newViolation)
    } else {
        res.status(400)
        throw new Error('Invalid pluged number!')
    }
    } catch (error) {
        res.status(400)
        throw new Error('Error!')
    }
    

    
})

// @desc   Update Violation
// @route  PUT /api/violations/violation/:id
// @access Private/Admin
// Tested ✅ 
const updateViolation = asyncHandler(async (req, res) => {

    const {
        violationType,
        plugedNumber,
        date,
        location,
    } = req.body

        
    
    var violationExists = await Violation.findById(req.params.id)

    if (violationExists) {
        var vehicleExists = await Vehicle.findOne({ plugedNumber: plugedNumber })
        if (vehicleExists) {
            violationExists.violationType = violationType || violationExists.violationType
            violationExists.plugedNumber = plugedNumber || violationExists.plugedNumber
            violationExists.date = date || violationExists.date
            violationExists.location = location || violationExists.location
            const updatedViolation = await violationExists.save()
            res.json(updatedViolation)
        } else {
        res.status(404)
        throw new Error('plugedNumber not found!')
    }
    } else {
        res.status(404)
        throw new Error('Violation not found!')
    }

})

// @desc   Delete Violation
// @route  DELETE /api/violations/violation/:id
// @access Private/Admin
// Tested ✅ 

const deleteViolation = asyncHandler(async (req, res) => {

    var violationExists = await Violation.findById(req.params.id)

    if (violationExists) {

        await violationExists.remove()
        res.json({message:'Violation deleted!'})

    } else {
        res.status(401)
        throw new Error('Violation not found!')
    }

    
})

// @desc   Get all Violations for Pluged Number
// @route  GET /api/violations
// @access Private
// Tested ✅ 

const getCurrentPlugedNumberViolations = asyncHandler(async (req, res) => {
    const violations = await Violation.find({plugedNumber:req.vehicle.plugedNumber})
        .populate('violationType', 'tax violation')
    res.json(violations)
})

// @desc   Get Violation
// @route  GET /api/violations/violation/:id
// @access Private
// Tested ✅ 

const getViolation = asyncHandler(async (req, res) => {
    try {
        const violation = await Violation.findById(req.params.id)
        .populate('violationType', 'tax violation')
    if (violation) {
        if ((req.vehicle.plugedNumber === violation.plugedNumber) || req.vehicle.isAdmin) {
        res.json(violation)
    } else {
        res.status(400)
        throw new Error('Not your problem to check others violations!')
    }
    }else {
        res.status(500)
        throw new Error('Error!')
    }
    } catch (error) {
         res.status(500)
        throw new Error('Error!')
    }
    
    
    
})

// @desc   Pay a Violation
// @route  GET /api/violations/:id/pay
// @access Priavte
// Tested ✅ 

const payViolation = asyncHandler(async (req, res) => {

    try {
        const violation = await Violation.findById(req.params.id)
    if (violation && !violation.isPaid) {
        violation.isPaid = true
        violation.save()
        res.json({ message:'Violation is paid!'})
    } else {
        res.status(404)
        throw new Error('could not paid!,violation not found or it is already paid!')
    }
    } catch (error) {
        res.status(400)
        throw new Error('Error!')
    }
    
    
})

// @desc   Filter  Violations
// @route  GET /api/violations/filter/
// @access Priavte/Admin
// Tested ✅ 

const filterViolations = asyncHandler(async (req, res) => {

    var filters = {}
    
    if (req.query.location) {
        var loaction = { 'location': new RegExp(req.query.location, 'i') }
        filters={...filters,...loaction}
    }

    if (req.query.plugedNumber) {
        var plugedNumber = { 'plugedNumber': req.query.plugedNumber }
        filters={...filters,...plugedNumber}
    }

    if (req.query.startDate && req.query.endDate) {
        var date = {
            'date': {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            }
        }
        filters={...filters,...date}
    }

    const results = await Violation.find(filters).populate('violationType', 'tax violation')
    res.json(results)
})
    
export {
    createViolation,
    updateViolation,
    deleteViolation,
    payViolation,
    getCurrentPlugedNumberViolations,
    getViolation,
    filterViolations
}