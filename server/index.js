const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

dotenv.config();
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8080;

const usersRoutes = require('./routes/usersRouter');
const pantriesRoutes = require('./routes/pantriesRouter');
const ingredientsRoutes = require('./routes/ingredientsRouter');
const leftoversRoutes = require('./routes/leftoversRouter')

app.use('/api/users', usersRoutes);
app.use('/api/pantries', pantriesRoutes);
// app.use('/api/friends');
app.use('/api/ingredients', ingredientsRoutes);
app.use('/api/leftovers', leftoversRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});