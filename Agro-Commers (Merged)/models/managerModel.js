const db = require('./db');

module.exports = {
	validate: function(user, callback){
		var sql = "select * from users where uname = '"+user.username+"' and upass = '"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results)
		});
	},

	insert: function(user, callback){
		var sql = "insert into user (username, password, email) values ('"+user.username+"', '"+user.password+"', '"+user.email+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		console.log(user);
		var sql = "update user set username = '"+user.username+"', password = '"+user.password+"', email = '"+user.email+"' where id = '"+user.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from user where id = '"+user.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllAdmin: function(callback){
		var sql = "SELECT * FROM users WHERE user_role='admin' ";
		db.getResults(sql, function(results){
			callback(results)
		});
	},
	getAllSeller: function(callback){
		var sql = "SELECT * FROM users WHERE user_role='seller' ";
		db.getResults(sql, function(results){
			callback(results)
		});
	},
	getAllBuyer: function(callback){
		var sql = "SELECT * FROM users WHERE user_role='buyer' ";
		db.getResults(sql, function(results){
			callback(results)
		});
	},
	insertMessage: function(user, callback){
		var sql = "INSERT INTO `message` (`mid`, `message`, `uid`) VALUES (NULL, '"+user.message+"', '"+user.id+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllComment: function(callback){
		var sql = "SELECT * FROM comment ";
		db.getResults(sql, function(results){
			callback(results)
		});
	},
	deleteReview: function(user, callback){
		var sql = "delete from comment where cid = '"+user.cid+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllNotice: function(callback){
		var sql = "select * from notice";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insertNotice: function(user, callback){
		var sql = "INSERT INTO `notice` (`nid`, `notice`) VALUES (NULL, '"+user.notice+"')";
		db.execute(sql, function(status){
			if(status){
				console.log('success');
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateNotice: function(user, callback){
		console.log(user);
		var sql ="UPDATE `notice` SET `notice` = '"+user.notice+"' WHERE nid = '"+user.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				console.log('welcome2');
				callback(false);
			}
		});
	},
	deleteNotice: function(user, callback){
		console.log(user);
		var sql = "delete from notice where nid = '"+user.id+"'";
		db.execute(sql, function(status){
			if(status){
				console.log('welcome');
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	searchNotice: function(user, callback){
		var sql = "SELECT * FROM notice WHERE "+user.searchby+" LIKE '%"+user.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	}
}

