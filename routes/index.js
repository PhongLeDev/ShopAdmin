var express = require('express');
var router = express.Router();

var index = require("../controller/index");
var product = require("../controller/product");
var user = require("../controller/user");
var topProduct = require("../controller/topProduct");


/* GET home page. */
router.get('/',index.home);
router.get('/product',product.list);
router.post('/product/create',product.create);
router.post('/product/delete',product.create);
router.get('/user',user.list);
router.post('/user/create',user.create);
router.get('/user/detele/:id', user.delete);
router.get('/topProduct',topProduct.home);




module.exports = router;
