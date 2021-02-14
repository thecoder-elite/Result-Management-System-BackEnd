const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Import routes
const authRoute = require('./routes/auth');








//connect to db 
mongoose.connect('mongodb://localhost/esdnow' ,{ useUnifiedTopology: true } ,  () => {
    console.log('dsssb came here')
});







//middleware

app.use(express.json());



//Routes middleware
app.use('/api/user' , authRoute);




app.listen(3000 , () => console.log('listening on'));