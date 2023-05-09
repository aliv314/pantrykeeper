const express = require('express');
const app = express()
const cors = require('cors')

app.use(cors())

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/'), async (req, res) => {
    const docRef = db.collection('users').doc('alovelace');
    await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})