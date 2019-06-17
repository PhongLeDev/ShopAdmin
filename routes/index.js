var express = require('express');
var router = express.Router();

var index = require("../controller/index");
var product = require("../controller/product");
var user = require("../controller/user");
var employee = require("../controller/employees");
var signUp = require("../controller/signUp");
var category = require('../controller/categories');
var order = require('../controller/orders');
var report = require('../controller/report');
var top = require('../controller/tops');

/* GET home page. */
router.get('/',index.home);
router.get('/login',index.login); //dang nhap
router.post('/login/create',index.postLogin); //xac nhan dang nhap
router.get('/signup',signUp.home); // dang ki
router.post('/signUp/create',signUp.create);

router.get('/category',category.list);
router.post('/category/create' , category.create);
router.get('/category/delete/:id',category.delete);

router.get('/product',product.list);
router.post('/product/create',product.create);
router.get('/product/delete/:id',product.delete);

router.get('/employee',employee.list);
router.post('/employee/create',employee.create);
router.get('/employee/delete/:id',employee.delete);

router.get('/user',user.list);
router.post('/user/create',user.create);
router.get('/user/delete/:id', user.delete);

router.get('/order', order.list);
router.get('/order/changestatus/:id',order.changeStatus);



function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
