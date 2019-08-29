const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/signup', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password);

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword
  })
    .then(user => {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 31536000
      });

      res.status(200).json({ auth: true, token });
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if (isPasswordValid) {
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: 31536000
          });

          res.status(200).json({ auth: true, token });
        } else {
          res.status(401).json({ auth: null, token: null });
        }
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// Remove
router.get('/', (req, res) => {
  User.find().then(users => {
    res.json(users);
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id).then(users => {
    res.json(users);
  });
});

module.exports = router;
