const mongoose = require('mongoose')

const addSchema = new mongoose.Schema(
    {
        sid : {
            type : String,
            required : true,
        },
        name : {
            type : String,
            required : true,
        }, 
        marks : {
            type : String,
            required : true,
        },
        subject : {
            type : String,
            required : true,
        },
        examid : {
            type : String,
            required : true,
        },
    }
)
module.exports = mongoose.model('addingStudents' , addSchema);