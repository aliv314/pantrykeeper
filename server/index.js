const {db} = require('./firebase')
const admin = require('firebase-admin')
const firebase = require('firebase')
const express = require('express');
const app = express()
const cors = require('cors')
app.use(cors())

const dotenv = require('dotenv')
dotenv.config();

const port = process.env.PORT || 8080;

app.get('/', async (req, res) => {
    const docRef = db.collection('users').doc('alovelace');
    try{
       await docRef.set({
            first: 'Ada',
            last: 'Lovelace',
            born: 1815
        }); 
    }catch (e) {
        console.log(e);
    }
    
    res.send('Hello World!')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});