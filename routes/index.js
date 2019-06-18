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
router.post('/login/create',index.signin); //xac nhan dang nhap
router.get('/signup',signUp.home); // dang ki
router.post('/signUp/create',signUp.create);

router.get('/category',requiresLogin,category.list);
router.post('/category/create' , requiresLogin,category.create);
router.get('/category/delete/:id',requiresLogin,category.delete);

router.get('/product',requiresLogin,product.list);
router.post('/product/create',requiresLogin,product.create);
router.get('/product/delete/:id',product.delete);

router.get('/employee',requiresLogin,employee.list);
router.post('/employee/create',requiresLogin,employee.create);
router.get('/employee/changeStatus/:id',requiresLogin,employee.changeStatus);

router.get('/user',requiresLogin,user.list);
router.post('/user/create',requiresLogin,user.create);
router.get('/user/delete/:id', requiresLogin,user.delete);

router.get('/order', requiresLogin,order.list);
router.get('/order/changestatus/:id',requiresLogin,order.changeStatus);

    
function requiresLogin(req, res, next) {
	if (req.isAuthenticated()) {
	  return next();
	} else {
		req.flash('loginMessage', 'You must be logged in to view this page.')
		return res.redirect('/login');
	}
  }


module.exports = router;
