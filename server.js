const express = require('express')
const cors = require('cors')
const passport = require('passport')
const path =require('path')
var history = require('connect-history-api-fallback');




require('dotenv').config()

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


    if(process.env.NODE_ENV==='production'){

    app.use('/',(express.static(__dirname + '/public')))
    app.use(require('./routes'))
   
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html')

        });

    app.use(history()) 
    app.use((express.static(__dirname + '/public')))
        // app.get(/.*/,(req,res)=>{
        //     res.sendFile(__dirname + '/public/index.html')
        // })
    
    app.use(function (req, res) {
        // Optional 404 handler
        res.status(401);
        res.redirect('/')
    })
    
   
}else{
    const corsOptions = {
    origin: 'http://localhost:8080',
    allowedHeaders: 'content-Type, Authorization',
    maxAge:3166950
}
    app.use(cors(corsOptions))
    app.use(require('./routes'))
}





app.listen( process.env.PORT ||3000, ()=>{console.log('listen to port 3000')})