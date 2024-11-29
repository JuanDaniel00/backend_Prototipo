import mongoose from 'mongoose';

const apprenticeSchema = new mongoose.Schema({
    fiche: { idFiche: mongoose.Schema.Types.ObjectId, name: String, number: String },
    idModality: { type: mongoose.Schema.Types.ObjectId, ref: 'Modality' },
    tpDocument: { type: String, required: true },
    numDocument: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    institutionalEmail: { type: String, required: true },
    personalEmail: { type: String, required: true },
    status: { type: Number, required: true, default: 1 },
    HoursTotalPS: { type: Number, required: true, default: 864  },
    HoursExecutedPS:{ type: Number, required: true, default: 0 }, 
    HoursPendingPS:{ type: Number, required: true, default: 864 },
    
}, { timestamps: true });

export default mongoose.model("Apprentice", apprenticeSchema);



