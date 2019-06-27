var express = require('express');
var lettersRouter = require('./routes/letters');

var app = express();
app.use(express.json());
app.use('/letters', lettersRouter);

module.exports = app;