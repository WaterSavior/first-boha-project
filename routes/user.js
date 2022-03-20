var express = require('express');
var router = express.Router();
let db = require('../db');

/* 로그인 체크. */
router.get('/:userid', function (req, res, next) {
    let userid = req.params.userid;
    let sql = 'select * from tbl_user where userid=?';
    db.get().query(sql, [userid], function(err, rows){
        res.send(rows[0]);
    });
});

//아이디 중복체크
router.get('/check/:userid', function(req, res) {
   let userid = req.params.userid;
   let sql = 'select * from tbl_user where userid=?';
   let check = 0;
   db.get().query(sql, [userid], function(err, rows){
       if(rows.length == 1) check=1;
       res.send({check:check});
   }) ;
});

//회원가입
router.post('/insert', function(req,res){
    let userid = req.body.userid;
    let password = req.body.password;
    let username = req.body.username;
    let sql = 'insert into tbl_user(userid, password, username) values(?,?,?)';
    db.get().query(sql, [userid, password, username], function(err,rows){
        res.sendStatus(200);
    });
});

module.exports = router;