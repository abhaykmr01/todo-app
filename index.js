const express = require('express');
const app = express();
const port = 8000;
// any request first gooes to index,js in route directory
app.use("/", require('./routes/index'));

// setting up view engine
app.set("view engine", "ejs");
// where to look for views
app.set("views", "./views");

// index.js will use this file for routing
app.use('/', require('./routes/'));
// setting up middlware(handles all the req res between bowser and controller)
// setting up body-parser for getting data from browser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const db = require("./config/mongoose");
// // db contact monipulation through Contact
const TodoList = require('./models/todo_list')
app.post('/add_todo', function(req, res) {
    // create task for todo_list

    TodoList.create({
        description: req.body.description,
        category: req.body.category,
        dueDate: req.body.dueDate
    }, function(error, newTodo) {
        if (error) {
            console.log("Error in creating task");
            return;

        }
        console.log("******", newTodo);
        return res.redirect('back')

    })

})

app.use(express.static("assets"));
app.listen(port, function(err) {
    if (err) {
        console.log(`Error : ${err}`);

    }
    console.log(`Server is running on port ${port}`)
});