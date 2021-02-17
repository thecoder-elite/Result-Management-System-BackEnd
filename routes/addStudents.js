const router = require('express').Router();
const addStudentDetail = require('../models/addingStudents');



router.post('/addStudentDetail' , async (req , res) => {
    const details = new addStudentDetail({
        sid : req.body.sid,
        name : req.body.name,
        marks : req.body.marks,
        subject : req.body.subject,
        examid : req.body.examid
    });

    try{
        const savedMarks = await details.save()
        res.json({"message" : "success"});
    }
    catch(err){
        res.json({message : err});
    }


});

module.exports = router;