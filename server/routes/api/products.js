const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

router.get('/', (req, res) => {
  Product.find()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/', (req, res) => {
  Product.create({
    title: req.body.title,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
