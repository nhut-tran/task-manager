require('../db/mongoose');

const User = require('../models/user');

// User.findOneAndUpdate('5d4311af65f86c0b38e83619', {name: 'nhut1'}).then((res)=> {
//     console.log(res)
//     return User.countDocuments({name: 'nam'})
// }).then((res)=> console.log(res))
const updateUser = async (newName) => {
    const user = await User.findOneAndUpdate({_id:'5d4311af65f86c0b38e83619'}, {name: newName})
    const count = await User.countDocuments({name: newName})
    return count
}

updateUser('nhut').then((res)=> {
    console.log(res)
}).catch((e)=> {
    console.log(e)
})