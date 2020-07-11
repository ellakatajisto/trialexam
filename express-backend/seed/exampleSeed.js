const {mongoURI} = require('../config')
const mongoose = require('mongoose')
const User = require('../models/user')
const ToDo = require('../models/todo')
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const userData = []
const faker = require('faker')
faker.locale = 'de'

for (let i = 0; i < 20; i = i + 1) {
    userData.push(
        {
            name: {
                first: faker.name.firstName(),
                last: faker.name.lastName()
            },
            email: faker.internet.email(),
            zipCode: faker.address.zipCode('#####'),
            password: faker.internet.password()
            // password: 'geheim12'
        })
}
console.log('userData ' + userData.length)
User.deleteMany({})
    .then(() => {
        console.log('all users deleted')
        return User.create(userData)
    })
    .then(created => {
        console.log(created.length + ' users created')

    })
    .catch(error => {
        console.log(error.message)
        mongoose.connection.close()
    })

const todoData = []
for (let i = 0; i < 20; i = i + 1) {
    todoData.push(
        {
            title: faker.random.word(),             
                    
            
        })
}
console.log('todoData ' + todoData.length)
ToDo.deleteMany({})
    .then(() => {
        console.log('all todos deleted')
        return ToDo.create(todoData)
    })
    .then(created => {
        console.log(created.length + ' todos created')

    })
    .catch(error => {
        console.log(error.message)
        mongoose.connection.close()
    })
