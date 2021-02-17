const router = require('express').Router();
const newExams = require('../models/newExams');



router.get('/:examId', async (req, res) => {
    try{
        const exams = await newExams.find({ examId: req.params.examId});
        res.json(exams);
    }
    catch(err) { 
        res.json({message : err})
    }
});














router.post('/createExam' , async (req, res) => {
const exam = new newExams({

    examId : req.body.examId,
    examName : req.body.examName,
    examStartDate : req.body.examStartDate,
    examEndDate : req.body.examEndDate,
    department : req.body.department,
    year : req.body.year,
    timeOfStart : req.body.timeOfStart,
    timeOfEnd : req.body.timeOfEnd,

});

try{
    const savedExam = await exam.save()
    res.json(savedExam);
}
catch(err){
    res.json({message : err});
}

});


module.exports = router;