var express = require('express');
var con = require('../config/key');
var router = express.Router();
const product = require('./../model/product');

var products = [];
 

/* GET users listing. */
router.list = (req, res, next) => {
  con.query('select * from products', function (err, rows, fields) {
    if (err) throw err 
    products= [];
    rows.forEach(element => {
      var x = new product(element.id, element.name, element.price, element.producer,element.description,element.quantity);
      products.push(x);
    })
  });
  res.render('product/product', {products: products});
};
router.create = (req,res,next) => {
  let name = req.body.name;
  let price = req.body.price;
  let producer =req.body.producer;
  let id = req.body.id;
  let description = req.body.description;
  let quantity = req.body.quantity;
  console.log(name,price,producer,id,description,quantity);
  
  if (id == ""){
    console.log("phong");
    let sql ='INSERT INTO products(name,price,producer,description,quantity) VALUES ("'+name+'",'+price+',"'+producer+'","'+description+'",'+quantity+')';
    con.query(sql);
  }
  else{
    console.log("nhan");
    let sql = 'UPDATE products SET name="'+name+'",producer="'+producer+'",price='+price+', quantity= '+quantity+' , description= "'+description+'" WHERE id='+id;
            con.query(sql);
  }
  con.query('select * from products', function (err, rows, fields) {
    if (err) throw err
    products= [];
    rows.forEach(element => {
      var x = new product(element.id, element.name, element.price, element.producer,element.description,element.quantity);
      products.push(x);
    })
  });
  res.redirect('/product');
  
}
router.delete = (req,res,next) => {
  let id =req.params.id;
  let sql = 'DELETE FROM products WHERE id=' + id;
    con.query(sql);
  con.query('select * from products', function (err, rows, fields) {
  if (err) throw err
  products= [];
  rows.forEach(element => {
    var x = new product(element.id, element.name, element.price, element.producer,element.description,element.quantity);
    products.push(x);
  })
});
   res.redirect('/product');
 }

 
module.exports = router;
 