var express = require('express');
var bodyPaser = require('body-parser');
var morgan = require('morgan');

var app = express();
var user = require('./api/user');
if(process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:true}));
app.use('/users',user);

module.exports = app;