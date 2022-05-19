const express = require('express');
const app = express();
const port = 8000;
// any request first gooes to index,js in route directory
// app.use("/", require('./routes/index'));

// setting up view engine
app.set("view engine", "ejs");
// where to look for views
app.set("views", "./views");

// index.js will use this file for routing
// app.use('/', require('./routes/'));
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
        dueDate: req.body.dueDate,
        active: "true"
    }, function(error, newTodo) {
        if (error) {
            console.log("Error in creating task");
            return;

        }
        console.log("******", newTodo);
        return res.redirect('back')

    })

})
app.get('/update/', function(req, res) {
    // get the query from url
    let id = req.query.id;
    TodoList.findById(id, function(err, task) {
        if (err) return handleError(err);

        if (task.active == true) {
            task.active = false;

        } else {
            task.active = true;

        }

        task.save(function(err) {
            if (err) return handleError(err);
            return res.redirect("back"); // Or redirect, basically finish request.
        });
    });
})

app.get('/', function(req, res) {
    TodoList.find({}, function(err, todo) {
        if (err) {
            console.log("Error in fetching from db");
            return;
        }
        return res.render('home', {
            title: "TODO APP",
            todo_list: todo

        });
    })

});

app.get('/delete_todo/', function(req, res) {
    // get the query from url
    let id = req.query.id;
    // if (!req.query.id) {
    //     return res.redirect("back");

    // }
    if (id == undefined) {
        return res.redirect("back");

    }
    console.log(typeof id)
        // for deleting single task
    if ((typeof id) == "string") {
        TodoList.findByIdAndDelete(id, function(err) {
            if (err) {
                console.log("error deleting");
                return;
            }
            console.log("deleted")

        })
    }

    // for deleting multiple task
    if ((typeof id) == "object") {
        for (let i of id) {


            TodoList.findByIdAndDelete(i, function(err) {
                if (err) {
                    console.log("error deleting");
                    return;
                }
                console.log("deleted")

            })
        }

    }
    return res.redirect("back");

});

app.use(express.static("assets"));
app.listen(port, function(err) {
    if (err) {
        console.log(`Error : ${err}`);

    }
    console.log(`Server is running on port ${port}`)
});