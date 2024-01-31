var connection = require('../connect');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loginForm', function(req, res, next) {
  res.render('loginForm', { title: 'Login' });
});

router.get('/registerForm', function(req, res, next) {
  res.render('registerForm', { title: 'Register' });
});

router.get('/product', function (req, res, next) {
  var sql = 'SELECT * FROM products';
  connection.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result)
      res.render('products', { items: result });
    }
  });
});

router.get('/contactUS', function(req, res, next) {
  res.render('contactUS', { title: 'Contact US' });
});

router.get('/contactUS', function(req, res, next) {
  res.render('contactUS', { title: 'Contact US' });
});

router.get('/registerComplete', function(req, res, next) {
  res.render('registerComplete', { title: 'Register Complete' });
});

router.get('/service', function(req, res, next) {
  res.render('service', { title: 'service' });
});










module.exports = router;
