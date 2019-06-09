var express = require('express');
var con = require('./../connect/connection');
var router = express.Router();
const product = require('./../model/user');


var listUser = [];

/* GET home page. */
router.home =  (req, res, next) => {
    res.render('login/login', { title: 'Login' });
};

/* GET users listing. */
router.list = (req, res, next) => {
    con.query('select * from employees', function (err, rows, fields) {
        if (err) throw err
        listUser= [];
        rows.forEach(element => {
            var x = new employees(element.id, element.name, element.address,element.phone);
            employees.push(x);
        })
    });
    res.render('login/list', {user: listUser});
};


module.exports = router;