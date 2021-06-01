const mongoose = require('mongoose')
const router = require('express').Router()
const User = mongoose.model('User')
const passport = require('passport')
const util = require('../helpers/util')
// Nodejs encryption with CTR
const enc = require('../helpers/encrypt')
const Series = mongoose.model('Series')
const Image = mongoose.model('Image')
const fs = require('fs')
const path = require('path')
const { response } = require('express')





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


                var hw = enc.encrypt(t)

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


router.get('/',enc.decrypt,passport.authenticate('jwt',{session:false}),(req,res,next)=>{

    res.json(req.user)
})

// router.get('/user/:id',(req,res,next)=>{
//     User.findById(req.params.id).then((response)=>{
//         res.json(response.username)
//     })
// })

// router.get('/series',function(req,res,next){
    
//     Series.find().then(response=>{
//         res.json(response.username)
//     })
// })

router.post('/upp',enc.decrypt,passport.authenticate('jwt',{session:false}),function(req,res,next){
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
