const router = require('express').Router();
const addStudentDetail = require('../models/addingStudents');



router.get('/' , async (req, res) => {
    try{
        const addStudentDetails = await addStudentDetail.find();
        res.json(addStudentDetails);
    }
    catch(err){
        res.json({message:err});

    }


    
});


router.get('/:sid' , async (req, res) => {
    try{
        const addStudentDetails = await addStudentDetail.find({sid : req.params.sid});
        res.json(addStudentDetails);
    }   
    catch(err){
        res.json({message:err});
    }
    
});




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