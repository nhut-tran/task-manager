const express = require('express');
const path = require('path')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
require('./db/mongoose.js')

const app = new express();
const multer = require('multer');
const test = multer({
    dest: 'images'
})
app.post('/upload', test.single('upload'), (req, res)=>{
    res.send()
})
//load mongoose models

//set up asset
app.use('/', express.static(path.join(__dirname, '../public')))
app.use(express.json())

//route for user model
app.use(userRouter)
//route for task model
app.use(taskRouter)

app.listen(80, '127.0.0.1', () => {
    console.log('server is up')
})

// const jwt = require('jsonwebtoken');
// async function test () {
//     const token = jwt.sign({id: 'nhut'}, 'nhutnhutnhutnhut', {expiresIn: '1y'})
//     console.log(token)
//     console.log(jwt.verify(token, 'nhutnhutnhutnhut'))
// }
//test()

// const Task = require('./models/task');
// const User = require('./models/user')

// const test = async () => {
//     const task = await Task.findById('5d4d89f57b68201f882922c2');
//     await task.populate('owner').execPopulate()
//     const user = await User.findById('5d4c36616b62df062caa8c84')
//     await user.populate('task').execPopulate()
//     console.log(user.task)

// }

// test()