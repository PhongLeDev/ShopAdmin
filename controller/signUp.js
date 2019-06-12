var express = require('express');
var con = require('./../connect/connection');
var router = express.Router();
const employees = require('./../model/employees');



/* GET home page.
router.home =  (req, res, next) => {
    res.render('signUp/signUp', { title: 'Express' });
};*/



con.query('select * from employees', function (err, rows, fields) {
    if (err) throw err

    rows.forEach(element => {
        var x = new employees(element.id, element.name, element.address, element.phone,element.username,element.password);
        employees.push(x);
    })
});



router.create = (req,res,next) => {
    let name = req.body.name;
    let id = req.body.id;
    let address = req.body.address;
    let phone = req.body.phone;
    let username = req.body.username;
    let password = req.body.password;

    if (id == ""){
        let sql ='INSERT INTO employees(name,address,phone,username,password) VALUES ("'+name+'","'+address+'","'+phone+'","'+username+'","'+password+'")';
        con.query(sql);
    }
    else{
        let sql = 'UPDATE employees SET name="'+name+'",address="'+address+'" , phone= "'+phone+'","'+username+'","'+password+'" WHERE id='+id;
        con.query(sql);
    }
    con.query('select * from employees', function (err, rows, fields) {
        if (err) throw err
        /*employees= [];*/
        rows.forEach(element => {
            var x = new user(element.id, element.name, element.address, element.phone);
            employees.push(x);
        })
    });
    res.redirect('/user');

}
module.exports = router;