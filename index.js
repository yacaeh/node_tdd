var express = require('express');
var bodyPaser = require('body-parser');

var app = express();
var users =[{id:1,name:'test'},{id:2,name:'test2'},{id:3,name:'test3'}];
const port = 3100;
app.use(function (req, res, next) {
    console.log("app use");
    next();
});
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.send('Hello World!');
  });
  
  
app.get('/users', function (req,res){
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
})

app.get('/users/:id', function(req,res) {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)){
        return res.status(400).end();
    }
    const user = users.filter((user)=> {
        return user.id === id;
    })[0];
    if (!user){
        return res.status(404).end();
    }
    res.json(user);
})

app.delete('/users/:id', function(req,res) {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)){
        return res.status(400).end();
    }
    const user = users.filter((user)=> {
        return user.id !== id;
    });
    res.status(204).end();
})


app.post('/users', (req,res) => {
    const name = req.body.name;
    if(!name){
        res.status(400).end();
        return true;
    }
    const isExist = users.filter(user=> user.name === name).length;
    if(isExist){
        res.status(409).end();
        return true;
    }
    const id = Date.now();
    const user = {id,name};
    users.push(user);
    res.status(201).json(user);    
})

app.put('/users/:id', (req,res) => {
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;
    if(!name){
        res.status(400).end();
        return true;
    }

    if(Number.isNaN(id)){
        res.status(400).end();
        return true;
    }
    const isExist = users.filter(user=> user.name === name).length;
    if(isExist){
        res.status(409).end();
        return true;
    }

    const user = users.filter(user=> user.id === id)[0];
    if(!user) return res.status(404).end();
    
    user.name = name;
    res.json(user);
})


app.listen(port,function(){
    console.log("Server on "+port)
})

module.exports = app;