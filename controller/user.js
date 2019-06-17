var express = require('express');
var con = require('../config/key');
var router = express.Router();
const user = require('./../model/user');


var users = [];
 
con.query('select * from customers', function (err, rows, fields) {
  if (err) throw err
 
  rows.forEach(element => {
    var x = new user(element.id, element.name, element.phone, element.address);
    users.push(x);
  })
});
/* GET users listing. */
router.list = (req, res, next) => {
  con.query('select * from customers', function (err, rows, fields) {
    if (err) throw err
      users = [];
    rows.forEach(element => {
      var x = new user(element.id, element.name, element.phone, element.address);
        users.push(x);
    })
  });
  res.render('user/user', {user: users});
};

router.create = (req,res,next) => {
  let name = req.body.name;
  let id = req.body.id;
  if(id==""){
    id=0;
  }
  let address = req.body.address;
  let phone = req.body.phone

  console.log(id);
  console.log(name);
  console.log(address);
  console.log(phone);
  if (id == 0){
    let sql ='INSERT INTO customers(name,phone,address) VALUES ("'+name+'","'+phone+'","'+address+'")';
    con.query(sql);
    res.redirect('/user');
  }
  else {
    let sql = 'UPDATE customers SET name="' + name + '" , phone= "' + phone + '",address="' + address + '" WHERE id=' + id;
    con.query(sql);
    res.redirect('/user');
  }
};

router.delete = (req,res,next) => {
    let id = req.params.id;
    let sql = 'DELETE FROM customers WHERE id=' + id;
    con.query(sql);
    res.redirect('/user');
}



module.exports = router;
