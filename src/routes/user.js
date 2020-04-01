const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/signUp',async (req,res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send('User created successfully')
    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/login', async (req,res) => {

    const user = await User.findByCredential(req.body.email,req.body.password)

    if (user === 'User not found'){
        return res.status(404).send(user)
    }
    if (user === 'Invalid credentials'){
        return res.status(401).send(user)
    }

    const token = await user.generateAuthToken()

    res.send(token)
})

router.get('/getData', auth, async (req,res) => {
    try{
        res.status(200).send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router