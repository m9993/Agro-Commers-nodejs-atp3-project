const express 	= require('express');
const router 	= express.Router();
const userModel = require.main.require('./models/userModel');

router.get('/', (req, res)=>{
	res.render('login');	
});
router.post('/', (req, res)=>{
	var user = {
		email: req.body.email,
		password: req.body.password
	};
	userModel.validate(user, function(status){
		if(status == true){
			req.session.email = user.email;
		
			 userModel.getByEmail(user.email, function(result){
				req.session.username = result[0].username;
			 	req.session.user_role = result[0].user_role;
				if(result[0].user_role =="admin"){
			 		res.redirect('/admin');
			 	}
			 	else if(result[0].user_role=="manager"){
			 		res.cookie('uname', req.body.username);
					res.redirect('/home');
				 }
				 else if(result[0].user_role=="customer"){
				 	req.session.userProfile=result[0];
					res.redirect('/customer');
			 	}
			 }	);
			 //Session["UserID"] = obj1.uid.ToString();
			// Session["UserPassword"] = obj1.upassword.ToString();

        } else {
		   // res.render('home/not_register');
		   res.send('error');
        }

			})
		
	});
module.exports = router;