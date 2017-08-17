const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');



app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res){
  res.render('index');
});

app.post('/', function(req, res){
  let newTodo = req.body.addtodo;
  res.send(newTodo);
});

app.listen(port, function(){
  console.log("listening")
});
