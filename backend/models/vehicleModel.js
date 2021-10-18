import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema({
    plugedNumber: {
        type: 'number',
        required: true,
    },
    driver: {
        type: 'String',
        required: true,
    },
    category: {
        type: 'String',
        required: true,
    },
    productionDate: {
        type: Date,
        required: true,
    },
    registrationDate: {
        type: Date,
        required: true,
    },
    isCrossOut: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
    
}, { timestamps: true }
)
const Vehicle = mongoose.model('Vehicle', vehicleSchema)

export default Vehicle
