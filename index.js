const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
// any request first gooes to index,js in route directory
// app.use("/", require('./routes/index'));

// setting up view engine
app.set("view engine", "ejs");
// where to look for views
app.set("views", "./views");

// index.js will use this file for routing
app.use('/', require('./routes/'));

app.use(express.static("assets"));
app.listen(PORT, function(err) {
    if (err) {
        console.log(`Error : ${err}`);

    }
    console.log(`Server is running on PORT ${PORT}`)
});