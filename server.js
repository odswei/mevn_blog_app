const express = require('express')
const cors = require('cors')
const passport = require('passport')


// require('dotenv').config()

var app = express()

require('./config/database')

require('./models/user')
require('./models/post')
require('./models/series')
require('./models/chapter')
require('./models/comment')
require('./models/image')

require('./config/passport')(passport)

app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())


app.use(require('./routes'))

app.use((err,req,res,next)=>{
    if(err.code == "INCORRECT_FILETYPE"){
        res.status(422).json({error:"only images are allowed"})
        return
    }
})

if(process.env.NODE_ENV==='production'){
    app.use(express.static('public'))

    app.get(/.*/,(req,res)=>{
        res.sendFile('public/index.html')
    })
}



app.listen( process.env.PORT || 3001, ()=>{console.log('listen to port 3001')})