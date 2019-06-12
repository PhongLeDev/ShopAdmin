var express = require('express');
var con = require('../config/key');
var router = express.Router();
const employees = require('./../model/employees');
var passport= require('passport');
// GET home page.
router.home =  (req, res, next) => {
    res.render('signUp/signUp', { title: 'Express' });
};



// con.query('select * from employees', function (err, rows, fields) {
//     if (err) throw err

//     rows.forEach(element => {
//         var x = new employees(element.id, element.name, element.address, element.phone,element.username,element.password);
//         employees.push(x);
//     })
// });



router.create = (req,res,next) => {
    passport.authenticate('local-signup',{
        successRedirect: '/login',
        failureRedirect: '/signup',
        failureFlash: true
      },function (err,user,info){
        if(err) {
          req.flash('loginMessage', err.message)
          return res.redirect('/signup');
        }
    
        if(!user) {
          req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
        
          return res.redirect('/signup');
        }
    
        return req.logIn(user, function(err) {
            if(err) {
              req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')
        
              return res.redirect('/signup');
              
            } else {
                return res.redirect('/login');
            }
        });
      })(req, res, next);
}
module.exports = router;