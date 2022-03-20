var express = require('express');
var router = express.Router();
let db = require('../db');

/* 게시글목록 */
router.get('/', function(req, res, next) {
    let page = req.query.page;
    let start = (page-1)*5;
    let count = 0;

    //전체 게시글 수
    let sql = 'select count(*) count from tbl_post';
    db.get().query(sql, function(err, rows){
        count = rows[0].count;
        //게시글 목록 불러오기
        let sql = 'select *, date_format(createDate, "%Y-%m-%d %T") date';
            sql += ' from tbl_post order by id desc limit ?, 5';
        db.get().query(sql, [start], function(err, rows){
            res.send({count:count, rows:rows});
        })
    })
});

//새 글 등록
router.post('/insert', function(req, res){
    let title = req.body.title;
    let body = req.body.body;
    let userid = req.body.userid;

    let sql = 'insert into tbl_post(title, body, userid) values(?,?,?)';
    db.get().query(sql, [title, body, userid], function(err, rows){
        res.sendStatus(200);
    });
});

//게시글 읽기
router.get('/:id', function(req,res){
    let id = req.params.id;
    let sql = 'select *, date_format(createDate, "%Y-%m-%d %T") date';
        sql += ' from tbl_post where id=?';
    db.get().query(sql, [id], function(err, rows){
        res.send(rows[0]);
    })
});

//게시글 수정
router.post('/update', function(req,res) {
    let title = req.body.title;
    let body = req.body.body;
    let id = req.body.id;
    let sql = 'update tbl_post set title=?, body=? where id=?';
    db.get().query(sql, [title, body, id], function(err,rows){
        res.sendStatus(200);
    });
});

//게시글 삭제
router.post('/delete', function(req,res) {
    let id = req.body.id;
    let sql = 'delete from tbl_post where id=?';
    db.get().query(sql, [id], function(err, rows){
        res.sendStatus(200);
    }); 
});
module.exports = router;
