var express = require('express');
var con = require('./../connect/connection');
var router = express.Router();


var listUser = [];

/* GET home page. */
router.home =  (req, res, next) => {
    /*res.render('login/login', { title: 'Login' });*/
    if(req.isAuthenticated()) {
        res.render('index', { title: 'Quản lí bán hàng' ,user: req.user});
    }
    else {
        req.flash('loginMessage')
        res.redirect('/login');
    }
};

router.logout=(req,res,next)=> {
    req.logout();
    res.redirect('/login');
}

router.postLogin = (req,res,next) =>{
    passport.authenticate('local-login',{
        successRedirect: '/',
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



/* GET users listing. */
router.list = (req, res, next) => {
    con.query('select * from employees', function (err, rows, fields) {
        if (err) throw err
        listUser= [];
        rows.forEach(element => {
            var x = new employees(element.id, element.name, element.address,element.phone);
            employees.push(x);
        })
    });
    res.render('login/list', {user: listUser});
};


module.exports = router;