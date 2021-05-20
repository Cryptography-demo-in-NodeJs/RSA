require("dotenv").config()
const express = require("express"); 
const axios = require("axios");

const {
    powerMod,
    getRandom,
    modInverse,
    isCoprime
} = require("./methods"); 


const app = express();
app.use(express.json());

const clientName = process.env.CLIENT_NAME; 
 
const prime1 = process.env.PRIME_1;
const prime2 = process.env.PRIME_2; 
const n = prime1 * prime2; 
const phi = (prime1-1)*(prime2-1);
let e = getRandom(2,phi-1); 

while(!isCoprime(e,phi)){
    e = getRandom(2,phi-1)
}; 
//e = 17;
let k = 2; 
const d = modInverse(e,phi); //private key 

console.log(`
Alice side :
prime1 : ${prime1}, prime2 : ${prime2}, phi : ${phi}, k : ${k}  
n = ${n} 
e = ${e}
pivateKey = d = ${d}
`)

setTimeout (async()=>{ 
    console.log(`Sending public keys n and e to Bob`);
    try { 
        let res = await axios.post(`${process.env.FRIEND_URI}/publicKeys`,{
            n : n,
            e : e 
        });
        res = res.data; 
        let { encryptedMessage } = res;
        
        console.log(`Message from Bob : encryptedMessage = ${encryptedMessage}
        `); 

        const decryptedMessage = powerMod(encryptedMessage,d,n);

        console.log(`Decrypted message : ${decryptedMessage}`); 
    }  catch(err) {
        console.log(err); 
    }
}, 5000);  


app.listen(process.env.CLIENT_PORT,()=>{
    console.log(`${process.env.CLIENT_NAME} listening on port ${process.env.CLIENT_PORT}`)
})

