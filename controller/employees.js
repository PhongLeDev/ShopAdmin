var express = require('express');
var router = express.Router();
var con = require('../config/key');
const employee = require('./../model/employees');
var bcrypt = require('bcrypt-nodejs');

var employeesAll = [];

var currentE = 0;

con.query('select * from employees', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {//id, name, phone, address,username,password
    var x = new employee(element.id, element.name, element.address, element.phone);
    employeesAll.push(x);
  })
});
/* GET employee listing. */
router.list = (req, res, next) => {
  con.query('select * from employees where status=1', function (err, rows, fields) {
    if (err) throw err
    employeesAll = [];
    rows.forEach(element => {
      var x = new employee(element.id, element.name, element.address, element.phone);
        employeesAll.push(x);
    })
  });
  currentE = req.user.id;
  console.log("test"+currentE);
  res.render('employee/index', {employees: employeesAll,currentE:currentE});
};

router.create = (req,res,next) => {
  let name = req.body.name;
  let id = req.body.id;
  let phone = req.body.phone;
  let address = req.body.address;

  if (id == ""){
    let sql ='INSERT INTO employees(name,address,phone,status) VALUES ("'+name+'","'+address+'","'+phone+'",'+0+')';
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


router.changeStatus = (req, res, next) => {
  let id= req.params.id;
  let x, r;
  let sqlselect = "select * from employees where id="+id;
  con.query(sqlselect, function(err, results, fields){
    x = results[0].status;
    if(x == 0){
      r = 1;
    }
    else if(x==1){
      r = 0;
    }
    let sql = 'UPDATE employees SET status='+r+' WHERE id='+id;
    con.query(sql);
    res.redirect('/employee');
  });
}




module.exports = router;


