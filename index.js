const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())

//Import routes
const authRoute = require('./routes/auth');
const examRoute = require('./routes/examHandler');
const addStudents = require('./routes/addStudents');
const updateStudent = require('./routes/updateStudent');

app.use(express.json());


//Routes middleware
app.post('/login' , authRoute);
app.get('/getStudent', authRoute);
app.post('/createExam' , examRoute);
app.get(['/getExams', '/:examId'], examRoute);
app.post('/addStudentDetail', addStudents)
app.get('/getStudentDetails/:examId', addStudents);
app.delete('/delete/:studentId/:examId', updateStudent)




app.listen(3000 , () => console.log(`listening on port 3000`));