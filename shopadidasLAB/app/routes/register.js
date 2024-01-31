const express = require('express');
const router = express.Router();
var mysql = require('../connect');

router.post('/register', (req, res) => {
  var data = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    phonenumber: req.body.phonenumber,
  };

  var sql = 'INSERT INTO customer_member SET ?';
  mysql.query(sql, data, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result)
      var customer_id = result.insertId;
      var data2 = {
        username: req.body.username,
        password: req.body.password,
        customer_id: customer_id,
        types: req.body.types,

      };

      console.log(data2)
      var sql2 = 'INSERT INTO accounts SET ?';
      mysql.query(sql2, data2, (err2, result2) => {
        if (err2) {
          res.send(err2);
        } else {
          console.log(result2)
          res.redirect('registerComplete');
        }
      });
    }
  });
});

module.exports = router;
