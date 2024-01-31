// log.js
const connection = require('../connect'); // ต้องแก้ไข path เพื่อให้ถูกต้อง
const moment = require('moment'); // เรียกใช้งานโมดูล moment เพื่อจัดการเวลา

module.exports = {
  logLogin: function(username, password) {
    const logId = generateLogId(); // สร้าง logId
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss'); // รับเวลาปัจจุบัน

    const sql = 'INSERT INTO logs (username, password, timestamp) VALUES (?, ?, ?)';
    connection.query(sql, [username, password, timestamp], function(error, results, fields) {
      if (error) {
        console.error('Error logging login:', error);
      }
    });
  }
};

function generateLogId() {
  // อาจใช้วิธีใดวิธีหนึ่งในการสร้าง logId ให้แน่ใจว่าไม่ซ้ำกับที่มีอยู่ในฐานข้อมูล
  // ยกตัวอย่างเช่นการสุ่ม UUID
  // อ่านเพิ่มเติม: https://www.npmjs.com/package/uuid
  const uuid = require('uuid');
  return uuid.v4();
}
