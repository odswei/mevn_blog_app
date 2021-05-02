const mongoose = require('mongoose')

require('dotenv').config()

const connection = process.env.DB

mongoose.connect(connection,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

mongoose.connection.on('connected',()=>{
    console.log("connected!")
})