const mongoose = require("mongoose");
const axios = require("axios");
const Todo = require("../models/Todo.js");
const bodyParser = require ('body-parser');
const express = require("express"),
    app = express()
    PORT = process.env.PORT || 8080;

app.use(express.static(__dirname+"/build"))

app.use(bodyParser.json());

//When post request is made, parse url encoded values
app.use(express.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });




const MONGO_CONNECTION_STRING = "mongodb://localhost:27017"
mongoose.connect(MONGO_CONNECTION_STRING);

const connection = mongoose.connection;

connection.on("open", ()=>{
    console.log("Connected to mongo");
});


//POST - Create

app.post("/", (req, res) =>{
    Todo({
        complete: req.body.complete,
        text: req.body.text,
    }).save()
        .then(savedTodo =>{
            res.json(savedTodo);
        })
        .catch(err=> {
            console.log(err)
            res.status(400).json({err})
        })
});

//GET (Retrieve entire list)
app.get("/", (req, res)=>{
    Todo.find({})
    .then(array => {
        //When you use .find(), the results are ALWAYS given in an array, even if only one document matched 
        res.send(array);
    })
    .catch(error =>{
        console.log(error);
        res.sendStatus(500).send("We encountered an error");
    })
})

//GET (Retrieve single record by index)
app.get("/:todoID", (req, res)=>{
    Todo.find({"index": req.params.todoID})
    .then(object => {
        //When you use .find(), the results are ALWAYS given in an array, even if only one document matched 
        res.send(object);
    })
    .catch(error =>{
        console.log(error);
        res.sendStatus(500).send("We encountered an error");
    })
})

//PUT (Update)
app.put("/", (req, res)=>{

    Todo.findOneAndUpdate(
        {"_id": req.body._id}, //identifying object to update
        {"complete": req.body.complete}, //update data
        {/*new:true, runValidators:true*/}) //optional options object: currently empty
        .then(updatedTodo =>{
            res.json(updatedTodo);
        })
        .catch(error =>{
            console.log(error);
            res.status(500).send("nope");
        })   
})

//DELETE (Delete)
app.delete("/", (req ,res) =>{
    Todo.findOneAndRemove({"_id":req.body.id})
    .then(deletedToDo=>{
        res.json({deleted: true})
    })
    .catch(err =>{
        res.status(400).json({err});
    })
    


})


app.listen(PORT, ()=>{
    console.log("We are listening on Port", PORT);
})