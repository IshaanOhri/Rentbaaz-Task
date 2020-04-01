const mongoose = require('mongoose')

const DATABASE_URL = "mongodb+srv://IshaanOhri:18bce0265@cluster0-mdqqq.mongodb.net/RentBaaz?retryWrites=true&w=majority"

mongoose.connect(DATABASE_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}, (error,client) => {
    if(error){
        return console.log(error)
    }

    console.log('Connection to database successful')
})
