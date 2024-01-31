var connection = require('../connect');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var logModule = require('./log'); // ต้องแก้ไข path เพื่อให้ถูกต้อง

router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// เส้นทางสำหรับการออกจากระบบ (Logout)
router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/loginForm'); // ให้ผู้ใช้เด้งไปยังหน้า login
  });
});

// Authentication route
router.post('/auth', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
      if (results.length > 0) {

        // เรียกใช้งาน logLogin เพื่อบันทึกข้อมูลการเข้าสู่ระบบ
        logModule.logLogin(username, password);
        request.session.loggedin = true;
        request.session.type = results[0].types;
        request.session.customer_id = results[0].customer_id;
        if (results[0].types === 'admin') {
          response.redirect('/admin/adminProducts'); // เปลี่ยนเส้นทางไปยังหน้า products สำหรับ admin
        } else if (results[0].types === 'customer') {
          response.redirect('/customer/productsFrom'); // เปลี่ยนเส้นทางไปยังหน้า home สำหรับ customer
        }
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});




module.exports = router;