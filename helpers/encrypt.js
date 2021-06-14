var crypto = require("crypto");
const { json } = require('express')
var algorithm = "aes-192-cbc";
var password = "Hello darkness";
let token = null;
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
   
function decrypt(req,res,next){
    const key = crypto.scryptSync(password, 'salt', 24); //create key
    const iv = "9bd717d681151874";
    const hero = req.headers.authorization
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    var decrypted = decipher.update(hero, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text

    const token = decrypted

    const hello = JSON.parse(token)
    req.headers.authorization=hello.token

   next()
   }

   module.exports = {
      encrypt,
      decrypt
   }


