var express = require('express');
var router = express.Router();

var index = require("../controller/index");
var product = require("../controller/product");
var user = require("../controller/user");
var topProduct = require("../controller/topProduct");
var login = require("../controller/login");

/* GET home page. */
router.get('/',index.home);
router.get('/product',product.list);
router.post('/product/create',product.create);
router.post('/product/delete/:id',product.delete);
router.get('/user',user.list);
router.post('/user/create',user.create);
router.get('/user/detele/:id', user.delete);
router.get('/topProduct',topProduct.home);
router.get('/login',login.home);
router.post('/login/list',login.list);



module.exports = router;
