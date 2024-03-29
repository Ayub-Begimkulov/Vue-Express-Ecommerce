const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const verifyToken = require('../../middlewares/api/verifyToken');
const verifyAdmin = require('../../middlewares/api/verifyAdmin');

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
      res.status(200).json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/', [verifyToken, verifyAdmin], (req, res) => {
  Product.create({
    title: req.body.title,
    img: req.body.img,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description
  })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete('/:id', [verifyToken, verifyAdmin], (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
