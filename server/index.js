const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const {db} = require('./firebase')

const app = express()

dotenv.config();
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8080;

const usersRoutes = require('./routes/usersRouter');
const pantriesRoutes = require('./routes/pantriesRouter');

app.use('/api/users', usersRoutes);
app.use('/api/pantries', pantriesRoutes);
// app.use('/api/friends');
// app.use('/api/ingredients');
// app.use('/api/leftovers');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});