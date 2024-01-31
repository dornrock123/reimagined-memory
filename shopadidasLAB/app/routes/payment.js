var express = require('express');
var router = express.Router();
var mysql = require('../connect');
const multer = require('multer'); // เพิ่ม Multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'C:\\Users\\kritt\OneDrive\\\Desktop\\shopadidasLABเสร็จ\\app\\public\\images\\\slippayment'); // ชื่อโฟลเดอร์ที่คุณต้องการเก็บไฟล์
    cb(null, 'C:\\slippayment');
  },
  filename: function (req, file, cb) {
    const date = new Date();
    // const timestamp = date.getTime(); // หาค่า timestamp ปัจจุบัน
    // const fileExtension = file.originalname.split('.').pop(); // หานามสกุลของไฟล์

    // สร้างชื่อไฟล์ใหม่โดยใช้ timestamp และนามสกุลไฟล์
    // const newFileName = `${file.originalname}.${fileExtension}`;
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


/* GET home page. */
router.post('/payment/:customerID/:totalAll/', upload.single('slippayment'), (req, res) => {
  var values = [req.body];
  console.log(values);

  var sql = 'INSERT INTO payments SET?';
  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      // res.redirect('/member/products');
      var sql = 'SELECT * FROM payments ORDER BY payment_id DESC LIMIT 1';
      mysql.query(sql, (err, paymentResult) => {
        if (err) {
          res.send(err);
        } else {
          // res.render('confirmPaymentForm', {payment: result});
          console.log('data is', { payment: result });
          var sql3 = 'SELECT products.productName as productName, orders.quantity as Quantity, orders.sub_total_price as SubTotalPrice FROM products JOIN orders ON products.productsID  = orders.products_id  WHERE orders.customer_id = ? ORDER BY order_date DESC LIMIT 3';
          mysql.query(sql3, req.params.customerID, (err, productResult) => {
            if (err) {
              res.send(err);
            } else {
              res.render('confirmPaymentForm', { payment: paymentResult, products: productResult });
              console.log('data is', { payment: paymentResult, products: productResult });
            }
          });
        }
      })
    }
  })
});


module.exports = router;
