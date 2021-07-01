const mongoose = require('mongoose')
const router = require('express').Router()
const User = mongoose.model('User')
const passport = require('passport')
const util = require('../helpers/util')
// Nodejs encryption with CTR
const enc = require('../helpers/encrypt')
const Chapter = mongoose.model('Chapter')
const Image = mongoose.model('Image')
const fs = require('fs')
const path = require('path')
const { response } = require('express')
const multer = require('multer')
const { use } = require('passport')
const { JsonWebTokenError } = require('jsonwebtoken')


  router.post('/login', function(req, res, next){

    User.findOne({ username: req.body.username })
        .then((user) => {
            
            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            // Function defined at bottom of app.js
            const isValid = util.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const hw =util.issueJWT(user);
                // const t=JSON.stringify( tokenObject)


                // var hw = enc.encrypt(t)
             
                res.send({ success: true,hw});

            } else {

                res.send({ success: false, msg: "you entered the wrong password" });

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
        email:req.body.email,
        hash: hash,
        salt: salt
    });



    try {
    
        newUser.save()
            .then((user) => {
                res.send({ success: true});
            });

    } catch (err) {
        
        res.send({ success: false, msg: err });
    
    }

});


// router.get('/',passport.authenticate('jwt',{session:false}),(req,res,next)=>{

//     res.json(req.user)
// })

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


router.get('/user',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.send({user:true})
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
    limits: { fileSize: 3000000 },
    fileFilter(req, file, cb) {
        console.log(file)
      if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG)$/)) { //allowed file extensions
        return cb(new Error("please upload png,jpeg or jpg"));
      }
      cb(undefined, true);
    }
  });

router.post('/image/upload',passport.authenticate('jwt',{session:false}),upload.single('file'),(req,res)=>{
        const uid =   req.user.id

        var img ={
                    data:fs.readFileSync(req.file.path),
                    contentType:req.file.mimetype     
                };     
         Image.findOneAndUpdate({uid:uid},{img},{upsert:true, new:true, useFindAndModify: false, setDefaultOnInsert:true},function(err,item){
            if(err)return(err) 
                res.send({message:"success"})
        })

})

router.post('/update/un',passport.authenticate('jwt',{session:false}),upload.single('file'),(req,res)=>{
    const uid =   req.user.id

    const username = req.body.username
   
        User.findOneAndUpdate({_id:uid},{username:username},{upsert:true, new:true, useFindAndModify: false,setDefaultsOnInsert:true},function(err,user){
            if(err)return (err)
            res.send({message:"success"})
        })
     
 

})

router.post('/update/uw',passport.authenticate('jwt',{session:false}),upload.single('file'),(req,res)=>{
    const uid =   req.user.id
    const work_at = req.body.work_at

        User.findOneAndUpdate({_id:uid},{work_at:work_at},{upsert:true, new:true, useFindAndModify: false,setDefaultsOnInsert:true},function(err,user){
            if(err)return (err)
            res.send({message:"success"})
        })
     
 

})



router.get('/image',  passport.authenticate('jwt',{session:false}),(req, res) => {
    //  Image.findOne({uid:req.user.id}, (err, items) => {
    //     if (!items) res.send({img:"no image"})
        
    //     base64String = Buffer.from(items.img.data).toString('base64')
    //     const image = 'data:'+items.img.contentType+';base64,'+base64String
    //     res.send(
    //         {
    //             username:req.user.username,
    //             data:image
    //         });
        
    // })

    User.findById(req.user.id)
    .populate({
        path:"u_img",
        select:["img"],
        options:{
            transform:
            (doc,ret)=>'data:'+doc.img.contentType+';base64,'+ Buffer.from(doc.img.data).toString('base64')
        }
    })
    .exec(function(err, user){
        if (err) res.send(err)
        res.send({
            u:user.username,
            w_a:user.work_at,
            img:user.u_img,
        })
    })

});

router.post('/reading-list',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    const reading_list = req.body.reading_list;
    console.log(reading_list)
    if(reading_list===null||reading_list===""||reading_list===undefined) {return res.send({message:"error adding to list"})}
    else{
         User.updateOne({_id:req.user.id},{$addToSet:{reading_list:reading_list}},function(err,item){
        if(err) res.send(err)
        res.send({message:"success added"})
    })
    }
   

})

router.get('/reading-ids',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
   User.findById(req.user.id,function(err,user){
       if(err) res.send(err)
       res.send(user.reading_list)
   })

})

router.get('/reading-list',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    // const reading_list = req.body.reading_list;

    User.findById(req.user.id,function(err,user){
        if(err)res.send(err)
        const reading_list = user.reading_list
        Chapter.find({"_id":{"$in":reading_list}})
        .select(['claps','c_title','tags','published','update','chapter_no'])
        .populate({
            path:'series_id',
            select:['s_title','followers','claps'],
                populate:[{
                path:'uid',
                select:['username'],
                    populate:[{
                        path:'u_img',
                        options: {
                            transform:  (doc,ret) =>"data:"+doc.img.contentType+";base64,"+ new Buffer.from(doc.img.data).toString('base64')
                                    }   
                    }]
                }]
        })
        .exec(function(err,data){
            if(err) res.send(err)
            return res.send(data)
        })
    })
    
})


// Chapter.find({})
// .select(['claps','c_title','tags','published','update','chapter_no'])
// .populate({
//     path:'series_id',
//     select:['s_title','followers','claps'],
//         populate:[{
//         path:'uid',
//         select:['username'],
//             populate:[{
//                 path:'u_img',
//                 options: {
//                     transform:  (doc,ret) =>"data:"+doc.img.contentType+";base64,"+ new Buffer.from(doc.img.data).toString('base64')
//                             }   
//             }]
//         }]
// })
// // .populate({
// //     path:"u_img",
// //     select:["img"],
   
// //  })                          

// .exec(function(err,chapters){
//     if(err) res.send(err)
//     res.send(chapters)
// })

module.exports = router;
