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
        // return res.redirect('back')
        res.json({
            id: newTodo.id,
            description: newTodo.description,
            dueDate: newTodo.dueDate,
            category: newTodo.category
        })

    })

})
app.post('/update/', function(req, res) {
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
            // if (err) return handleError(err);
            if (err) {
                console.log("not updated")

            }
            // return res.redirect("back"); // Or redirect, basically finish request.
            console.log("db updated")

            // let data = {
            //     id: task.id,
            //     description: task.description,
            //     dueDate: task.dueDate
            // }
            // res.end(JSON.stringify(data))
            res.json({
                id: task.id,
                description: task.description,
                dueDate: task.dueDate
            })
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

app.post('/delete_todo/', function(req, res) {
    // get the query from url
    let id = req.query.id;
    // if (!req.query.id) {
    //     return res.redirect("back");

    // }
    if (id == undefined) {
        return res.end();

    }

    // for deleting single task
    if ((typeof id) == "string") {
        TodoList.findByIdAndDelete(id, function(err) {
            if (err) {
                console.log("error deleting");
                return res.end();
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
                    return re.end();
                }
                console.log("deleted")

            })
        }

    }
    return res.end();

});

app.post('/update_todo/', function(req, res) {
    // get the query from url
    let id = req.query.id;
    // if (!req.query.id) {
    //     return res.redirect("back");

    // }
    if (id == undefined) {
        return res.end();

    }

    // for deleting single task
    if ((typeof id) == "string") {
        TodoList.findById(id, function(err, task) {
            if (err) {
                consle.log("not found")
                return re.end();
            }

            if (task.active == true) {
                task.active = false;

            } else {
                task.active = true;

            }

            task.save(function(err) {
                // if (err) return handleError(err);
                if (err) {
                    console.log("not updated")

                }
                // return res.redirect("back"); // Or redirect, basically finish request.
                console.log("db updated")

            });
        });
    }

    // for deleting multiple task
    if ((typeof id) == "object") {
        for (let i of id) {


            TodoList.findById(i, function(err, task) {
                if (err) return handleError(err);

                if (task.active == true) {
                    task.active = false;

                } else {
                    task.active = true;

                }

                task.save(function(err) {
                    // if (err) return handleError(err);
                    if (err) {
                        console.log("not updated")

                    }

                    console.log("db updated")


                });
            });
        }

    }
    return res.end();

});


app.use(express.static("assets"));
app.listen(port, function(err) {
    if (err) {
        console.log(`Error : ${err}`);

    }
    console.log(`Server is running on port ${port}`)
});