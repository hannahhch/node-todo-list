const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

//set an array for the to do list items and finished todo list items
let todos = [];
let doneArr = [];

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static(__dirname + '/public'));
//this is needed to get the input data from the page
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//this tells it to use the index page and put the array mustache on the page
app.get('/', function (req, res){
  res.render('index', { todos: todos, doneArr:doneArr});
});

//push the todo items onto the array that are coming from the 'todo' input field
app.post('/', function(req, res){
  todos.push(req.body.todo);
  //make sure it doesn't redirect to another page?
  res.redirect('/');
});

//push the array items from the completed button to a different array
app.post('/mark', function(req, res){
  doneArr.push(req.body.complete);
  //get the index of the complete field items
  const ix = todos.indexOf(req.body.complete);
  //if greater than -1 (because arrays set at 0), splice the item off by 1
  if (ix > -1) {
    todos.splice(ix, 1);
  }
  res.redirect('/');
});

app.listen(port, function(){
  console.log("listening")
});
