import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express();
const port = 3000;

app.use(express.static('../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));

const data = [];
const wData = [];

const d = new Date();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// dates

let weekDay = weekDays[d.getDay() - 1];
let month = months[d.getMonth()];
let day = d.getDate();
let year = d.getFullYear();

app.get('/', (req, res) => {
    res.render('index.ejs', {
        data: data,
        weekday: weekDay,
        month: month,
        day: day,
        year: year
    });
});

app.get('/work', (req, res) => {
    res.render('work.ejs', {data: wData});
})

app.post('/', (req, res) => {
    const task = req.body['task'];
    data.unshift(task);
    res.render('index.ejs', {
        data: data,
        weekday: weekDay,
        month: month,
        day: day,
        year: year
    });
});

app.post('/work', (req, res) => {
    const task = req.body['task'];
    wData.unshift(task);
    res.render('index.ejs', {data: wData,});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});