const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const fs = require('fs')
const path = require('path')
const User = require('mongoose').model('User')



// if(process.env.NODE_ENV=="production"){
//     PUB_KEY = process.env.PRIV.replace(/\\n/g, '\n')
// }
// else{
    const pathToKey = path.join(__dirname,'..','id_rsa_pub.pem')
    const PUB_KEY = fs.readFileSync(pathToKey,'utf8')
// }




const JWTOpt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:PUB_KEY,
    algorithm:['RS256']
}

module.exports = (passport)=>{
    passport.use(new JWTStrategy(JWTOpt,function(jwt_payload,done){
        console.log(jwt_payload)
        User.findOne({_id:jwt_payload.sub},function(err,user){
            if(err){
                return done(err,false)
            }
            if(user){
                return done(null,user)
            }else{
                return done(null,false)
            }
        })
    }))
}