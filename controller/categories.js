var express = require('express');
var router = express.Router();
var con = require('../config/key');
const category = require('./../model/category');
var categoriesAll = [];


router.list = (req, res, next) => {
  categoriesAll = [];
  con.query('select * from categories', function (err, rows, fields) {
    if (err) throw err

    rows.forEach(element => {
      var x = new category(element.id, element.name, element.description);
      categoriesAll.push(x);
    })
    res.render('category/index',{categories : categoriesAll,user: req.user})
  });
};

router.create = (req, res, next) => {
  let name = req.body.name;
  let id = req.body.id;
  if(id==""){
    id=0;
  }
  let description = req.body.description;
  console.log(id);
  console.log(name);
  if(id == 0){
    let sql='INSERT INTO categories(name, description) VALUES ("'+name+'","'+description+'")';
    con.query(sql);
    res.redirect('/category');
  }
  else{
    let sql = 'UPDATE categories SET name=" '+name+'",description="'+description+'" WHERE id= '+id;
    con.query(sql);
    res.redirect('/category');
  }
};

router.delete = (req,res,next) => {
  let id = req.params.id;
  let sql = 'DELETE FROM categories WHERE id=' + id;
  con.query(sql);

  res.redirect('/category');
}



module.exports = router;
