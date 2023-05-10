const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const {db} = require('./firebase')

const app = express()

dotenv.config();
app.use(cors())

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