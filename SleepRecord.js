import mongoose from "mongoose";

const sleepRecordSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
    },
    hours : {
        type: Number,
        required: true
    },
    timestamp : {
        type: Date,
        default: Date.now
    }
});

const SleepRecord = mongoose.model('SleepRecord', sleepRecordSchema);

export default SleepRecord;
