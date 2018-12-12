const express = require ('express');
const body = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Mongoose  connection
mongoose.connect('mongodb://localhost/todo')
const todoSchema = new mongoose.Schema({
    name: String
});


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(body.urlencoded({extended: true}));

const Todo = mongoose.model('Todo', todoSchema);

// let todoList=['Wash car and change oil', 'Buy bread, milk and eggs']


// =============== Express Routes =============== //
app.get('/', function(req, res){
    Todo.find({}, function(err, todoList){
        if(err) console.log(err);
        else{
            res.render('index', {todoList: todoList})
        }
    })
});

app.get('*', function(req,res){
    res.send('<h1>Invalid page</h1>')
})

app.post('/newtodo', function(req,res){
    let newItem = new Todo({
        name: req.body.item
    });
    Todo.create(newItem, function(err, Todo){
        if(err) console.log(err);
        else{
            console.log('Inserted new item' + newItem);
            
        }
    })
    res.redirect('/')
})



app.listen(3000, function(){
    console.log('Server is runing');
})