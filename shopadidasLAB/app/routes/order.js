var express = require('express');
var router = express.Router();
var mysql = require('../connect');


router.get('/orders', (req, res) => {

    if (req.session.loggedin) {
        const quantity = req.query.quantity;
        const data2 = req.query.productIDs;
        const customer_id = req.session.customer_id;
        console.log(data2);
    
        // รับค่า ProductID ที่ถูกส่งมาแยกเป็น Array ด้วยเครื่องหมาย "," แล้วแปลงเป็นตัวเลข
        var productIDs = req.query.productIDs.split(',').map(Number);
    
        var sql = 'SELECT * FROM products WHERE productsID  IN (?) AND stock > 0';
        mysql.query(sql, [productIDs], (err, result) => {
            if (err) {
                res.send(err);
            } else {
                let subtotal = 0;
                let subtotals = [];
                let quantitys = [];
                for (let i = 0; i < result.length; i++) {
                    const itemSubtotal = result[i].price * quantity; // คำนวณราคารวมของรายการแต่ละรายการ
                    subtotal += itemSubtotal; // บวกค่าราคารวมของรายการแต่ละรายการในราคารวมทั้งหมด
                    subtotals.push(itemSubtotal); // เพิ่มค่าราคารวมของรายการแต่ละรายการในอาร์เรย์
                    console.log(subtotals)
                    quantitys.push(quantity)
                    console.log(quantitys)
                }
                let total = subtotal; // ให้ total เท่ากับ sub total เริ่มต้น
                console.log(subtotal)
                res.render('orders_list', { products: result, customerID: customer_id, quantitys: quantitys, subtotals: subtotals, total: total });
            }
        });
    } else {
        res.redirect('/loginFrom');
    }

});

router.post('/confirmOrder/:customerID', (req, res) => {
    const data = req.body;
    console.log(data);

    // ข้อมูลที่ส่งมาจากฟอร์ม
    const { quantitys, customerID, ProductID, ProductPrice, totalPrice } = data;

    // คำสั่ง SQL เพื่อเพิ่มข้อมูลในตาราง orders
    const insertOrderQuery = `
      INSERT INTO orders (products_id, customer_id, quantity, sub_total_price, total_all, order_date)
      VALUES (?, ?, ?, ?, ?, NOW())`;

    // คำสั่ง SQL เพื่ออัปเดต stock ในตาราง products
    const updateStockQuery = `
      UPDATE products
      SET stock = stock - ?
      WHERE productsID  = ?`;

    // เชื่อมต่อกับ MySQL
    mysql.connect(err => {
        // if (err) {
        //     console.error('Error connecting to database:', err);
        //     return;
        // }

        let totalAll = 0; // สร้างตัวแปร totalAll เพื่อเก็บค่ารวมทั้งหมด

        // วนลูปเพื่อเพิ่มข้อมูลในตาราง
        for (let i = 0; i < ProductID.length; i++) {
            const productId = ProductID[i];
            const quantity = quantitys[i];
            const subtotalPrice = quantitys[i] * ProductPrice[i]; // หา subtotals ของสินค้านั้น
            totalAll = totalPrice; // เพิ่มค่าราคารวมทั้งหมด

            const values = [productId, customerID, quantity, subtotalPrice, totalAll];

            mysql.query(insertOrderQuery, values, (err, result) => {
                if (err) {
                    console.error('Error inserting order:', err);
                    return;
                }
                console.log('Order inserted:', result);

                // ทำการอัปเดต stock ในตาราง products
                mysql.query(updateStockQuery, [quantity, productId], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error('Error updating stock:', updateErr);
                        return;
                    }
                    console.log('Stock updated for ProductID', productId);

                    // เมื่อลูปทั้งหมดเสร็จสิ้นให้ทำการแสดงผลหน้า 'paymentForm'
                    const customer_id = req.session.customer_id;
                    console.log(customer_id)
                    if (i === ProductID.length - 1) {
                         res.render('payment', { customerID: customer_id, totalAll: totalAll});
                        // res.send('การทำรายการซื้อสินค้าเรียบร้อย');
                        // console.log(totalAll)
                    }
                });
            });
        }
    });
});

module.exports = router;
