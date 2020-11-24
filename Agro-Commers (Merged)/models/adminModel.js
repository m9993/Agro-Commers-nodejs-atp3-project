const db = require('./db');
module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where uname = '"+user.username+"' and upass = '"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false)
			}
		});
	},


	getAllNotice: function(callback){
		var sql = "select * from notice";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	addnotice: function(user, callback){
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
		var sql ="UPDATE `notice` SET `notice` = '"+user.notice+"' WHERE nid = '"+user.nid+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				console.log('welcome2');
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
	
	},
	delete: function(id, callback){
		var sql = "DELETE FROM `notice` WHERE nid='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getAllShop: function(callback){
		var sql = "select * from shop";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	
	sdelete: function(id, callback){
		var sql = "DELETE FROM `shop` WHERE shid='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	},

	getAllOrder: function(callback){
		var sql = "select * from invoice";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAllMessage: function(callback){
		var sql = "select * from message";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	addmessage: function(user, callback){
		var sql = "INSERT INTO `message` (`mid`, `message`, `uid`) VALUES (NULL, '"+user.message+"','"+user.uid+"' )";
		db.execute(sql, function(status){
			if(status){
				console.log('success');
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllFreport: function(callback){
		var sql = "select * from employee";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getsum: function(callback){
		var sql = "select SUM(esalary) from employee";
			db.getResults(sql, function(results){
				callback(results);
			});
		}

	/////SELECT SUM(Quantity)
			  // FROM OrderDetails

}