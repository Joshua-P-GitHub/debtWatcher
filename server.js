require('dotenv').config()
require('./config/db')
const express = require('express');
const path = require('path');
const logger = require('morgan');


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'build')));
app.use('/user', require('./routes/user'));
app.use('/debt', require('./routes/debt'))

let port = process.env.PORT || 3001

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});