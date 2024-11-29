import mongoose from 'mongoose';

const registerSchema = new mongoose.Schema({
    idApprentice: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apprentice' }],
    idModality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality' },
    startDate: { type: Date },
    endDate: { type: Date },
    company: { type: String },
    phoneCompany: { type: String },
    addressCompany: { type: String },
    mailCompany: { type: String },
    owner: { type: String },
    docAlternative: { type: String },
    certificationDoc: { type: String },
    judymentPhoto: { type: String },
    hourProductiveStageApprentice: { type: Number },

    hourFollowupExcuted: [{ 
        idInstructor: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        hour: { type: Number },
        _id: false
    }],
    businessProyectHourExcuted: [{
        idInstructor: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        hour: { type: Number },
        _id: false
    }],
    productiveTechnicalHourExcuted:[{
        idInstructor: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        hour: { type: Number },
        _id: false
    }],
    
    hourFollowupPending: [{
        idInstructor: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        hour: { type: Number },
        _id: false
    }],
    technicalHourPending: [{
        idInstructor: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        hour: { type: Number },
        _id: false
    }],
    ProyectHourPending: [{
        idInstructor: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        hour: { type: Number },
        _id: false
    }],
    assignment: [{
        followUpInstructor: [{
            idInstructor: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            status: { type: Number, required: true },
            _id: false
        }],
        technicalInstructor: [{
            idInstructor: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            status: { type: Number, required: true },
            _id: false
        }],
        projectInstructor: [{
            idInstructor: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            status: { type: Number, required: true },
            _id: false
        }],
        status: { type: Number, default: 1 },
        _id: false
    }],
    status: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model("Register", registerSchema);

