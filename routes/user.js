const mongoose = require('mongoose')
const router = require('express').Router()
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


router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const i= req.user
    res.status(200).json({ success: true, msg: i});
});



  router.post('/login', function(req, res, next){

    User.findOne({ username: req.body.username })
        .then((user) => {
            console.log(user)
            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            // Function defined at bottom of app.js
            const isValid = util.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const tokenObject = util.issueJWT(user);

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

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
                res.json({ success: true, user: user });
            });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }

});

module.exports = router;
