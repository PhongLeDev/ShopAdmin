var express = require('express');
var router = express.Router();

var index = require("../controller/index");
var product = require("../controller/product");
var user = require("../controller/user");
var topProduct = require("../controller/topProduct");
var login = require("../controller/login");
var signUp = require("../controller/signUp");
var category = require('../controller/categories');
var order = require('../controller/orders');
var report = require('../controller/report');
var top = require('../controller/tops');

/* GET home page. */
router.get('/',index.home);
router.get('/login',login.home); //dang nhap
router.post('/login/create',login.postLogin); //xac nhan dang nhap
router.get('/product',product.list);
router.post('/product/create',product.create);
router.post('/product/delete/:id',product.delete);
router.get('/user',user.list);
router.post('/user/create',user.create);
router.get('/user/detele/:id', user.delete);
router.get('/topProduct',topProduct.home);
router.get('/signup',signUp.home); // dang ki
router.post('/signUp/create',signUp.create); // xac nhan dang ki
router.get('/category',category.list);
router.post('/category/create' , category.create);
router.get('/don-hang', order.list);
router.get('/don-hang/chuyen-trang-thai/:id',order.changeStatus);
router.get('/thong-ke-bao-cao/ngay',report.day);
router.get('/thong-ke-bao-cao/tuan', report.week);
router.get('/thong-ke-bao-cao/thang', report.month);
router.get('/thong-ke-bao-cao/quy', report.quarter);
router.get('/thong-ke-bao-cao/nam', report.year);
router.get('/tops/top-san-pham-ngay', top.dayproducts);
router.get('/tops/top-san-pham-tuan', top.weekproducts);
router.get('/tops/top-san-pham-thang', top.monthproducts);
router.get('/tops/top-san-pham-quy', top.quaterproducts);
router.get('/tops/top-san-pham-nam', top.yearproducts);
//
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
