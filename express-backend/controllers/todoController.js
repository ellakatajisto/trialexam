const httpStatus = require("http-status-codes"),
    User = require("../models/user");


const ToDo = require("../models/todo"),
    getToDoParams = (body) => {
        return {
            name: body.title,
            done: body.done
        };
    };


module.exports = {
    index: (req, res, next) => {
        ToDo.find()
            .then((todos) => {
                res.locals.todos = todos;
                next();
            })
            .catch((error) => {
                console.log(`Error fetching todos: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("todos/index");
    },
    new: (req, res) => {
        res.render("todos/new");
    },
    create: (req, res, next) => {
        let todosParams = getToDoParams(req.body);
        ToDo.create(todosParams)
            .then((todo) => {
                res.locals.redirect = "/todos";
                res.locals.todo = todo;
                next();
            })
            .catch((error) => {
                console.log(`Error saving todo:${error.message}`);
                next(error);
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        var todoId = req.params.id;
        ToDo.findById(todoId)
            .then((todo) => {
                res.locals.todo = todo;
                next();
            })
            .catch((error) => {
                console.log(`Error fetching todo by ID:
               ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        res.render("todos/show");
    },
    edit: (req, res, next) => {
        var todoId = req.params.id;
        ToDo.findById(todoId)
            .then((todo) => {
                res.render("todos/edit", {
                    todo: todo,
                });
            })
            .catch((error) => {
                console.log(`Error fetching todo by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let todoId = req.params.id,
            todoParams = getToDoParams(req.body);
        ToDo.findByIdAndUpdate(todoId, {
                $set: todoParams,
            })
            .then((todo) => {
                res.locals.redirect = `/todos/${todoId}`;
                res.locals.todo = todo;
                next();
            })
            .catch((error) => {
                console.log(`Error updating todo by ID:
                           ${error.message}`);
                next(error);
            });
    },
    delete: (req, res, next) => {
        let todoId = req.params.id;
        ToDo.findByIdAndRemove(todoId)
            .then(() => {
                res.locals.redirect = "/todos";
                next();
            })
            .catch((error) => {
                console.log(`Error deleting todo by ID:
                           ${error.message}`);
                next();
            });
    },
};