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

//API calls
app.post('/store',(request,response,done) => {
  let arr = request.body

  const item = new Item();
  item.item = arr[arr.length-1].item;

  item.save(function() {
    console.log('item saved');
  });
})

app.get('/load',(request,response,done) => {
  Item.find({},(err,items) => {
    if(err) return done(err);

    response.json(items);
  })
})

app.post('/edit',(request,response,done) => {
  Item.findById(request.body.id,(err,item) => {
    if(err) return done(err);

    item.item = request.body.item;
    item.save((err,updatedItem) => {
      if(err) return done(err);
      response.json(updatedItem);
    });
  });
});

app.post('/delete',(request,response,done) => {
  Item.findByIdAndRemove(request.body.id,(err,response) => {
    if(err) return done(err);
    response.json(response);
  });
});

//Server port
app.listen(5000,(err) => {
  if(err) throw err;
  console.log("Server is running on http://localhost:5000");
})