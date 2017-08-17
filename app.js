const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

let todos = [];
let doneArr = [];

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res){
  res.render('index', { todos: todos, doneArr:doneArr});
});

app.post('/', function(req, res){
  todos.push(req.body.todo);
  res.redirect('/');
});

app.post('/mark', function(req, res){
  doneArr.push(req.body.complete);
  todos.pop(this);
  res.redirect('/');
});

app.listen(port, function(){
  console.log("listening")
});
