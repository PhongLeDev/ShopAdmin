var express = require('express');
var con = require('./../connect/connection');
var router = express.Router();
const topProduct = require('./../model/topProduct');


var topProducts = [];
 
con.query('select * from topProducts', function (err, rows, fields) {
  if (err) throw err
 
  rows.forEach(element => {
    var x = new topProduct(element.id, element.name, element.price, element.amount);
    topProducts.push(x);
  })
});
/* GET users listing. */
router.home = (req, res, next) => {
  let a = [];
  a= topProducts;
  res.render('top/topProduct', {topProducts: a});
};

module.exports = router;
