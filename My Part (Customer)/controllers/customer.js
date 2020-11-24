const express 	                    = require('express');
const router 	                    = express.Router();
const {body, validationResult} 		= require('express-validator');
const customerModel                 = require.main.require('./models/customerModel');
const customerCart                 = require.main.require('./models/customerCart');
// pdfkit
const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();
// pdfkit

router.get('*',  (req, res, next)=>{
	if(req.session.userProfile == undefined){
        var p={
            uid: "2",
            uname: "Harry",
            uphone: "12345",
            umail: "harry@gmail.com",
            uaddress: "dhaka, Bangladesh",
            upass: "123",
            user_role: "customer"
        };
        req.session.userProfile=p;
		next();
		// res.redirect('/login');
	}else{
		next();
	}
});




router.get('/', (req, res)=>{
    customerModel.getAllProducts((results)=>{
        req.session.products=results;
        res.render('customer/home',{products: results, userProfile: req.session.userProfile});
    });
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
    res.render('customer/home', {alert: initAlert, products: req.session.products, userProfile: req.session.userProfile});


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
                        res.render('customer/home', {alert: initAlert, products: req.session.products, userProfile: req.session.userProfile});
                    }
                });
            }else{
                var a={ 
                    type: "danger", 
                    msg: "Can not send. Please use a valid email address. There is no '" + contact.receivermail+ "' email exits."
                };
                var initAlert=[];
                initAlert.push(a);
                res.render('customer/home', {alert: initAlert, products: req.session.products, userProfile: req.session.userProfile});
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
        res.render('customer/home', {alert: initAlert, products: req.session.products, userProfile: req.session.userProfile});
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
                res.render('customer/home', {alert: initAlert, products: req.session.products, userProfile: req.session.userProfile});
            }else{
                customerModel.updateProfile(user,(status)=>{
                    if(status){
                        var a={ 
                            type: "success", 
                            msg: "Profile Updated successfully."
                        };
                        var initAlert=[];
                        initAlert.push(a);
                        res.render('customer/home', {alert: initAlert, products: req.session.products, userProfile: req.session.userProfile});
                    }else{
                        var a={ 
                            type: "danger", 
                            msg: "Profile Update failed."
                        };
                        var initAlert=[];
                        initAlert.push(a);
                        res.render('customer/home', {alert: initAlert, products: req.session.products, userProfile: req.session.userProfile});
                    }
                });
            }
        });
        
    }

});

router.get('/searchProduct', (req, res)=>{
	var searchKey= req.query.searchKey;
	customerModel.searchProduct(searchKey,(results)=>{
		// console.log(results);
		res.json({products: results});
	});
});
router.get('/cart', (req, res)=>{
    res.render('customer/cart', {cartData: req.session.cart, userProfile: req.session.userProfile});	
});
router.get('/add-to-cart/:iid', (req, res)=>{
    var productId= req.params.iid;
    customerModel.getById(productId,(results)=>{
        if(typeof req.session.cart=='undefined'){req.session.cart=[];}
        
        var oldCart= req.session.cart;
        customerCart.add(results[0], oldCart, (results)=>{
            req.session.cart=results;
            var a={ 
                type: "success", 
                msg: 'Added to cart.'
            };
            var initAlert=[];
            initAlert.push(a);
            res.render('customer/home', {alert: initAlert, products: req.session.products, userProfile: req.session.userProfile});

        });
        
        
    });
});

router.get('/reduceByOne/:iid', (req, res)=>{
    var productId= req.params.iid;
    customerModel.getById(productId,(results)=>{
        
        var oldCart= req.session.cart;
        customerCart.reduceByOne(results[0], oldCart, (results)=>{
            req.session.cart=results;
            res.redirect('/customer/cart');
        });
        
        
    });
});
router.get('/addByOne/:iid', (req, res)=>{
    var productId= req.params.iid;
    customerModel.getById(productId,(results)=>{
        
        var oldCart= req.session.cart;
        customerCart.addByOne(results[0], oldCart, (results)=>{
            req.session.cart=results;
            res.redirect('/customer/cart');  
        });
        
        
    });
});
router.post('/cart', [
    
    body('shipmethod')
    .notEmpty()
    .withMessage('Ship method is required'),
    body('subtotal')
    .isDecimal()
    .withMessage('Subtotal is required & it should be in digits')

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
        res.render('customer/cart', {alert: initAlert, cartData: req.session.cart, userProfile: req.session.userProfile});
    }else{
        var order={
            uid: req.session.userProfile.uid,
            subtotal: req.body.subtotal,
            shipmethod: req.body.shipmethod,
        };
        // res.send(order);
        customerModel.addInvoice(order, (status)=>{
            if(status){
                var memo='Order-list\n \n';
                    var no=1;
                    var totalPrice=0;
                    memo+='Item Id->Name->Price->Quantity';
                    req.session.cart.forEach( function(i){
                        memo+= '\nNo.';
                        memo+= no;
                        memo+= '----------'+i.storedId;
                        memo+= '----------'+i.storedName;
                        memo+= '----------'+i.storedPrice;
                        memo+= '----------'+i.storedQty;
                        totalPrice+=i.storedPrice;
                        no++;
                    });
                    memo+='\nTotal Amount: '+totalPrice+'Taka';

                // pdf
                doc.pipe(fs.createWriteStream('Order-list.pdf'));
                doc.fontSize(16).text(memo, 100, 100);
                doc.end();
                // pdf

                req.session.cart=undefined;
                var a={ 
                    type: "success", 
                    msg: "Your have ordered successfully"
                };
                var initAlert=[];
                initAlert.push(a);
                res.render('customer/cart', {alert: initAlert, cartData: req.session.cart, userProfile: req.session.userProfile});
            }else{
                var a={ 
                    type: "danger", 
                    msg: "Order failed"
                };
                var initAlert=[];
                initAlert.push(a);
                res.render('customer/cart', {alert: initAlert, cartData: req.session.cart, userProfile: req.session.userProfile});
            }
        });
    }
});
router.get('/email', (req, res)=>{
    customerModel.getAllEmail(req.session.userProfile.umail, (results)=>{
        res.render('customer/emails',{email: results, userProfile: req.session.userProfile});
    });

});
router.get('/notice', (req, res)=>{
    customerModel.getAllNotice((results)=>{
        res.render('customer/notice',{notice: results, userProfile: req.session.userProfile});
    });

});
router.get('/history', (req, res)=>{
    customerModel.getAllInvoice(req.session.userProfile.uid,(results)=>{
        res.render('customer/history',{history: results, userProfile: req.session.userProfile});
    });

});


module.exports = router;

