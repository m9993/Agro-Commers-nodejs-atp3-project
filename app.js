//declaration
const express 						= require('express');	
const bodyParser 					= require('body-parser');
const exSession 					= require('express-session');
const cookieParser 					= require('cookie-parser');
const {body, validationResult} 		= require('express-validator');

// const login							= require('./controllers/login');
const logout						= require('./controllers/logout');

const app							= express();
const port							= 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
app.use('/assets', express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));


// app.use('/', login);
// app.use('/login', login);
app.use('/logout', logout);



//router
app.get('/', (req, res)=>{
	res.render('index');
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});