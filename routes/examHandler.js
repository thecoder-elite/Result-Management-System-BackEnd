const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;

router.get('/getDetails', async (req, res) => {
    const uri = "mongodb+srv://root:CxUKTwm54hF7Rhfv@cluster0.dm57q.mongodb.net/result-manager?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        let cursor = await client.db("result-manager").collection("exams").find({ examID: req.query.examId }, { _id: 0 })
        let exams = [];
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            delete doc._id
            exams.push(doc);
        }
        
        res.send({ 'data': exams })
    } catch (err) {
        console.log(err);
        res.send({ 'errorMsg': 'Unable to fetch exam details' })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

router.post('/createExam', async (req, res) => {
    const uri = "mongodb+srv://root:CxUKTwm54hF7Rhfv@cluster0.dm57q.mongodb.net/result-manager?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const examDetails = req.body;
    try {
        //connect to db 
        await client.connect();
        await client.db("result-manager").collection("exams").insertOne(examDetails)
            .then(result => res.send({ 'message': 'Exam Saved Successfully' }))
            .catch(err => {
                console.log(err);
                res.send({ 'errorMsg': 'Unable to save Exam' })
            })
    } catch (err) {
        console.log(err);
        res.send({ 'errorMsg': 'Unable to connect to server, please try again' });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

router.get('/getExams', async (req, res) => {
    const uri = "mongodb+srv://root:CxUKTwm54hF7Rhfv@cluster0.dm57q.mongodb.net/result-manager?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        //connect to db 
        await client.connect();
        let obj = {};
        if (req.query.department != '')
            obj.forDepartment = req.query.department
        if (req.query.year != '')
            obj.forYear = parseInt(req.query.year)
        const cursor = client.db("result-manager").collection("exams").find(obj, { _id: 0 })
        let exams = [];
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            delete doc._id
            exams.push(doc);
        }
        
        res.send({ 'data': exams })

    } catch (err) {
        console.log(err);
        res.send({ 'errorMsg': 'Unable to connect to server, please try again' });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

module.exports = router;