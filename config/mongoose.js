const mongoose = require("mongoose");
// connecting to db
mongoose.connect("mongodb://localhost/todo_list_db");
// connected ..now getting access to db
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'eeror connecting to db'))
db.once('open', function() {
    console.log("connection to db is established")

})