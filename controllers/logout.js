const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{

	req.session.userProfile = undefined;
	req.session.cart = undefined;
	//res.cookie('uname', '');	
	// res.clearCookie('uname');
	res.redirect('/login');
});


module.exports = router;



