const db    = require('./db');

module.exports={
    validateMail: (umail, callback)=>{
		var sql = "select * from users where umail= '"+umail+"'";
        db.getResults(sql, (results)=>{
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
        });
	},
	insertIntoContact:(contact, callback)=>{
		sql="INSERT INTO `contact`(`sendermail`, `receivermail`, `conmessage`) VALUES ('"+contact.sendermail+"', '"+contact.receivermail+"', '"+contact.conmessage+"')";
		db.execute(sql, (status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	// updateProfile: ()=>{

	// },



}