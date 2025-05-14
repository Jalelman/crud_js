const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set("view engine", "ejs");

const indexRoutes = require('./routes/index');
app.use("/", indexRoutes)

app.get("/", (req, res) => {
    res.send("welcome to nodejs project list")
})

app.listen(port, () => {
    console.log("server is running at this port  " + port);
})