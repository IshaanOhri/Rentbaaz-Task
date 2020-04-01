require('./db/database')
const express = require('express')
const userRoutes = require('./routes/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRoutes)

app.get('/',(req,res) => {
    res.send('Hello World')
})

app.listen(port,() => {
    console.log('App started at port', port)
})
