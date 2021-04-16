const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;


router.delete('/delete/:studentId/:examId', async (req, res) => {
    const sid = req.params.studentId;
    const eid = req.params.examId;
    const uri = "mongodb+srv://root:CxUKTwm54hF7Rhfv@cluster0.dm57q.mongodb.net/result-manager?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(sid, eid);
    
    try {
        //connect to db 
        await client.connect();

        let deleted = await client.db("result-manager").collection("students").deleteOne({studentID: sid, examID: eid})
        console.log(deleted.deletedCount);
        
        if(deleted.deletedCount >= 1){
            res.send({ 'msg': 'student data deleted successfully' });
        }
    } catch (err) {
        console.log(err);
        res.send({ 'errorMsg': 'Unable to connect to server, please try again' });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

})
module.exports = router;