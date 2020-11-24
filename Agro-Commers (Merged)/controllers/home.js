const express 	= require('express');
const userModel = require.main.require('./models/managerModel');
const router 	= express.Router();
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
//const userModel = require.main.require('./models/managerModel')
const bodyParser 		= require('body-parser');
const {check,validationResult}=require('express-validator');

router.get('*',  (req, res, next)=>{
 if(req.cookies['uname']!=null){
		next();
 }
 else{
 	res.redirect('/login');
 }
});

router.get('/', (req, res)=>{
	res.render('manager/home/index', {name: req.cookies['uname']});
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get('/list', (req, res)=>{
	userModel.getAllNotice(function(results){
		const jsonData=JSON.parse(JSON.stringify(results));
		console.log("jsonData",jsonData);

		 const json2csvParser = new Json2csvParser({ header: true});
    const csv = json2csvParser.parse(jsonData);

    fs.writeFile("notice.csv", csv, function(error) {
      if (error) throw error;
      console.log("notice.csv successfully!");
    });
		res.render('manager/notice/index', {users: results});
	});
});
//notice
router.get('/create', (req, res)=>{
	
	res.render('manager/notice/create');
	
});

router.post('/create',urlencodedParser,[check('notice','canot be empty').isLength({min:3},'must be length 5').notEmpty()],(req, res)=>{
		const error=validationResult(req);
	if(!error.isEmpty()){
		const alert=error.array();
		res.render('manager/notice/create',{alert:alert});
}
else{
	var user = {
		notice : req.body.notice
	};
	userModel.insertNotice(user, function(status){
		if(status){
			res.redirect('/home/list');
		}else{
			res.render('manager/notice/create');
		}
	});
}
});

router.get('/edit/:id/:notice', (req, res)=>{
	var user = {
		notice: req.params.notice
	};
	res.render('manager/notice/edit', user);
});

router.post('/edit/:id/:notice', (req, res)=>{
	var user = {
		id: req.params.id,
		notice: req.body.notice
	};
	userModel.updateNotice(user, function(status){
		if(status){
			console.log('welcome');
			res.redirect('/home/list');
		}else{
			res.render('manager/notice/edit');
		}
	});
});

router.get('/delete/:id/:notice', (req, res)=>{
	var user = {
		id: req.params.id,
		notice: req.params.notice
	};
	res.render('manager/notice/delete', user);
});

router.post('/delete/:id/:notice', (req, res)=>{
	var user = {
		id : req.params.id
	};
	userModel.deleteNotice(user, function(status){
		if(status){
			res.redirect('/home/list');
		}else{
			res.render('manager/notice/delete');
		}
	});
});

router.post('/search',(req,res)=>{
	var user = {
		search : req.body.search,
		searchby: req.body.searchby
	};
	userModel.searchNotice(user, function(results){
		if(results){
			res.json({user:results});
		}else{
			res.json({user:'error'});
		}
	});
});
//contact
router.get('/admin', (req, res)=>{
	userModel.getAllAdmin(function(results){
		
		res.render('manager/contact/admin', {users: results});
	});
});

router.get('/buyer', (req, res)=>{
	userModel.getAllBuyer(function(results){
		
		res.render('manager/contact/buyer', {users: results});
	});
});

router.get('/seller', (req, res)=>{
	userModel.getAllSeller(function(results){
		
		res.render('manager/contact/seller', {users: results});
	});
});
//message
router.get('/send/:id', (req, res)=>{
     res.render('manager/message/send');
});

router.post('/send/:id', (req, res)=>{
	var user = {
		id:req.params.id,
		message : req.body.message
	};

	userModel.insertMessage(user, function(status){
		if(status){
			res.redirect('/home');
		}else{
			res.render('manager/message/send');
		}
	});
});

//Review
router.get('/review', (req, res)=>{
	userModel.getAllComment(function(results){
		
		res.render('manager/review/index', {users: results});
	});
});

router.get('/delete/:cid/:uid/:iid/:comment', (req, res)=>{
	var user = {
		cid: req.params.cid,
	    uid: req.params.uid,
	    iid: req.params.iid,
	    comment: req.params.comment
	};
	res.render('manager/review/delete', user);
});

router.post('/delete/:cid/:uid/:iid/:comment', (req, res)=>{
	var user = {
		cid: req.params.cid
	};
	userModel.deleteReview(user, function(status){
		if(status){
			res.redirect('/home');
		}else{
			res.render('manager/review/delete');
		}
	});
});
module.exports=router;