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
  destination: './public/uploads/',
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
      console.log("asas");
      res.render('product/product',{products: productsAll, categories: categoriesAll,user: req.user})
    });
  });
};

router.create = (req,res,next) => {
  upload(req, res, (err) => {
    if(err){
      console.log(err);
    } else {
      let file = req.file;
      let fileName="";
      if(file == undefined){
        fileName="";
      }
      else{
        fileName = file.filename;
      }
      let name = req.body.name;
      let id = req.body.id;
      let price =req.body.price;
      let producer =req.body.producer;
      let description = req.body.description;
      let quantity = req.body.quantity;
      let category_id = req.body.category_id;
      console.log(id);
      console.log(name);
      let linkImage = ""+fileName;//them link heroku vao ""
      console.log(linkImage);
      if(id == 0){

        let sql='INSERT INTO products(category_id,name,price,producer,quantity,image,detail) VALUES ('+category_id+',"'+name+'","'+producer+'",'+price+','+quantity+',"'+linkImage+'","'+description+'")';
        con.query(sql);
      }
      else{
        if(linkImage == "/"){//them link heroku vao ""
          let sql = 'UPDATE products SET name="'+name+'",category_id= '+category_id+' ,price='+price+', quantity= '+quantity+' ,detail= "'+description+'" WHERE id='+id;
          con.query(sql);
        }
        else{
          let sql = 'UPDATE products SET name="'+name+'",id_category= '+category_id+' ,price='+price+', quantity= '+quantity+' , image= "'+linkImage+'" ,detail= "'+description+'" WHERE id='+id;
          con.query(sql);
        }
      }
      con.query('select * from products', function (err, rows, fields) {
        if (err) throw err
        productsAll = [];
        rows.forEach(element => {
          var x = new product(element.id, element.name, element.price,element.producer, element.detail,element.quantity,element.category_id,element.image,);
          productsAll.push(x);
        })
      });
      res.redirect('/product');
    }
  });
  
};

router.delete = (req,res,next) => {
  let id = req.params.id;
  let sql = 'DELETE FROM products WHERE id=' + id;
  con.query(sql);
  con.query('select * from products', function (err, rows, fields) {
    if (err) throw err
    productsAll = [];
    rows.forEach(element => {
      var x = new product(element.id, element.name, element.price, element.producer, element.description, element.quantity);
      productsAll.push(x);
    })
  });
  res.redirect('/product');
}

 
module.exports = router;
 