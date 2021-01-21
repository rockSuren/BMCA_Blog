var express = require('express')
var app = express()

var mysql = require('mysql')

/**
 * This middleware provides a consistent API 
 * for MySQL connections during request/response life cycle
 */ 
var myConnection  = require('express-myconnection')
var dbOptions = {
	host:	  '127.0.0.1',
	user: 	  'root',
	password: 'password',
	port: 	  3306, 
	database: 'blogProject'
}
var connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	database: "blogProject",
	password: "password"
  });
  connection.connect((err)=>{
	if(err){
	  return console.log("err.stack"+err);
	}
	console.log("connected successfuly");
  });

app.use(myConnection(mysql, dbOptions, 'pool'))


app.get('/api/login', function(req, res, next) {
	let userName = req.query.userName;
	let password = req.query.password;
	req.getConnection(function(error, conn) {
		let query = 'SELECT * FROM USER WHERE USERNAME='+userName+' and password = '+password;
		conn.query(query,function(err, rows, fields) {		
			if (err) {
                console.log(err);
                res.status(500).send(err);
			} else {
				console.log(rows);
				if(rows.length == 0){
					res.send({
						'user' : false
					})
				}else {
					var res = JSON.parse(JSON.stringify(rows));
					res.send({
						'user' : true,
						'admin' : res[0].userInd 
					})
				}
				res.send(rows);
			}
		})
	})
})


app.post('/api/insertBlog', function(req, res, next) {
	let title = req.body.blogTitle;
	let image = req.body.blogImage;
	let desc = req.body.blogDesc;

	req.getConnection(function(error, conn) {
		let query = 'INSERT INTO BLOG VALUES (?,?,?)';
		conn.query(query,[title,image,desc],function(err, rows, fields) {
			if (err) {
                console.log(err);
                res.status(500).send(err);
			} else {                
				res.send({
					'inserted' : true
				});
			}
		})
	})
})

app.post('/api/updateBlog', function(req, res, next) {
	let title = req.body.blogTitle;
	let image = req.body.blogImage;
	let desc = req.body.blogDesc;
	let blogId = req.body.blogId;
	req.getConnection(function(error, conn) {
		let query = 'UPDATE BLOG SET TITLE ='+title+' AND IMAGE='+image+' AND DESC ='+desc+'WHERE BLOG_ID ='+blogId;
		conn.query(query,function(err, rows, fields) {
			if (err) {
                console.log(err);
                res.status(500).send(err);
			} else {                
				res.send({
					'updated' : true
				});
			}
		})
	})
})

app.get('/api/deleteBlog', function(req, res, next) {
	let blogId = req.query.blogId;
	req.getConnection(function(error, conn) {
		let query = 'DELETE FROM BLOG WHERE BLOG_ID ='+blogId;
		conn.query(query,function(err, rows, fields) {		
			if (err) {
                console.log(err);
                res.status(500).send(err);
			} else {
				res.send({
					'deleted' : true
				})
			}
		})
	})
})
app.listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000')
})