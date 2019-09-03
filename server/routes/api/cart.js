const express = require('express');
const router = express.Router();
const Cart = require('../../models/Cart');
const verifyToken = require('../../middlewares/api/verifyToken');

router.get('/', verifyToken, (req, res) => {
  Cart.find({ userId: req.userId })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/', verifyToken, (req, res) => {
  Cart.create({
    userId: req.userId,
    productId: req.body.productId,
    title: req.body.title,
    img: req.body.img,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description,
    amount: req.body.amount
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put('/:id', verifyToken, (req, res) => {
  Cart.findByIdAndUpdate(
    req.params.id,
    {
      amount: req.body.amount
    },
    { new: true }
  ).then(doc => {
    res.json(doc);
  });
});

router.delete('/:id', verifyToken, (req, res) => {
  Cart.findByIdAndDelete(req.params.id)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
