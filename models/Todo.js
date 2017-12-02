const mongoose = require("mongoose"),
    Schema = mongoose.Schema;


const todoSchema = new Schema({
    complete: {type: Boolean},
    text: {type: String}

});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;