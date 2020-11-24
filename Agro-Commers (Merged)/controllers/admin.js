const express 	= require('express');
const router 	= express.Router();
const {body, validationResult} 		= require('express-validator');
const userModel		= require.main.require('./models/userModel');
const adminModel		= require.main.require('./models/adminModel');
//const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

router.get('/', (req, res) => {
	if (req.session.email != null) {
		userModel.getByEmail(req.session.email, function (result) {
			res.render('admin/index', {
				user: result
			});
		})
	} else {
		res.redirect('/login');
	}
}); 
//****************  ADDING MANAGER *************/
router.get('/addmanager', (req, res) => {
	if (req.session.email != null) {
		userModel.getByEmail(req.session.email, function (result) {
			res.render('admin/addmanager', {
				user: result
			});
		})
	} else {
		res.redirect('/login');
	}
}); 
router.post('/addmanager', [
    //
    body('username')
    .notEmpty()
    .withMessage('username is required'),
    
    //
    body('phone')
    .notEmpty()
    .withMessage('uphone is required'),
    
    // Email nameField & empty,email validation
    body('email')
    .isEmail()
    .withMessage('uemail is required'),

	body('password')
    .notEmpty()
    .withMessage('upassword is required'),

    body('user_role')
    .notEmpty()
    .withMessage('user role is required')

  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors.array());
    }else{
        user={
            uname: req.body.username,
            uphone: req.body.phone,
            umail: req.body.email,
			      uaddress: req.body.address,
			      upass: req.body.password,
			user_role: req.body.user_role
        };

        userModel.insert(user,(status)=>{
            if(status){
				console.log('succesful');
				res.redirect('/admin');                              
            }else{
                res.send("Registration Failed!");                
            } 
        });
    }
  });
  //////////Users list/////////////////
   router.get('/userlist', (req, res) => {
 	if (req.session.email != null) {
 		userModel.getAllUser(function (result) 
 		{
 			//const user=result;
 			res.render('admin/userlist', {
 				users: result
 			});
 		})
 	} else {
 		res.redirect('/login');
 	}
 });


//////////USER DELETE/////////////
router.get('/delete/:uid', (req, res)=>{
	userModel.delete(req.params.uid,(status)=>{
		if(status){
			res.redirect('/admin/userlist');
		}else{
			res.send('delete failed');
		}
  });
})
//*********Notice */
/////ADD NOTICE//////////////////////////////////

router.get('/addnotice', (req, res) => {
	if (req.session.email != null) {
		userModel.getByEmail(req.session.email, function (result) {
			res.render('admin/addnotice');
		})
	} else {
		res.redirect('/login');
	}
});

router.post('/addnotice', [
  body('notice')
  .notEmpty()
  .withMessage('Notice is required')
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send(errors.array());
  }else{
      notice={
          notice: req.body.notice,
      };
      console.log(notice);

        adminModel.addnotice(notice,(status)=>{
            if(status){
        console.log('succesful');
        res.redirect('/admin');                              
            }else{
                res.send("Notice Failed!");                
            } 
        });
  }
});

router.get('/notice', (req, res) => {
	if (req.session.email != null) {
    adminModel.getAllNotice(function (result)
    {
     
		 	res.render('admin/notice', {
		  		notice: result
		  	});
    // var n={
    //   notice:result
    // }
    // console.log(n);
  }
     )
    
    }
  else {
		res.redirect('/admin/userlist');
	}
});
/////////////////////////DELETE NOTICE/////////////////

router.get('/deletenotice/:nid', (req, res)=>{
	adminModel.delete(req.params.nid,(status)=>{
		if(status){
			res.redirect('/admin/notice');
		}else{
			res.send('delete failed');
		}
  });
})
///////////////EDIT NOTICE/////////////////////

router.get('/editnotice/:id/:notice', (req, res)=>{
	var user = {
		notice: req.params.notice
	};
	res.render('admin/editnotice', user);
});

router.post('/editnotice/:nid/:notice', (req, res)=>{
	var user = {
		nid: req.params.nid,
		notice: req.body.notice
	};
	adminModel.updateNotice(user, function(status){
		if(status){
			console.log('welcome');
			res.redirect('/admin/notice');
		}else{
			res.render('/admin/editnotice');
		}
	});
});
//////////Notice search///////////
router.post('/search',(req,res)=>{
	var user = {
		search : req.body.search,
		searchby: req.body.searchby
	};
	adminModel.searchNotice(user, function(results){
		if(results){
			res.json({user:results});
		}else{
			res.json({user:'error'});
		}
	});
});
///////////////////////Shops///////////////////

router.get('/shops', (req, res) => {
	if (req.session.email != null) {
		adminModel.getAllShop(function (result) {
			res.render('admin/Shops', {
				shop: result
			});
		})
	} else {
		res.redirect('/login');
	}
});

/////delete

router.get('/shopdelete/:shid', (req, res)=>{
	adminModel.sdelete(req.params.shid,(status)=>{
		if(status){
			res.redirect('/admin');
		}else{
			res.send('delete failed');
		}
  });
});
///////////////////orders//////
router.get('/orders', (req, res) => {
	if (req.session.email != null) {
		adminModel.getAllOrder(function (result) {
			res.render('admin/orders', {
				orders: result
			});
		})
	} else {
		res.redirect('/login');
	}
});
/////////////////MESSAGE///////////////////////
router.get('/message', (req, res) => {
	if (req.session.email != null) {
		adminModel.getAllMessage(function (result) {
			res.render('admin/mlist', {
				message: result
			});
		})
	} else {
		res.redirect('/login');
	}
});

router.get('/message/send/:id', (req, res)=>{
	if (req.session.email != null) {
		res.render('admin/msend');
	 }});
	 

	//  router.post('/send/:id', (req, res)=>{	
	// 	var user = {
	// 		id:req.params.id,
	// 		message : req.body.message
	// };
	// 	userModel.insertMessage(user, function(status){
	// 		if(status){
	// 			res.redirect('/home');
	// 		}else{
 	// 			res.redirect('/message/send');
 	// 		}
 	// 	});
 	// });
	
	  router.post('/message/send/:id', [
		body('message')
		.notEmpty()
	 	.withMessage('Message is required'),
	 	body('uid')
	 	.notEmpty()
	 	.withMessage('Select user id you want to message')
	   ], (req, res) => {
	  
	 	const errors = validationResult(req);
	 	if (!errors.isEmpty()) {
	 	  res.send(errors.array());
	 	}else{
	 		message={
	 			message: req.body.message,
	 			uid: req.body.uid
	 		};
	 		console.log(message);
	  
	 		  adminModel.addmessage(message,(status)=>{
	 			  if(status){
	 		  console.log('succesful');
			  res.redirect('/admin');                              
	 			  }else{
	 				  res.send("Message Failed!");                
	 			  } 
	 		  });
	 	}
	  });
		////////////////Financial report//////////////////////////////

		router.get('/freport', (req, res) => {
			if (req.session.email != null) {
				adminModel.getAllFreport(function (result) {
					res.render('admin/freport', {
						emp: result,
						esalary:adminModel.getsum(function(result){
		
						})
					});
				})
			} else {
				res.redirect('/login');
			}
		});
///////////////////////Search Option Added.///////////////

 router.get('/search_user', (req, res) => {
     res.render('admin/search');
 });

 router.post('/search_user', (req, res) => {
     userModel.search(req.body.search, (result) => {
         res.json({
             results: result
         });
     });
 });








module.exports = router;