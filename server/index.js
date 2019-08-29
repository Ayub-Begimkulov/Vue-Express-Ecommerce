const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  err => {
    if (err) {
      console.log('Database Error----------------', err);
    }
    console.log('Connected to database');
  }
);

app.use('/api/products', require('./routes/api/products'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
