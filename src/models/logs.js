import mongoose from 'mongoose';

const logsSchema = new mongoose.Schema({
    users: { type: String, required: true }, 
    email: { type: String, required: true },
    url: { type: String },
    requestBody: { type: mongoose.Schema.Types.Mixed },
    action: { type: String, required: true }, 
    information: { type: mongoose.Schema.Types.Mixed }, 
    status: { type: Number, required: true, default: 1 }
}, { timestamps: true });

export default mongoose.model("Logs", logsSchema);
