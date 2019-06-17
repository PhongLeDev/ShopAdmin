var express = require('express');
var router = express.Router();
var con = require('../config/key');
var passport = require('passport');

/* GET home page. */
router.home =  (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('home/index', {title: 'Quản lí bán hàng', user: req.user});
  } else {
    req.flash('loginMessage')
    res.redirect('/login');
  };
}

router.login = (req, res, next) => {
  res.render('login/login',{ message: req.flash('loginMessage') })
};

router.logout=(req,res,next)=> {
  req.logout();
  res.redirect('/login');
}

router.postLogin = (req,res,next) =>{
  passport.authenticate('local-login',{
    successRedirect: '/abc',
    failureRedirect: '/login',
    failureFlash: true
  },function(err, user, info) {


    if(err) {
      req.flash('loginMessage', err.message)
      return res.redirect('/login');
    }

    if(!user) {
      req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')

      return res.redirect('/login');
    }

    return req.logIn(user, function(err) {
      if(err) {
        req.flash('loginMessage', 'Tài khoản hoặc mật khẩu không chính xác')

        return res.redirect('/login');

      } else {
        return res.redirect('/');
      }
    });
  })(req, res, next);

}

module.exports = router;
