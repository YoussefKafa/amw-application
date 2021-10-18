import asyncHandler from 'express-async-handler'
import ViolationType from '../models/violationTypeModel'

// @desc   Create new Violation Type
// @route  POST /api/violationtypes/
// @access Private/Admin
// Tested ✅

const createViolationType = asyncHandler(async (req, res) => {

    const {
        violation,
        tax
    } = req.body

    var violationTypeExists = await ViolationType.findOne({ violation: violation })
    if (violationTypeExists) {
        res.status(400)
        throw new Error('Violation Type is already exist!')
    }
    
    const violationType = new ViolationType({
        violation,
        tax
    })
    const newViolationType = await violationType.save()

    res.status(201).json(newViolationType)
})

// @desc   Get all Violation Types
// @route  GET /api/violationtypes/
// @access Private/Admin
// Tested ✅

const getViolationTypes = asyncHandler(async (req, res) => {
    const violationtypes = await ViolationType.find({})
    res.send(violationtypes)
})

// @desc   Update Violation Type
// @route  PUT /api/violationtypes/:id
// @access Private/Admin
// Tested ✅

const updateViolationType = asyncHandler(async (req, res) => {

    const {
        violation,
        tax
    } = req.body

    var violationTypeExists = await ViolationType.findById(req.params.id)

    if (violationTypeExists) {

        violationTypeExists.violation = violation || violationTypeExists.violation

        violationTypeExists.tax = tax || violationTypeExists.tax

        const updatedViolationType = await violationTypeExists.save()

        res.json(updatedViolationType)

    } else {
        res.status(404)
        throw new Error ('Violation Type not found!')
    }
    
})

// @desc   Delete Violation Type
// @route  DELETE /api/violationtypes/:id
// @access Private/Admin
// Tested ✅

const deleteViolationType = asyncHandler(async (req, res) => {

    var violationTypeExists = await ViolationType.findById(req.params.id)

    if (violationTypeExists) {

        await violationTypeExists.remove()
        res.json({message:'Violation type removed!'})

    } else {
        res.status(404)
        throw new Error ('Violation Type not found!')
    }
    
})

export {createViolationType,updateViolationType,deleteViolationType,getViolationTypes}