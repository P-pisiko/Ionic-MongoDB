const express = require('express');

const port = 8887;
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const mongoose = require('mongoose');
const DataBase = 'mongodb://0.0.0.0:27017/sheridan';
mongoose.set('strictQuery', true);
const courseSchema = new mongoose.Schema({
    cid: String,
    wday: String,
    prof: String
});

const course = mongoose.model('courses', courseSchema);

mongoose.connect(DataBase);

const db = mongoose.connection;

db.on('error', (err) => { console.log(err); })
db.once('open', () => {

    app.post('/insert', (req, res) => {
        input = req.body.data;
        console.log('insert:',input);
        course.create(input)
            .then(
                result => {
                    res.send({ "message": 'Record added' });
                },
                err => { res.send(err.message); })
            .catch(err => { console.log(err); });
    });

    app.get('/retrieve', (req, res) => {
        input = req.query;
        console.log("Get:" ,input)
        course.find(input)
            .then(
                result => {
                    res.send(result);
                },
                err => { res.send(err.message); })
            .catch(err => { console.log(err); });
    });
        
});

app.listen(port, () => console.log(`Server running at localhost: ${port}!`))