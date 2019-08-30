const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const to = require('../../helpers/to');

router.post('/signup', async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).json({ message: 'Please, fill in all the fields' });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const [createUserErr, user] = await to(
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    })
  );

  if (createUserErr) {
    return res.status(401).json({
      message:
        'Can not create user with this credentials, check if the email is valid and not already in use'
    });
  }

  jwt.sign(
    { id: user._id },
    process.env.SECRET_KEY,
    { expiresIn: 31536000 },
    (err, token) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'something went wrong on the server' });
      }

      res.status(200).json({ token });
    }
  );
});

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Please, fill in all the fields' });
  }

  // Can't use to() here because not finding any records isn't an error condition for finOne
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res
      .status(401)
      .json({ message: 'Can not find user with this email' });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Password is invaild' });
  }

  jwt.sign(
    { id: user._id },
    process.env.SECRET_KEY,
    { expiresIn: 31536000 },
    (err, token) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'something went wrong on the server' });
      }

      res.status(200).json({ token });
    }
  );
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