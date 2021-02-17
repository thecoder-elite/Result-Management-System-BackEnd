const mongoose = require('mongoose')


const newExamsSchema = new mongoose.Schema({
    examId: {
        type: String,
        required : true,

    },
    examName: {
        type: String,
        required : true,

    },
    examStartDate: {
        type: String,
        required : true,

    },
    examEndDate: {
        type: String,
        required : true,

    },
    department: {
        type: String,
        required : true,

    },
    year: {
        type: String,
        required : true,

    },
    timeOfStart: {
        type: String,
        required : true,
    },
    timeOfEnd : {
        type: String,
        required : true,
    }
    
})
module.exports = mongoose.model('newExams' , newExamsSchema);  