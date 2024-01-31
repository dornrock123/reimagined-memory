var express = require('express');
var router = express.Router();
var mysql = require('../connect');

//ดึงข้อมูลในตารางมาแสดงในหน้า authurize ของ admin  
router.get('/admin/adminsFrom', function (req, res, next) {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    var sname = req.query.q;
    var sql = 'SELECT * FROM accounts';
    mysql.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.render('adminsFrom', { items: result });
      }
    });
  } else {
    res.redirect('/loginForm');
  }
});

router.get('/admin/adminAccounts', (req, res) => {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    var sname = req.query.q;
    var sql = "SELECT * FROM accounts";
    mysql.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.render('adminAccounts', { items: result });
      }
    })
  } else {
    res.redirect('/loginForm');
  }
});

router.get('/admin/adminProducts', (req, res) => {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    var sname = req.query.q;
    var sql = "SELECT * FROM products";
    mysql.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.render('adminProducts', { items: result });
      }
    })
  } else {
    res.redirect('/loginForm');
  }
});

router.get('/admin/adminLogs', (req, res) => {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    var sname = req.query.q;
    var sql = "SELECT * FROM logs";
    mysql.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.render('adminLogs', { items: result });
      }
    });
  } else {
    res.redirect('/loginForm');
  }
});

//ดึงข้อมูลในตารางมาแสดงในหน้า authurize ของ customer  
router.get('/customer/productsFrom', function (req, res, next) {
  console.log(req.session.loggedin)
  if (req.session.loggedin ) {
    console.log(req);
    var sql = 'SELECT * FROM products';
    mysql.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.render('productsFrom', { items: result });
      }
    })
  } else {
    res.redirect('/loginForm');
  }
});



// แก้ไขตารางaccounts (update table)
router.get('/edit/:accountID', (req, res) => {
  var sql = 'SELECT * FROM accounts WHERE accountID =?';
  mysql.query(sql, req.params.accountID, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.render('updateAccountForm', {
        data: result[0]
      });
    }
  })
})
router.post('/edit/:accountID', (req, response) => {
  var sql = 'UPDATE accounts SET? WHERE accountID =?';
  var params = [req.body, req.params.accountID];
  mysql.query(sql, params, (err, result) => {
    if (err) {
      response.send(err);
    } else {
      response.redirect('/admin/adminAccounts');
    }
    response.end();
  })
})

// แก้ไขตารางproduct (update table)
router.get('/editproduct/:productsID', (req, res) => {
  var sql = 'SELECT * FROM products WHERE productsID  =?';
  mysql.query(sql, req.params.productsID, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.render('updateProductForm', {
        data: result[0]
      });
    }
  })
})
router.post('/editproduct/:productsID', (req, response) => {
  var sql = 'UPDATE products SET? WHERE productsID =?';
  var params = [req.body, req.params.productsID];
  mysql.query(sql, params, (err, result) => {
    if (err) {
      response.send(err);
    } else {
      response.redirect('/admin/adminProducts');
    }
    response.end();
  })
})

// เพิ่มข้อมูลในตาราง Accounts
router.post('/insertAccounts', (req, res) => {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    var sql = 'INSERT INTO accounts SET?';
    var data = req.body;
    mysql.query(sql, data, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/admin/adminAccounts');
      }
    })
  } else {
    res.redirect('/loginForm');
  }
});

// เพิ่มข้อมูลในตาราง Products
router.post('/insertProduct', (req, res) => {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    var sql = 'INSERT INTO products SET?';
    var data = req.body;
    mysql.query(sql, data, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/admin/adminProducts');
      }
    })
  } else {
    res.redirect('/loginForm');
  }
});


router.get('/admin/adminLogs', (req, res) => {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    var sname = req.query.q;
    var sql = "SELECT * FROM logs";
    mysql.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.render('adminLogs', { items: result });
      }
    });
  } else {
    res.redirect('/loginForm');
  }
});

// ค้นหาข้อมูลรายการสมาชิก
router.get('/searchingAccounts', (req, res) => {
  console.log(req);
  var sname = req.query.q;
  var sql = "SELECT * FROM accounts WHERE name LIKE '%" + sname + "%'";
  mysql.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.render('searchingAccountsForm', { items: result });
    }
  })
});

// ค้นหาข้อมูลรายการสินค้า
router.get('/searchingProduct', (req, res) => {
  console.log(req);
  var sname = req.query.q;
  var sql = "SELECT * FROM products WHERE productName LIKE '%" + sname + "%'";
  mysql.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.render('searchingProductsFrom', { items: result });
    }
  })
});


// ลบข้อมูลสินค้าในตารางaccounts
router.get('/delete/:accountID', (req, response) => {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    var sql = 'DELETE FROM accounts WHERE accountID = ?';
    var id = req.params.accountID;
    console.log(id);

    mysql.query(sql, id, (err, result) => {
      if (err) {
        response.send(err);
        console.log('OK');
      } else {
        console.log('OK');
        response.redirect('/admin/adminAccounts');
      }
      response.end();
    });
  } else {
    res.redirect('/loginForm');
  }
});

// ลบข้อมูลสินค้าในตารางproducts
router.get('/deleteproduct/:productsID', (req, response) => {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    var sql = 'DELETE FROM products WHERE productsID  = ?';
    var id = req.params.productsID;
    console.log(id);

    mysql.query(sql, id, (err, result) => {
      if (err) {
        response.send(err);
        console.log('OK');
      } else {
        console.log('OK');
        response.redirect('/admin/adminProducts');
      }
      response.end();
    });
  } else {
    res.redirect('/loginForm');
  }
});







router.get('/admin/adminAccounts/addAccountForm', function (req, res, next) {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    res.render('addAccountForm', { title: 'Add Account' });
  } else {
    res.redirect('/loginForm');
  }
});

router.get('/admin/adminProducts/addProductForm', function (req, res, next) {
  console.log(req.session.loggedin)
  if (req.session.loggedin && req.session.type == "admin") {
    console.log(req);
    res.render('addProductForm', { title: 'Add Account' });
  } else {
    res.redirect('/loginForm');
  }
});


module.exports = router;