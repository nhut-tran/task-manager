require('../db/mongoose');
const Task = require('../models/task')

// Task.findOneAndDelete({_id: '5d430cd134ce2722cca98f12'})
// .then((res) => {
//     console.log(res)
//     return Task.countDocuments({completed:false})
// })
// .then((res)=> console.log(res))
// .catch((e)=> console.log(e))

const updateTask = async (description) => {
    const task = await Task.findByIdAndDelete({_id:'5d41ad2366365d22c41ab488'}, { description})
    const count = await Task.countDocuments({description})
    return count
}

updateTask('task 5').then((c)=> {
    console.log(c)
})