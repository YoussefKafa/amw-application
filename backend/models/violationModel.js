import mongoose from 'mongoose';

const violationSchema = mongoose.Schema({
    violationType: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'ViolationType',
        required: true,
    },
    plugedNumber: {
        type: 'number',
        required: true,
    }, date: {
        type: Date,
        default: Date.now()
    }, location: {
        type: String,
        required: true,
    }, isPaid: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
)

const Violation = mongoose.model('Violation', violationSchema);

export default Violation;