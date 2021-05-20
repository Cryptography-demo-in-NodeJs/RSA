require("dotenv").config()
const express = require("express"); 
const axios = require("axios");

const { 
    powerMod
}  = require("./methods"); 


const app = express();
app.use(express.json());

const M = process.env.MESSAGE; //message

app.post("/publicKeys",(req,res) => {
    const {
        n,  
        e,    
    } = req.body; 

    const encryptedMessage = powerMod(M,e,n);
    console.log(`
    Bob : 
    Message to encrypt(M): ${M}
    Received public keys are n=${n} e=${e}
    Encrypted Message : ${encryptedMessage}
    `)
 
    return res.status(200).json({
        encryptedMessage : encryptedMessage
    })
})

app.listen(process.env.CLIENT_PORT,()=>{
    console.log(`${process.env.CLIENT_NAME} listening on port ${process.env.CLIENT_PORT}`)
  
})

