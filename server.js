const express = require('express')
const cors = require('cors')
const passport = require('passport')


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

app.use(cors())


app.use(require('./routes'))



app.listen(3001, ()=>{console.log('listen to port 3001')})