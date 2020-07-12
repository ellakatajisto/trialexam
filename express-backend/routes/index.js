const router = require('express').Router()
const express = require('express')

const indexController = require('../controllers/indexController')
const chatController = require('../controllers/chatController')

// require todo controller
const todoController = require('../controllers/todoController')

const layouts = require('express-ejs-layouts')
const path = require('path')
const methodOverride = require('method-override')

const passport = require('passport')

const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const connectFlash = require('connect-flash')

const devSessionSecret = 'non_secure_session_secret'
const sessionSecret = process.env.SESSION_SECRET || devSessionSecret
if ((sessionSecret === devSessionSecret) && (process.env.NODE_ENV === 'production')) {
    console.log('WARNING! using unsecure default SESSION_SECRET')
}
router.use(express.static(path.join(__dirname, '../public')))


router.use(connectFlash())

router.use(cookieParser(sessionSecret))
router.use(expressSession({
    secret: sessionSecret,
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

router.use(
    methodOverride('_method', {
        methods: ['POST', 'GET']
    })
)

router.use(layouts)

router.use(
    express.urlencoded({
        extended: false
    })
)

router.use(express.json())

router.get('/chat', chatController.chat)
router.get('/', indexController.index)


// Route for sample Data
router.get("/todos_sample", indexController.showTodos);

// Normal Routes for ToDos
router.get("/todos", todoController.index, todoController.indexView);
router.get("/new", todoController.new);
router.post(
    "/create",
    todoController.create,
    todoController.redirectView
);
router.get("/:id", todoController.show, todoController.showView);
router.get("/:id/edit", todoController.edit);
router.put(
    "/:id/update",
    todoController.update,
    todoController.redirectView
);

router.delete(
    "/todos/:id/delete",
    todoController.delete,
    todoController.redirectView
);

router.post(
    "/delete/Likes",
    todoController.redirectView
);

module.exports = router
