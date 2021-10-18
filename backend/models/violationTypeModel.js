import mongoose from 'mongoose';

const violationTypeSchema = mongoose.Schema({
    violation: {
        type: String,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    }
}, { timeStamps: true })

const ViolationType = mongoose.model('ViolationType', violationTypeSchema)

export default ViolationType
