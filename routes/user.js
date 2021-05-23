const mongoose = require('mongoose')
const router = require('express').Router()
const User = mongoose.model('User')
const passport = require('passport')
const util = require('../helpers/util')
// Nodejs encryption with CTR
var crypto = require("crypto");
const { json } = require('express')
var algorithm = "aes-192-cbc";
var password = "Hello darkness";
let token = null;
const Series = mongoose.model('Series')
const Image = mongoose.model('Image')
const fs = require('fs')
const path = require('path')

var text= "this is the text to be encrypted"; 

function encrypt(text) {
    const key = crypto.scryptSync(password, 'salt', 24); //create key
    console.log("e",key)
    const iv = "9bd717d681151874";
    console.log("e",iv)

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex'); // encrypted text
    return encrypted
   }
   
function decrypt(req,res,next) {
    const key = crypto.scryptSync(password, 'salt', 24); //create key
    console.log("d",key)
    const iv = "9bd717d681151874";
    console.log("d",iv)
    const hero = req.headers.authorization
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    var decrypted = decipher.update(hero, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text

    const token = decrypted
    const hello = JSON.parse(token)
    req.headers.authorization=hello.token
    console.log(hello.token)
    next()
   }

  router.post('/login', function(req, res, next){

    User.findOne({ username: req.body.username })
        .then((user) => {
            
            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            // Function defined at bottom of app.js
            const isValid = util.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const tokenObject =util.issueJWT(user);
                const t=JSON.stringify( tokenObject)


                var hw = encrypt(t)

                res.status(200).json({ success: true,hw});

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
});

// Register a new user
router.post('/register', function(req, res, next){
    const saltHash = util.genHashPass(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });



    try {
    
        newUser.save()
            .then((user) => {
                res.json({ success: true});
            });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }

});


router.get('/',decrypt,(req,res,next)=>{

    res.json("hi")
})

router.get('/me',decrypt,passport.authenticate('jwt',{session:false}),(req,res,next)=>{

    res.json(req.user)
})

router.get('/series',decrypt,passport.authenticate('jwt',{session:false}),function(req,res,next){
    
    Series.find().then(response=>{
        res.send(response)
    })
})

router.post('/upp',decrypt,passport.authenticate('jwt',{session:false}),function(req,res,next){
    const uid = req.user._id
    const image = fs.readFileSync(path.resolve(__dirname, "taylor.jpg"), {encoding:'base64'})
    const obj = new Image ({
        uid:uid,
        img: { 
            data: image,
            contentType: 'image/jpg'
        } 
    })
    obj.save().
    then((img)=>{
        res.json(img)
    })

})

module.exports = router;
