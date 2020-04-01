const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter valid email')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 8
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    
    const token = jwt.sign({
        _id : user._id,
        name : user.name,
        email : user.email,
        password : user.password
    }, 'ishaan', {
        expiresIn : '2 days'
    })

    user.tokens = user.tokens.concat({token})
    await user.save()

    return(token)
}

userSchema.statics.findByCredential = async (email,password) => {
    const user = await User.findOne({
        email
    })

    if(!user){
        return 'User not found'
    }

    const verify = await bcrypt.compare(password, user.password)

    if(!verify){
        return 'Invalid credentials'
    }

    return user
}

userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User