const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 10) {
                throw new Error('age > 10')
            }
        },
        require: true
    }, 
    email: {
        type: String,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('invalid email')
            }
        }
    },
    password: {
        type: String,
        require: true,
        validate(value) {
            if(value.length < 8 || value.includes('password')) {
                throw new Error('password length >= 8')
            }
        },
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            require:true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

Userschema.virtual('task', {
    ref: 'tasks',
    localField: '_id',
    foreignField: 'owner'
})

Userschema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({_id: this._id.toString()}, 'nhutnhut')
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}
Userschema.methods.publicUser = function () {
    const publicUserObj = this.toObject()
    delete publicUserObj.password
    delete publicUserObj.tokens
    return publicUserObj
}

Userschema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email})
    if(!user) {
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('unable to login')
    }

    return user
}
Userschema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

Userschema.pre('remove', async function (next) {
   await Task.deleteMany({owner: this._id})
    next()
})


const User = mongoose.model('User', Userschema)

module.exports = User