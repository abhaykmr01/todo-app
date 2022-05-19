const express = require('express');
const app = express();
const port = 8000;
// any request first gooes to index,js in route directory
app.use("/", require('./routes/index'));

// setting up view engine
app.set("view engine", "ejs");
// where to look for views
app.set("views", "./views");

app.use(express.static("assets"));
app.listen(port, function(err) {
    if (err) {
        console.log(`Error : ${err}`);

    }
    console.log(`Server is running on port ${port}`)
});