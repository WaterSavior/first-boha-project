var express = require('express');
var router = express.Router();
let db = require('../db');


/* 주소목록. */
router.get('/list', function(req, res, next) {
    let count = 0;
    let sql = 'select count(*) total from address';
    db.get().query(sql, function(err, rows){
        count = rows[0].total;
        sql = 'select * from address order by id desc';
        db.get().query(sql, function(err, rows){
            res.send({count:count, rows:rows});
        });
    })
});

module.exports = router;
