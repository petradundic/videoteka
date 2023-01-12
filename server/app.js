const express = require('express');
const mongoose=require('mongoose');
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express()


const port = process.env.PORT || 3000;

 mongoose.connect('mongodb://localhost:27017/moviesDB')  // promijenit ime baze!!
const db = mongoose.connection

db.on('error', (error)=>console.error(error));
db.once('open', ()=>console.log("Database opened"));

    
app.listen(port, ()=>{
console.log("Running on port " + port); 
})

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({type: 'application/json'}));

app.use(express.json())

app.use(cors({origin: "*", credentials: true}));

app.use("/users", require("./routes/user"));
app.use("/movies", require("./routes/movie"));