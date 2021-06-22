const crypto = require('crypto')
const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const path =require('path')

let PRIV_KEY

if(process.env.NODE_ENV=="production"){
    PRIV_KEY = process.env.PUB
}
else{
    const pathToKey = path.join(__dirname,'..','id_rsa_priv.pem')
    PRIV_KEY = fs.readFileSync(pathToKey,'utf8')

}


function validPassword(password, hash,salt){
    var hashVerify = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
    return hash ===hashVerify
}

function genHashPass(password){
    var salt = crypto.randomBytes(32).toString('hex')
    var genHash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')

    return{
        salt:salt,
        hash:genHash
    }
}

function issueJWT(user){
    const _id = user._id
    const expiresIn = '1d'

    const payload = {
        sub:_id,
        iat:Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload,PRIV_KEY,{expiresIn:expiresIn,algorithm:'RS256'})

    return{
        token:signedToken,
        expires:expiresIn
    }
}

module.exports.validPassword = validPassword
module.exports.genHashPass = genHashPass
module.exports.issueJWT = issueJWT
