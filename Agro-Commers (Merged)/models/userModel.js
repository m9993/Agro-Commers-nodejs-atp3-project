const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "SELECT * FROM `users` WHERE umail='"+user.email+"' AND upass='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getUser: (user, callback) => {
        var sql = `SELECT * FROM users WHERE umail = ? AND upass = ?`;
        db.getResults(sql, [user.email, user.password], (result) => {
            callback(result);
        });
    },
    getById : function(id, callback){
		var sql = "select * from users where uid='"+id+"'";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getByEmail: function(email, callback){
		var sql = "SELECT * FROM `users` WHERE umail='"+email+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAllUser: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getById: function(id, callback){
		var sql = "select * from users where uid='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: (user,callback)=>{
        var sql="INSERT INTO `users`(`uname`,`uphone`, `umail`, `uaddress`,`upass`, `user_role`) VALUES ('"+user.uname+"','"+user.uphone+"','"+user.umail+"','"+user.uaddress+"','"+user.upass+"','"+user.user_role+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
	update:function(sql, callback){
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `users` WHERE uid='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getNoticeById: function(id, callback){
		var sql = "select * from users where nid='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	 search: (search_item, callback) => {
	 	var sql = `SELECT * FROM users WHERE uid = '${search_item}' OR uname = '${search_item}' OR uphone = '${search_item}' OR umail = '${search_item}' OR uaddress = '${search_item}' OR user_role = '${search_item}'`;
	 	db.getResults(sql, (results) => {
	 		callback(results);
	 	});
	 }
}