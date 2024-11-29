import mongoose from 'mongoose';

const binnaclesSchema = new mongoose.Schema({
    register: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },
    instructor: {
        idinstructor: mongoose.Schema.Types.ObjectId,
        name: String
    },
    number: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    document: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    status: {
        type: String,
        required: true,
        default: '1'
    },
    observation: [{
        user: { type: mongoose.Schema.Types.ObjectId },
        observation: String,
        observationDate: { type: Date, default: Date.now }
    }],
    checkTechnicalInstructor: {
        type: Boolean,
        default: false
    },
    checkProjectInstructor: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
export default mongoose.model('Binnacles', binnaclesSchema);



