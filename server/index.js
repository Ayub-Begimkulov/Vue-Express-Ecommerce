require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.CONNECTION_STRING,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log('Database Error----------------', err);
    }
    console.log('Connected to database');
  }
);

app.use('/api/products', require('./routes/api/products'));

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
