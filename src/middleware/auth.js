const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token,'ishaan')

        const _id = decodedToken._id

        const user = await User.findOne({
            _id,
            'tokens.token' : token
        })

        if(!user){
            throw new Error()
        }

        const returnUser = user.toObject()

        delete returnUser.tokens

        req.user = returnUser
        next()

    }catch(error){
        console.log(error)
        res.status(401).send('Unauthorized')
    }
}

module.exports = auth