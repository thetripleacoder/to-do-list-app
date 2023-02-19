const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_MONGODB_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error!'));
db.on('open', () => console.log('We are connected to the database!'));

app.get('/', (req, res) => {
  res.send('Welcome to To-Do List API!');
});

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

app.listen(port, () => console.log(`Server is listening to port ${port}`));

//  Export the Express API
module.exports = app;
