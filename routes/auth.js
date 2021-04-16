const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
//login

router.post('/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const uri = "mongodb+srv://root:CxUKTwm54hF7Rhfv@cluster0.dm57q.mongodb.net/result-manager?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        //connect to db 
        await client.connect();

        await client.db("result-manager").collection("users").findOne({
            name: name,
            password: password            
        })
        .then(cursor => {
            if(cursor){
                res.send({'userType': cursor.userType});
            }
            else
                res.send({'errorMsg': 'Username or password is not valid'});
        })
        .catch(err => {throw err});       
    } catch (err) {
        console.log(err);    
        res.send({ 'errorMsg': 'Unable to connect to server, please try again' });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
});

router.get('/getStudent', async (req, res)=>{
    const userid = req.query.userId;
    const uri = "mongodb+srv://root:CxUKTwm54hF7Rhfv@cluster0.dm57q.mongodb.net/result-manager?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        //connect to db 
        await client.connect();
        let cursor = await client.db("result-manager").collection("users").find({name: userid})
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


module.exports = router;

