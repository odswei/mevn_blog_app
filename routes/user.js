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
const multer = require('multer')





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

// const fileFilter = (req,res,cb)=>{
//     const allowedTypes = ["image/jpeg","image/jpg","image/png"]
//     if(!allowedTypes.includes(file.type)){
//         const error = new Error("Incorrect file")
//         error.code = "INCORRECT_FILETYPE"
//         return cb(error,false)
//     }
//     cb(null,true)
// }
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5000000 },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) { //allowed file extensions
        return cb(new Error("please upload png,jpeg or jpg"));
      }
      cb(undefined, true);
    }
  });

router.post('/upload', enc.decrypt,passport.authenticate('jwt',{session:false}),upload.single('file'),(req,res)=>{
         const uid =   req.user.id

         var newImg ={
             img:{
            data:fs.readFileSync(req.file.path),
            contentType:req.file.mimetype
             }            
                 
         };
         console.log("file",req.file)

         Image.findOneAndUpdate({uid:uid},{$set:newImg},{new:true,useFindAndModify: false},function(err,item){
             if(err)return(err)
            //  console.log("hey",item)
           res.send(item);
         })

         
      
      
})



router.get('/image',  enc.decrypt,passport.authenticate('jwt',{session:false}), (req, res) => {
    Image.findOne({uid:req.user.id}, (err, items) => {
        if (err)res.send(err)
        res.contentType('json')
        console.log(items)
        var base64String =(Buffer.from(items.img.data).toString('base64'))
        res.send(base64String);
        

    })
});

module.exports = router;
