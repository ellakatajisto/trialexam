"use strict";

var todos = [
  {
    title: "Wake up very early",
    done: false
  },
  {
    title: "Get a job",
    done: false
  },
  {
    title: "Buy new Icecream",
    done: false
  }
];

exports.showTodos = (req, res) => {
    res.render("todos", {
      someTodos: todos
    });
  };

exports.index = (req, res) => {
    res.render('index')
}
