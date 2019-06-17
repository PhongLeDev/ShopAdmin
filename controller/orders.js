var express = require('express');
var con = require('../config/key');
const order = require('./../model/order');
var router = express.Router();

var ordersAll = [];

/* GET home page. */
router.list = (req, res, next) => {//id, customer_id,customer_name, status, sum_money, create_at, address,phone
  con.query('select * from orders', function (err, rows, fields) {
    if (err) throw err
    ordersAll = [];
    rows.forEach(element => {
      var x = new order(element.id,element.customer_id, element.customer_name, element.status, element.sum_money,element.create_at, element.address, element.phone);
      ordersAll.push(x);
    });
    res.render('order/index',{orders :  ordersAll,user: req.user});
  });
};

router.changeStatus = (req, res, next) => {
  let id= req.params.id;
  let x, r;
  let sqlselect = "select * from orders where id="+id;
  con.query(sqlselect, function(err, results, fields){
    x = results[0].status;
    if(x == 0){
      r = 1;
    }
    else if(x==1){
      r = 2;
    }
    let sql = 'UPDATE orders SET status='+r+' WHERE id='+id;
    con.query(sql);
    res.redirect('/order');
  });
}


module.exports = router;
