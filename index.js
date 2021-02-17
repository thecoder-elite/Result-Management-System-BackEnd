const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Import routes
const authRoute = require('./routes/auth');
const newExamRoute = require('./routes/createExams');
const addingMarks = require('./routes/addStudents');








//connect to db 
mongoose.connect('mongodb://localhost/esdnow' ,{ useUnifiedTopology: true } ,  () => {
    console.log('db connected')
});







//middleware

app.use(express.json());



//Routes middleware
app.use('/api/user' , authRoute);
app.use('/api/createExam' , newExamRoute);
app.use('/api/addStudentDetail' , addingMarks)




app.listen(3000 , () => console.log('listening on'));