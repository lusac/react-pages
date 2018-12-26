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
app.use((_, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, X-Total-Count');
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
})

app.use('/pages', page);

app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});
