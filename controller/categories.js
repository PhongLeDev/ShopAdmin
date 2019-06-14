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
    res.render('category/index',{categories : categoriesAll,user: req.user})//đúng mà, m chạy kiểu gì sai chạy t coi thử
  });//cái view của mình chưa có foler category kìa,nhưng mà nó vẫn chỉ ra controller mà,s
  //chỗ này là cái folder category trong view á, nhưng mình chưa có nên nó báo failt to lookup đấy.ok,để ta sửa có gì nt t
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
  con.query('select * from categories', function (err, rows, fields) {
    if (err) throw err
    categoriesAll = [];
    rows.forEach(element => {
      var x = new category(element.id, element.name, element.description);
      categoriesAll.push(x);
    })
  });
  res.redirect('/category');
}


module.exports = router;
