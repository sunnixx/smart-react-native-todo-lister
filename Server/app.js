const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const Item = require('./models/Todo');

//Connect Database
mongoose.connect('mongodb://admin:FasT1234@ds018708.mlab.com:18708/todolistapp')
.then(() => console.log('Database connected'))
.catch(err => {throw err})

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var DATA = [];

//API calls
app.post('/store',(request,response) => {
  let arr = request.body

  const item = new Item();
  item.item = arr[arr.length-1].item;

  item.save(function() {
    console.log('item saved');
  });
})

app.get('/load',(request,response) => {
  Item.find({},(err,items) => {
    if(err) throw err;

    console.log(items);
    response.json(items);
  })
})

//Server port
app.listen(5000,(err) => {
  if(err) throw err;
  console.log("Server is running on http://localhost:5000");
})