const port = 3001;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const page = require('./routes/page');

let dbURL = 'mongodb://localhost:27017/';
let mongoDB = process.env.MONGODB_URI || dbURL;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/page', page);

app.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});
