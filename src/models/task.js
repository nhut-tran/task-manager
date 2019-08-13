const mongoose = require('mongoose');
const Taskschema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'User'
    }
},
{
    timestamps: true
})

const Tasks = mongoose.model('tasks', Taskschema)

module.exports = Tasks