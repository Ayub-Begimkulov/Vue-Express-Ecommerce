const express = require('express');
const router = express.Router();
const Cart = require('../../models/Cart');
const verifyToken = require('../../middlewares/api/verifyToken');

router.get('/', verifyToken, (req, res) => {
  Cart.find({ userId: req.userId })
    .then(doc => {
      res.json(doc);
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

router.delete('/:id', verifyToken, (req, res) => {
  Cart.findByIdAndRemove(req.params.id)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
