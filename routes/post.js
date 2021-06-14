const mongoose = require('mongoose')
const { serializeUser } = require('passport')
const router = require('express').Router()
const Post = mongoose.model('Post')
const User = mongoose.model('User')
const passport = require('passport')
const util = require('../helpers/util')


// router.get('/', function(req, res, next) {
//     passport.authenticate('jwt', { session: false },function(err, user, info) {
//       if (err) { return next(err); }
//       if (!user) { return res.status(401).json({sucess:false, msg:"unauthorized!"})}
//         return res.status(200).json({sucess:true,msg:'success!!'});
//     });
//   });


router.get('/post', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const _id = req.user.id
    Post.find({user_id:_id})
    .then((post) => {
        console.log(post)
        if (!post) {
            return res.status(401).json({ success: false, msg: "could not find post" });
        }
        
        // Function defined at bottom of app.js
       
        res.send({posts:post})
    })
    .catch((err) => {
        next(err);
    });
});

router.get('/test',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.send(req.user)
})

router.post('/post', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const _id = req.user._id  
    const body = req.body.post
  
    const newPost = new Post({
        user_id : _id,
        post :body
    })
    try {
        
        newPost.save() 
        .then((response) => {
                res.json({ success: true, response });
            });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }
});

 
module.exports = router;
