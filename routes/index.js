var express = require('express');
var router = express.Router();

var index = require("../controller/index");
var product = require("../controller/product");
var user = require("../controller/user");
var topProduct = require("../controller/topProduct");


/* GET home page. */
router.get('/',index.home);
router.get('/product',product.home);
router.get('/user',user.home);
router.get('/topProduct',topProduct.home);




module.exports = router;
