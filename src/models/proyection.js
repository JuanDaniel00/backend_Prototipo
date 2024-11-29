import mongoose from "mongoose";

const projectionSchema = new mongoose.Schema({
    year: {
        january: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        february: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        march: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        april: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        may: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        june: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        july: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        august: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        september: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        october: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        november: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        },
        december: {
            instructors: [{
                idInstructor: mongoose.Schema.Types.ObjectId,
                hoursScheduled: Number,
                hoursPending: Number,
                hoursExcuted: Number,
            }]
        }
    }
})

export default mongoose.model("Proyection", projectionSchema);