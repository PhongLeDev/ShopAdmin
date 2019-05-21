var express = require('express');
var con = require('./../connect/connection');
var router = express.Router();
const user = require('./../model/user');


var employees = [];
 
con.query('select * from employees', function (err, rows, fields) {
  if (err) throw err
 
  rows.forEach(element => {
    var x = new user(element.id, element.name, element.address, element.phone);
    employees.push(x);
  })
});
/* GET users listing. */
router.list = (req, res, next) => {
  con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err
   employees = [];
    rows.forEach(element => {
      var x = new user(element.id, element.name, element.address, element.phone);
      employees.push(x);
    })
  });
  res.render('user/user', {employees: employees});
};

router.create = (req,res,next) => {
  let name = req.body.name;
  let id = req.body.id;
  let address = req.body.address;
  let phone = req.body.phone;
  
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
    employees= [];
    rows.forEach(element => {
      var x = new user(element.id, element.name, element.address, element.phone);
      employees.push(x);
    })
  });
  res.redirect('/user');
  
}
router.delete = (req,res,next) => {
 let id =req.params.id;
  let sql = 'DELETE FROM employees WHERE id=' + id;
            con.query(sql);
  con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err 
    employees= [];
    rows.forEach(element => {
      var x = new user(element.id, element.name, element.address, element.phone);
      employees.push(x);
    })
  });
  res.redirect('/user');
}



module.exports = router;
