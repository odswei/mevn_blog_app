var crypto = require("crypto");
var algorithm = "aes-192-cbc"; //algorithm to use
var password = "Hello darkness";
const key = crypto.scryptSync(password, 'salt', 24); //create key

var text= "this is the text to be encrypted"; //text to be encrypted

const iv = crypto.randomBytes(16); // generate different ciphertext everytime
console.log(iv)

const cipher = crypto.createCipheriv(algorithm, key, iv);
var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex'); // encrypted text
console.log("e",encrypted)
const decipher = crypto.createDecipheriv(algorithm, key, iv);
var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
console.log("d",decrypted);