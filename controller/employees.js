var express = require('express');
var router = express.Router();
var con = require('../config/key');
const category = require('./../model/category');
const employee = require('./../model/employees');
var bcrypt = require('bcrypt-nodejs');

var employeesAll = [];


con.query('select * from employees', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {//id, name, phone, address,username,password
    var x = new employee(element.id, element.name, element.address, element.phone);
    employeesAll.push(x);
  })
});
/* GET employee listing. */
router.list = (req, res, next) => {
  con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err
    employeesAll = [];
    rows.forEach(element => {
      var x = new employee(element.id, element.name, element.address, element.phone);
        employeesAll.push(x);
    })
  });
  res.render('employee/index', {employees: employeesAll});
};

router.create = (req,res,next) => {
  let name = req.body.name;
  let id = req.body.id;
  let phone = req.body.phone;
  let address = req.body.address;

  if (id == ""){
    let sql ='INSERT INTO employees(name,address,phone) VALUES ("'+name+'","'+address+'","'+phone+'")';
    con.query(sql);
  }
  else{
    let sql = 'UPDATE employees SET name="'+name+'",address="'+address+'" , phone= "'+phone+'" WHERE id='+id;
    con.query(sql);
  }
  con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err
    employeesAll= [];
    rows.forEach(element => {
      var x = new employee(element.id, element.name, element.address, element.phone);
      employeesAll.push(x);
    })
  });
  res.redirect('/employee');

};

router.delete = (req,res,next) => {
  let id =req.params.id;
  let sql = 'DELETE FROM employees WHERE id=' + id;
  con.query(sql);
  res.redirect('/employee');
}



module.exports = router;


