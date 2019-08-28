const express = require('express');
const router = express.Router();
const ProductModel = require('../../models/ProductModel');

router.get('/', (req, res) => {
  ProductModel.find()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/', (req, res) => {
  const product = new ProductModel({
    title: req.body.title,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description
  });

  product
    .save()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  ProductModel.findByIdAndRemove(req.params.id)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
