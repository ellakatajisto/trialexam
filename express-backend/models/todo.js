"use strict";

const mongoose = require("mongoose"),
    {
        Schema
    } = mongoose,
    todoSchema = new Schema({
        title: {
            type: String,
            default: "default title"
        },
        done: {
            type: Boolean,
            default: false
        }
    });

module.exports = mongoose.model("ToDo", todoSchema);
