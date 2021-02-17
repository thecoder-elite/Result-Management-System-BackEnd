const router = require('express').Router();
const User = require('../models/User');

//login

router.post('/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const user = await User.findOne({name: name})


    try{
        if (user.password == password) {
            res.send({"success" : 1});
        }
        else{
            res.send({"success" : 0});
        }
    }catch(err){
        res.send({message :err});
    }
    //password check
    

});


module.exports = router;

