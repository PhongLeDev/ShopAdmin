var express = require('express');
var con = require('../config/key');
const multer = require('multer');
const path = require('path');
var router = express.Router();
const product = require('./../model/product');
const category = require('./../model/category');

var productsAll = [];
var categoriesAll = [];

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/img/product/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


con.query('select * from categories', function (err, rows, fields) {
  if (err) throw err
  rows.forEach(element => {
    var x = new category(element.id, element.name, element.description);
    categoriesAll.push(x);
  })
});
/* GET products listing. */
router.list = (req, res, next) => {
  con.query('select * from products', function (err, rows, fields) {
    if (err) throw err
    con.query('select p.id, p.name, p.price,p.producer,p.description,p.quantity, c.name as cateName,p.image from products p, categories c WHERE p.category_id = c.id', function (err, rows, fields)

    {
      if (err) throw err
      productsAll=[];
      rows.forEach(element => {
        var x = new product(element.id, element.name, element.price,element.producer,element.description,element.quantity, element.cateName, element.image);
        productsAll.push(x);
      })
      res.render('product/product',{products: productsAll, categories: categoriesAll,user: req.user})
    });
  });
};

router.create = (req,res,next) => {
  upload(req, res, (err) => {
    if(err){
      console.log(err);
    }
    else {
      let file = req.file;
      let fileName="";
      let test=req.file.originalname;
      
      if(file == undefined){
        fileName="";
      }
      else {
          fileName = file.filename;
      }
      let name = req.body.name;
      let id = req.body.id;
      let price =req.body.price;
      let producer =req.body.producer;
      let description = req.body.description;
      let quantity = req.body.quantity;
      let category_id = req.body.category_id;
      console.log("test"+test);
      console.log("id"+id);
      console.log("price"+price);
      console.log("producer"+producer);
      console.log("description"+description);
      console.log("quantity"+quantity);
      console.log("category_id"+category_id);
      console.log("name"+name);
      console.log("fileName"+fileName);
      let linkImage = "img/product/"+fileName;
      console.log("linkImage"+linkImage);
      if(id == 0){
        console.log("taomoi");
        let sql='INSERT INTO products(category_id,name,producer,price,quantity,image,description) VALUES ('+category_id+',"'+name+'","'+producer+'",'+price+','+quantity+',"'+linkImage+'","'+description+'")';
        con.query(sql);
      }
      else{
        console.log("chinhsua");
        if(linkImage != "img/product/"){
          console.log("khongcohinh");
          let sql = 'UPDATE products SET name="' + name + '",producer="' + producer + '",category_id= ' + category_id + ' ,price=' + price + ', quantity= ' + quantity + ' , image= "' + linkImage + '" ,description= "' + description + '" WHERE id=' + id;
          con.query(sql);
        }
        else {
          console.log("cohinh");
          let sql = 'UPDATE products SET name="' + name + '",producer="' + producer + '",category_id= ' + category_id + ' ,price=' + price + ', quantity= ' + quantity + ' , image= "' + linkImage + '" ,description= "' + description + '" WHERE id=' + id;
          con.query(sql);
        }
      }
      con.query('select * from products', function (err, rows, fields) {
        if (err) throw err
        productsAll = [];
        rows.forEach(element => {
          var x = new product(element.id, element.name, element.price,element.producer, element.description,element.quantity,element.category_id,element.image);
          productsAll.push(x);
        })
      });
      res.redirect('/product');
    }
  });
  
};

router.delete = (req,res,next) => {
  let id = req.params.id;
  console.log('ass'+id);
  let sql = 'DELETE FROM products WHERE id=' + id;
  con.query(sql);
 
  con.query('select * from products', function (err, rows, fields) {
    if (err) throw err
    productsAll = [];
    rows.forEach(element => {
      var x = new product(element.id, element.name, element.price,element.producer, element.description,element.quantity,element.category_id,element.image);
      productsAll.push(x);
    })
  });
  res.redirect('/product');
};

 
module.exports = router;
 