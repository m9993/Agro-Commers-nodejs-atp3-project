const express 	                    = require('express');
const router 	                    = express.Router();
const {body, validationResult} 		= require('express-validator');
const customerModel                 = require.main.require('./models/customerModel');

router.get('*',  (req, res, next)=>{
	if(req.session.userProfile == undefined){
        var p={
            uid: "1",
            uname: "abc",
            uphone: "0123456789",
            umail: "abc@gmail.com",
            uaddress: "dhaka, Bangladesh",
            upass: "123",
            user_role: "admin"
        };
        req.session.userProfile=p;
		next();
		// res.redirect('/login');
	}else{
		next();
	}
});




router.get('/', (req, res)=>{
	res.render('customer/home');
});
router.post('/', [
    // res.send(req.body.conmessage);
    body('receivermail')
    .isEmail()
    .withMessage('Receiver mail is required'),

    body('conmessage')
    .notEmpty()
    .withMessage('Contact message is required')
    ], (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var allErrors='';
      for (var i = 0; i < errors.array().length; i++) {
          allErrors+=  (i+1) +'. '+errors.array()[i].msg+ '........... ';          
      }

      var a={ 
        type: "danger", 
        msg: allErrors
    };
    var initAlert=[];
    initAlert.push(a);
    res.render('customer/home', {alert: initAlert});


    }else{
        var contact={
        sendermail : req.session.userProfile.umail,
        receivermail : req.body.receivermail,
        conmessage : req.body.conmessage,
        }

        customerModel.validateMail(contact.receivermail, (status)=>{
            if(status){
                customerModel.insertIntoContact(contact, (status)=>{
                    if(status){
                        var a={ 
                            type: "success", 
                            msg: "Message sent successfully."
                        };
                        var initAlert=[];
                        initAlert.push(a);
                        res.render('customer/home', {alert: initAlert});
                    }
                });
            }else{
                var a={ 
                    type: "danger", 
                    msg: "Can not send. Please use a valid email address. There is no '" + contact.receivermail+ "' email exits."
                };
                var initAlert=[];
                initAlert.push(a);
                res.render('customer/home', {alert: initAlert});
            }
        });


        
    }
});
router.get('/editProfile', (req, res)=>{
    res.render('customer/editProfile', {userProfile: req.session.userProfile});
});
router.post('/editProfile', [
    body('umail')
    .isEmail()
    .withMessage('Email is required'),

    body('upass')
    .notEmpty()
    .withMessage('Password is required'),

    body('uname')
    .notEmpty()
    .withMessage('Name is required'),

    body('uaddress')
    .notEmpty()
    .withMessage('Address is required'),

    body('uphone')
    .isDecimal()
    .withMessage('Phone number is required & it should be in digits')
    ], (req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            var allErrors='';
        for (var i = 0; i < errors.array().length; i++) {
            allErrors+=  (i+1) +'. '+errors.array()[i].msg+ '........... ';          
        }

        var a={ 
            type: "danger", 
            msg: allErrors
        };
        var initAlert=[];
        initAlert.push(a);
        res.render('customer/home', {alert: initAlert});
    }else{
        var user={
            uid: req.session.userProfile.uid,
            umail: req.body.umail,
            upass: req.body.upass,
            uname: req.body.uname,
            uaddress: req.body.uaddress,
            uphone: req.body.uphone
        }
        customerModel.validateUpdateMail(user.umail,(status)=>{
            if(status){
                var a={ 
                    type: "danger", 
                    msg: "Profile Update failed. The email '"+user.umail+"' already exists. Try with different email."
                };
                var initAlert=[];
                initAlert.push(a);
                res.render('customer/home', {alert: initAlert});
            }else{
                customerModel.updateProfile(user,(status)=>{
                    if(status){
                        var a={ 
                            type: "success", 
                            msg: "Profile Updated successfully."
                        };
                        var initAlert=[];
                        initAlert.push(a);
                        res.render('customer/home', {alert: initAlert});
                    }else{
                        var a={ 
                            type: "danger", 
                            msg: "Profile Update failed."
                        };
                        var initAlert=[];
                        initAlert.push(a);
                        res.render('customer/home', {alert: initAlert});
                    }
                });
            }
        });
        


        // var a={ 
        //     type: "success", 
        //     msg: "Profile Updated successfully."
        // };
        // var initAlert=[];
        // initAlert.push(a);
        // res.render('customer/home', {alert: initAlert});
    }

});





module.exports = router;

