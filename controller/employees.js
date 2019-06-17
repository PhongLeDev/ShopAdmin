var express = require('express');
var router = express.Router();
var con = require('../config/key');
const category = require('./../model/category');
const employee = require('./../model/employees');
var bcrypt = require('bcrypt-nodejs');

var employeesAll = [];

/* GET home page. */
router.list = (req, res, next) => {
  con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err
    employeesAll = [];
    rows.forEach(element => {
      var x = new employee(element.id, element.name, element.address, element.phone);
      employeesAll.push(x);
    });
    res.render('employee/index', { employees: employeesAll, user: req.user });
  });
};


module.exports = router;
