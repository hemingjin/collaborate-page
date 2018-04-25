var express = require('express');
var router = express.Router();
//导入mysql模块
var mysql = require('mysql');
var dbConfig = require('../db/dbConfig.js');
var sqlOperate = require('../db/sqlOperate.js');
// 使用dbConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') { 
         res.json({code:'-200', msg: '操作失败'}); 
     } else { 
         res.json(ret); 
     }
};

//查看所有用户
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection){
        connection.query(sqlOperate.queryAll, function(error, result){
            if(error){
                console.log(error);
            }else{
                responseJSON(res, result);   
                // 释放连接  
                connection.release();  
            }
        });
    });
});
//添加用户
router.post('/add', function(req, res, next) {
    //从连接池获取连接
    pool.getConnection( function(err, connection){
        //获取前台传来的参数

        var param = req.body || req.query || req.params;
        //建立链接增加一个用户信息
        connection.query(sqlOperate.insert, [param.username, param.tel, param.email], function(error, result){
            if(result) {      
               result = {   
                  code: 200,   
                  msg:'增加成功'
               };  
               
            }     
            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);   
            // 释放连接  
            connection.release();  
        });
    });
});

module.exports = router;

