var express = require('express');
var con = require('./../connect/connection');
var router = express.Router();

var user = function(id, name, address, phone){
  this.id = id;
  this.name = name;
  this.address = address;
  this.phone = phone;
}

var employees = [];
 
con.query('select * from employees', function (err, rows, fields) {
  if (err) throw err
 
  rows.forEach(element => {
    var x = new user(element.id, element.name, element.address, element.phone);
    employees.push(x);
  })
});
/* GET users listing. */
router.home = (req, res, next) => {
  let a = [];
  a= employees;
  res.render('user/user', {employees: a});
};

module.exports = router;
