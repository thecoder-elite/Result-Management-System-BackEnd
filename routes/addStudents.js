const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;

router.get('/getStudentDetails/:examId', async (req, res) => {
    const uri = "mongodb+srv://root:CxUKTwm54hF7Rhfv@cluster0.dm57q.mongodb.net/result-manager?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const examId = req.params.examId;
    try {
        //connect to db 
        await client.connect();
        let cursor = await client.db("result-manager").collection("students").find({examID: examId})
        let students = [];
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            delete doc._id
            students.push(doc);
        }
        
        
        res.send({ 'data': students })
    } catch (err) {
        console.log(err);
        res.send({ 'errorMsg': 'Unable to connect to server, please try again' });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});


// router.get('/:sid', async (req, res) => {
//     try {
//         const addStudentDetails = await addStudentDetail.find({ sid: req.params.sid });
//         res.json(addStudentDetails);
//     }
//     catch (err) {
//         res.json({ message: err });
//     }

// });




router.post('/addStudentDetail', async (req, res) => {
    const uri = "mongodb+srv://root:CxUKTwm54hF7Rhfv@cluster0.dm57q.mongodb.net/result-manager?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        await client.db("result-manager").collection("students").insertOne(req.body)
            .then(result => res.send({ 'message': 'Student Details Successfully' }))
            .catch(err => {
                console.log(err);
                res.send({ 'errorMsg': 'Unable to save student details' })
            })
    } catch (err) {
        console.log(err);
        res.send({ 'errorMsg': 'Unable to connect to server, please try again' });
    } finally {
        await client.close();
    }


});

module.exports = router;