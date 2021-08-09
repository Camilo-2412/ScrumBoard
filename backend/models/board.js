const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    userId = {type: mongoose.Schema.ObjectId, ref:"user"},
    name: String,
    description: String,
    taskStatus: String,
    imageURL: String,
    date: {type: Date, default:Date.now}, 
});

const board = mongoose.model("board" , boardSchema);
module.exports = board;